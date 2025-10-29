import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, CreditCard, ShoppingCart, Lock, ArrowLeft, Shield, CheckCircle2, Package, Clock, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link, useLocation } from 'wouter';
import { SEO } from '@/components/SEO';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

// Premium Card Logos SVG Components
const VisaLogo = () => (
  <svg viewBox="0 0 48 32" className="h-7 w-auto">
    <rect width="48" height="32" rx="4" fill="white"/>
    <path d="M19.5 11.5h-2.7l-4.2 9h2.8l.8-2h3.9l.4 2h2.6l-3.6-9zm-2.1 5.5l1.4-3.8.8 3.8h-2.2z" fill="#1434CB"/>
    <path d="M24.8 11.5l-2.1 9h2.6l2.1-9h-2.6z" fill="#1434CB"/>
    <path d="M32.5 11.4c-.5-.2-1.4-.4-2.4-.4-2.6 0-4.5 1.4-4.5 3.4 0 1.5 1.3 2.3 2.3 2.8.9.5 1.3.8 1.3 1.3 0 .7-.8 1-1.6 1-1.1 0-1.6-.2-2.5-.5l-.3-.2-.4 2.3c.6.3 1.8.5 3 .5 2.8 0 4.6-1.4 4.6-3.5 0-1.2-.7-2.1-2.3-2.8-.9-.5-1.5-.8-1.5-1.3s.5-1 1.4-1c.8 0 1.4.2 1.9.4l.2.1.4-2.1z" fill="#1434CB"/>
    <path d="M39.5 11.5h-2.1c-.6 0-1.1.4-1.4 1l-3.9 8h2.8s.5-1.3.6-1.6h3.4c.1.4.3 1.6.3 1.6h2.5l-2.2-9zm-3.3 5.8c.2-.5 1-2.8 1-2.8s.2-.5.3-.9l.2.8s.4 2.1.5 2.9h-2z" fill="#1434CB"/>
  </svg>
);

const MastercardLogo = () => (
  <svg viewBox="0 0 48 32" className="h-7 w-auto">
    <rect width="48" height="32" rx="4" fill="white"/>
    <circle cx="18" cy="16" r="7.5" fill="#EB001B"/>
    <circle cx="30" cy="16" r="7.5" fill="#FF5F00"/>
    <path d="M24 9.8c-1.6 1.3-2.6 3.3-2.6 5.5s1 4.2 2.6 5.5c1.6-1.3 2.6-3.3 2.6-5.5s-1-4.2-2.6-5.5z" fill="#F79E1B"/>
  </svg>
);

const AmexLogo = () => (
  <svg viewBox="0 0 48 32" className="h-7 w-auto">
    <rect width="48" height="32" rx="4" fill="#006FCF"/>
    <path d="M10 12h3.5l.8 2 .8-2h3.5v5.5l2.5-5.5h3l2.5 5.5V12h8.4l1 2.5 1-2.5H40l-3.5 8h-3l-1-2.5-1 2.5h-8.5l-.5-1.5h-2l-.5 1.5h-3.5v-5l-2.5 5h-2l-2.5-5v5H10v-8zm23 2l1.5 3.5h-3L33 14zm-16.5 0l1.5 3.5h-3l1.5-3.5z" fill="white"/>
  </svg>
);

const DiscoverLogo = () => (
  <svg viewBox="0 0 48 32" className="h-7 w-auto">
    <rect width="48" height="32" rx="4" fill="white"/>
    <path d="M35 10h8c2 0 3.5 1.5 3.5 3.5v5c0 2-1.5 3.5-3.5 3.5h-8V10z" fill="#FF6000"/>
    <text x="7" y="19" fontFamily="Arial, sans-serif" fontSize="7.5" fontWeight="bold" fill="#231F20">DISCOVER</text>
  </svg>
);

const DinersLogo = () => (
  <svg viewBox="0 0 48 32" className="h-7 w-auto">
    <rect width="48" height="32" rx="4" fill="white"/>
    <circle cx="24" cy="16" r="9" fill="none" stroke="#0079BE" strokeWidth="1.8"/>
    <path d="M18.5 16c0-3 2.5-5.5 5.5-5.5v11c-3 0-5.5-2.5-5.5-5.5z" fill="#0079BE"/>
    <path d="M29.5 16c0 3-2.5 5.5-5.5 5.5v-11c3 0 5.5 2.5 5.5 5.5z" fill="#0079BE"/>
  </svg>
);

