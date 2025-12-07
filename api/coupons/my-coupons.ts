import { MongoClient } from 'mongodb';
import { getUserCoupons } from '../../utils/coupon-generator';

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
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const customerEmail = req.method === 'GET' 
      ? req.query.email as string 
      : req.body.customerEmail;

    if (!customerEmail) {
      return res.status(400).json({
        error: 'Customer email is required'
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

      const coupons = await getUserCoupons(db, customerEmail);

      const now = new Date();
      const formattedCoupons = coupons.map(coupon => ({
        code: coupon.code,
        discount: coupon.discount,
        expirationDate: coupon.expirationDate,
        used: coupon.used,
        isExpired: new Date(coupon.expirationDate) < now,
        isValid: !coupon.used && new Date(coupon.expirationDate) >= now,
        createdAt: coupon.createdAt
      }));

      return res.status(200).json({
        success: true,
        coupons: formattedCoupons
      });

    } finally {
      await client.close();
    }

  } catch (error) {
    console.error('Error fetching user coupons:', error);
    return res.status(500).json({
      error: 'Server error fetching coupons',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
