import { MongoClient } from 'mongodb';
import { applyCoupon } from '../../utils/coupon-generator';

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

async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { code, customerEmail, orderId } = req.body;

    if (!code || !customerEmail || !orderId) {
      return res.status(400).json({
        error: 'Coupon code, customer email, and order ID are required'
      });
    }

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      return res.status(500).json({ error: 'Database configuration missing' });
    }

    const client = new MongoClient(mongoUri);

    try {
      await client.connect();
      const db = client.db('luxio');

      const result = await applyCoupon(db, code, customerEmail, orderId);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          error: result.error
        });
      }

      return res.status(200).json({
        success: true,
        discountPercent: result.discountPercent,
        message: 'Coupon applied successfully'
      });

    } finally {
      await client.close();
    }

  } catch (error) {
    console.error('Error applying coupon:', error);
    return res.status(500).json({
      error: 'Server error applying coupon',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
