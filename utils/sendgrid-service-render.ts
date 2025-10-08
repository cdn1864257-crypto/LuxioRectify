import sgMail from '@sendgrid/mail';

// Version pour Render - utilise les variables d'environnement directement
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL;

if (!SENDGRID_API_KEY) {
  console.warn('⚠️  SENDGRID_API_KEY not configured');
}

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  from?: string;
}

export async function sendEmailWithSendGrid(options: EmailOptions): Promise<boolean> {
  try {
    if (!SENDGRID_API_KEY) {
      console.error('❌ SendGrid API key not configured');
      return false;
    }

    if (!SENDGRID_FROM_EMAIL && !options.from) {
      console.error('❌ SendGrid from email not configured');
      return false;
    }
    
    const msg = {
      to: Array.isArray(options.to) ? options.to : [options.to],
      from: options.from || SENDGRID_FROM_EMAIL || '',
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    await sgMail.send(msg);
    
    console.log('✅ Email sent successfully via SendGrid');
    console.log(`   To: ${Array.isArray(options.to) ? options.to.join(', ') : options.to}`);
    console.log(`   Subject: ${options.subject}`);
    
    return true;
  } catch (error) {
    console.error('❌ Error sending email via SendGrid:', error);
    console.error(`   To: ${Array.isArray(options.to) ? options.to.join(', ') : options.to}`);
    console.error(`   Subject: ${options.subject}`);
    
    if (error instanceof Error) {
      console.error(`   Error message: ${error.message}`);
    }
    
    return false;
  }
}
