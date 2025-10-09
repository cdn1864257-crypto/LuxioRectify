import express from 'express';
import cookieParser from 'cookie-parser';
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

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS middleware for development
app.use((req, res, next) => {
  const origin = req.headers.origin || 'http://localhost:5000';
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie, X-CSRF-Token');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
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

app.listen(PORT, 'localhost', () => {
  console.log(`Backend API Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`MongoDB URI configured: ${process.env.MONGODB_URI ? 'Yes' : 'No'}`);
  console.log(`JWT Secret configured: ${process.env.JWT_SECRET ? 'Yes' : 'No'}`);
});