const JCBLogo = () => (
  <svg viewBox="0 0 48 32" className="h-7 w-auto">
    <rect width="48" height="32" rx="4" fill="white"/>
    <rect x="9" y="11" width="9" height="10" rx="1" fill="#0E4C96"/>
    <rect x="19.5" y="11" width="9" height="10" rx="1" fill="#CC0000"/>
    <rect x="30" y="11" width="9" height="10" rx="1" fill="#00A04D"/>
  </svg>
);

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
        fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontWeight: '500',
        letterSpacing: '0.025em',
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
        iconColor: '#10b981',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <SEO 
        title={`${t('stripe')} - ${t('paymentMethod')}`}
        description={t('stripeDescription')}
      />

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 max-w-7xl mx-auto">
          <Link href={`/${language}/payment`}>
            <Button variant="ghost" className="mb-6 group" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              {t('previous') || 'Retour'}
            </Button>
          </Link>
          
          <div className="text-center space-y-3 mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              {t('checkout')}
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2 font-medium">
              <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
              {t('securedPayment')} • {t('dataProtection')}
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/50 dark:bg-emerald-950/30">
              <Lock className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-500" />
              <span className="text-emerald-800 dark:text-emerald-300 font-semibold text-sm">SSL Encrypted</span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5">
              <Award className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold text-sm">PCI-DSS Level 1</span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
              <span className="font-semibold text-sm">256-bit Encryption</span>
            </Badge>
          </div>
        </div>

        {/* Main Layout */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 items-start">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Form Card */}
            <Card className="border-2 shadow-lg bg-white dark:bg-slate-900">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-700 p-6">
                <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  {t('paymentMethod')}
                </CardTitle>
                <CardDescription className="text-slate-300 mt-2 text-sm">
                  {t('stripeDescription')}
                </CardDescription>
              </div>
              
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Cardholder Name */}
                  <div className="space-y-2">
                    <Label htmlFor="cardholderName" className="text-sm font-semibold text-slate-900 dark:text-slate-100">
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
                    <Label className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      {t('cardNumber')}
                      {cardComplete && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      )}
                    </Label>
                    <div className="border-2 rounded-lg p-4 bg-white dark:bg-slate-950 hover:border-slate-300 dark:hover:border-slate-700 transition-colors focus-within:border-slate-900 dark:focus-within:border-slate-100 focus-within:ring-2 focus-within:ring-slate-900/10 dark:focus-within:ring-slate-100/10">
                      <CardElement 
                        options={cardElementOptions}
                        onChange={(e) => setCardComplete(e.complete)}
                      />
                    </div>
                    
                    {/* Card Logos */}
                    <div className="pt-3">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2.5 uppercase tracking-wide">
                        Cartes acceptées
                      </p>
                      <div className="flex flex-wrap items-center gap-2.5">
                        {[VisaLogo, MastercardLogo, AmexLogo, DiscoverLogo, DinersLogo, JCBLogo].map((Logo, index) => (
                          <div
                            key={index}
                            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md p-1.5 hover:border-slate-300 dark:hover:border-slate-600 transition-all hover:shadow-sm"
                          >
                            <Logo />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg text-sm">
                      <p className="font-medium">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-14 text-base font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 shadow-lg transition-all"
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

                  {/* Security Notice */}
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800/50">
                    <div className="flex gap-3">
                      <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1 text-sm">
                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                          {t('payment100Secure')}
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 text-xs">
                          {t('paymentInfoEncrypted')}. {t('neverStoreCardData')}. Vos informations sont protégées par un cryptage SSL 256-bit.
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-white dark:bg-slate-900 border shadow-sm">
                <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">Garantie 30 jours</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Satisfait ou remboursé</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-lg bg-white dark:bg-slate-900 border shadow-sm">
                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <Package className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">{t('freeShipping') || 'Livraison offerte'}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Sous 2-3 jours ouvrés</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-lg bg-white dark:bg-slate-900 border shadow-sm">
                <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-purple-600 dark:text-purple-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">Support client</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Disponible 24h/24, 7j/7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-8">
            <Card className="border-2 shadow-lg bg-white dark:bg-slate-900">
              <div className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-800/50 border-b p-5">
                <CardTitle className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                  <ShoppingCart className="h-5 w-5" />
                  {t('orderSummary') || 'Résumé'}
                </CardTitle>
              </div>
              
              <CardContent className="p-5 space-y-4">
                {/* Cart Items */}
                <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-2">
                  {cart.map((item, index) => (
                    <div 
                      key={`${item.id}-${item.description}-${index}`}
                      className="flex gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50"
                    >
                      <div className="h-14 w-14 rounded-md bg-white dark:bg-slate-900 border flex items-center justify-center flex-shrink-0">
                        <Package className="h-5 w-5 text-slate-400" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate">{item.name}</p>
                        {item.description && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.description}</p>
                        )}
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="text-xs text-slate-500 dark:text-slate-400">Qté: {item.quantity}</span>
                          <span className="font-bold text-sm text-slate-900 dark:text-slate-100">€{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Subtotals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">{t('subtotal') || 'Sous-total'}</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">€{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">{t('shipping') || 'Livraison'}</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-500">{t('free') || 'Gratuite'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">{t('vat')}</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">Incluse</span>
                  </div>
                </div>

                <Separator />

                {/* Total */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold">{t('total') || 'Total'}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">{t('totalWithVat')}</p>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      €{total.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Items Count */}
                <div className="pt-1 text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {cart.length} {cart.length === 1 ? (t('item') || 'article') : (t('items') || 'articles')} • <Lock className="inline h-3 w-3" /> {t('securePayment') || 'Paiement sécurisé'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Powered by Stripe */}
            <div className="mt-5 p-4 rounded-lg border bg-white dark:bg-slate-900 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">Sécurisé par</p>
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg viewBox="0 0 60 25" className="h-7 w-auto">
                  <path fill="#635BFF" d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 01-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 013.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 01-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.85zm-4.91.7c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 01-4.46-.93v-3.93c1.38.75 3.1 1.31 4.46 1.31.92 0 1.53-.24 1.53-1C6.26 13.77 0 14.51 0 9.95 0 7.04 2.28 5.3 5.62 5.3c1.36 0 2.72.2 4.09.75v3.88a9.23 9.23 0 00-4.1-1.06c-.86 0-1.44.25-1.44.9 0 1.85 6.29.97 6.29 5.88z"/>
                </svg>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Certifié PCI-DSS Niveau 1
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
