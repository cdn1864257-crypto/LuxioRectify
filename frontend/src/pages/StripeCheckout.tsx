import { useState, useEffect } from 'react';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CreditCard, ShoppingCart, Lock, ArrowLeft } from 'lucide-react';
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

  // Créer Payment Intent au chargement
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
            amount: Math.round(total * 100), // Convertir en centimes
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
        setError(t.paymentInitFailed);
        toast({
          variant: 'destructive',
          title: t.errorOccurred,
          description: t.paymentInitFailed,
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
      setError(t.pleaseCompleteThisField);
      toast({
        variant: 'destructive',
        title: t.errorOccurred,
        description: t.fillRequiredFields,
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
        setError(stripeError.message || t.paymentInitFailed);
        toast({
          variant: 'destructive',
          title: t.errorOccurred,
          description: stripeError.message,
        });
        setProcessing(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Paiement réussi
        toast({
          title: t.paymentSuccessful,
          description: t.orderConfirmed,
        });

        // Vider le panier
        clearCart();

        // Rediriger vers le dashboard
        setTimeout(() => {
          setLocation(`/${language}/dashboard`);
        }, 1500);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(t.orderFailed);
      toast({
        variant: 'destructive',
        title: t.errorOccurred,
        description: t.orderFailed,
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
        '::placeholder': {
          color: 'hsl(var(--muted-foreground))',
        },
        iconColor: 'hsl(var(--foreground))',
      },
      invalid: {
        color: 'hsl(var(--destructive))',
        iconColor: 'hsl(var(--destructive))',
      },
    },
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <SEO 
        title={`${t.stripe} - ${t.paymentMethod}`}
        description={t.stripeDescription}
      />

      <div className="max-w-2xl mx-auto">
        {/* En-tête */}
        <div className="mb-6">
          <Link href={`/${language}/payment`}>
            <Button variant="ghost" className="mb-4" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t.previous || 'Retour'}
            </Button>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
            <CreditCard className="h-6 w-6 sm:h-8 sm:w-8" />
            {t.cardPayment}
          </h1>
          <p className="text-muted-foreground mt-2">{t.stripeDescription}</p>
        </div>

        {/* Résumé de la commande */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              {t.orderSummary}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {cart.map((item, index) => (
                <div key={`${item.id}-${item.description}-${index}`} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.name} {item.description ? `(${item.description})` : ''} x {item.quantity}
                  </span>
                  <span className="font-medium">€{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>{t.total}</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formulaire de paiement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              {t.paymentMethod}
            </CardTitle>
            <CardDescription>{t.allTransactionsSecured || 'Toutes les transactions sont sécurisées'}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nom du titulaire */}
              <div className="space-y-2">
                <Label htmlFor="cardholderName">{t.cardholderName}</Label>
                <Input
                  id="cardholderName"
                  type="text"
                  placeholder={t.cardholderName}
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  disabled={processing}
                  required
                  data-testid="input-cardholder-name"
                />
              </div>

              {/* Stripe Card Element */}
              <div className="space-y-2">
                <Label>{t.cardNumber}</Label>
                <div className="border rounded-md p-3 bg-background">
                  <CardElement options={cardElementOptions} />
                </div>
                <p className="text-xs text-muted-foreground">
                  {t.dataProtection || 'Vos données sont protégées'}
                </p>
              </div>

              {/* Erreur */}
              {error && (
                <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              {/* Bouton de paiement */}
              <Button
                type="submit"
                className="w-full"
                disabled={!stripe || processing || !clientSecret}
                data-testid="button-pay"
              >
                {processing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {t.paymentProcessing}
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    {t.placeOrder} - €{total.toFixed(2)}
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                {t.securePayment || 'Paiement sécurisé'} • SSL • {t.dataProtection}
              </p>
            </form>
          </CardContent>
        </Card>
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
      }}
    >
      <CheckoutForm />
    </Elements>
  );
}
