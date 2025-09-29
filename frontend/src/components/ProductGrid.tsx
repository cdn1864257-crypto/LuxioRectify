import { Product } from '../lib/products';
import { useCart } from '../hooks/use-cart';
import { useLanguage } from '../hooks/use-language';
import { showToast } from './ToastNotifications';
import { LazyImage } from './LazyImage';

interface ProductGridProps {
  title: string;
  subtitle: string;
  products: Product[];
  id?: string;
  className?: string;
}

export function ProductGrid({ title, subtitle, products, id, className = '' }: ProductGridProps) {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    showToast(`${product.name} ${t('itemAddedToCart')}`, 'success');
  };

  return (
    <section id={id} className={`py-16 ${className}`} data-testid={`product-grid-${id}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" data-testid="section-title">{title}</h2>
          <p className="text-slate-600 dark:text-slate-300" data-testid="section-subtitle">{subtitle}</p>
        </div>
        
        <div className={`grid gap-6 ${
          products.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
          products.length === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
        }`}>
          {products.map((product) => (
            <div 
              key={product.id}
              className="product-card bg-card border border-border rounded-lg shadow-sm overflow-hidden hover:shadow-lg"
              data-testid={`product-card-${product.id}`}
            >
              <LazyImage 
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
                data-testid={`product-image-${product.id}`}
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold" data-testid={`product-name-${product.id}`}>
                    {product.name}
                  </h3>
                  {product.discount && (
                    <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded">
                      -{product.discount}%
                    </span>
                  )}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300 mb-2" data-testid={`product-description-${product.id}`}>
                  {product.description}
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-bold" data-testid={`product-price-${product.id}`}>
                    €{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm line-through text-slate-500 dark:text-slate-400" data-testid={`product-original-price-${product.id}`}>
                      €{product.originalPrice}
                    </span>
                  )}
                </div>
                {product.features.includes('Free shipping') && (
                  <div className="text-xs text-green-600 mb-2">✓ Free Shipping</div>
                )}
                {product.features.includes('Free delivery') && (
                  <div className="text-xs text-green-600 mb-2">✓ Free Delivery</div>
                )}
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors transform hover:scale-105 active:scale-95"
                  data-testid={`button-add-to-cart-${product.id}`}
                >
                  <i className="fas fa-shopping-cart mr-2"></i>
                  {t('addToCart')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
