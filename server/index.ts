import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import helmet from 'helmet';
import csrf from 'csurf';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import healthHandler from '../api/health';
import usersHandler from '../api/users';
import signupHandler from '../api/auth/signup';
import loginHandler from '../api/auth/login';
import meHandler from '../api/auth/me';
import logoutHandler from '../api/auth/logout';
import changePasswordHandler from '../api/auth/change-password';
import submitOrderHandler from '../api/payment/submit-order';
import bankTransferHandler from '../api/payment/bank-transfer';
import nowpaymentsReturnHandler from '../api/payment/nowpayments-return';
import nowpaymentsInitHandler from '../api/payment/nowpayments-init';
import nowpaymentsWebhookHandler from '../api/payment/nowpayments-webhook';
import ordersHandler from '../api/orders';
import deleteOrderHandler from '../api/orders/[orderId]';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = parseInt(process.env.BACKEND_PORT || '3001', 10);

// CORS middleware for development - MUST BE FIRST
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    'http://localhost:5000',
    'http://127.0.0.1:5000',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ];
  
  // Allow Replit domains (*.replit.dev)
  const isReplitDomain = origin && origin.match(/^https?:\/\/[a-zA-Z0-9-]+\.replit\.dev$/);
  
  if ((origin && allowedOrigins.includes(origin)) || isReplitDomain) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie, X-CSRF-Token');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Security middleware with Helmet (development mode)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://nowpayments.io"], // unsafe-eval for dev tools
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      connectSrc: ["'self'", "https://api.nowpayments.io", "ws:", "wss:"], // WebSocket for HMR
      frameSrc: ["https://nowpayments.io"],
    }
  },
  // HSTS disabled in development (using HTTP)
  hsts: false,
  // Prevent clickjacking
  frameguard: {
    action: 'deny'
  },
  // Prevent MIME-type sniffing
  noSniff: true,
  // Referrer policy for privacy
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin'
  },
  // Hide X-Powered-By header
  hidePoweredBy: true
}));

