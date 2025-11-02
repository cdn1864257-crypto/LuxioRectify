import { useState, useEffect } from 'react';
import { Product } from '@/lib/products';
import { logger } from '@/lib/logger';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    // Always use static products (API endpoint doesn't exist yet)
    // TODO: When API is ready, uncomment the API fetch code below
    logger.log('📦 Loading static products...');
    try {
      const { products: staticProducts } = await import('@/lib/products');
      if (staticProducts && staticProducts.length > 0) {
        setProducts(staticProducts);
        logger.log(`✅ Loaded ${staticProducts.length} static products`);
      } else {
        setError('No products available');
      }
    } catch (importErr) {
      logger.error('Failed to load static products:', importErr);
      setError('Unable to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts
  };
}

export function getProductsByCategory(products: Product[], category: string): Product[] {
  return products.filter(product => product.category === category);
}

export function getProductById(products: Product[], id: string): Product | undefined {
  return products.find(product => product.id === id);
}
