import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import { getErrorMessage, getLanguageFromRequest } from '../server/utils/multilingual-messages.js';

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

interface NormalizedOrder {
  orderId: string;
  orderReference: string;
  paymentMethod: 'bank_transfer' | 'oxapay' | 'pcs_transcash' | 'stripe';
  status: string;
  totalAmount: number;
  createdAt: Date;
  items?: any[];
  itemCount?: number;
  productInfo?: string;
  payLink?: string;
}

async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

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
      const lang = getLanguageFromRequest(req);
      return res.status(401).json({ 
        success: false,
        error: 'TOKEN_MISSING',
        message: getErrorMessage('TOKEN_MISSING', lang)
      });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      const lang = getLanguageFromRequest(req);
      return res.status(500).json({ 
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: getErrorMessage('INTERNAL_SERVER_ERROR', lang)
      });
    }

    let decoded: JWTPayload;
    try {
      decoded = jwt.verify(token, jwtSecret) as JWTPayload;
    } catch (error) {
      const lang = getLanguageFromRequest(req);
      return res.status(401).json({ 
        success: false,
        error: 'TOKEN_INVALID',
        message: getErrorMessage('TOKEN_INVALID', lang)
      });
    }

    const userEmail = decoded.email;

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      const lang = getLanguageFromRequest(req);
      return res.status(500).json({ 
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: getErrorMessage('INTERNAL_SERVER_ERROR', lang)
      });
    }

    const client = new MongoClient(mongoUri);

    try {
      await client.connect();
      const db = client.db('luxio');

      const normalizedEmail = userEmail.toLowerCase();

      const aggregationPipeline = [
        {
          $match: { customerEmail: normalizedEmail }
        },
        {
          $addFields: {
            orderId: { $toString: '$_id' },
            orderReference: {
              $ifNull: ['$orderReference', { $toString: '$_id' }]
            },
            paymentMethod: 'bank_transfer',
            status: { $ifNull: ['$status', 'pending'] },
            totalAmount: { $ifNull: ['$totalAmount', 0] },
            createdAt: { $ifNull: ['$createdAt', '$$NOW'] },
            items: { $ifNull: ['$cartItems', []] },
            itemCount: {
              $cond: {
                if: { $isArray: '$cartItems' },
                then: { $size: '$cartItems' },
                else: 0
              }
            },
            productInfo: null
          }
        },
        {
          $unionWith: {
            coll: 'oxapay_orders',
            pipeline: [
              {
                $match: { customerEmail: normalizedEmail }
              },
              {
                $addFields: {
                  orderId: { $toString: '$_id' },
                  orderReference: {
                    $ifNull: ['$orderReference', { $toString: '$_id' }]
                  },
                  paymentMethod: 'oxapay',
                  status: { $ifNull: ['$status', 'pending'] },
                  totalAmount: { $ifNull: ['$totalAmount', 0] },
                  createdAt: { $ifNull: ['$createdAt', '$$NOW'] },
                  items: { $ifNull: ['$cartItems', []] },
                  itemCount: {
                    $cond: {
                      if: { $isArray: '$cartItems' },
                      then: { $size: '$cartItems' },
                      else: 0
                    }
                  },
                  productInfo: null,
                  payLink: { $ifNull: ['$payLink', null] }
                }
              }
            ]
          }
        },
        {
          $unionWith: {
            coll: 'orders',
            pipeline: [
              {
                $match: { customerEmail: normalizedEmail }
              },
              {
                $addFields: {
                  orderId: { $toString: '$_id' },
                  orderReference: { $toString: '$_id' },
                  paymentMethod: 'pcs_transcash',
                  status: { $ifNull: ['$status', 'pending'] },
                  totalAmount: { $ifNull: ['$totalAmount', 0] },
                  createdAt: { $ifNull: ['$createdAt', '$$NOW'] },
                  items: [],
                  itemCount: 1,
                  productInfo: {
                    $trim: {
                      input: {
                        $concat: [
                          { $ifNull: ['$productName', ''] },
                          ' - ',
                          { $ifNull: ['$productModel', ''] }
                        ]
                      }
                    }
                  }
                }
              }
            ]
          }
        },
        {
          $sort: { createdAt: -1 }
        },
        {
          $facet: {
            orders: [
              {
                $project: {
                  orderId: 1,
                  orderReference: 1,
                  paymentMethod: 1,
                  status: 1,
                  totalAmount: 1,
                  createdAt: 1,
                  items: 1,
                  itemCount: 1,
                  productInfo: 1,
                  payLink: 1
                }
              }
            ],
            stats: [
              {
                $group: {
                  _id: null,
                  totalOrders: { $sum: 1 },
                  pendingOrders: {
                    $sum: {
                      $cond: [
                        {
                          $and: [
                            { $ne: ['$status', 'delivered'] },
                            { $ne: ['$status', 'completed'] }
                          ]
                        },
                        1,
                        0
                      ]
                    }
                  },
                  deliveredOrders: {
                    $sum: {
                      $cond: [
                        {
                          $or: [
                            { $eq: ['$status', 'delivered'] },
                            { $eq: ['$status', 'completed'] }
                          ]
                        },
                        1,
                        0
                      ]
                    }
                  },
                  totalSpent: { $sum: '$totalAmount' }
                }
              },
              {
                $project: {
                  _id: 0,
                  totalOrders: 1,
                  pendingOrders: 1,
                  deliveredOrders: 1,
                  totalSpent: 1
                }
              }
            ]
          }
        }
      ];

      const result = await db
        .collection('bank_transfer_orders')
        .aggregate(aggregationPipeline)
        .toArray();

      const facetResult = result[0] || { orders: [], stats: [] };
      const orders = facetResult.orders || [];
      const stats = facetResult.stats?.[0] || {
        totalOrders: 0,
        pendingOrders: 0,
        deliveredOrders: 0,
        totalSpent: 0
      };

      return res.status(200).json({
        success: true,
        stats: {
          totalOrders: stats.totalOrders,
          pendingOrders: stats.pendingOrders,
          deliveredOrders: stats.deliveredOrders,
          totalSpent: parseFloat(stats.totalSpent.toFixed(2)),
        },
        orders: orders,
        pagination: {
          total: stats.totalOrders,
          page: 1,
          pageSize: orders.length,
        },
      });

    } finally {
      await client.close();
    }

  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    return res.status(500).json({
      error: 'Erreur serveur lors de la récupération des commandes',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

export default handler;
