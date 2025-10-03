import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  from?: string;
}

function isSmtpConfigured(): boolean {
  const hasHost = !!process.env.SMTP_HOST;
  const hasPort = !!process.env.SMTP_PORT;
  const hasUser = !!process.env.SMTP_USER;
  const hasPass = !!process.env.SMTP_PASS;

  return hasHost && hasPort && hasUser && hasPass;
}

export function createMailer(): Transporter | null {
  if (!isSmtpConfigured()) {
    console.warn('⚠️  KingSMTP not configured. Email sending will be skipped.');
    console.warn('   Please set the following environment variables:');
    console.warn('   - SMTP_HOST=smtp.kingsmtp.com');
    console.warn('   - SMTP_PORT=587');
    console.warn('   - SMTP_USER (from KingSMTP dashboard)');
    console.warn('   - SMTP_PASS (from KingSMTP dashboard)');
    return null;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.kingsmtp.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  if (!isSmtpConfigured()) {
    console.warn(`⚠️  Email skipped for: ${Array.isArray(options.to) ? options.to.join(', ') : options.to}`);
    console.warn(`   Subject: ${options.subject}`);
    return false;
  }

  const transporter = createMailer();
  if (!transporter) {
    return false;
  }

  const fromEmail = options.from || process.env.EMAIL_FROM || 'noreply@luxio-shop.com';

  const mailOptions = {
    from: fromEmail,
    to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully via KingSMTP:', info.messageId);
    console.log(`   To: ${mailOptions.to}`);
    console.log(`   Subject: ${options.subject}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending email via KingSMTP:', error);
    console.error(`   To: ${mailOptions.to}`);
    console.error(`   Subject: ${options.subject}`);
    if (error instanceof Error) {
      console.error(`   Error message: ${error.message}`);
    }
    return false;
  }
}
