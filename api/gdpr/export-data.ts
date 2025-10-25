import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../../server/db/mongodb';
import { verifyToken } from '../../server/auth/jwt';
import cookie from 'cookie';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'UNAUTHORIZED' });
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ error: 'INVALID_TOKEN' });
    }

    const { db } = await connectToDatabase();
    const { ObjectId } = require('mongodb');
    
    const userId = new ObjectId(decoded.userId);

    const user = await db.collection('users').findOne({ _id: userId });
    
    if (!user) {
      return res.status(404).json({ error: 'USER_NOT_FOUND' });
    }

    const orders = await db.collection('orders').find({ customerEmail: user.email }).toArray();
    const bankTransferOrders = await db.collection('bank_transfer_orders').find({ customerEmail: user.email }).toArray();
    const nowpaymentsOrders = await db.collection('nowpayments_orders').find({ customerEmail: user.email }).toArray();

    const sanitizedUser = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      country: user.country,
      city: user.city,
      address: user.address,
      phone: user.phone,
      language: user.language,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    const exportData = {
      user: sanitizedUser,
      orders: {
        standard: orders,
        bankTransfer: bankTransferOrders,
        crypto: nowpaymentsOrders
      },
      exportDate: new Date().toISOString(),
      exportedBy: user.email
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="luxio-data-export-${Date.now()}.json"`);
    
    return res.status(200).json(exportData);

  } catch (error) {
    console.error('Error exporting user data:', error);
    return res.status(500).json({ error: 'INTERNAL_SERVER_ERROR' });
  }
}
