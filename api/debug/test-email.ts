import { sendEmail } from '../../utils/email.service.js';

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
  console.log('Test email endpoint called');
  
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const testEmailTo = process.env.TEST_EMAIL_TO;
  
  if (!testEmailTo) {
    return res.status(500).json({ 
      error: 'TEST_EMAIL_TO environment variable is not set' 
    });
  }

  try {
    const success = await sendEmail({
      to: testEmailTo,
      subject: "Test Zoho SMTP – Luxio",
      html: `
        <h2>Zoho SMTP fonctionne</h2>
        <p>Email envoyé depuis l’API Render.</p>
        <p>Destinataire : ${testEmailTo}</p>
        <p>Date : ${new Date().toISOString()}</p>
      `,
      text: `Zoho SMTP fonctionne. Email envoyé depuis l’API Render. Destinataire : ${testEmailTo}`
    });

    if (success) {
      console.log('Test email sent successfully');
      return res.status(200).json({
        success: true,
        message: "Email envoyé avec succès via Zoho SMTP"
      });
    } else {
      throw new Error('sendEmail returned false');
    }
  } catch (error) {
    console.error('Error in debug email endpoint:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error during email test'
    });
  }
}

export default handler;
