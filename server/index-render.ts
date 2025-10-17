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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '10000', 10);
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://luxios.vercel.app';

// Trust proxy for Render deployment (TLS terminates at load balancer)
app.set('trust proxy', 1);

// Middleware de sécurité
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
  }
}));

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

// CORS middleware configuré pour Vercel (DOIT ÊTRE AVANT SESSION/CSRF/RATE LIMITING)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const isProduction = process.env.NODE_ENV === 'production';
  
  // En production: autoriser UNIQUEMENT le frontend Vercel
  // En développement: autoriser aussi localhost pour les tests
  const allowedOrigins = isProduction 
    ? [FRONTEND_URL]
    : [FRONTEND_URL, 'http://localhost:5000', 'http://localhost:3000', 'http://127.0.0.1:5000', 'http://127.0.0.1:3000'];
  
  // Gérer le cas spécial où FRONTEND_URL vaut '*' (autoriser toutes les origines)
  const allowAllOrigins = FRONTEND_URL === '*';
  
  if (origin && (allowAllOrigins || allowedOrigins.includes(origin))) {
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

// Route to provide CSRF token to frontend (MUST be before CSRF middleware)
app.get('/api/csrf-token', (req: any, res) => {
  res.json({ csrfToken: req.csrfToken ? req.csrfToken() : 'no-csrf-available' });
});

// Middleware to conditionally apply CSRF protection
app.use((req, res, next) => {
  const exemptRoutes = [
    /^\/api\/csrf-token/,
    /^\/api\/auth\/signup/,
    /^\/api\/auth\/login/,
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
  message: 'Trop de requêtes, veuillez réessayer plus tard.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting strict pour l'authentification
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 60 * 1000, // 15 minutes
  max: 5, // Limite à 5 tentatives
  message: 'Trop de tentatives de connexion, veuillez réessayer dans 15 minutes.',
  skipSuccessfulRequests: true,
});

app.use(generalLimiter);

// Convert Vercel handlers to Express middleware
const convertVercelHandler = (handler: any) => {
  return (req: express.Request, res: express.Response) => {
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

// Auth routes avec rate limiting (CSRF protection applied globally via middleware)
app.use('/api/auth/signup', authLimiter, convertVercelHandler(signupHandler));
app.use('/api/auth/login', authLimiter, convertVercelHandler(loginHandler));
app.use('/api/auth/logout', convertVercelHandler(logoutHandler));
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

// Health check route
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Luxio Backend API is running',
    environment: process.env.NODE_ENV || 'production',
    timestamp: new Date().toISOString()
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
