import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectMongo from 'connect-mongodb-session';
import helmet from 'helmet';
import csrf from 'csurf';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import healthHandler from '../api/health.js';
import usersHandler from '../api/users.js';
import signupHandler from '../api/auth/signup.js';
import loginHandler from '../api/auth/login.js';
import meHandler from '../api/auth/me.js';
import logoutHandler from '../api/auth/logout.js';
import verifyEmailHandler from '../api/auth/verify-email.js';
import changePasswordHandler from '../api/auth/change-password.js';
import forgotPasswordHandler from '../api/auth/forgot-password.js';
import resetPasswordHandler from '../api/auth/reset-password.js';
import bankTransferHandler from '../api/payment/bank-transfer.js';
import oxapayInitHandler from '../api/payment/oxapay-init.js';
import oxapayWebhookHandler from '../api/payment/oxapay-webhook.js';
import oxapayReturnHandler from '../api/payment/oxapay-return.js';
import ordersHandler from '../api/orders.js';
import deleteOrderHandler from '../api/orders/[orderId].js';
import { getErrorMessage, getLanguageFromRequest } from './utils/multilingual-messages.js';
import getProductsHandler from '../api/products/index.js';
import createProductHandler from '../api/products/create.js';
import updateProductHandler from '../api/products/update.js';
import deleteProductHandler from '../api/products/delete.js';
import { hybridGeneralLimiter, hybridAuthLimiter, hybridWebhookLimiter } from '../utils/hybrid-rate-limiter.js';
import { initializeServices } from './bootstrap.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '10000', 10);
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://luxiomarket.shop';
const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN || '.luxiomarket.shop';

// Trust proxy for Render deployment (TLS terminates at load balancer)
app.set('trust proxy', 1);

// CORS middleware - DOIT ÊTRE LE TOUT PREMIER (avant helmet, body parsers, etc.)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const isProduction = process.env.NODE_ENV === 'production';

  const productionOrigins = [
    'https://luxiomarket.shop',
    'https://www.luxiomarket.shop',
  ];

  const developmentOrigins = [
    'http://localhost:5000',
    'http://localhost:3000',
    'http://127.0.0.1:5000',
    'http://127.0.0.1:3000',
  ];

  const allowedOrigins = isProduction
    ? productionOrigins
    : [...productionOrigins, ...developmentOrigins];

  // Toujours définir Vary pour éviter le cache d'origine incorrect
  res.header('Vary', 'Origin');

  // SECURITY: Vérifier si l'origine est autorisée (strict même en dev)
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  // SECURITY: NO WILDCARD - reject unauthorized origins even in dev

  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie, X-CSRF-Token'
  );

  // Répondre directement aux preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); // 204 = No Content (meilleur pour CORS)
  }

  next();
});

// ✅ Forcer HTTPS (important pour cookies secure + Render)
app.use((req, res, next) => {
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    next();
  } else {
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
});

// Middleware de sécurité avec Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      frameSrc: ["'self'"],
    }
  },
  // HSTS: Force HTTPS for 1 year, including subdomains
  hsts: {
    maxAge: 31536000, // 1 year in seconds
    includeSubDomains: true,
    preload: true
  },
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

// Additional security headers for GDPR and HTTPS compliance
app.use((req, res, next) => {
  // Ensure HSTS is set (redundant with helmet but explicit)
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  
  // Prevent clickjacking
  res.setHeader("X-Frame-Options", "DENY");
  
  // Prevent MIME-type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");
  
  // Control referrer information
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  
  // XSS Protection (legacy browsers)
  res.setHeader("X-XSS-Protection", "1; mode=block");
  
  // Permissions Policy (formerly Feature-Policy)
  res.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB session store configuration
const MongoDBStore = connectMongo(session);
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URL;

const store = mongoUri ? new MongoDBStore({
  uri: mongoUri,
  collection: 'sessions',
  expires: 1000 * 60 * 60 * 24, // 24 hours
}) : undefined;

if (store) {
  store.on('error', (error: Error) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error('MongoDB session store error:', error);
    }
  });
}

