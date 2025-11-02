import { v2 as cloudinary } from 'cloudinary';
import formidable, { File } from 'formidable';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

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

interface JWTPayload {
  userId: string;
  email: string;
}

// Load admin emails from environment variable (semicolon-separated for security)
const getAdminEmails = (): string[] => {
  const adminEmailsEnv = process.env.ADMIN_EMAILS;
  if (!adminEmailsEnv) {
    console.error('⚠️  CRITICAL: ADMIN_EMAILS environment variable is not set!');
    return [];
  }
  return adminEmailsEnv.split(';').map(email => email.trim().toLowerCase()).filter(email => email.length > 0);
};

const ADMIN_EMAILS = getAdminEmails();

// SECURITY: File upload validation constants
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGE_DIMENSION = 4000; // 4000x4000 pixels max

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function isAdmin(req: VercelRequest): Promise<{ isAdmin: boolean; error?: string }> {
  try {
    let token: string | undefined;
    
    const cookieHeader = req.headers.cookie;
    if (cookieHeader) {
      const cookies = parse(cookieHeader);
      token = cookies.auth_token;
    }
    
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return { isAdmin: false, error: 'No authentication token' };
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return { isAdmin: false, error: 'JWT configuration error' };
    }

    let decoded: JWTPayload;
    try {
      decoded = jwt.verify(token, jwtSecret) as JWTPayload;
    } catch (error) {
      return { isAdmin: false, error: 'Invalid or expired token' };
    }

    const isUserAdmin = ADMIN_EMAILS.includes(decoded.email.toLowerCase());
    return { 
      isAdmin: isUserAdmin, 
      error: isUserAdmin ? undefined : 'Admin access required'
    };
  } catch (error) {
    console.error('Admin check error:', error);
    return { isAdmin: false, error: 'Authentication error' };
  }
}

const parseForm = (req: any): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: false });
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} Not Allowed`
    });
  }

  try {
    const adminCheck = await isAdmin(req);
    if (!adminCheck.isAdmin) {
      return res.status(403).json({
        success: false,
        error: adminCheck.error || 'Accès non autorisé'
      });
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return res.status(500).json({
        success: false,
        error: 'Configuration Cloudinary manquante. Veuillez configurer les variables d\'environnement CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY et CLOUDINARY_API_SECRET.'
      });
    }

    const { files } = await parseForm(req);
    
    const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
    
    if (!imageFile) {
      return res.status(400).json({
        success: false,
        error: 'Aucune image fournie'
      });
    }

    const file = imageFile as File;
    
    // SECURITY: Validate MIME type
    const mimeType = file.mimetype || '';
    if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
      return res.status(400).json({
        success: false,
        error: `Type de fichier non autorisé. Formats acceptés: ${ALLOWED_MIME_TYPES.join(', ')}`
      });
    }
    
    // SECURITY: Validate file extension
    const fileName = file.originalFilename || file.newFilename || '';
    const fileExtension = fileName.split('.').pop()?.toLowerCase() || '';
    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
      return res.status(400).json({
        success: false,
        error: `Extension de fichier non autorisée. Extensions acceptées: ${ALLOWED_EXTENSIONS.join(', ')}`
      });
    }
    
    // SECURITY: Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return res.status(400).json({
        success: false,
        error: `Fichier trop volumineux. Taille maximale: ${MAX_FILE_SIZE / 1024 / 1024}MB (taille actuelle: ${(file.size / 1024 / 1024).toFixed(2)}MB)`
      });
    }

    const filePath = file.filepath;
    
    // SECURITY: Upload with strict validation and transformation limits
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'luxio-products',
      resource_type: 'image',
      allowed_formats: ALLOWED_EXTENSIONS,
      transformation: [
        { 
          width: MAX_IMAGE_DIMENSION, 
          height: MAX_IMAGE_DIMENSION, 
          crop: 'limit' // Prevent oversized images
        }
      ]
    });

    fs.unlinkSync(filePath);

    return res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id
    });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'upload de l\'image',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
