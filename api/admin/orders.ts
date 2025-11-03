import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

interface VercelRequest {
  query: { [key: string]: string | string[] | undefined };
  body: any;
  cookies: { [key: string]: string };
  method: string;
  url: string;
  headers: { [key: string]: string };
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (object: any) => VercelResponse;
  setHeader: (name: string, value: string | string[]) => VercelResponse;
  end: (chunk?: any) => void;
}

interface JWTPayload {
  userId: string;
  email: string;
}

// Load admin emails from environment variable (semicolon-separated for security)
const getAdminEmails = (): string[] => {
  const adminEmailsEnv = process.env.ADMIN_EMAILS;
  if (!adminEmailsEnv) {
    console.error('⚠️  CRITICAL: ADMIN_EMAILS environment variable is not set!');
    return [];
  }
  return adminEmailsEnv.split(';').map(email => email.trim().toLowerCase()).filter(email => email.length > 0);
};

const ADMIN_EMAILS = getAdminEmails();

async function isAdmin(req: VercelRequest): Promise<{ isAdmin: boolean; error?: string }> {
  try {
    let token: string | undefined;
    
    const cookieHeader = req.headers.cookie;
    if (cookieHeader) {
      const cookies = parse(cookieHeader);
      token = cookies.auth_token;
    }
    
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return { isAdmin: false, error: 'No authentication token' };
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return { isAdmin: false, error: 'JWT configuration error' };
    }

    let decoded: JWTPayload;
    try {
      decoded = jwt.verify(token, jwtSecret) as JWTPayload;
    } catch (error) {
      return { isAdmin: false, error: 'Invalid token' };
    }

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      return { isAdmin: false, error: 'Database error' };
    }

    const client = new MongoClient(mongoUri);
    
    try {
      await client.connect();
      const db = client.db('luxio');
      const usersCollection = db.collection('users');
      const user = await usersCollection.findOne({ email: decoded.email.toLowerCase() });

      if (!user) {
        return { isAdmin: false, error: 'User not found' };
      }

      const isUserAdmin = ADMIN_EMAILS.includes(user.email.toLowerCase());
      return { isAdmin: isUserAdmin, error: isUserAdmin ? undefined : 'Not authorized' };
    } finally {
      await client.close();
    }
  } catch (error) {
    return { isAdmin: false, error: 'Authentication error' };
  }
}

function checkOrderTimeout(order: any, paymentMethod: string): string {
  const now = new Date();
  const createdAt = new Date(order.createdAt);
  const minutesElapsed = (now.getTime() - createdAt.getTime()) / (1000 * 60);

  if (paymentMethod === 'oxapay') {
    if (minutesElapsed > 30 && order.status === 'pending') {
      return 'expired';
    }
  } else if (paymentMethod === 'bank_transfer') {
    if (minutesElapsed > 1440 && order.status === 'pending') {
      return 'expired';
    }
  }
  
  return order.status;
}

async function handler(req: VercelRequest, res: VercelResponse) {
  const adminCheck = await isAdmin(req);
  
  if (!adminCheck.isAdmin) {
    return res.status(403).json({
      success: false,
      error: adminCheck.error || 'Accès non autorisé'
    });
  }

  if (req.method === 'GET') {
    try {
      const mongoUri = process.env.MONGODB_URI;
      if (!mongoUri) {
        return res.status(500).json({
          success: false,
          error: 'Configuration MongoDB manquante'
        });
      }

      const client = new MongoClient(mongoUri);

      try {
        await client.connect();
        const db = client.db('luxio');
        
        const { status, paymentMethod, limit = '50', skip = '0' } = req.query;
        
        const aggregationPipeline: any[] = [
          {
            $unionWith: {
              coll: 'oxapay_orders',
              pipeline: [
                {
                  $addFields: {
                    paymentMethod: 'oxapay',
                    orderId: { $toString: '$_id' }
                  }
                }
              ]
            }
          }
        ];

        let matchStage: any = {};
        if (status) {
          matchStage.status = status;
        }
        if (paymentMethod) {
          matchStage.paymentMethod = paymentMethod;
        }

        if (Object.keys(matchStage).length > 0) {
          aggregationPipeline.push({ $match: matchStage });
        }

        aggregationPipeline.push(
          { $sort: { createdAt: -1 } },
          { $skip: parseInt(skip as string) },
          { $limit: parseInt(limit as string) }
        );

        const bankTransferOrders = db.collection('bank_transfer_orders');
        const orders = await bankTransferOrders.aggregate(aggregationPipeline).toArray();

        const processedOrders = orders.map(order => {
          const actualStatus = checkOrderTimeout(order, order.paymentMethod);
          const createdAt = new Date(order.createdAt);
          const now = new Date();
          const minutesElapsed = (now.getTime() - createdAt.getTime()) / (1000 * 60);
          
          let timeRemaining: number | null = null;
          if (order.paymentMethod === 'oxapay' && order.status === 'pending') {
            timeRemaining = Math.max(0, 30 - minutesElapsed);
          } else if (order.paymentMethod === 'bank_transfer' && order.status === 'pending') {
            timeRemaining = Math.max(0, 1440 - minutesElapsed);
          }

          return {
            orderId: order.orderId,
            orderReference: order.orderReference,
            customerEmail: order.customerEmail,
            customerName: order.customerName,
            totalAmount: order.totalAmount,
            paymentMethod: order.paymentMethod,
            status: actualStatus,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            cartItems: order.cartItems || [],
            timeRemaining: timeRemaining !== null ? Math.round(timeRemaining) : null,
            paidAt: order.paidAt || null
          };
        });

        const totalCount = await bankTransferOrders.countDocuments();

        return res.status(200).json({
          success: true,
          orders: processedOrders,
          total: totalCount,
          page: Math.floor(parseInt(skip as string) / parseInt(limit as string)) + 1,
          totalPages: Math.ceil(totalCount / parseInt(limit as string))
        });
      } finally {
        await client.close();
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      return res.status(500).json({
        success: false,
        error: 'Erreur lors de la récupération des commandes',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  res.setHeader('Allow', ['GET']);
  return res.status(405).json({
    success: false,
    error: `Method ${req.method} Not Allowed`
  });
}

export default handler;