// Session configuration with MongoDB store
app.use(
  session({
    secret: process.env.SESSION_SECRET || process.env.JWT_SECRET || 'default-secret-change-in-production',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      domain: process.env.NODE_ENV === 'production' ? COOKIE_DOMAIN : undefined,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// CSRF Protection with exception for payment webhooks
const csrfProtection = csrf({ 
  cookie: false,
  value: (req) => {
    // Accept CSRF token from X-CSRF-Token header or _csrf body field
    return req.headers['x-csrf-token'] as string || req.body._csrf;
  }
});

// Special CSRF middleware for token generation endpoint
const csrfTokenGenerator = csrf({ cookie: false });

// Route to provide CSRF token to frontend - MUST be BEFORE other routes
app.get('/api/csrf-token', csrfTokenGenerator, (req: any, res) => {
  // csrfTokenGenerator middleware adds csrfToken() method to request
  res.json({ csrfToken: req.csrfToken() });
});

// Middleware to conditionally apply CSRF protection to other routes
app.use((req, res, next) => {
  const exemptRoutes = [
    /^\/api\/csrf-token/,  // Already handled above
    /^\/api\/auth\/signup/,
    /^\/api\/auth\/verify-email/,  // Email verification can be accessed via GET link
    /^\/api\/auth\/login/,
    /^\/api\/auth\/logout/,  // Logout should work without CSRF token
    /^\/api\/auth\/forgot-password/,  // Password reset email can be requested without CSRF
    /^\/api\/auth\/reset-password/,  // Password reset accessed via email link without active session
    /^\/api\/payment\/oxapay-webhook/,
    /^\/api\/payment\/oxapay-return/,
    /^\/api\/payment\/stripe-webhook/,
  ];
  
  if (exemptRoutes.some((rx) => rx.test(req.path))) {
    return next();
  }
  return csrfProtection(req, res, next);
});

app.use(hybridGeneralLimiter.middleware());

// Convert Vercel handlers to Express middleware
const convertVercelHandler = (handler: any) => {
  return async (req: express.Request, res: express.Response) => {
    try {
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

      await handler(vercelReq, vercelRes);
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[convertVercelHandler] Uncaught error in handler:', error);
      }
      if (!res.headersSent) {
        res.status(500).json({
          error: 'Internal Server Error',
          details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : undefined
        });
      }
    }
  };
};

// API routes
app.use('/api/health', convertVercelHandler(healthHandler));
app.use('/api/users', convertVercelHandler(usersHandler));

// Auth routes avec rate limiting (CSRF protection applied globally via middleware)
app.use('/api/auth/signup', hybridAuthLimiter.middleware(), convertVercelHandler(signupHandler));
app.use('/api/auth/verify-email', convertVercelHandler(verifyEmailHandler));
app.use('/api/auth/login', hybridAuthLimiter.middleware(), convertVercelHandler(loginHandler));

// Logout route - native Express to handle session destruction
app.post('/api/auth/logout', (req: any, res) => {
  try {
    // Détruire la session MongoDB
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
        domain: isProduction ? COOKIE_DOMAIN : undefined,
        path: '/',
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
      });

      // Supprimer aussi le cookie auth_token s'il existe
      res.clearCookie('auth_token', {
        domain: isProduction ? COOKIE_DOMAIN : undefined,
        path: '/',
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
      });

      return res.status(200).json({
        ok: true,
        message: 'Déconnexion réussie'
      });
    });
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
app.use('/api/auth/forgot-password', hybridAuthLimiter.middleware(), convertVercelHandler(forgotPasswordHandler));
app.use('/api/auth/reset-password', hybridAuthLimiter.middleware(), convertVercelHandler(resetPasswordHandler));

// Payment routes (CSRF protection applied globally except for webhook and return)
app.use('/api/payment/bank-transfer', convertVercelHandler(bankTransferHandler));

// OxaPay crypto payment routes
app.use('/api/payment/oxapay-init', convertVercelHandler(oxapayInitHandler));
app.use('/api/payment/oxapay-return', convertVercelHandler(oxapayReturnHandler));
// SECURITY: Rate limit webhook to prevent abuse (100 req/min per IP)
app.post('/api/payment/oxapay-webhook', hybridWebhookLimiter.middleware(), convertVercelHandler(oxapayWebhookHandler));

// Orders routes (CSRF protection applied globally via middleware)
app.delete('/api/orders/:orderId', convertVercelHandler(deleteOrderHandler));
app.use('/api/orders', convertVercelHandler(ordersHandler));

// Product management routes (CSRF protection applied globally via middleware)
app.get('/api/products', convertVercelHandler(getProductsHandler));
app.post('/api/products/create', convertVercelHandler(createProductHandler));
app.put('/api/products/update', convertVercelHandler(updateProductHandler));
app.delete('/api/products/delete', convertVercelHandler(deleteProductHandler));

// Health check route
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Luxio Backend API is running',
    environment: process.env.NODE_ENV || 'production',
    timestamp: new Date().toISOString()
  });
});

// 404 Handler - Catch all unmatched routes and return JSON instead of HTML
app.use((req, res) => {
  const lang = getLanguageFromRequest(req);
  res.status(404).json({ 
    success: false,
    error: 'ROUTE_NOT_FOUND',
    message: getErrorMessage('ROUTE_NOT_FOUND', lang),
    path: req.path,
    method: req.method
  });
});

// Global Error Handler - Ensure all errors return JSON, not HTML
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error('Global error handler:', err);
  }
  const lang = getLanguageFromRequest(req);
  
  // CSRF token errors
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({
      success: false,
      error: 'CSRF_INVALID',
      message: getErrorMessage('CSRF_INVALID', lang)
    });
  }
  
  // Default error response
  const statusCode = err.statusCode || err.status || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || 'INTERNAL_SERVER_ERROR',
    message: err.message || getErrorMessage('INTERNAL_SERVER_ERROR', lang),
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Initialize services before starting server
initializeServices().then(() => {
  // Écouter sur 0.0.0.0 pour Render
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Backend API Server running on port ${PORT}`);
    console.log(`   Environment: ${process.env.NODE_ENV || 'production'}`);
    console.log(`   Frontend URL: ${FRONTEND_URL}`);
    console.log(`   MongoDB URI configured: ${process.env.MONGODB_URI ? 'Yes' : 'No'}`);
    console.log(`   JWT Secret configured: ${process.env.JWT_SECRET ? 'Yes' : 'No'}`);
    console.log(`   SendGrid configured: ${process.env.SENDGRID_API_KEY ? 'Yes' : 'No'}`);
    console.log(`   NowPayments configured: ${process.env.NOWPAYMENTS_API_KEY ? 'Yes' : 'No'}`);
  });
}).catch(error => {
  console.error('[Server] Fatal error during initialization:', error);
  process.exit(1);
});
