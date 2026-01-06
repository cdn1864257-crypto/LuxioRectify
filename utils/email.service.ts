import nodemailer from 'nodemailer';

// Configuration Zoho SMTP
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const MAIL_FROM = process.env.MAIL_FROM || 'support@luxiomarket.shop';

if (!SMTP_USER || !SMTP_PASS) {
  console.warn('⚠️ SMTP_USER or SMTP_PASS environment variables are not set!');
}

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

console.log('Email service initialized using Zoho SMTP');

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
    const info = await transporter.sendMail({
      from: options.from || MAIL_FROM,
      to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      subject: options.subject,
      text: options.text || '',
      html: options.html,
    });

    if (process.env.NODE_ENV === 'production') {
      console.log(`✅ Email envoyé avec succès à ${options.to}: ${info.messageId}`);
    }
    return true;
  } catch (error) {
    console.error(`❌ Erreur d'envoi d'email à ${options.to}:`, error);
    throw new Error(`Email sending failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}
