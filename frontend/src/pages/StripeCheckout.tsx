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
import { Loader2, CreditCard, ShoppingCart, Lock, ArrowLeft, Shield, CheckCircle2, Package, Clock, Sparkles, Award, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link, useLocation } from 'wouter';
import { SEO } from '@/components/SEO';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

// Premium Card Logos SVG Components
const VisaLogo = () => (
  <svg viewBox="0 0 48 32" className="h-8 w-auto">
    <rect width="48" height="32" rx="4" fill="white"/>
    <path d="M19.5 11.5h-2.7l-4.2 9h2.8l.8-2h3.9l.4 2h2.6l-3.6-9zm-2.1 5.5l1.4-3.8.8 3.8h-2.2z" fill="#1434CB"/>
    <path d="M24.8 11.5l-2.1 9h2.6l2.1-9h-2.6z" fill="#1434CB"/>
    <path d="M32.5 11.4c-.5-.2-1.4-.4-2.4-.4-2.6 0-4.5 1.4-4.5 3.4 0 1.5 1.3 2.3 2.3 2.8.9.5 1.3.8 1.3 1.3 0 .7-.8 1-1.6 1-1.1 0-1.6-.2-2.5-.5l-.3-.2-.4 2.3c.6.3 1.8.5 3 .5 2.8 0 4.6-1.4 4.6-3.5 0-1.2-.7-2.1-2.3-2.8-.9-.5-1.5-.8-1.5-1.3s.5-1 1.4-1c.8 0 1.4.2 1.9.4l.2.1.4-2.1z" fill="#1434CB"/>
    <path d="M39.5 11.5h-2.1c-.6 0-1.1.4-1.4 1l-3.9 8h2.8s.5-1.3.6-1.6h3.4c.1.4.3 1.6.3 1.6h2.5l-2.2-9zm-3.3 5.8c.2-.5 1-2.8 1-2.8s.2-.5.3-.9l.2.8s.4 2.1.5 2.9h-2z" fill="#1434CB"/>
  </svg>
);

const MastercardLogo = () => (
  <svg viewBox="0 0 48 32" className="h-8 w-auto">
    <rect width="48" height="32" rx="4" fill="white"/>
    <circle cx="18" cy="16" r="8" fill="#EB001B"/>
    <circle cx="30" cy="16" r="8" fill="#FF5F00"/>
    <path d="M24 9.6c-1.7 1.4-2.8 3.5-2.8 5.9s1.1 4.5 2.8 5.9c1.7-1.4 2.8-3.5 2.8-5.9s-1.1-4.5-2.8-5.9z" fill="#F79E1B"/>
  </svg>
);

const AmexLogo = () => (
  <svg viewBox="0 0 48 32" className="h-8 w-auto">
    <rect width="48" height="32" rx="4" fill="#006FCF"/>
    <path d="M10 12h3.5l.8 2 .8-2h3.5v5.5l2.5-5.5h3l2.5 5.5V12h8.4l1 2.5 1-2.5H40l-3.5 8h-3l-1-2.5-1 2.5h-8.5l-.5-1.5h-2l-.5 1.5h-3.5v-5l-2.5 5h-2l-2.5-5v5H10v-8zm23 2l1.5 3.5h-3L33 14zm-16.5 0l1.5 3.5h-3l1.5-3.5z" fill="white"/>
  </svg>
);

const DiscoverLogo = () => (
  <svg viewBox="0 0 48 32" className="h-8 w-auto">
    <rect width="48" height="32" rx="4" fill="white"/>
    <path d="M35 9h8c2.2 0 4 1.8 4 4v6c0 2.2-1.8 4-4 4h-8V9z" fill="#FF6000"/>
    <text x="8" y="20" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="#231F20">DISCOVER</text>
  </svg>
);

const DinersLogo = () => (
  <svg viewBox="0 0 48 32" className="h-8 w-auto">
    <rect width="48" height="32" rx="4" fill="white"/>
    <circle cx="24" cy="16" r="10" fill="none" stroke="#0079BE" strokeWidth="2"/>
    <path d="M18 16c0-3.3 2.7-6 6-6v12c-3.3 0-6-2.7-6-6z" fill="#0079BE"/>
    <path d="M30 16c0 3.3-2.7 6-6 6V10c3.3 0 6 2.7 6 6z" fill="#0079BE"/>
  </svg>
);

