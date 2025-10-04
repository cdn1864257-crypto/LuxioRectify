import { MongoClient } from 'mongodb';

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

interface NormalizedOrder {
  orderId: string;
  orderReference: string;
  paymentMethod: 'bank_transfer' | 'maxelpay' | 'pcs_transcash';
  status: string;
  totalAmount: number;
  createdAt: Date;
  items?: any[];
  itemCount?: number;
  productInfo?: string;
}

async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const userEmail = req.query.email as string;

    if (!userEmail) {
      return res.status(401).json({ error: 'Email utilisateur requis' });
    }

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      return res.status(500).json({ error: 'Configuration MongoDB manquante' });
    }

    const client = new MongoClient(mongoUri);

    try {
      await client.connect();
      const db = client.db('luxio');

      const normalizedEmail = userEmail.toLowerCase();

      const bankTransferOrders = await db
        .collection('bank_transfer_orders')
        .find({ customerEmail: normalizedEmail })
        .sort({ createdAt: -1 })
        .toArray();

      const maxelpayOrders = await db
        .collection('maxelpay_orders')
        .find({ customerEmail: normalizedEmail })
        .sort({ createdAt: -1 })
        .toArray();

      const ticketOrders = await db
        .collection('orders')
        .find({ customerEmail: normalizedEmail })
        .sort({ createdAt: -1 })
        .toArray();

      const normalizedOrders: NormalizedOrder[] = [];

      bankTransferOrders.forEach((order: any) => {
        normalizedOrders.push({
          orderId: order._id.toString(),
          orderReference: order.orderReference || order._id.toString(),
          paymentMethod: 'bank_transfer',
          status: order.status || 'pending',
          totalAmount: order.totalAmount || 0,
          createdAt: order.createdAt || new Date(),
          items: order.cartItems || [],
          itemCount: order.cartItems?.length || 0,
        });
      });

      maxelpayOrders.forEach((order: any) => {
        normalizedOrders.push({
          orderId: order._id.toString(),
          orderReference: order.orderReference || order._id.toString(),
          paymentMethod: 'maxelpay',
          status: order.status || 'pending',
          totalAmount: order.totalAmount || 0,
          createdAt: order.createdAt || new Date(),
          items: order.cartItems || [],
          itemCount: order.cartItems?.length || 0,
        });
      });

      ticketOrders.forEach((order: any) => {
        normalizedOrders.push({
          orderId: order._id.toString(),
          orderReference: order._id.toString(),
          paymentMethod: 'pcs_transcash',
          status: order.status || 'pending',
          totalAmount: order.totalAmount || 0,
          createdAt: order.createdAt || new Date(),
          productInfo: `${order.productName} - ${order.productModel}`,
          itemCount: 1,
        });
      });

      normalizedOrders.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      const totalOrders = normalizedOrders.length;
      const pendingOrders = normalizedOrders.filter(o => 
        o.status === 'pending' || o.status === 'awaiting_payment'
      ).length;
      const deliveredOrders = normalizedOrders.filter(o => 
        o.status === 'delivered' || o.status === 'completed'
      ).length;
      const totalSpent = normalizedOrders.reduce((sum, o) => sum + o.totalAmount, 0);

      return res.status(200).json({
        success: true,
        stats: {
          totalOrders,
          pendingOrders,
          deliveredOrders,
          totalSpent: parseFloat(totalSpent.toFixed(2)),
        },
        orders: normalizedOrders,
        pagination: {
          total: totalOrders,
          page: 1,
          pageSize: normalizedOrders.length,
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
