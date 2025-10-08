import sgMail from '@sendgrid/mail';

let connectionSettings: any;

interface SendGridCredentials {
  apiKey: string;
  email: string;
}

// Détection de l'environnement Render (utilise les variables d'environnement directement)
function isRenderEnvironment(): boolean {
  return !!(process.env.SENDGRID_API_KEY && process.env.SENDGRID_FROM_EMAIL);
}

async function getCredentials(): Promise<SendGridCredentials> {
  // Si on est sur Render, utiliser les variables d'environnement directement
  if (isRenderEnvironment()) {
    const apiKey = process.env.SENDGRID_API_KEY;
    const email = process.env.SENDGRID_FROM_EMAIL;
    
    if (!apiKey || !email) {
      throw new Error('SendGrid credentials not found in environment variables');
    }
    
    return { apiKey, email };
  }
  
  // Sinon, utiliser l'API Replit Connectors
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=sendgrid',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key || !connectionSettings.settings.from_email)) {
    throw new Error('SendGrid not connected');
  }
  return {
    apiKey: connectionSettings.settings.api_key, 
    email: connectionSettings.settings.from_email
  };
}

async function getUncachableSendGridClient() {
  const {apiKey, email} = await getCredentials();
  sgMail.setApiKey(apiKey);
  return {
    client: sgMail,
    fromEmail: email
  };
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
    const { client, fromEmail } = await getUncachableSendGridClient();
    
    const msg = {
      to: Array.isArray(options.to) ? options.to : [options.to],
      from: options.from || fromEmail,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    await client.send(msg);
    
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