const JCBLogo = () => (
  <svg viewBox="0 0 48 32" className="h-8 w-auto">
    <rect width="48" height="32" rx="4" fill="white"/>
    <rect x="8" y="10" width="10" height="12" rx="1" fill="#0E4C96"/>
    <rect x="19" y="10" width="10" height="12" rx="1" fill="#CC0000"/>
    <rect x="30" y="10" width="10" height="12" rx="1" fill="#00A04D"/>
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
        fontSize: '17px',
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

      {/* Luxury Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-200/20 via-yellow-200/20 to-orange-200/20 dark:from-amber-600/10 dark:via-yellow-600/10 dark:to-orange-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/20 via-indigo-200/20 to-purple-200/20 dark:from-blue-600/10 dark:via-indigo-600/10 dark:to-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container relative mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Premium Header */}
        <div className="mb-12 max-w-7xl mx-auto">
          <Link href={`/${language}/payment`}>
            <Button variant="ghost" className="mb-8 group hover:bg-white/50 dark:hover:bg-slate-800/50 backdrop-blur-sm" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              {t('previous') || 'Retour'}
            </Button>
          </Link>
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-orange-500/10 dark:from-amber-500/20 dark:via-yellow-500/20 dark:to-orange-500/20 border border-amber-200 dark:border-amber-800/50 mb-4">
              <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400 animate-pulse" />
              <span className="text-sm font-medium text-amber-900 dark:text-amber-200">Premium Secure Checkout</span>
              <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400 animate-pulse" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent tracking-tight">
              {t('checkout')}
            </h1>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2 font-medium">
              <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
              {t('securedPayment')} • {t('dataProtection')}
            </p>

            {/* Trust Badges Row */}
            <div className="flex items-center justify-center gap-6 pt-4">
              <Badge variant="outline" className="flex items-center gap-2 px-4 py-2 border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/50 dark:bg-emerald-950/30 backdrop-blur-sm">
                <Lock className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
                <span className="text-emerald-800 dark:text-emerald-300 font-semibold">SSL Encrypted</span>
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <Award className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold">PCI-DSS Certified</span>
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <Star className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span className="font-semibold">Trusted by 10M+</span>
              </Badge>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 items-start">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Form Card */}
            <Card className="border-2 border-slate-200 dark:border-slate-700/50 shadow-2xl shadow-slate-900/5 dark:shadow-black/20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl overflow-hidden">
              {/* Card Header with Gradient */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
                
                <div className="relative">
                  <CardTitle className="text-3xl font-bold text-white flex items-center gap-3 mb-3">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-900/50">
                      <CreditCard className="h-7 w-7 text-white" />
                    </div>
                    {t('paymentMethod')}
                  </CardTitle>
                  <CardDescription className="text-slate-300 text-base font-medium">
                    {t('stripeDescription')}
                  </CardDescription>
                </div>
              </div>
              
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Cardholder Name */}
                  <div className="space-y-3">
                    <Label htmlFor="cardholderName" className="text-base font-semibold text-slate-900 dark:text-slate-100">
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
                      className="h-14 text-base font-medium border-2 border-slate-200 dark:border-slate-700 focus:border-slate-900 dark:focus:border-slate-100 bg-white dark:bg-slate-950 transition-all"
                      data-testid="input-cardholder-name"
                    />
                  </div>

                  {/* Stripe Card Element */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      {t('cardNumber')}
                    </Label>
                    <div className="border-2 border-slate-200 dark:border-slate-700 rounded-xl p-5 bg-white dark:bg-slate-950 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 focus-within:border-slate-900 dark:focus-within:border-slate-100 focus-within:ring-4 focus-within:ring-slate-900/10 dark:focus-within:ring-slate-100/10 shadow-sm">
                      <CardElement 
                        options={cardElementOptions}
                        onChange={(e) => setCardComplete(e.complete)}
                      />
                    </div>
                    
                    {/* Premium Card Logos */}
                    <div className="pt-4">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider">Cartes acceptées</p>
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg p-2 shadow-sm hover:shadow-md hover:scale-105 transition-all">
                          <VisaLogo />
                        </div>
                        <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg p-2 shadow-sm hover:shadow-md hover:scale-105 transition-all">
                          <MastercardLogo />
                        </div>
                        <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg p-2 shadow-sm hover:shadow-md hover:scale-105 transition-all">
                          <AmexLogo />
                        </div>
                        <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg p-2 shadow-sm hover:shadow-md hover:scale-105 transition-all">
                          <DiscoverLogo />
                        </div>
                        <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg p-2 shadow-sm hover:shadow-md hover:scale-105 transition-all">
                          <DinersLogo />
                        </div>
                        <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg p-2 shadow-sm hover:shadow-md hover:scale-105 transition-all">
                          <JCBLogo />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-5 py-4 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-2 shadow-sm">
                      <p className="font-semibold">{error}</p>
                    </div>
                  )}

                  {/* Premium Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-16 text-lg font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 hover:from-slate-800 hover:via-slate-700 hover:to-slate-800 dark:from-white dark:via-slate-100 dark:to-white dark:hover:from-slate-100 dark:hover:via-white dark:hover:to-slate-100 text-white dark:text-slate-900 shadow-2xl shadow-slate-900/30 dark:shadow-white/20 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] rounded-xl"
                    disabled={!stripe || processing || !clientSecret || !cardComplete}
                    data-testid="button-pay"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                        {t('paymentProcessing') || 'Traitement en cours'}...
                      </>
                    ) : (
                      <>
                        <Lock className="h-6 w-6 mr-3" />
                        {t('payNow') || 'Payer'} €{total.toFixed(2)}
                      </>
                    )}
                  </Button>

                  {/* Security Notice */}
                  <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-cyan-950/30 rounded-xl p-6 border-2 border-emerald-200 dark:border-emerald-800/50 shadow-sm">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-600/30">
                          <Shield className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-bold text-slate-900 dark:text-slate-100 text-base">
                          {t('payment100Secure')}
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                          {t('paymentInfoEncrypted')}. {t('neverStoreCardData')}. Vos données sont protégées par un cryptage SSL 256-bit et conformes aux normes PCI-DSS niveau 1.
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Premium Trust Indicators */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-2 border-emerald-200 dark:border-emerald-800/50 shadow-sm hover:shadow-md transition-all">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-600/30">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">Garantie Satisfait</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">30 jours pour changer d'avis</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-2 border-blue-200 dark:border-blue-800/50 shadow-sm hover:shadow-md transition-all">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-600/30">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">{t('freeShipping') || 'Livraison Offerte'}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">Expédition sous 2-3 jours</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-2 border-purple-200 dark:border-purple-800/50 shadow-sm hover:shadow-md transition-all">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-600/30">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">Support Premium</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">Disponible 24/7 pour vous</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-8">
            <Card className="border-2 border-slate-200 dark:border-slate-700/50 shadow-2xl shadow-slate-900/5 dark:shadow-black/20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl overflow-hidden">
              {/* Luxury Header */}
              <div className="bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
                
                <CardTitle className="relative flex items-center gap-3 text-2xl font-bold text-slate-900">
                  <ShoppingCart className="h-6 w-6" />
                  {t('orderSummary') || 'Résumé'}
                </CardTitle>
              </div>
              
              <CardContent className="p-6 space-y-5">
                {/* Cart Items */}
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map((item, index) => (
                    <div 
                      key={`${item.id}-${item.description}-${index}`}
                      className="flex gap-4 p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-800/30 hover:from-slate-100 hover:to-slate-100 dark:hover:from-slate-800/70 dark:hover:to-slate-800/50 transition-all border border-slate-200 dark:border-slate-700/50 shadow-sm"
                    >
                      <div className="h-16 w-16 rounded-lg bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Package className="h-7 w-7 text-slate-400 dark:text-slate-500" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">{item.name}</p>
                        {item.description && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{item.description}</p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Qty: {item.quantity}</span>
                          <span className="font-bold text-sm text-slate-900 dark:text-slate-100">€{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="bg-slate-200 dark:bg-slate-700" />

                {/* Subtotals */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">{t('subtotal') || 'Sous-total'}</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">€{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">{t('shipping') || 'Livraison'}</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-500">{t('free') || 'Gratuite'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">{t('vat')}</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">Incluse</span>
                  </div>
                </div>

                <Separator className="bg-slate-200 dark:bg-slate-700" />

                {/* Total */}
                <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50 dark:from-amber-950/30 dark:via-yellow-950/30 dark:to-amber-950/30 rounded-xl p-5 border-2 border-amber-200 dark:border-amber-800/50 shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider">{t('total') || 'Total'}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-500 font-medium mt-0.5">{t('totalWithVat')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-black bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 dark:from-amber-400 dark:via-yellow-400 dark:to-amber-400 bg-clip-text text-transparent">
                        €{total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Items Count */}
                <div className="pt-2 text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {cart.length} {cart.length === 1 ? (t('item') || 'article') : (t('items') || 'articles')} • <Lock className="inline h-3 w-3" /> {t('securePayment') || 'Paiement sécurisé'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Powered by Stripe */}
            <div className="mt-6 p-5 rounded-xl border-2 border-slate-200 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-center shadow-lg">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 font-semibold uppercase tracking-wider">Sécurisé par</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <svg viewBox="0 0 60 25" className="h-8 w-auto">
                  <path fill="#635BFF" d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 01-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 013.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 01-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.85zm-4.91.7c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 01-4.46-.93v-3.93c1.38.75 3.1 1.31 4.46 1.31.92 0 1.53-.24 1.53-1C6.26 13.77 0 14.51 0 9.95 0 7.04 2.28 5.3 5.62 5.3c1.36 0 2.72.2 4.09.75v3.88a9.23 9.23 0 00-4.1-1.06c-.86 0-1.44.25-1.44.9 0 1.85 6.29.97 6.29 5.88z"/>
                </svg>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-bold">
                  Certifié PCI-DSS Niveau 1
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--muted-foreground) / 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--muted-foreground) / 0.5);
        }
      `}</style>
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
