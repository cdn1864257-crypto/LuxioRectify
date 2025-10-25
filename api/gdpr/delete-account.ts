import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../../server/db/mongodb';
import { verifyToken } from '../../server/auth/jwt';
import cookie from 'cookie';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'DELETE') {
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

    const { password, confirmDeletion } = req.body;

    if (!password || confirmDeletion !== true) {
      return res.status(400).json({ error: 'PASSWORD_AND_CONFIRMATION_REQUIRED' });
    }

    const { db } = await connectToDatabase();
    const { ObjectId } = require('mongodb');
    const bcrypt = require('bcrypt');
    
    const userId = new ObjectId(decoded.userId);

    const user = await db.collection('users').findOne({ _id: userId });
    
    if (!user) {
      return res.status(404).json({ error: 'USER_NOT_FOUND' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'INVALID_PASSWORD' });
    }

    const activeOrders = await db.collection('orders').findOne({ 
      customerEmail: user.email, 
      status: { $in: ['pending', 'processing', 'paid'] }
    });
    
    if (activeOrders) {
      return res.status(400).json({ 
        error: 'ACTIVE_ORDERS_EXIST',
        message: 'Cannot delete account with active orders. Please wait for orders to be completed or cancelled.'
      });
    }

    await db.collection('users').deleteOne({ _id: userId });

    await db.collection('orders').updateMany(
      { customerEmail: user.email },
      { $set: { customerEmail: 'deleted-user@luxio.com', deletedAt: new Date() } }
    );

    await db.collection('bank_transfer_orders').updateMany(
      { customerEmail: user.email },
      { $set: { customerEmail: 'deleted-user@luxio.com', deletedAt: new Date() } }
    );

    await db.collection('nowpayments_orders').updateMany(
      { customerEmail: user.email },
      { $set: { customerEmail: 'deleted-user@luxio.com', deletedAt: new Date() } }
    );

    res.setHeader('Set-Cookie', cookie.serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    }));

    return res.status(200).json({ 
      message: 'ACCOUNT_DELETED_SUCCESSFULLY',
      deletedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error deleting user account:', error);
    return res.status(500).json({ error: 'INTERNAL_SERVER_ERROR' });
  }
}
