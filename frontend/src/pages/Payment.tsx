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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Wallet, 
  Building2, 
  Lock, 
  CheckCircle2,
  ArrowLeft,
  Shield
} from 'lucide-react';
import { SiVisa, SiMastercard, SiPaypal } from 'react-icons/si';

export default function Payment() {
  const { user } = useAuth();
  const { cart, total, clearCart } = useCart();
  const [, navigate] = useLocation();
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/?login=true');
      return;
    }
    
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [user, cart, navigate]);

  const handlePayment = async () => {
    setProcessing(true);
    
    setTimeout(() => {
      clearCart();
      setProcessing(false);
      navigate('/dashboard');
    }, 2000);
  };

  if (!user || cart.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onToggleCart={() => setCartOpen(!cartOpen)} onToggleProfile={() => setProfileOpen(!profileOpen)} />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/cart">
              <Button variant="ghost" className="mb-4" data-testid="button-back-to-cart">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au panier
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-payment-title">
              Paiement sécurisé
            </h1>
            <p className="text-muted-foreground">
              Choisissez votre méthode de paiement préférée
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    Méthode de paiement
                  </CardTitle>
                  <CardDescription>
                    Toutes les transactions sont sécurisées et cryptées
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-3">
                      <div 
                        className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                          paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setPaymentMethod('card')}
                        data-testid="payment-option-card"
                      >
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 flex items-center justify-between cursor-pointer">
                          <div className="flex items-center gap-3">
                            <CreditCard className="h-5 w-5 text-primary" />
                            <span className="font-medium">Carte bancaire</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <SiVisa className="h-6 w-auto text-[#1A1F71]" />
                            <SiMastercard className="h-6 w-auto text-[#EB001B]" />
                          </div>
                        </Label>
                      </div>

                      <div 
                        className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                          paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setPaymentMethod('paypal')}
                        data-testid="payment-option-paypal"
                      >
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex-1 flex items-center justify-between cursor-pointer">
                          <div className="flex items-center gap-3">
                            <Wallet className="h-5 w-5 text-primary" />
                            <span className="font-medium">PayPal</span>
                          </div>
                          <SiPaypal className="h-6 w-auto text-[#003087]" />
                        </Label>
                      </div>

                      <div 
                        className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                          paymentMethod === 'bank' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setPaymentMethod('bank')}
                        data-testid="payment-option-bank"
                      >
                        <RadioGroupItem value="bank" id="bank" />
                        <Label htmlFor="bank" className="flex-1 flex items-center justify-between cursor-pointer">
                          <div className="flex items-center gap-3">
                            <Building2 className="h-5 w-5 text-primary" />
                            <span className="font-medium">Virement bancaire</span>
                          </div>
                          <Badge variant="secondary">2-3 jours</Badge>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  <div className="mt-6 p-4 bg-muted/50 rounded-lg flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Paiement 100% sécurisé</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Vos informations de paiement sont cryptées et sécurisées. Nous ne stockons jamais vos données bancaires.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Adresse de livraison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium">{user.displayName}</p>
                    {user.address && <p className="text-sm text-muted-foreground">{user.address}</p>}
                    {(user.city || user.country) && (
                      <p className="text-sm text-muted-foreground">
                        {[user.city, user.country].filter(Boolean).join(', ')}
                      </p>
                    )}
                    {user.phone && <p className="text-sm text-muted-foreground">{user.phone}</p>}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Récapitulatif</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground line-clamp-1 pr-2">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-medium shrink-0">{item.price.toFixed(2)} €</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span className="font-medium">{total.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Livraison</span>
                      <span className="font-medium text-green-600">Gratuite</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">TVA (20%)</span>
                      <span className="font-medium">{(total * 0.2).toFixed(2)} €</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between pt-2">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary" data-testid="text-total">
                      {(total * 1.2).toFixed(2)} €
                    </span>
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg" 
                    onClick={handlePayment}
                    disabled={processing}
                    data-testid="button-confirm-payment"
                  >
                    {processing ? (
                      <>
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Traitement...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-5 w-5 mr-2" />
                        Confirmer le paiement
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    En confirmant, vous acceptez nos conditions générales de vente
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} onCheckout={() => {}} />
      <UserProfile isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </div>
  );
}
