import type { VercelRequest, VercelResponse } from '@vercel/node';
import { withMongoDb } from '../../../utils/mongodb-pool.js';
import { verifyAdminAuth } from '../../../utils/admin-auth.js';
import { liftSuspension } from '../../../utils/account-suspension.js';
import { queueEmail } from '../../../utils/email-queue.js';
import { emailTranslations, type EmailLanguage } from '../../../utils/email-translations.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const isAdmin = await verifyAdminAuth(req);
    if (!isAdmin) {
      return res.status(403).json({ error: 'Accès interdit - Admin uniquement' });
    }

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email requis' });
    }

    const result = await withMongoDb(async (db) => {
      const usersCollection = db.collection('users');
      
      const user = await usersCollection.findOne({ email: email.toLowerCase() });
      
      if (!user) {
        return { error: 'Utilisateur non trouvé', status: 404 };
      }

      if (user.status !== 'suspended') {
        return { error: 'Cet utilisateur n\'est pas suspendu', status: 400 };
      }

      await liftSuspension(usersCollection, email);

      const userLanguage = (user.language || 'fr') as EmailLanguage;
      const t = emailTranslations[userLanguage];

      const emailSubject = t.subject_account_reactivated;
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22c55e;">${t.account_reactivated_title}</h2>
          <p>${t.hello} ${user.firstName},</p>
          <p>${t.account_reactivated_message}</p>
          <div style="background-color: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>${t.account_reactivated_welcome}</strong></p>
          </div>
          <p>${t.footer_note}</p>
          <p style="color: #666; font-size: 0.9em;">${t.team_signature}</p>
        </div>
      `;

      try {
        await queueEmail({
          to: email,
          subject: emailSubject,
          html: emailHtml,
          from: process.env.SENDGRID_FROM_EMAIL || 'noreply@luxiomarket.shop',
          maxAttempts: 3
        });
      } catch (emailError) {
        console.error('Failed to send reactivation email:', emailError);
      }

      return {
        success: true,
        message: `Compte ${email} réactivé avec succès`
      };
    });

    if ('error' in result) {
      return res.status(result.status || 500).json({ error: result.error });
    }

    return res.status(200).json(result);

  } catch (error) {
    console.error('Error reactivating user:', error);
    return res.status(500).json({ 
      error: 'Erreur lors de la réactivation du compte' 
    });
  }
}
