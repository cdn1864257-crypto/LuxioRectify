import express from 'express';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import healthHandler from '../api/health.js';
import usersHandler from '../api/users.js';
import signupHandler from '../api/auth/signup.js';
import loginHandler from '../api/auth/login.js';
import meHandler from '../api/auth/me.js';
import logoutHandler from '../api/auth/logout.js';
import changePasswordHandler from '../api/auth/change-password.js';
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

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie');
  
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
app.use('/api/users', convertVercelHandler(usersHandler));

// Auth routes
app.use('/api/auth/signup', convertVercelHandler(signupHandler));
app.use('/api/auth/login', convertVercelHandler(loginHandler));
app.use('/api/auth/logout', convertVercelHandler(logoutHandler));
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
