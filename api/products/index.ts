import { MongoClient, ObjectId } from 'mongodb';

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
  // Only allow GET requests (public access)
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ 
      success: false,
      error: `Method ${req.method} Not Allowed` 
    });
  }

  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      return res.status(500).json({ 
        success: false,
        error: 'Configuration MongoDB manquante' 
      });
    }

    const client = new MongoClient(mongoUri);

    try {
      await client.connect();
      const db = client.db('luxio');
      const productsCollection = db.collection('products');

      // Get all products, sorted by position (if available), then by creation date
      const products = await productsCollection
        .find({ available: { $ne: false } }) // Only show available products
        .sort({ position: 1, createdAt: -1 })
        .toArray();

      return res.status(200).json({
        success: true,
        products: products.map(p => ({
          id: p._id.toString(),
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          discount: p.discount,
          image: p.image,
          category: p.category,
          description: p.description,
          features: p.features || [],
          variants: p.variants || [],
          hasVariants: p.hasVariants || false,
          available: p.available !== false,
          createdAt: p.createdAt
        }))
      });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({
      success: false,
      error: 'Erreur serveur lors de la récupération des produits',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
