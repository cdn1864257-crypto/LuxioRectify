import { MongoClient } from 'mongodb';
import crypto from 'crypto';
import { sendEmail } from '../../utils/email.js';
import { getTranslation } from '../../utils/email-translations.js';

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
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'REQUIRED_FIELDS' });
    }

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      return res.status(500).json({ error: 'Configuration MongoDB manquante' });
    }

    const client = new MongoClient(mongoUri);

    try {
      await client.connect();
      const db = client.db('luxio');
      const usersCollection = db.collection('users');

      const user = await usersCollection.findOne({ email: email.toLowerCase() });

      // Pour la sécurité, on retourne toujours success même si l'email n'existe pas
      if (!user) {
        return res.status(200).json({ success: true });
      }

      // Générer un token de réinitialisation
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 heure

      // Sauvegarder le token
      await usersCollection.updateOne(
        { email: email.toLowerCase() },
        {
          $set: {
            resetToken,
            resetTokenExpiry,
            updatedAt: new Date()
          }
        }
      );

      // Construire l'URL de réinitialisation
      const replitDomain = process.env.REPLIT_DOMAINS ? `https://${process.env.REPLIT_DOMAINS}` : '';
      const baseUrl = req.headers.origin || replitDomain || 'https://luxios.vercel.app';
      const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

      const language = user.language || 'fr';
      const t = getTranslation(language);

      // Envoyer l'email
      const emailHtml = `
<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f9fafb;
    }
    .email-container {
      max-width: 560px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
      padding: 32px 24px;
      text-align: center;
    }
    .logo {
      color: #ffffff;
      font-size: 28px;
      font-weight: 600;
      letter-spacing: 0.5px;
      margin: 0;
    }
    .content {
      padding: 32px 24px;
      color: #374151;
      line-height: 1.6;
    }
    .content h2 {
      color: #111827;
      font-size: 20px;
      font-weight: 600;
      margin: 0 0 16px 0;
    }
    .content p {
      margin: 0 0 16px 0;
      color: #6b7280;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
      color: #ffffff;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 8px;
      font-weight: 600;
      margin: 24px 0;
    }
    .footer {
      background-color: #f9fafb;
      padding: 24px;
      text-align: center;
      color: #9ca3af;
      font-size: 14px;
    }
    .warning {
      background-color: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 12px 16px;
      margin: 16px 0;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1 class="logo">Luxio</h1>
    </div>
    <div class="content">
      <h2>${language === 'fr' ? 'Réinitialisation de mot de passe' : language === 'es' ? 'Restablecimiento de contraseña' : 'Password Reset'}</h2>
      <p>${language === 'fr' ? `Bonjour ${user.firstName},` : language === 'es' ? `Hola ${user.firstName},` : `Hello ${user.firstName},`}</p>
      <p>${language === 'fr' ? 'Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte Luxio.' : language === 'es' ? 'Hemos recibido una solicitud de restablecimiento de contraseña para tu cuenta Luxio.' : 'We received a request to reset your Luxio account password.'}</p>
      <p>${language === 'fr' ? 'Cliquez sur le bouton ci-dessous pour réinitialiser votre mot de passe :' : language === 'es' ? 'Haz clic en el botón de abajo para restablecer tu contraseña:' : 'Click the button below to reset your password:'}</p>
      <center>
        <a href="${resetUrl}" class="button">${language === 'fr' ? 'Réinitialiser le mot de passe' : language === 'es' ? 'Restablecer contraseña' : 'Reset Password'}</a>
      </center>
      <div class="warning">
        <strong>${language === 'fr' ? '⚠️ Important :' : language === 'es' ? '⚠️ Importante:' : '⚠️ Important:'}</strong>
        <p>${language === 'fr' ? 'Ce lien expirera dans 1 heure pour des raisons de sécurité.' : language === 'es' ? 'Este enlace caducará en 1 hora por razones de seguridad.' : 'This link will expire in 1 hour for security reasons.'}</p>
      </div>
      <p>${language === 'fr' ? "Si vous n'avez pas demandé de réinitialisation de mot de passe, ignorez cet email." : language === 'es' ? 'Si no solicitaste este restablecimiento de contraseña, ignora este correo.' : 'If you did not request a password reset, please ignore this email.'}</p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} Luxio. ${language === 'fr' ? 'Tous droits réservés.' : language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}</p>
    </div>
  </div>
</body>
</html>`;

      const emailText = `${language === 'fr' ? 'Réinitialisation de mot de passe' : language === 'es' ? 'Restablecimiento de contraseña' : 'Password Reset'}\n\n${language === 'fr' ? `Bonjour ${user.firstName},` : language === 'es' ? `Hola ${user.firstName},` : `Hello ${user.firstName},`}\n\n${language === 'fr' ? 'Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte Luxio.' : language === 'es' ? 'Hemos recibido una solicitud de restablecimiento de contraseña para tu cuenta Luxio.' : 'We received a request to reset your Luxio account password.'}\n\n${language === 'fr' ? 'Cliquez sur ce lien pour réinitialiser votre mot de passe :' : language === 'es' ? 'Haz clic en este enlace para restablecer tu contraseña:' : 'Click this link to reset your password:'}\n${resetUrl}\n\n${language === 'fr' ? 'Ce lien expirera dans 1 heure pour des raisons de sécurité.' : language === 'es' ? 'Este enlace caducará en 1 hora por razones de seguridad.' : 'This link will expire in 1 hour for security reasons.'}\n\n${language === 'fr' ? "Si vous n'avez pas demandé de réinitialisation de mot de passe, ignorez cet email." : language === 'es' ? 'Si no solicitaste este restablecimiento de contraseña, ignora este correo.' : 'If you did not request a password reset, please ignore this email.'}`;

      const emailSent = await sendEmail({
        to: user.email,
        subject: language === 'fr' ? 'Réinitialisation de votre mot de passe Luxio' : language === 'es' ? 'Restablecimiento de contraseña Luxio' : 'Reset Your Luxio Password',
        html: emailHtml,
        text: emailText
      });

      if (!emailSent) {
        console.error('[Forgot Password] Failed to send reset email to:', user.email);
        return res.status(500).json({ 
          error: 'Error sending email',
          details: 'Failed to send password reset email. Please check SendGrid configuration.'
        });
      }

      console.log('[Forgot Password] Reset email sent successfully to:', user.email);
      return res.status(200).json({ success: true });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('Erreur lors de la demande de réinitialisation:', error);
    return res.status(500).json({
      error: 'Erreur serveur',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
