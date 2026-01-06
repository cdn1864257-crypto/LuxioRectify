import nodemailer from 'nodemailer';

// Configuration Zoho SMTP (Production)
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const MAIL_FROM = process.env.MAIL_FROM || 'support@luxiomarket.shop';

if (!SMTP_USER || !SMTP_PASS) {
  console.warn('⚠️ SMTP_USER or SMTP_PASS environment variables are not set!');
}

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true, // Port 465 requires secure: true
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 20000,
  tls: {
    rejectUnauthorized: false
  }
});

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  fromName?: string;
}

/**
 * Envoie un email via Zoho SMTP
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // Vérification de la connexion SMTP avant l'envoi
    await transporter.verify();
    console.log("SMTP Zoho connection verified successfully");

    const info = await transporter.sendMail({
      from: `"Luxio Market" <${MAIL_FROM}>`,
      to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      subject: options.subject,
      text: options.text || '',
      html: options.html,
    });

    if (process.env.NODE_ENV === 'production') {
      console.log(`✅ Test email sent successfully to ${options.to}: ${info.messageId}`);
    }
    return true;
  } catch (error) {
    console.error(`❌ SMTP Zoho Error during sending to ${options.to}:`, error);
    // Interrompre l'envoi en cas d'échec de vérification ou d'envoi
    return false;
  }
}
