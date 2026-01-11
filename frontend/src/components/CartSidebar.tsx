import { X, ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { useLocation } from 'wouter';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { showToast } from './ToastNotifications';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, updateQuantity, removeFromCart, total } = useCart();
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();

  const handleRemoveItem = (productId: string, description: string) => {
    removeFromCart(productId, description);
    showToast(t('itemRemovedFromCart'), 'info');
  };

  const handleCheckout = () => {
    onClose();
    setLocation(`/${language}/checkout/address`);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          data-testid="cart-overlay"
        />
      )}
      
      {/* Cart Sidebar */}
      <div 
        className={`fixed inset-y-0 right-0 w-full sm:w-[440px] lg:w-[480px] bg-background border-l border-border shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        data-testid="cart-sidebar"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold" data-testid="cart-title">
                  {t('shoppingCart')}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {cart.length} {cart.length === 1 ? t('item') : t('items')}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              data-testid="button-close-cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6" data-testid="cart-items">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12 px-4" data-testid="empty-cart">
                <div className="p-6 bg-muted/50 rounded-full mb-6">
                  <ShoppingCart className="h-16 w-16 sm:h-20 sm:w-20 text-muted-foreground" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold mb-2">{t('cartEmpty')}</h4>
                <p className="text-sm sm:text-base text-muted-foreground text-center mb-6">
                  {t('cartEmptyDescription')}
                </p>
                <button 
                  onClick={onClose}
                  className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  data-testid="button-continue-shopping"
                >
                  {t('continueShopping')}
                </button>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {cart.map((item) => {
                  const uniqueKey = `${item.id}-${item.description.replace(/[^a-zA-Z0-9]/g, '-')}`;
                  return (
                  <div 
                    key={uniqueKey}
                    className="group relative bg-card border border-border rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-200"
                    data-testid={`cart-item-${uniqueKey}`}
                  >
                    <div className="flex gap-3 sm:gap-4">
                      {/* Product Image */}
                      {item.image && (
                        <div className="relative flex-shrink-0">
                          <img 
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg bg-muted"
                            data-testid={`cart-item-image-${uniqueKey}`}
                          />
                        </div>
                      )}
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <h4 className="font-semibold text-sm sm:text-base line-clamp-2" data-testid={`cart-item-name-${uniqueKey}`}>
                            {item.name}
                          </h4>
                          <button 
                            onClick={() => handleRemoveItem(item.id, item.description)}
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors flex-shrink-0"
                            data-testid={`button-remove-${uniqueKey}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <p className="text-xs text-muted-foreground mb-2" data-testid={`cart-item-description-${uniqueKey}`}>
                          {item.description}
                        </p>
                        
                        <p className="text-lg sm:text-xl font-bold text-primary mb-3" data-testid={`cart-item-price-${uniqueKey}`}>
                          €{item.price}
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-muted rounded-lg p-1">
                            <button 
                              onClick={() => updateQuantity(item.id, item.description, item.quantity - 1)}
                              className="w-8 h-8 sm:w-9 sm:h-9 rounded-md flex items-center justify-center hover:bg-background transition-colors active:scale-95"
                              data-testid={`button-decrease-${uniqueKey}`}
                            >
                              <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </button>
                            <span className="w-10 sm:w-12 text-center font-semibold text-sm sm:text-base" data-testid={`cart-item-quantity-${uniqueKey}`}>
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.description, item.quantity + 1)}
                              className="w-8 h-8 sm:w-9 sm:h-9 rounded-md flex items-center justify-center hover:bg-background transition-colors active:scale-95"
                              data-testid={`button-increase-${uniqueKey}`}
                            >
                              <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </button>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {t('subtotal')}: <span className="font-semibold text-foreground">€{(item.price * item.quantity).toFixed(2)}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Footer with Total and Checkout */}
          {cart.length > 0 && (
            <div className="border-t border-border bg-card/80 backdrop-blur-sm p-4 sm:p-6 space-y-4" data-testid="cart-footer">
              {/* Total Section */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{t('subtotal')}</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{t('shipping')}</span>
                  <span className="text-green-600 font-medium">{t('free')}</span>
                </div>
                <div className="h-px bg-border my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="text-lg sm:text-xl font-bold">{t('total')}</span>
                  <span className="text-2xl sm:text-3xl font-bold text-primary" data-testid="cart-total">
                    €{total.toFixed(2)}
                  </span>
                </div>
              </div>
              
              {/* Checkout Button */}
              <button 
                onClick={handleCheckout}
                className="w-full bg-primary text-primary-foreground py-3.5 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg hover:shadow-xl"
                data-testid="button-proceed-checkout"
              >
                {t('proceedToCheckout')}
              </button>
              
              <button 
                onClick={onClose}
                className="w-full py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-continue-shopping-footer"
              >
                {t('continueShopping')}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
