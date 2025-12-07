import { useState, useEffect } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Product, ProductVariant } from '../lib/products';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { showToast } from './ToastNotifications';
import { LazyImage } from './LazyImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ProductDetailModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  initialVariant?: ProductVariant | null;
}

export function ProductDetailModal({ product, isOpen, onClose, initialVariant }: ProductDetailModalProps) {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    initialVariant ?? (product.hasVariants && product.variants ? product.variants[0] : null)
  );
  
  // Update selectedVariant when modal opens with a different initial variant
  useEffect(() => {
    if (isOpen && initialVariant) {
      setSelectedVariant(initialVariant);
    }
  }, [isOpen, initialVariant]);

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
          discount: currentDiscount,
          image: selectedVariant.image || product.image,
          description: `${selectedVariant.capacity}, ${selectedVariant.color}`,
        }
      : product;
    
    addToCart(productToAdd);
    showToast(`${product.name} ${selectedVariant ? `(${selectedVariant.color})` : ''} - ${t('itemAddedToCart')}`, 'success');
    
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid={`product-detail-modal-${product.id}`}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold" data-testid={`modal-product-name-${product.id}`}>
            {product.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* Image Section */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
              <LazyImage 
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover"
                data-testid={`modal-product-image-${product.id}`}
              />
              {currentDiscount && (
                <Badge className="absolute top-4 right-4 bg-red-500 text-lg px-3 py-1" data-testid={`modal-badge-discount-${product.id}`}>
                  -{currentDiscount}%
                </Badge>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Description */}
            <div>
              <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">
                {t('description')}
              </h3>
              <p className="text-slate-600 dark:text-slate-400" data-testid={`modal-product-description-${product.id}`}>
                {product.description}
              </p>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-3 text-slate-900 dark:text-white">
                  {t('specifications')}
                </h3>
                <ul className="space-y-2" data-testid={`modal-product-features-${product.id}`}>
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-slate-600 dark:text-slate-400">
                      <span className="text-primary mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Variant Selectors */}
            {product.hasVariants && product.variants && (
              <div className="space-y-4">
                {/* Capacity Selector */}
                {capacities.length > 0 && (
                  <div>
                    <p className="font-semibold text-slate-700 dark:text-slate-300 mb-3">
                      {t('capacity')}:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {capacities.map(capacity => (
                        <button
                          key={capacity}
                          onClick={() => handleCapacitySelect(capacity || '')}
                          className={`px-4 py-2 text-sm rounded-md border transition-colors ${
                            selectedVariant?.capacity === capacity
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-primary'
                          }`}
                          data-testid={`modal-button-capacity-${product.id}-${capacity}`}
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
                    <p className="font-semibold text-slate-700 dark:text-slate-300 mb-3">
                      {t('color')}:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {colors.map(color => (
                        <button
                          key={color}
                          onClick={() => handleColorSelect(color || '')}
                          className={`px-4 py-2 text-sm rounded-md border transition-colors ${
                            selectedVariant?.color === color
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-primary'
                          }`}
                          data-testid={`modal-button-color-${product.id}-${color}`}
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
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold text-slate-900 dark:text-white" data-testid={`modal-product-price-${product.id}`}>
                  €{currentPrice}
                </span>
                {currentOriginalPrice && (
                  <span className="text-lg text-slate-500 line-through" data-testid={`modal-product-original-price-${product.id}`}>
                    €{currentOriginalPrice}
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                className="w-full"
                size="lg"
                variant={addedToCart ? "secondary" : "default"}
                data-testid={`modal-button-add-to-cart-${product.id}`}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    {t('added') || 'Ajouté'}
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {t('addToCart') || 'Ajouter au panier'}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
