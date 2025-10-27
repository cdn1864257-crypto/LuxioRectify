import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectMongo from 'connect-mongodb-session';
import rateLimit from 'express-rate-limit';
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
import submitOrderHandler from '../api/payment/submit-order.js';
import bankTransferHandler from '../api/payment/bank-transfer.js';
import nowpaymentsReturnHandler from '../api/payment/nowpayments-return.js';
import nowpaymentsInitHandler from '../api/payment/nowpayments-init.js';
import nowpaymentsWebhookHandler from '../api/payment/nowpayments-webhook.js';
import ordersHandler from '../api/orders.js';
import deleteOrderHandler from '../api/orders/[orderId].js';
import { getErrorMessage, getLanguageFromRequest } from './utils/multilingual-messages.js';
import getProductsHandler from '../api/products/index.js';
import createProductHandler from '../api/products/create.js';
import updateProductHandler from '../api/products/update.js';
import deleteProductHandler from '../api/products/delete.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '10000', 10);
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://luxios.vercel.app';

// Trust proxy for Render deployment (TLS terminates at load balancer)
app.set('trust proxy', 1);

// CORS middleware - DOIT ÊTRE LE TOUT PREMIER (avant helmet, body parsers, etc.)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Production: autoriser les 3 domaines principaux de Luxio Market
  // Développement: autoriser aussi localhost pour les tests
  const productionOrigins = [
    'https://luxiomarket.shop',
    'https://www.luxiomarket.shop',
    'https://luxios.vercel.app'
  ];
  
  const developmentOrigins = [
    'http://localhost:5000',
    'http://localhost:3000',
    'http://127.0.0.1:5000',
    'http://127.0.0.1:3000'
  ];
  
  const allowedOrigins = isProduction 
    ? productionOrigins
    : [...productionOrigins, ...developmentOrigins];
  
  // Gérer le cas spécial où FRONTEND_URL vaut '*' (autoriser toutes les origines)
  const allowAllOrigins = FRONTEND_URL === '*';
  
  if (origin && (allowAllOrigins || allowedOrigins.includes(origin))) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie, X-CSRF-Token');
  
  // Traiter les requêtes preflight OPTIONS immédiatement
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Middleware de sécurité avec Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://nowpayments.io"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.nowpayments.io"],
      frameSrc: ["https://nowpayments.io"],
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
    console.error('MongoDB session store error:', error);
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
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
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
    /^\/api\/payment\/nowpayments-webhook/,
    /^\/api\/payment\/nowpayments-return/,
  ];
  
  if (exemptRoutes.some((rx) => rx.test(req.path))) {
    return next();
  }
  return csrfProtection(req, res, next);
});

// Rate limiting général
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite à 100 requêtes par IP
  handler: (req, res) => {
    const lang = getLanguageFromRequest(req);
    res.status(429).json({
      success: false,
      error: 'TOO_MANY_REQUESTS',
      message: getErrorMessage('TOO_MANY_REQUESTS', lang)
    });
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting strict pour l'authentification
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 60 * 1000, // 15 minutes
  max: 5, // Limite à 5 tentatives
  handler: (req, res) => {
    const lang = getLanguageFromRequest(req);
    res.status(429).json({
      success: false,
      error: 'TOO_MANY_LOGIN_ATTEMPTS',
      message: getErrorMessage('TOO_MANY_LOGIN_ATTEMPTS', lang)
    });
  },
  skipSuccessfulRequests: true,
});

app.use(generalLimiter);

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
      console.error('[convertVercelHandler] Uncaught error in handler:', error);
      if (!res.headersSent) {
        res.status(500).json({
          error: 'Internal Server Error',
          details: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
  };
};

// API routes
app.use('/api/health', convertVercelHandler(healthHandler));
app.use('/api/users', convertVercelHandler(usersHandler));

// Auth routes avec rate limiting (CSRF protection applied globally via middleware)
app.use('/api/auth/signup', authLimiter, convertVercelHandler(signupHandler));
app.use('/api/auth/verify-email', convertVercelHandler(verifyEmailHandler));
app.use('/api/auth/login', authLimiter, convertVercelHandler(loginHandler));

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
        path: '/',
        httpOnly: true,
        secure: isProduction, // true en production (HTTPS)
        sameSite: isProduction ? 'none' : 'lax', // 'none' requis pour cross-domain
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
app.use('/api/auth/forgot-password', authLimiter, convertVercelHandler(forgotPasswordHandler));
app.use('/api/auth/reset-password', authLimiter, convertVercelHandler(resetPasswordHandler));

// Payment routes (CSRF protection applied globally except for webhook and return)
app.use('/api/payment/submit-order', convertVercelHandler(submitOrderHandler));
app.use('/api/payment/bank-transfer', convertVercelHandler(bankTransferHandler));
app.use('/api/payment/nowpayments-init', convertVercelHandler(nowpaymentsInitHandler));
app.use('/api/payment/nowpayments-return', convertVercelHandler(nowpaymentsReturnHandler));
// Webhook NowPayments : PAS de CSRF car les requêtes viennent de NowPayments (validées par signature HMAC)
app.post('/api/payment/nowpayments-webhook', convertVercelHandler(nowpaymentsWebhookHandler));

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
  console.error('Global error handler:', err);
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
