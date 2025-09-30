import { useState } from 'react';
import { Link } from 'wouter';
import { useCart } from '@/contexts/CartContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { UserProfile } from '@/components/UserProfile';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { showToast } from '@/components/ToastNotifications';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, total } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    showToast('Article retiré du panier', 'info');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onToggleCart={() => setCartOpen(!cartOpen)} onToggleProfile={() => setProfileOpen(!profileOpen)} />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-cart-title">
              Mon Panier
            </h1>
            <p className="text-muted-foreground">
              {cart.length} {cart.length === 1 ? 'article' : 'articles'} dans votre panier
            </p>
          </div>

          {cart.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 px-4">
                <div className="p-6 bg-muted/50 rounded-full mb-6">
                  <ShoppingBag className="h-20 w-20 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-semibold mb-3" data-testid="text-empty-cart">
                  Votre panier est vide
                </h2>
                <p className="text-muted-foreground text-center mb-6 max-w-md">
                  Découvrez notre sélection de produits premium et ajoutez vos articles préférés à votre panier.
                </p>
                <Link href="/">
                  <Button size="lg" data-testid="button-continue-shopping">
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Découvrir nos produits
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <Card key={item.id} data-testid={`cart-item-${item.id}`}>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex gap-4">
                        <div className="relative h-24 w-24 sm:h-32 sm:w-32 shrink-0 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                            data-testid={`img-product-${item.id}`}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-4 mb-2">
                            <div>
                              <h3 className="font-semibold text-foreground line-clamp-1" data-testid={`text-product-name-${item.id}`}>
                                {item.name}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                {item.category}
                              </p>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                              data-testid={`button-remove-${item.id}`}
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
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                data-testid={`button-decrease-${item.id}`}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-12 text-center font-medium" data-testid={`text-quantity-${item.id}`}>
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                data-testid={`button-increase-${item.id}`}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="text-right">
                              <p className="text-lg font-bold text-foreground" data-testid={`text-price-${item.id}`}>
                                {item.price.toFixed(2)} €
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-sm text-muted-foreground">
                                  {(item.price / item.quantity).toFixed(2)} € / unité
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Résumé de la commande</h2>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Sous-total</span>
                        <span className="font-medium" data-testid="text-subtotal">{total.toFixed(2)} €</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Livraison</span>
                        <span className="font-medium text-green-600">Gratuite</span>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between mb-6">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-2xl font-bold text-primary" data-testid="text-total">
                        {total.toFixed(2)} €
                      </span>
                    </div>

                    <Link href="/payment">
                      <Button className="w-full" size="lg" data-testid="button-checkout">
                        Passer la commande
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </Link>

                    <Link href="/">
                      <Button variant="outline" className="w-full mt-3" data-testid="button-continue-shopping-summary">
                        Continuer mes achats
                      </Button>
                    </Link>

                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        🚚 <span className="font-medium">Livraison gratuite</span> sur toutes les commandes
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        🔒 <span className="font-medium">Paiement sécurisé</span> garanti
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
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} onCheckout={() => {}} />
      <UserProfile isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </div>
  );
}
