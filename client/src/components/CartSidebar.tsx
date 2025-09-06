import { useCart } from '../hooks/use-cart';
import { useLanguage } from '../hooks/use-language';
import { showToast } from './ToastNotifications';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartSidebar({ isOpen, onClose, onCheckout }: CartSidebarProps) {
  const { cart, updateQuantity, removeFromCart, total } = useCart();
  const { t } = useLanguage();
  
  console.log('CartSidebar render - cart:', cart, 'cart.length:', cart.length);

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    showToast(t('itemRemovedFromCart'), 'info');
  };

  return (
    <div 
      className={`fixed inset-y-0 right-0 w-96 bg-card border-l border-border shadow-xl z-50 transform transition-transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      data-testid="cart-sidebar"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-lg font-semibold" data-testid="cart-title">{t('shoppingCart')}</h3>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            data-testid="button-close-cart"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6" data-testid="cart-items">
          {cart.length === 0 ? (
            <div className="text-center py-12" data-testid="empty-cart">
              <i className="fas fa-shopping-cart text-6xl text-muted-foreground mb-4"></i>
              <p className="text-muted-foreground">{t('cartEmpty')}</p>
              <button 
                onClick={onClose}
                className="mt-4 text-primary hover:underline"
                data-testid="button-continue-shopping"
              >
                {t('continueShopping')}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center space-x-4 p-4 border border-border rounded-lg"
                  data-testid={`cart-item-${item.id}`}
                >
                  {item.image && (
                    <img 
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                      data-testid={`cart-item-image-${item.id}`}
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium" data-testid={`cart-item-name-${item.id}`}>{item.name}</h4>
                    <p className="text-sm text-muted-foreground" data-testid={`cart-item-price-${item.id}`}>€{item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted"
                      data-testid={`button-decrease-${item.id}`}
                    >
                      <i className="fas fa-minus text-xs"></i>
                    </button>
                    <span className="w-8 text-center" data-testid={`cart-item-quantity-${item.id}`}>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted"
                      data-testid={`button-increase-${item.id}`}
                    >
                      <i className="fas fa-plus text-xs"></i>
                    </button>
                  </div>
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-destructive hover:text-destructive/80"
                    data-testid={`button-remove-${item.id}`}
                  >
                    <i className="fas fa-trash text-sm"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="border-t border-border p-6 space-y-4" data-testid="cart-footer">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>{t('total')}:</span>
              <span data-testid="cart-total">€{total.toFixed(2)}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-primary text-primary-foreground py-3 rounded-md hover:bg-primary/90 transition-colors"
              data-testid="button-proceed-checkout"
            >
              {t('proceedToCheckout')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
