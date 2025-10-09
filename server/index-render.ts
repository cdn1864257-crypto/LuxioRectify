import express from 'express';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { doubleCsrf } from 'csrf-csrf';
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
const FRONTEND_URL = process.env.FRONTEND_URL || '*';

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

// Configuration CSRF
const { doubleCsrfProtection } = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET || 'default-csrf-secret-please-change-in-production',
  cookieName: 'x-csrf-token',
  cookieOptions: {
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  },
  size: 64,
  ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
  getSessionIdentifier: (req) => {
    // Utiliser l'IP comme identifiant de session pour CSRF
    return req.headers['x-forwarded-for'] as string || req.socket?.remoteAddress || 'unknown';
  }
});

// Route pour obtenir le token CSRF
app.get('/api/csrf-token', (req, res) => {
  const token = req.csrfToken ? req.csrfToken() : '';
  res.json({ csrfToken: token });
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
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limite à 5 tentatives
  message: 'Trop de tentatives de connexion, veuillez réessayer dans 15 minutes.',
  skipSuccessfulRequests: true,
});

app.use(generalLimiter);

// CORS middleware configuré pour Vercel
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const isProduction = process.env.NODE_ENV === 'production';
  
  // En production: autoriser UNIQUEMENT le frontend Vercel
  // En développement: autoriser aussi localhost pour les tests
  const allowedOrigins = isProduction 
    ? [FRONTEND_URL]
    : [FRONTEND_URL, 'http://localhost:5000', 'http://localhost:3000', 'http://127.0.0.1:5000', 'http://127.0.0.1:3000'];
  
  if (origin && allowedOrigins.includes(origin)) {
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
app.use('/api/users', doubleCsrfProtection, convertVercelHandler(usersHandler));

// Auth routes avec rate limiting et protection CSRF
app.use('/api/auth/signup', authLimiter, doubleCsrfProtection, convertVercelHandler(signupHandler));
app.use('/api/auth/login', authLimiter, doubleCsrfProtection, convertVercelHandler(loginHandler));
app.use('/api/auth/logout', doubleCsrfProtection, convertVercelHandler(logoutHandler));
app.use('/api/auth/me', convertVercelHandler(meHandler));
app.use('/api/auth/change-password', doubleCsrfProtection, convertVercelHandler(changePasswordHandler));
app.use('/api/auth/forgot-password', authLimiter, doubleCsrfProtection, convertVercelHandler(forgotPasswordHandler));
app.use('/api/auth/reset-password', authLimiter, doubleCsrfProtection, convertVercelHandler(resetPasswordHandler));

// Payment routes avec protection CSRF (sauf webhook qui vient de NowPayments)
app.use('/api/payment/submit-order', doubleCsrfProtection, convertVercelHandler(submitOrderHandler));
app.use('/api/payment/bank-transfer', doubleCsrfProtection, convertVercelHandler(bankTransferHandler));
app.use('/api/payment/nowpayments-init', doubleCsrfProtection, convertVercelHandler(nowpaymentsInitHandler));
app.use('/api/payment/nowpayments-return', convertVercelHandler(nowpaymentsReturnHandler));
// Webhook NowPayments : PAS de CSRF car les requêtes viennent de NowPayments (validées par signature HMAC)
app.post('/api/payment/nowpayments-webhook', convertVercelHandler(nowpaymentsWebhookHandler));

// Orders routes avec protection CSRF
app.delete('/api/orders/:orderId', doubleCsrfProtection, convertVercelHandler(deleteOrderHandler));
app.use('/api/orders', doubleCsrfProtection, convertVercelHandler(ordersHandler));

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