// Additional security headers
app.use((req, res, next) => {
  // Skip HSTS in development (using HTTP)
  // res.setHeader("Strict-Transport-Security", "...");  // Only for production HTTPS
  
  // Prevent clickjacking
  res.setHeader("X-Frame-Options", "DENY");
  
  // Prevent MIME-type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");
  
  // Control referrer information
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  
  // XSS Protection (legacy browsers)
  res.setHeader("X-XSS-Protection", "1; mode=block");
  
  next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

// Session configuration (in-memory for development)
app.use(
  session({
    secret: 'dev-secret-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,  // HTTP in development
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// CSRF Protection
const csrfProtection = csrf({ 
  cookie: false,
  value: (req) => {
    return req.headers['x-csrf-token'] as string || req.body._csrf;
  }
});

// Special CSRF middleware for token generation endpoint
const csrfTokenGenerator = csrf({ cookie: false });

// Route to provide CSRF token to frontend - MUST be BEFORE other routes
app.get('/api/csrf-token', csrfTokenGenerator, (req: any, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Middleware to conditionally apply CSRF protection to other routes
app.use((req, res, next) => {
  const exemptRoutes = [
    /^\/api\/csrf-token/,  // Already handled above
    /^\/api\/auth\/signup/,
    /^\/api\/auth\/login/,
    /^\/api\/auth\/logout/,
    /^\/api\/payment\/nowpayments-webhook/,
    /^\/api\/payment\/nowpayments-return/,
  ];
  
  if (exemptRoutes.some((rx) => rx.test(req.path))) {
    return next();
  }
  return csrfProtection(req, res, next);
});

// Convert Vercel handlers to Express middleware
const convertVercelHandler = (handler: any) => {
  return (req: express.Request, res: express.Response) => {
    // Convert Express req/res to Vercel format
    const vercelReq = {
      query: { ...req.query, ...req.params },
      body: req.body,
      cookies: req.cookies || {},
      method: req.method,
      url: req.url,
      headers: req.headers as { [key: string]: string }
    };

    const vercelRes = {
      status: (code: number) => {
        res.status(code);
        return vercelRes;
      },
      json: (object: any) => {
        res.json(object);
        return vercelRes;
      },
      setHeader: (name: string, value: string | string[]) => {
        res.setHeader(name, value);
        return vercelRes;
      },
      end: (chunk?: any) => {
        if (chunk) {
          res.send(chunk);
        } else {
          res.end();
        }
      }
    };

    handler(vercelReq, vercelRes);
  };
};

// API routes
app.use('/api/health', convertVercelHandler(healthHandler));
app.use('/api/users', convertVercelHandler(usersHandler));

// Auth routes
app.use('/api/auth/signup', convertVercelHandler(signupHandler));
app.use('/api/auth/login', convertVercelHandler(loginHandler));

// Logout route - native Express to handle session destruction
app.post('/api/auth/logout', (req: any, res) => {
  try {
    // Détruire la session MongoDB (si elle existe)
    if (req.session) {
      req.session.destroy((err: any) => {
        if (err) {
          console.error('Erreur destruction session:', err);
          return res.status(500).json({ 
            ok: false,
            error: 'Erreur lors de la déconnexion' 
          });
        }

        // Supprimer le cookie de session avec les bons paramètres
        const isProduction = process.env.NODE_ENV === 'production';
        res.clearCookie('connect.sid', {
          path: '/',
          httpOnly: true,
          secure: isProduction,
          sameSite: isProduction ? 'none' : 'lax',
        });

        // Supprimer aussi le cookie auth_token s'il existe
        res.clearCookie('auth_token', {
          path: '/',
          httpOnly: true,
          secure: isProduction,
          sameSite: isProduction ? 'none' : 'lax',
        });

        return res.status(200).json({
          ok: true,
          message: 'Déconnexion réussie'
        });
      });
    } else {
      // Pas de session, juste supprimer les cookies
      const isProduction = process.env.NODE_ENV === 'production';
      res.clearCookie('connect.sid', {
        path: '/',
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
      });

      res.clearCookie('auth_token', {
        path: '/',
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
      });

      return res.status(200).json({
        ok: true,
        message: 'Déconnexion réussie'
      });
    }
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    return res.status(500).json({
      ok: false,
      error: 'Erreur serveur lors de la déconnexion'
    });
  }
});

app.use('/api/auth/me', convertVercelHandler(meHandler));
app.use('/api/auth/change-password', convertVercelHandler(changePasswordHandler));

// Payment routes
app.use('/api/payment/submit-order', convertVercelHandler(submitOrderHandler));
app.use('/api/payment/bank-transfer', convertVercelHandler(bankTransferHandler));
app.use('/api/payment/nowpayments-init', convertVercelHandler(nowpaymentsInitHandler));
app.use('/api/payment/nowpayments-return', convertVercelHandler(nowpaymentsReturnHandler));
app.post('/api/payment/nowpayments-webhook', convertVercelHandler(nowpaymentsWebhookHandler));

// Orders routes
app.delete('/api/orders/:orderId', convertVercelHandler(deleteOrderHandler));
app.use('/api/orders', convertVercelHandler(ordersHandler));

// Serve static files from frontend dist in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../dist')));
  
  // Handle client-side routing
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../dist/index.html'));
  });
} else {
  // Development mode - frontend runs separately on Vite dev server
  app.get('/', (req, res) => {
    res.json({
      message: 'Backend API is running',
      environment: 'development',
      frontend: 'Run frontend separately with: cd frontend && npm run dev'
    });
  });
}

// 404 Handler - Catch all unmatched routes and return JSON instead of HTML
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path,
    message: `The endpoint ${req.method} ${req.path} does not exist`
  });
});

// Global Error Handler - Ensure all errors return JSON, not HTML
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error handler:', err);
  
  // CSRF token errors
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({
      error: 'Invalid CSRF token',
      message: 'Session invalide ou token CSRF manquant/incorrect'
    });
  }
  
  // Default error response
  const statusCode = err.statusCode || err.status || 500;
  res.status(statusCode).json({
    error: err.message || 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

app.listen(PORT, 'localhost', () => {
  console.log(`Backend API Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`MongoDB URI configured: ${process.env.MONGODB_URI ? 'Yes' : 'No'}`);
  console.log(`JWT Secret configured: ${process.env.JWT_SECRET ? 'Yes' : 'No'}`);
});