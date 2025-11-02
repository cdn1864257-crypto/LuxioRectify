import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { getApiUrl, fetchWithCsrf } from '@/lib/config';
import { generatePaymentReference } from '@/lib/payment-reference';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ShoppingBag, CreditCard, Zap, Copy, Check, DollarSign, Building2, Shield, Lock, ChevronDown, ChevronUp, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { SiPaypal, SiWise, SiBinance, SiWesternunion, SiMoneygram } from 'react-icons/si';
import { useSuspensionStatus } from '@/hooks/useSuspensionStatus';
import { SuspensionWarning } from '@/components/SuspensionWarning';


export default function NewPayment() {
  const { user } = useAuth();
  const { cart, total, clearCart } = useCart();
  const [, navigate] = useLocation();
  const [cartOpen, setCartOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [showBankConfirmModal, setShowBankConfirmModal] = useState(false);
  const [bankDetails, setBankDetails] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [isConfirmingOrder, setIsConfirmingOrder] = useState(false);
  const [showAlternativeMethods, setShowAlternativeMethods] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const { suspensionStatus } = useSuspensionStatus();

  // Check for OxaPay return
  const urlParams = new URLSearchParams(window.location.search);
  const paymentSuccess = urlParams.get('success') === 'true';
  const paymentCancelled = urlParams.get('cancelled') === 'true';
  const paymentPending = urlParams.get('pending') === 'true';
  const paymentError = urlParams.get('error') === 'true';
  const orderRef = urlParams.get('order');
  const fromOxaPay = paymentSuccess || paymentCancelled || paymentPending || paymentError;

  useEffect(() => {
    if (!user) {
      navigate('/?login=true');
      return;
    }

    // If returning from OxaPay with success, clear cart and show success message
    if (paymentSuccess) {
      if (cart.length > 0) {
        clearCart();
      }
      toast({
        title: t.paymentSuccessTitle,
        description: orderRef ? `${t.orderConfirmed} ${orderRef}` : t.paymentSuccessDescription,
      });
      setTimeout(() => navigate('/dashboard'), 3000);
      return;
    }

    // If returning from OxaPay with cancellation
    if (paymentCancelled) {
      toast({
        title: t.paymentCancelledTitle,
        description: t.paymentCancelledDescription,
        variant: "destructive",
      });
      return;
    }

    // If returning from OxaPay with pending status
    if (paymentPending) {
      toast({
        title: t.paymentPendingTitle,
        description: t.paymentPendingDescription,
      });
      return;
    }

    // If returning from OxaPay with error
    if (paymentError) {
      toast({
        title: t.error,
        description: t.paymentErrorDescription,
        variant: "destructive",
      });
      return;
    }
    
    // Only redirect to cart if cart is empty AND we're not returning from OxaPay
    if (cart.length === 0 && !isConfirmingOrder && !showBankModal && !fromOxaPay) {
      navigate('/cart');
      return;
    }
  }, [user, cart, navigate, isConfirmingOrder, showBankModal, paymentSuccess, paymentCancelled, paymentPending, paymentError, orderRef, clearCart, toast, fromOxaPay, t]);

  if (!user) {
    return null;
  }

  // Allow rendering if cart has items OR if returning from OxaPay OR if confirming order
  if (cart.length === 0 && !isConfirmingOrder && !showBankModal && !fromOxaPay) {
    return null;
  }

  // Generate standardized payment reference using centralized function
  const generateOrderReference = () => {
    const firstName = user?.firstName || 'User';
    const lastName = user?.lastName || '';
    const fullName = `${firstName} ${lastName}`.trim();
    // Fallback to "User" if name is empty after trimming
    return generatePaymentReference(fullName || 'User');
  };

  const generateEmailBody = (methodName: string, orderReference: string) => {
    const customerName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim();
    
    let emailBody = `${t.hello || 'Bonjour'},\n\n`;
    emailBody += `${t.emailBodyIntro || 'Je souhaite finaliser ma commande avec le moyen de paiement suivant'} : ${methodName}\n\n`;
    emailBody += `--- ${t.orderDetails || 'Détails de la commande'} ---\n`;
    emailBody += `${t.orderReference || 'Référence'} : ${orderReference}\n`;
    emailBody += `${t.customerName || 'Nom complet'} : ${customerName}\n`;
    emailBody += `${t.email || 'Email'} : ${user?.email || ''}\n\n`;
    emailBody += `${t.orderSummary || 'Récapitulatif de la commande'} :\n`;
    
    cart.forEach((item, index) => {
      emailBody += `${index + 1}. ${item.name} - ${t.quantity || 'Quantité'}: ${item.quantity} - ${(item.price * item.quantity).toFixed(2)} €\n`;
    });
    
    emailBody += `\n${t.total || 'Total'} : ${total.toFixed(2)} €\n\n`;
    emailBody += `${t.emailBodyClosing || 'Merci de me fournir les instructions de paiement pour finaliser cette commande.'}\n\n`;
    emailBody += `${t.regards || 'Cordialement'},\n${customerName}`;
    
    return emailBody;
  };

  const handleBankTransferClick = () => {
    const orderReference = generateOrderReference();
    setBankDetails({
      bankName: 'Matt Luxio',
      iban: 'ES6115632626383268707364',
      bic: 'NTSBESM1XXX',
      reference: orderReference,
      orderReference: orderReference,
      amount: total
    });
    setShowBankConfirmModal(true);
  };

  const handleBankTransferConfirm = async () => {
    setIsProcessing(true);
    setIsConfirmingOrder(true);
    try {
      const response = await fetchWithCsrf(getApiUrl('/api/payment/bank-transfer'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerEmail: user.email,
          customerName: `${user.firstName} ${user.lastName}`,
          totalAmount: total,
          cartItems: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            description: item.description
          }))
        })
      });

      const data = await response.json();

      if (data.success) {
        setShowBankConfirmModal(false);
        setShowBankModal(true);
        clearCart();
        toast({
          title: t.orderSent,
          description: t.orderConfirmationEmail
        });
      } else {
        throw new Error(data.error || t.orderFailed);
      }
    } catch (error) {
      console.error('Bank transfer error:', error);
      toast({
        title: t.error,
        description: error instanceof Error ? error.message : t.orderFailed,
        variant: 'destructive'
      });
      setIsConfirmingOrder(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOxaPay = async () => {
    setIsProcessing(true);
    toast({
      title: t.redirectingToCryptoPayment,
      description: t.redirectingToOxaPayDescription
    });

    try {
      const response = await fetchWithCsrf(getApiUrl('/api/payment/oxapay-init'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerEmail: user.email,
          customerName: `${user.firstName} ${user.lastName}`,
          totalAmount: total,
          language: language,
          cartItems: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            description: item.description
          }))
        })
      });

      const data = await response.json();

      if (data.success && data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        throw new Error(data.error || t.paymentInitError);
      }
    } catch (error) {
      console.error('OxaPay error:', error);
      toast({
        title: t.error,
        description: error instanceof Error ? error.message : t.orderFailed,
        variant: 'destructive'
      });
      setIsProcessing(false);
    }
  };


  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get translated email subject
  const getEmailSubject = (methodName: string) => {
    return t.alternativePaymentEmailSubject?.replace('{method}', methodName).replace('{amount}', total.toFixed(2)) 
      || `Paiement via ${methodName} - Commande ${total.toFixed(2)}€`;
  };

  const alternativePaymentMethods = [
    { name: 'PayPal', icon: SiPaypal, key: 'paypal', color: '#003087' },
    { name: 'Wise', icon: SiWise, key: 'wise', color: '#37517E' },
    { name: 'Binance', icon: SiBinance, key: 'binance', color: '#F3BA2F' },
    { name: 'Western Union', icon: SiWesternunion, key: 'western-union', color: '#FFCC00' },
    { name: 'MoneyGram', icon: SiMoneygram, key: 'moneygram', color: '#E2231A' },
    { name: 'Worldremit', icon: DollarSign, key: 'worldremit', color: '#813FD6' },
    { name: 'Ria', icon: DollarSign, key: 'ria', color: '#ED1C24' },
    { name: 'Transcash', icon: CreditCard, key: 'transcash', color: '#0066CC' },
    { name: 'PCS', icon: CreditCard, key: 'pcs', color: '#00A99D' }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onToggleCart={() => setCartOpen(!cartOpen)} />
      
      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/cart">
            <Button variant="ghost" className="mb-6" data-testid="button-back-to-cart">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t.backToCart}
            </Button>
          </Link>

          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2" data-testid="text-payment-title">
              {t.paymentMethod}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {t.choosePaymentMethod}
            </p>
          </div>

          {suspensionStatus?.isSuspended && (
            <div className="mb-6">
              <SuspensionWarning
                suspendedUntilFormatted={suspensionStatus.suspendedUntilFormatted}
                unpaidOrdersCount={suspensionStatus.unpaidOrdersCount}
                variant="error"
              />
            </div>
          )}

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <ShoppingBag className="h-5 w-5" />
                {t.orderSummary}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {t.quantity}: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold whitespace-nowrap">
                      {(item.price * item.quantity).toFixed(2)} €
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t space-y-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>{t.total}</span>
                  <span className="text-primary" data-testid="text-total-amount">
                    {total.toFixed(2)} €
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <CreditCard className="h-5 w-5" />
                {t.selectPaymentMethod}
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                {t.allTransactionsSecured}
              </CardDescription>
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 pt-4 border-t">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="font-medium">SSL {t.securePayment || 'Sécurisé'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Lock className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="font-medium">{t.dataProtection || 'Données Protégées'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="font-medium">{t.verifiedPayment}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="space-y-4 sm:space-y-6">
                {/* Bank Transfer Method */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm sm:text-base font-semibold flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary flex-shrink-0" />
                      {t.mainPaymentMethod || 'Virement Bancaire'}
                    </h3>
                  </div>
                  <button
                    type="button"
                    className="w-full p-3 sm:p-4 border-2 border-muted rounded-lg bg-background hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleBankTransferClick}
                    disabled={isProcessing || suspensionStatus?.isSuspended}
                    data-testid="button-bank-transfer"
                  >
                    <div className="flex items-center justify-start gap-3 sm:gap-4">
                      <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-foreground flex-shrink-0" />
                      <div className="text-left flex-1 min-w-0">
                        <div className="font-semibold text-base sm:text-lg text-foreground">{t.bankTransfer}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">{t.bankTransferDescription}</div>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Payment Method Separator */}
                <div className="relative py-4 sm:py-5">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs sm:text-sm uppercase">
                    <span className="bg-background px-3 sm:px-4 text-muted-foreground font-medium">
                      {t.or || 'ou'}
                    </span>
                  </div>
                </div>

                {/* Stripe Method */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm sm:text-base font-semibold flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary flex-shrink-0" />
                      {t.cardPayment}
                    </h3>
                    <span className="text-xs bg-red-600 text-white px-2 py-1 rounded whitespace-nowrap">
                      {t.stripeUnavailable}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="w-full p-3 sm:p-4 border-2 border-muted rounded-lg bg-muted/50 cursor-not-allowed opacity-60"
                    disabled
                    onClick={() => {
                      toast({
                        title: t.stripeUnavailable,
                        description: t.stripeUnavailableMessage,
                        variant: 'destructive'
                      });
                    }}
                    data-testid="button-stripe"
                  >
                    <div className="flex items-center justify-start gap-3 sm:gap-4">
                      <CreditCard className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground flex-shrink-0" />
                      <div className="text-left flex-1 min-w-0">
                        <div className="font-semibold text-base sm:text-lg text-muted-foreground">{t.stripe}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">{t.stripeDescription}</div>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Payment Method Separator */}
                <div className="relative py-4 sm:py-5">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs sm:text-sm uppercase">
                    <span className="bg-background px-3 sm:px-4 text-muted-foreground font-medium">
                      {t.or || 'ou'}
                    </span>
                  </div>
                </div>

                {/* OxaPay Method */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm sm:text-base font-semibold flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary flex-shrink-0" />
                      {t.recommendedMethod || 'Méthode Recommandée'}
                    </h3>
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded whitespace-nowrap">
                      {t.recommended}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="w-full p-3 sm:p-4 border-2 border-muted rounded-lg bg-background hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleOxaPay}
                    disabled={isProcessing || suspensionStatus?.isSuspended}
                    data-testid="button-oxapay"
                  >
                    <div className="flex items-center justify-start gap-3 sm:gap-4">
                      <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-foreground flex-shrink-0" />
                      <div className="text-left flex-1 min-w-0">
                        <div className="font-semibold text-base sm:text-lg text-foreground">{t.oxaPay}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">{t.oxaPayDescription}</div>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Payment Method Separator */}
                <div className="relative py-4 sm:py-5">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs sm:text-sm uppercase">
                    <span className="bg-background px-3 sm:px-4 text-muted-foreground font-medium">
                      {t.or || 'ou'}
                    </span>
                  </div>
                </div>

                {/* Alternative Payment Methods - Collapsible */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowAlternativeMethods(!showAlternativeMethods)}
                    className="w-full flex items-center justify-between gap-2 mb-3"
                    data-testid="button-toggle-alternative-methods"
                  >
                    <h3 className="text-sm sm:text-base font-semibold flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary flex-shrink-0" />
                      {t.alternativePaymentMethods}
                    </h3>
                    {showAlternativeMethods ? (
                      <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-primary flex-shrink-0" />
                    )}
                  </button>
                  
                  {showAlternativeMethods && (
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-4">
                        {alternativePaymentMethods.map((method) => {
                          const IconComponent = method.icon;
                          return (
                            <button
                              key={method.key}
                              type="button"
                              className="p-3 sm:p-4 border-2 border-muted rounded-lg bg-background hover:bg-accent transition-colors text-center group"
                              onClick={() => {
                                const orderReference = generateOrderReference();
                                const emailSubject = getEmailSubject(method.name);
                                const emailBody = generateEmailBody(method.name, orderReference);
                                window.location.href = `mailto:support@luxiomarket.shop?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                              }}
                              data-testid={`button-${method.key}`}
                            >
                              <div className="flex flex-col items-center gap-2">
                                <div 
                                  className="text-2xl sm:text-3xl transition-transform group-hover:scale-110"
                                  style={{ color: method.color }}
                                >
                                  <IconComponent />
                                </div>
                                <div className="text-xs sm:text-sm font-medium break-words w-full">{method.name}</div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-3 sm:p-4 rounded-lg">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 font-medium mb-2">
                              {t.alternativePaymentInstructionsTitle || 'Comment procéder ?'}
                            </p>
                            <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                              {t.alternativePaymentInstructions || 'Cliquez sur le moyen de paiement de votre choix ci-dessus. Cela ouvrira votre application email avec un message pré-rempli. Envoyez ce message à notre service pour finaliser votre commande. Notre équipe vous répondra dans les plus brefs délais avec les instructions de paiement détaillées.'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {!showAlternativeMethods && (
                    <p className="text-xs sm:text-sm text-muted-foreground text-center">
                      {t.clickToViewAlternativeMethods || 'Cliquez pour voir les autres moyens de paiement disponibles'}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Dialog open={showBankConfirmModal} onOpenChange={setShowBankConfirmModal}>
        <DialogContent className="max-h-[90vh] overflow-y-auto w-[95vw] max-w-lg mx-4 sm:mx-auto" data-testid="dialog-bank-confirm">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="text-2xl sm:text-3xl font-bold text-primary">Luxio</div>
            </div>
            <DialogTitle className="text-center text-base sm:text-lg md:text-xl">{t.bankTransferTitle}</DialogTitle>
            <DialogDescription className="text-center text-sm sm:text-base">
              {t.verifyTransferDetails}
            </DialogDescription>
          </DialogHeader>
          {bankDetails && (
            <div className="space-y-4">
              <div className="p-3 sm:p-4 bg-accent rounded-lg space-y-3">
                <div>
                  <Label className="text-xs sm:text-sm text-muted-foreground">{t.beneficiary}</Label>
                  <p className="font-semibold text-sm sm:text-base break-words">{bankDetails.bankName}</p>
                </div>
                <div>
                  <Label className="text-xs sm:text-sm text-muted-foreground">IBAN</Label>
                  <div className="flex items-center gap-2">
                    <p className="font-mono font-semibold text-xs sm:text-sm flex-1 break-all">{bankDetails.iban}</p>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="flex-shrink-0"
                      onClick={() => copyToClipboard(bankDetails.iban)}
                      data-testid="button-copy-iban-confirm"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-xs sm:text-sm text-muted-foreground">BIC</Label>
                  <p className="font-mono font-semibold text-xs sm:text-sm break-all">{bankDetails.bic}</p>
                </div>
                <div>
                  <Label className="text-xs sm:text-sm text-muted-foreground">{t.orderReference}</Label>
                  <p className="font-semibold text-sm sm:text-base text-primary break-words">{bankDetails.orderReference}</p>
                </div>
                <div className="pt-2 border-t">
                  <Label className="text-xs sm:text-sm text-muted-foreground">{t.amountToTransfer}</Label>
                  <p className="font-bold text-xl sm:text-2xl text-primary">{bankDetails.amount.toFixed(2)} €</p>
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-3 rounded-lg">
                <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 font-medium">
                  📋 {t.instructionsLabel}
                </p>
                <ul className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 mt-2 space-y-1 list-disc list-inside">
                  <li>{t.transferInstruction1Short}</li>
                  <li>{t.transferInstruction2Short} : <strong>{bankDetails.orderReference}</strong></li>
                  <li>{t.emailConfirmation}</li>
                </ul>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 p-3 rounded-lg space-y-2">
                <p className="text-xs sm:text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>✅ {t.immediateTransfer} :</strong> {t.delivery24h}
                </p>
                <p className="text-xs sm:text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>⏱️ {t.standardTransfer} :</strong> {t.delivery4872h}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => setShowBankConfirmModal(false)} 
                  variant="outline" 
                  className="flex-1 text-sm sm:text-base"
                  disabled={isProcessing}
                  data-testid="button-cancel-bank-transfer"
                >
                  {t.noCancel}
                </Button>
                <Button 
                  onClick={handleBankTransferConfirm} 
                  className="flex-1 text-sm sm:text-base"
                  disabled={isProcessing}
                  data-testid="button-confirm-bank-transfer"
                >
                  {isProcessing ? t.processing : t.yesProceedTransfer}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showBankModal} onOpenChange={(open) => {
        if (!open) {
          setShowBankModal(false);
          setIsConfirmingOrder(false);
          navigate('/dashboard');
        }
      }}>
        <DialogContent className="max-h-[90vh] overflow-y-auto w-[95vw] max-w-lg mx-4 sm:mx-auto" data-testid="dialog-bank-transfer">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="text-2xl sm:text-3xl font-bold text-primary">Luxio</div>
            </div>
            <DialogTitle className="text-center text-base sm:text-lg md:text-xl">{t.bankTransferTitle}</DialogTitle>
            <DialogDescription className="text-center text-sm sm:text-base">
              {t.transferInstructions}
            </DialogDescription>
          </DialogHeader>
          {bankDetails && (
            <div className="space-y-4">
              <div className="text-center pb-3 border-b">
                <Label className="text-xs sm:text-sm text-muted-foreground">{t.orderNumber}</Label>
                <p className="font-bold text-base sm:text-lg text-primary break-words">{bankDetails.orderReference}</p>
              </div>
              <div className="p-3 sm:p-4 bg-accent rounded-lg space-y-3">
                <div>
                  <Label className="text-xs sm:text-sm text-muted-foreground">{t.name}</Label>
                  <p className="font-semibold text-sm sm:text-base break-words">{bankDetails.bankName}</p>
                </div>
                <div>
                  <Label className="text-xs sm:text-sm text-muted-foreground">IBAN</Label>
                  <div className="flex items-center gap-2">
                    <p className="font-mono font-semibold text-xs sm:text-sm flex-1 break-all">{bankDetails.iban}</p>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="flex-shrink-0"
                      onClick={() => copyToClipboard(bankDetails.iban)}
                      data-testid="button-copy-iban"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-xs sm:text-sm text-muted-foreground">BIC</Label>
                  <p className="font-mono font-semibold text-xs sm:text-sm break-all">{bankDetails.bic}</p>
                </div>
                <div>
                  <Label className="text-xs sm:text-sm text-muted-foreground">{t.reference}</Label>
                  <p className="font-semibold text-sm sm:text-base text-destructive break-words">{bankDetails.reference}</p>
                </div>
                <div className="pt-2 border-t">
                  <Label className="text-xs sm:text-sm text-muted-foreground">{t.amount}</Label>
                  <p className="font-bold text-xl sm:text-2xl text-primary">{bankDetails.amount.toFixed(2)} €</p>
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-3 rounded-lg space-y-2">
                <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200">
                  <strong>✅ {t.immediateTransfer} :</strong> {t.delivery24h}
                </p>
                <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200">
                  <strong>⏱️ {t.standardTransfer} :</strong> {t.delivery4872h}
                </p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 p-3 rounded-lg">
                <p className="text-xs sm:text-sm text-yellow-800 dark:text-yellow-200 font-medium">
                  ⚠️ {t.importantReferenceNote} "{bankDetails.reference}"
                </p>
              </div>
              <Button onClick={() => {
                setShowBankModal(false);
                setIsConfirmingOrder(false);
                navigate('/dashboard');
              }} className="w-full text-sm sm:text-base" data-testid="button-close-bank-modal">
                {t.understood}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />

      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
