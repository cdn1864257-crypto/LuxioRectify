import { MongoClient } from 'mongodb';
import { validateCoupon } from '../../utils/coupon-generator';

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
    const { code, customerEmail } = req.body;

    if (!code || !customerEmail) {
      return res.status(400).json({
        error: 'Coupon code and customer email are required'
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

      const result = await validateCoupon(db, code, customerEmail);

      if (!result.valid) {
        return res.status(400).json({
          valid: false,
          error: result.error
        });
      }

      return res.status(200).json({
        valid: true,
        discountPercent: result.discountPercent,
        code: result.coupon?.code,
        expirationDate: result.coupon?.expirationDate
      });

    } finally {
      await client.close();
    }

  } catch (error) {
    console.error('Error validating coupon:', error);
    return res.status(500).json({
      error: 'Server error validating coupon',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
