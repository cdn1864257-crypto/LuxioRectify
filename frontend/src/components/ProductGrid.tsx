import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Product, ProductVariant } from '../lib/products';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { showToast } from './ToastNotifications';
import { LazyImage } from './LazyImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProductGridProps {
  title: string;
  subtitle: string;
  products: Product[];
  id?: string;
  className?: string;
}

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.hasVariants && product.variants ? product.variants[0] : null
  );

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentOriginalPrice = selectedVariant ? selectedVariant.originalPrice : product.originalPrice;
  const currentDiscount = currentOriginalPrice && currentPrice 
    ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
    : product.discount;
  
  const currentImage = selectedVariant?.image || product.image;

  const handleAddToCart = () => {
    const productToAdd = selectedVariant
      ? {
          ...product,
          price: selectedVariant.price,
          originalPrice: selectedVariant.originalPrice,
          description: `${selectedVariant.capacity}, ${selectedVariant.color}`,
        }
      : product;
    
    addToCart(productToAdd);
    showToast(`${product.name} - ${t('itemAddedToCart')}`, 'success');
    
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const colors = product.variants 
    ? [...new Set(product.variants.map(v => v.color))] 
    : [];
  
  const capacities = product.variants && selectedVariant
    ? [...new Set(product.variants.filter(v => v.color === selectedVariant.color).map(v => v.capacity))]
    : [];

  const handleColorSelect = (color: string) => {
    let variant = product.variants?.find(v => v.color === color && v.capacity === selectedVariant?.capacity);
    if (!variant) {
      variant = product.variants?.find(v => v.color === color);
    }
    if (variant) setSelectedVariant(variant);
  };

  const handleCapacitySelect = (capacity: string) => {
    const variant = product.variants?.find(v => v.capacity === capacity && v.color === selectedVariant?.color);
    if (variant) setSelectedVariant(variant);
  };

  return (
    <div 
      className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
      data-testid={`product-card-${product.id}`}
    >
      <div className="p-4 flex-1">
        {/* Product Image */}
        <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
          <LazyImage 
            src={currentImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            data-testid={`product-image-${product.id}`}
          />
          {currentDiscount && (
            <Badge className="absolute top-2 right-2 bg-red-500" data-testid={`badge-discount-${product.id}`}>
              -{currentDiscount}%
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-2" data-testid={`product-name-${product.id}`}>
            {product.name}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2" data-testid={`product-description-${product.id}`}>
            {product.description}
          </p>

          {/* Variant Selectors */}
          {product.hasVariants && product.variants && (
            <div className="space-y-3 mt-4">
              {/* Capacity Selector */}
              {capacities.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Capacity:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {capacities.map(capacity => (
                      <button
                        key={capacity}
                        onClick={() => handleCapacitySelect(capacity || '')}
                        className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                          selectedVariant?.capacity === capacity
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-primary'
                        }`}
                        data-testid={`button-capacity-${product.id}-${capacity}`}
                      >
                        {capacity}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {colors.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Color:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {colors.map(color => (
                      <button
                        key={color}
                        onClick={() => handleColorSelect(color || '')}
                        className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                          selectedVariant?.color === color
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-primary'
                        }`}
                        data-testid={`button-color-${product.id}-${color}`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-2xl font-bold text-slate-900 dark:text-white" data-testid={`product-price-${product.id}`}>
              €{currentPrice}
            </span>
            {currentOriginalPrice && (
              <span className="text-sm text-slate-500 line-through" data-testid={`product-original-price-${product.id}`}>
                €{currentOriginalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full"
          variant={addedToCart ? "secondary" : "default"}
          data-testid={`button-add-to-cart-${product.id}`}
        >
          {addedToCart ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              {t('added') || 'Added'}
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              {t('addToCart') || 'Add to Cart'}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export function ProductGrid({ title, subtitle, products, id, className = '' }: ProductGridProps) {
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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
