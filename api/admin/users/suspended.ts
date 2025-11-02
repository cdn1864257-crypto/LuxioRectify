import type { VercelRequest, VercelResponse } from '@vercel/node';
import { withMongoDb } from '../../../utils/mongodb-pool.js';
import { verifyAdminAuth } from '../../../utils/admin-auth.js';
import { formatSuspensionEndDate, countRecentUnpaidOrders } from '../../../utils/account-suspension.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const isAdmin = await verifyAdminAuth(req);
    if (!isAdmin) {
      return res.status(403).json({ error: 'Accès interdit - Admin uniquement' });
    }

    const result = await withMongoDb(async (db) => {
      const usersCollection = db.collection('users');
      
      const suspendedUsers = await usersCollection.find({
        status: 'suspended'
      }).toArray();

      const usersWithDetails = suspendedUsers.map(user => {
        const unpaidHistory = user.unpaidHistory || [];
        const recentUnpaidCount = countRecentUnpaidOrders(unpaidHistory);
        const language = user.language || 'fr';
        
        return {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          unpaidOrdersCount: recentUnpaidCount,
          suspendedUntil: user.suspendedUntil,
          suspendedUntilFormatted: user.suspendedUntil 
            ? formatSuspensionEndDate(new Date(user.suspendedUntil), language)
            : null,
          language,
          recentUnpaidOrders: unpaidHistory.slice(-5).reverse()
        };
      });

      return {
        count: usersWithDetails.length,
        users: usersWithDetails
      };
    });

    return res.status(200).json(result);

  } catch (error) {
    console.error('Error fetching suspended users:', error);
    return res.status(500).json({ 
      error: 'Erreur lors de la récupération des utilisateurs suspendus' 
    });
  }
}
