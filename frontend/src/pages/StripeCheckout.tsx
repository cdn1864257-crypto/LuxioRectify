import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, CreditCard, ShoppingCart, Lock, ArrowLeft, Shield, CheckCircle2, Package, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link, useLocation } from 'wouter';
import { SEO } from '@/components/SEO';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

function CheckoutForm() {
  const { t, language } = useLanguage();
  const { cart, total, clearCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  const [processing, setProcessing] = useState(false);
  const [cardholderName, setCardholderName] = useState('');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);

  useEffect(() => {
    if (total === 0) {
      setLocation(`/${language}/cart`);
      return;
    }

    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/payment/stripe-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: Math.round(total * 100),
            currency: 'eur',
            cart: cart,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create payment intent');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error('Error creating payment intent:', err);
        setError(t('paymentInitFailed'));
        toast({
          variant: 'destructive',
          title: t('errorOccurred'),
          description: t('paymentInitFailed'),
        });
      }
    };

    createPaymentIntent();
  }, [total, cart, language, setLocation, t, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    if (!cardholderName.trim()) {
      setError(t('pleaseCompleteThisField'));
      toast({
        variant: 'destructive',
        title: t('errorOccurred'),
        description: t('fillRequiredFields'),
      });
      return;
    }

    setProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setProcessing(false);
      return;
    }

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: cardholderName,
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message || t('paymentInitFailed'));
        toast({
          variant: 'destructive',
          title: t('errorOccurred'),
          description: stripeError.message,
        });
        setProcessing(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        toast({
          title: t('paymentSuccessful'),
          description: t('orderConfirmed'),
        });

        clearCart();

        setTimeout(() => {
          setLocation(`/${language}/dashboard`);
        }, 1500);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(t('orderFailed'));
      toast({
        variant: 'destructive',
        title: t('errorOccurred'),
        description: t('orderFailed'),
      });
    } finally {
      setProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: 'hsl(var(--foreground))',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        '::placeholder': {
          color: 'hsl(var(--muted-foreground))',
        },
        iconColor: 'hsl(var(--primary))',
      },
      invalid: {
        color: 'hsl(var(--destructive))',
        iconColor: 'hsl(var(--destructive))',
      },
      complete: {
        iconColor: 'hsl(var(--primary))',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 dark:from-background dark:via-background dark:to-background">
      <SEO 
        title={`${t('stripe')} - ${t('paymentMethod')}`}
        description={t('stripeDescription')}
      />

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 max-w-7xl mx-auto">
          <Link href={`/${language}/payment`}>
            <Button variant="ghost" className="mb-6 group" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              {t('previous') || 'Retour'}
            </Button>
          </Link>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {t('checkout')}
              </h1>
              <p className="text-muted-foreground mt-2 flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600 dark:text-green-500" />
                {t('securedPayment')} - {t('dataProtection')}
              </p>
            </div>
            
            {/* Trust badges */}
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 border-green-600/50 text-green-700 dark:text-green-400">
                <Lock className="h-3.5 w-3.5" />
                SSL Secure
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5">
                <img 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28'%3E%3Cpath fill='%236772E5' d='M13.976 0C6.257 0 .015 6.242.015 13.961c0 7.72 6.242 13.961 13.961 13.961 7.72 0 13.961-6.242 13.961-13.961C27.937 6.242 21.696 0 13.976 0z'/%3E%3Cpath fill='%23FFF' d='M11.072 20.088V8.616l5.808 5.736-5.808 5.736zm0-14.064c0-.312.048-.576.144-.816.096-.24.24-.432.432-.576.192-.144.432-.264.72-.336.288-.072.6-.12.936-.12h6.144c.336 0 .648.048.936.12.288.072.528.192.72.336.192.144.336.336.432.576.096.24.144.504.144.816v2.04h-1.92v-1.8c0-.096-.024-.168-.072-.24a.446.446 0 0 0-.168-.168.673.673 0 0 0-.24-.096 1.346 1.346 0 0 0-.264-.024h-4.992c-.096 0-.192.008-.264.024a.673.673 0 0 0-.24.096.446.446 0 0 0-.168.168.446.446 0 0 0-.072.24v11.904c0 .096.024.168.072.24s.096.12.168.168c.072.048.144.072.24.096.096.024.168.024.264.024h4.992c.096 0 .192-.008.264-.024a.673.673 0 0 0 .24-.096.446.446 0 0 0 .168-.168c.048-.072.072-.144.072-.24v-1.8h1.92v2.04c0 .312-.048.576-.144.816-.096.24-.24.432-.432.576-.192.144-.432.264-.72.336-.288.072-.6.12-.936.12h-6.144c-.336 0-.648-.048-.936-.12a1.93 1.93 0 0 1-.72-.336 1.758 1.758 0 0 1-.432-.576 2.088 2.088 0 0 1-.144-.816V6.024z'/%3E%3C/svg%3E"
                  alt="Stripe"
                  className="h-4 w-4"
                />
                Powered by Stripe
              </Badge>
            </div>
          </div>
        </div>

        {/* Main layout - 2 columns on desktop */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 items-start">
          {/* Left column - Payment form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment form card */}
            <Card className="border-2 shadow-xl">
              <CardHeader className="space-y-2 pb-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    {t('paymentMethod')}
                  </CardTitle>
                </div>
                <CardDescription className="text-base">
                  {t('stripeDescription')}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Cardholder name */}
                  <div className="space-y-2">
                    <Label htmlFor="cardholderName" className="text-base font-medium">
                      {t('cardholderName') || 'Titulaire de la carte'}
                    </Label>
                    <Input
                      id="cardholderName"
                      type="text"
                      placeholder="Jean Dupont"
                      value={cardholderName}
                      onChange={(e) => setCardholderName(e.target.value)}
                      disabled={processing}
                      required
                      className="h-12 text-base"
                      data-testid="input-cardholder-name"
                    />
                  </div>

                  {/* Stripe Card Element */}
                  <div className="space-y-2">
                    <Label className="text-base font-medium">
                      {t('cardNumber')}
                    </Label>
                    <div className="border-2 rounded-lg p-4 bg-background hover:border-primary/50 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                      <CardElement 
                        options={cardElementOptions}
                        onChange={(e) => setCardComplete(e.complete)}
                      />
                    </div>
                    
                    {/* Accepted cards */}
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-xs text-muted-foreground">Cartes acceptées:</span>
                      <div className="flex gap-1.5">
                        {['Visa', 'Mastercard', 'Amex', 'Discover'].map((card) => (
                          <div key={card} className="h-6 w-9 border rounded flex items-center justify-center text-[8px] font-bold bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400">
                            {card.slice(0, 2).toUpperCase()}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Error message */}
                  {error && (
                    <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm animate-in fade-in slide-in-from-top-2">
                      <p className="font-medium">{error}</p>
                    </div>
                  )}

                  {/* Submit button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                    disabled={!stripe || processing || !clientSecret || !cardComplete}
                    data-testid="button-pay"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        {t('paymentProcessing') || 'Traitement en cours'}...
                      </>
                    ) : (
                      <>
                        <Lock className="h-5 w-5 mr-2" />
                        {t('payNow') || 'Payer'} €{total.toFixed(2)}
                      </>
                    )}
                  </Button>

                  {/* Security notice */}
                  <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                    <div className="flex gap-3">
                      <Shield className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1 text-sm">
                        <p className="font-medium text-foreground">
                          {t('payment100Secure')}
                        </p>
                        <p className="text-muted-foreground text-xs leading-relaxed">
                          {t('paymentInfoEncrypted')}. {t('neverStoreCardData')}.
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Trust indicators */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Garantie 30 jours</p>
                  <p className="text-xs text-muted-foreground mt-1">30 jours</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <Package className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{t('freeShipping') || 'Livraison gratuite'}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t('days23')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-purple-600 dark:text-purple-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{t('customerSupport') || 'Support client'}</p>
                  <p className="text-xs text-muted-foreground mt-1">24/7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Order summary */}
          <div className="lg:sticky lg:top-8">
            <Card className="border-2 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <ShoppingCart className="h-5 w-5" />
                  {t('orderSummary') || 'Résumé de commande'}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Cart items */}
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {cart.map((item, index) => (
                    <div 
                      key={`${item.id}-${item.description}-${index}`}
                      className="flex gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="h-16 w-16 rounded-md bg-background border flex items-center justify-center flex-shrink-0">
                        <Package className="h-6 w-6 text-muted-foreground" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        {item.description && (
                          <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                        )}
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                          <span className="font-semibold text-sm">€{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Subtotal */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('subtotal') || 'Sous-total'}</span>
                    <span className="font-medium">€{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('shipping') || 'Livraison'}</span>
                    <span className="font-medium text-green-600 dark:text-green-500">{t('free') || 'Gratuite'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('vat')}</span>
                    <span className="font-medium">Incluse</span>
                  </div>
                </div>

                <Separator />

                {/* Total */}
                <div className="flex justify-between items-center pt-2">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('total') || 'Total'}</p>
                    <p className="text-xs text-muted-foreground">{t('totalWithVat')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      €{total.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Items count */}
                <div className="pt-2">
                  <p className="text-xs text-center text-muted-foreground">
                    {cart.length} {cart.length === 1 ? (t('item') || 'article') : (t('items') || 'articles')} • {t('securePayment') || 'Paiement sécurisé'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Additional security badge */}
            <div className="mt-4 p-4 rounded-lg border bg-card text-center">
              <p className="text-xs text-muted-foreground mb-2">Sécurisé par</p>
              <div className="flex items-center justify-center gap-2">
                <img 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28'%3E%3Cpath fill='%236772E5' d='M13.976 0C6.257 0 .015 6.242.015 13.961c0 7.72 6.242 13.961 13.961 13.961 7.72 0 13.961-6.242 13.961-13.961C27.937 6.242 21.696 0 13.976 0z'/%3E%3Cpath fill='%23FFF' d='M11.072 20.088V8.616l5.808 5.736-5.808 5.736z'/%3E%3C/svg%3E"
                  alt="Stripe"
                  className="h-6 w-6"
                />
                <span className="font-semibold text-sm">Stripe</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
Certifié PCI-DSS niveau 1
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StripeCheckout() {
  const { language } = useLanguage();

  return (
    <Elements 
      stripe={stripePromise}
      options={{
        locale: language as any,
        appearance: {
          theme: 'stripe',
        },
      }}
    >
      <CheckoutForm />
    </Elements>
  );
}
