import { useState } from 'react';
import { Product, ProductVariant } from '../lib/products';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { showToast } from './ToastNotifications';
import { LazyImage } from './LazyImage';

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
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.hasVariants && product.variants ? product.variants[0] : null
  );

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentOriginalPrice = selectedVariant ? selectedVariant.originalPrice : product.originalPrice;
  const currentDiscount = currentOriginalPrice && currentPrice 
    ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
    : product.discount;

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
  };

  const colors = product.variants 
    ? [...new Set(product.variants.map(v => v.color))] 
    : [];
  
  const capacities = product.variants && selectedVariant
    ? [...new Set(product.variants.filter(v => v.color === selectedVariant.color).map(v => v.capacity))]
    : [];

  return (
    <div 
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
          {currentDiscount && (
            <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded">
              -{currentDiscount}%
            </span>
          )}
        </div>
        
        {product.hasVariants && product.variants && (
          <div className="space-y-2 mb-3">
            <div>
              <label className="text-xs text-slate-600 dark:text-slate-300 mb-1 block">Couleur</label>
              <select
                className="w-full text-sm border border-border rounded px-2 py-1 bg-background"
                value={selectedVariant?.color || ''}
                onChange={(e) => {
                  const variant = product.variants?.find(v => v.color === e.target.value && v.capacity === selectedVariant?.capacity);
                  if (variant) setSelectedVariant(variant);
                }}
                data-testid={`select-color-${product.id}`}
              >
                {colors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-600 dark:text-slate-300 mb-1 block">Capacité</label>
              <select
                className="w-full text-sm border border-border rounded px-2 py-1 bg-background"
                value={selectedVariant?.capacity || ''}
                onChange={(e) => {
                  const variant = product.variants?.find(v => v.capacity === e.target.value && v.color === selectedVariant?.color);
                  if (variant) setSelectedVariant(variant);
                }}
                data-testid={`select-capacity-${product.id}`}
              >
                {capacities.map(capacity => (
                  <option key={capacity} value={capacity}>{capacity}</option>
                ))}
              </select>
            </div>
          </div>
        )}
        
        {!product.hasVariants && (
          <div className="text-sm text-slate-600 dark:text-slate-300 mb-2" data-testid={`product-description-${product.id}`}>
            {product.description}
          </div>
        )}
        
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold" data-testid={`product-price-${product.id}`}>
            €{currentPrice.toFixed(2)}
          </span>
          {currentOriginalPrice && (
            <span className="text-sm line-through text-slate-500 dark:text-slate-400" data-testid={`product-original-price-${product.id}`}>
              €{currentOriginalPrice.toFixed(2)}
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
          onClick={handleAddToCart}
          className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors transform hover:scale-105 active:scale-95"
          data-testid={`button-add-to-cart-${product.id}`}
        >
          <i className="fas fa-shopping-cart mr-2"></i>
          {t('addToCart')}
        </button>
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
