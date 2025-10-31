import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEO } from '@/components/SEO';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { showToast } from '@/components/ToastNotifications';

export default function Cart() {
  const { user } = useAuth();
  const { cart, updateQuantity, removeFromCart, total} = useCart();
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();
  const [cartOpen, setCartOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  const handleRemoveItem = (productId: string, description: string) => {
    removeFromCart(productId, description);
    showToast(t('itemRemovedFromCart'), 'info');
  };

  const handleCheckout = () => {
    if (!user) {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
      setShowLoginDialog(true);
      redirectTimeoutRef.current = setTimeout(() => {
        setLocation(`/${language}/?login=true`);
      }, 3500);
    } else {
      setLocation(`/${language}/payment`);
    }
  };

  const handleGoToLogin = () => {
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current);
      redirectTimeoutRef.current = null;
    }
    setShowLoginDialog(false);
    setLocation(`/${language}/?login=true`);
  };

  const handleCancelDialog = () => {
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current);
      redirectTimeoutRef.current = null;
    }
    setShowLoginDialog(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO page="cart" />
      <Header onToggleCart={() => setCartOpen(!cartOpen)} />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-cart-title">
              {t('shoppingCart')}
            </h1>
            <p className="text-muted-foreground">
              {cart.length} {cart.length === 1 ? t('item') : t('items')}
            </p>
          </div>

          {cart.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 px-4">
                <div className="p-6 bg-muted/50 rounded-full mb-6">
                  <ShoppingBag className="h-20 w-20 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-semibold mb-3" data-testid="text-empty-cart">
                  {t('cartEmpty')}
                </h2>
                <p className="text-muted-foreground text-center mb-6 max-w-md">
                  {t('cartEmptyDescription')}
                </p>
                <Link href="/">
                  <Button size="lg" data-testid="button-continue-shopping">
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    {t('shopNow')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => {
                  const uniqueKey = `${item.id}-${item.description.replace(/[^a-zA-Z0-9]/g, '-')}`;
                  return (
                  <Card key={uniqueKey} data-testid={`cart-item-${uniqueKey}`}>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex gap-4">
                        <div className="relative h-24 w-24 sm:h-32 sm:w-32 shrink-0 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                            data-testid={`img-product-${uniqueKey}`}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-4 mb-2">
                            <div>
                              <h3 className="font-semibold text-foreground line-clamp-1" data-testid={`text-product-name-${uniqueKey}`}>
                                {item.name}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {item.description}
                              </p>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item.id, item.description)}
                              className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                              data-testid={`button-remove-${uniqueKey}`}
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between gap-4 mt-4">
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.description, Math.max(1, item.quantity - 1))}
                                data-testid={`button-decrease-${uniqueKey}`}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-12 text-center font-medium" data-testid={`text-quantity-${uniqueKey}`}>
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.description, item.quantity + 1)}
                                data-testid={`button-increase-${uniqueKey}`}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="text-right">
                              <p className="text-lg font-bold text-foreground" data-testid={`text-price-${uniqueKey}`}>
                                {item.price.toFixed(2)} €
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-sm text-muted-foreground">
                                  {(item.price / item.quantity).toFixed(2)} € / {t('item')}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  );
                })}
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">{t('orderSummary')}</h2>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t('subtotal')}</span>
                        <span className="font-medium" data-testid="text-subtotal">{total.toFixed(2)} €</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t('shipping')}</span>
                        <span className="font-medium text-green-600">{t('free')}</span>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between mb-6">
                      <span className="text-lg font-semibold">{t('total')}</span>
                      <span className="text-2xl font-bold text-primary" data-testid="text-total">
                        {total.toFixed(2)} €
                      </span>
                    </div>

                    <Button 
                      className="w-full" 
                      size="lg" 
                      onClick={handleCheckout}
                      data-testid="button-checkout"
                    >
                      {t('proceedToCheckout')}
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>

                    <Link href="/">
                      <Button variant="outline" className="w-full mt-3" data-testid="button-continue-shopping-summary">
                        {t('continueShopping')}
                      </Button>
                    </Link>

                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        🚚 <span className="font-medium">{t('freeShipping')}</span>
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        🔒 <span className="font-medium">{t('securePayment')}</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      
      <AlertDialog open={showLoginDialog} onOpenChange={(open) => {
        if (!open) handleCancelDialog();
      }}>
        <AlertDialogContent data-testid="dialog-login-required">
          <AlertDialogHeader>
            <AlertDialogTitle>{t('loginRequiredToCheckout')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('pleaseLoginOrSignupToCheckout')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDialog} data-testid="button-cancel-login">{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleGoToLogin} data-testid="button-go-to-login">
              {t('goToLogin')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
