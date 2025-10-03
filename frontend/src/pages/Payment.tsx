import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { UserProfile } from '@/components/UserProfile';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ShoppingBag, CreditCard } from 'lucide-react';

export default function Payment() {
  const { user } = useAuth();
  const { cart, total } = useCart();
  const [, navigate] = useLocation();
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/?login=true');
      return;
    }
    
    if (cart.length === 0) {
      navigate('/cart');
      return;
    }
  }, [user, cart, navigate]);

  if (!user || cart.length === 0) {
    return null;
  }

  const totalWithTax = total * 1.2;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onToggleCart={() => setCartOpen(!cartOpen)} onToggleProfile={() => setProfileOpen(!profileOpen)} />
      
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Bouton retour */}
          <Link href="/cart">
            <Button variant="ghost" className="mb-6" data-testid="button-back-to-cart">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au panier
            </Button>
          </Link>

          {/* En-tête */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-payment-title">
              Paiement
            </h1>
            <p className="text-muted-foreground">
              Finalisez votre commande
            </p>
          </div>

          {/* Résumé de commande */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Résumé de la commande
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Articles */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantité: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      {(item.price * item.quantity).toFixed(2)} €
                    </p>
                  </div>
                ))}
              </div>

              {/* Totaux */}
              <div className="pt-4 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">TVA (20%)</span>
                  <span>{(total * 0.2).toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary" data-testid="text-total-amount">
                    {totalWithTax.toFixed(2)} €
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Moyens de paiement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Moyens de paiement
              </CardTitle>
              <CardDescription>
                Les moyens de paiement seront configurés prochainement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <p className="mb-4">Section de paiement en cours de configuration</p>
                <p className="text-sm">Les options de paiement seront disponibles sous peu</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />

      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <UserProfile isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </div>
  );
}
