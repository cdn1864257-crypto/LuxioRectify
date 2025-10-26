import { useState, useEffect } from 'react';
import { getApiUrl } from '@/lib/config';
import { Product } from '@/lib/products';

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

    try {
      const response = await fetch(getApiUrl('/api/products'), {
        credentials: 'include'
      });

      if (!response.ok) {
        console.warn('API products unavailable, using static products');
        throw new Error('Failed to fetch products from API');
      }

      const data = await response.json();

      if (data.success && data.products && data.products.length > 0) {
        setProducts(data.products);
        console.log(`✅ Loaded ${data.products.length} products from API`);
      } else {
        throw new Error(data.error || 'No products returned from API');
      }
    } catch (err) {
      console.error('Error fetching products from API:', err);
      console.log('📦 Loading static products as fallback...');
      
      try {
        const { products: staticProducts } = await import('@/lib/products');
        if (staticProducts && staticProducts.length > 0) {
          setProducts(staticProducts);
          console.log(`✅ Loaded ${staticProducts.length} static products`);
        } else {
          setError('No products available');
        }
      } catch (importErr) {
        console.error('Failed to load static products:', importErr);
        setError('Unable to load products');
      }
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
