import { serialize, parse } from 'cookie';
import { deleteSession } from '../../server/session-service.js';

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
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieDomain = isProduction ? (process.env.COOKIE_DOMAIN || '.luxiomarket.shop') : undefined;
    
    const cookieHeader = req.headers.cookie;
    if (cookieHeader) {
      const cookies = parse(cookieHeader);
      const sessionToken = cookies.session_token;
      
      if (sessionToken) {
        await deleteSession(sessionToken);
      }
    }

    const sessionCookieClear = serialize('session_token', '', {
      domain: cookieDomain,
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    });

    const authCookieClear = serialize('auth_token', '', {
      domain: cookieDomain,
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    });

    const connectSidClear = serialize('connect.sid', '', {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    });

    res.setHeader('Set-Cookie', [sessionCookieClear, authCookieClear, connectSidClear]);

    return res.status(200).json({
      ok: true,
      message: 'Déconnexion réussie'
    });

  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    return res.status(500).json({
      error: 'Erreur serveur lors de la déconnexion'
    });
  }
}

export default handler;
