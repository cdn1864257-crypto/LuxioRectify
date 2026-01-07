import axios from 'axios';

const API_ID = process.env.SENDPULSE_API_ID;
const API_SECRET = process.env.SENDPULSE_API_SECRET;
const FROM_EMAIL = process.env.SENDPULSE_FROM_EMAIL || 'noreply@luxiomarket.shop';
const FROM_NAME = process.env.SENDPULSE_FROM_NAME || 'Luxio Market';

let accessToken: string | null = null;
let tokenExpiry: number = 0;

/**
 * Récupère un token d'accès OAuth2 pour SendPulse
 */
async function getAccessToken(): Promise<string> {
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  try {
    const response = await axios.post('https://api.sendpulse.com/oauth/access_token', {
      grant_type: 'client_credentials',
      client_id: API_ID,
      client_secret: API_SECRET,
    });

    accessToken = response.data.access_token;
    // Expire 1 minute avant pour plus de sécurité
    tokenExpiry = Date.now() + (response.data.expires_in - 60) * 1000;
    
    if (!accessToken) throw new Error('Failed to retrieve access token');
    return accessToken;
  } catch (error) {
    console.error('❌ SendPulse Auth Error:', error instanceof Error ? error.message : error);
    throw new Error('SendPulse authentication failed');
  }
}

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

/**
 * Envoie un email transactionnel via l'API SendPulse
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const token = await getAccessToken();
    
    const emailData = {
      email: {
        html: Buffer.from(options.html).toString('base64'),
        text: options.text ? Buffer.from(options.text).toString('base64') : Buffer.from(options.html.replace(/<[^>]*>?/gm, '')).toString('base64'),
        subject: options.subject,
        from: {
          name: FROM_NAME,
          email: FROM_EMAIL,
        },
        to: (Array.isArray(options.to) ? options.to : [options.to]).map(email => ({
          email: email.trim()
        })),
      },
    };

    const response = await axios.post('https://api.sendpulse.com/smtp/emails', emailData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.result) {
      if (process.env.NODE_ENV === 'production') {
        console.log(`✅ Email envoyé via SendPulse API à ${options.to}`);
      }
      return true;
    }
    
    throw new Error(JSON.stringify(response.data));
  } catch (error) {
    console.error(`❌ SendPulse API Error during sending to ${options.to}:`, error instanceof Error ? error.message : error);
    return false;
  }
}
