import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { getApiUrl, fetchWithCsrf } from '@/lib/config';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ShoppingBag, CreditCard, Zap, Copy, Check, DollarSign, Building2, Shield, Lock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';


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
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  // Check for NowPayments return
  const urlParams = new URLSearchParams(window.location.search);
  const paymentSuccess = urlParams.get('success') === 'true';
  const paymentCancelled = urlParams.get('cancelled') === 'true';
  const paymentPending = urlParams.get('pending') === 'true';
  const paymentError = urlParams.get('error') === 'true';
  const orderRef = urlParams.get('order');
  const fromNowPayments = paymentSuccess || paymentCancelled || paymentPending || paymentError;

  useEffect(() => {
    if (!user) {
      navigate('/?login=true');
      return;
    }

    // If returning from NowPayments with success, clear cart and show success message
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

    // If returning from NowPayments with cancellation
    if (paymentCancelled) {
      toast({
        title: t.paymentCancelledTitle,
        description: t.paymentCancelledDescription,
        variant: "destructive",
      });
      return;
    }

    // If returning from NowPayments with pending status
    if (paymentPending) {
      toast({
        title: t.paymentPendingTitle,
        description: t.paymentPendingDescription,
      });
      return;
    }

    // If returning from NowPayments with error
    if (paymentError) {
      toast({
        title: t.error,
        description: t.paymentErrorDescription,
        variant: "destructive",
      });
      return;
    }
    
    // Only redirect to cart if cart is empty AND we're not returning from NowPayments
    if (cart.length === 0 && !isConfirmingOrder && !showBankModal && !fromNowPayments) {
      navigate('/cart');
      return;
    }
  }, [user, cart, navigate, isConfirmingOrder, showBankModal, paymentSuccess, paymentCancelled, paymentPending, paymentError, orderRef, clearCart, toast, fromNowPayments, t]);

  if (!user) {
    return null;
  }

  // Allow rendering if cart has items OR if returning from NowPayments OR if confirming order
  if (cart.length === 0 && !isConfirmingOrder && !showBankModal && !fromNowPayments) {
    return null;
  }

  const handleBankTransferClick = () => {
    const orderReference = `LX-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
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
            quantity: item.quantity
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
        throw new Error(data.error);
      }
    } catch (error) {
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

  const handleNowPayments = async () => {
    setIsProcessing(true);
    toast({
      title: t.redirectingToCryptoPayment,
      description: t.redirectingToNowPaymentsDescription
    });

    try {
      const response = await fetchWithCsrf(getApiUrl('/api/payment/nowpayments-init'), {
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
            quantity: item.quantity
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onToggleCart={() => setCartOpen(!cartOpen)} />
      
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/cart">
            <Button variant="ghost" className="mb-6" data-testid="button-back-to-cart">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t.backToCart}
            </Button>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-payment-title">
              {t.paymentMethod}
            </h1>
            <p className="text-muted-foreground">
              {t.choosePaymentMethod}
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                {t.orderSummary}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {t.quantity}: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
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
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                {t.selectPaymentMethod}
              </CardTitle>
              <CardDescription>
                {t.allTransactionsSecured}
              </CardDescription>
              <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="font-medium">SSL {t.securePayment || 'Sécurisé'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4 text-green-600" />
                  <span className="font-medium">{t.dataProtection || 'Données Protégées'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="font-medium">{t.verifiedPayment}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 border rounded-lg bg-accent/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold">{t.nowPayments}</p>
                      <p className="text-sm text-muted-foreground">{t.nowPaymentsDescription}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                    {t.recommended}
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {/* Main Payment Method - Bank Transfer */}
                <div className="p-4 border-2 border-primary rounded-lg bg-accent/50">
                  <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    {t.mainPaymentMethod || 'Main Payment Method'}
                  </h3>
                  <button
                    type="button"
                    className="w-full p-4 border-2 border-primary rounded-lg bg-background hover:bg-accent transition-colors"
                    onClick={handleBankTransferClick}
                    data-testid="button-bank-transfer"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <Building2 className="h-8 w-8 text-primary" />
                      <div className="text-left">
                        <div className="font-semibold text-lg">{t.bankTransfer}</div>
                        <div className="text-sm text-muted-foreground">{t.bankTransferDescription}</div>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Alternative Payment Methods */}
                <div className="p-4 border rounded-lg bg-accent/30">
                  <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    {t.alternativePaymentMethods}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    {[
                      { name: 'PayPal', icon: '💳', key: 'paypal' },
                      { name: 'Worldremit', icon: '🌍', key: 'worldremit' },
                      { name: 'Wise', icon: '💚', key: 'wise' },
                      { name: 'Binance', icon: '🟡', key: 'binance' },
                      { name: 'Western Union', icon: '💰', key: 'western-union' },
                      { name: 'MoneyGram', icon: '💵', key: 'moneygram' },
                      { name: 'Ria', icon: '🏦', key: 'ria' },
                      { name: 'Transcash', icon: '🎫', key: 'transcash' },
                      { name: 'PCS', icon: '💎', key: 'pcs' }
                    ].map((method) => (
                      <button
                        key={method.key}
                        type="button"
                        className="p-3 border rounded-lg bg-background hover:bg-accent transition-colors text-center"
                        onClick={() => {
                          window.location.href = 'mailto:infos@luxiomarket.shop?subject=' + encodeURIComponent(`Payment via ${method.name}`);
                        }}
                        data-testid={`button-${method.key}`}
                      >
                        <div className="text-2xl mb-1">{method.icon}</div>
                        <div className="text-xs font-medium">{method.name}</div>
                      </button>
                    ))}
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-3 rounded-lg">
                    <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 text-center font-medium">
                      📧 {t.alternativePaymentMessage}
                    </p>
                  </div>
                </div>
              </div>


              <Button
                onClick={handleNowPayments}
                disabled={isProcessing}
                className="w-full"
                size="lg"
                data-testid="button-pay-now"
              >
                {isProcessing ? t.loading : t.payNow}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Dialog open={showBankConfirmModal} onOpenChange={setShowBankConfirmModal}>
        <DialogContent className="w-[95vw] max-w-[95vw] sm:w-[90vw] sm:max-w-[90vw] md:w-full md:max-w-lg mx-auto" data-testid="dialog-bank-confirm">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="text-2xl sm:text-3xl font-bold text-primary">Luxio</div>
            </div>
            <DialogTitle className="text-center text-lg sm:text-xl">{t.bankTransferTitle}</DialogTitle>
            <DialogDescription className="text-center text-sm sm:text-base">
              {t.verifyTransferDetails}
            </DialogDescription>
          </DialogHeader>
          {bankDetails && (
            <div className="space-y-4">
              <div className="p-4 bg-accent rounded-lg space-y-3">
                <div>
                  <Label className="text-sm text-muted-foreground">{t.beneficiary}</Label>
                  <p className="font-semibold break-words">{bankDetails.bankName}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">IBAN</Label>
                  <div className="flex items-center gap-2">
                    <p className="font-mono font-semibold flex-1 break-all">{bankDetails.iban}</p>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => copyToClipboard(bankDetails.iban)}
                      data-testid="button-copy-iban-confirm"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">BIC</Label>
                  <p className="font-mono font-semibold break-all">{bankDetails.bic}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">{t.orderReference}</Label>
                  <p className="font-semibold text-primary break-words">{bankDetails.orderReference}</p>
                </div>
                <div className="pt-2 border-t">
                  <Label className="text-sm text-muted-foreground">{t.amountToTransfer}</Label>
                  <p className="font-bold text-2xl text-primary">{bankDetails.amount.toFixed(2)} €</p>
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-3 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                  📋 {t.instructionsLabel}
                </p>
                <ul className="text-sm text-blue-800 dark:text-blue-200 mt-2 space-y-1 list-disc list-inside">
                  <li>{t.transferInstruction1Short}</li>
                  <li>{t.transferInstruction2Short} : <strong>{bankDetails.orderReference}</strong></li>
                  <li>{t.emailConfirmation}</li>
                </ul>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 p-3 rounded-lg space-y-2">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>✅ {t.immediateTransfer} :</strong> {t.delivery24h}
                </p>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>⏱️ {t.standardTransfer} :</strong> {t.delivery4872h}
                </p>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={() => setShowBankConfirmModal(false)} 
                  variant="outline" 
                  className="flex-1"
                  disabled={isProcessing}
                  data-testid="button-cancel-bank-transfer"
                >
                  {t.noCancel}
                </Button>
                <Button 
                  onClick={handleBankTransferConfirm} 
                  className="flex-1"
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
        <DialogContent className="w-[95vw] max-w-[95vw] sm:w-[90vw] sm:max-w-[90vw] md:w-full md:max-w-lg mx-auto" data-testid="dialog-bank-transfer">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="text-2xl sm:text-3xl font-bold text-primary">Luxio</div>
            </div>
            <DialogTitle className="text-center text-lg sm:text-xl">{t.bankTransferTitle}</DialogTitle>
            <DialogDescription className="text-center text-sm sm:text-base">
              {t.transferInstructions}
            </DialogDescription>
          </DialogHeader>
          {bankDetails && (
            <div className="space-y-4">
              <div className="text-center pb-3 border-b">
                <Label className="text-sm text-muted-foreground">{t.orderNumber}</Label>
                <p className="font-bold text-lg text-primary break-words">{bankDetails.orderReference}</p>
              </div>
              <div className="p-4 bg-accent rounded-lg space-y-3">
                <div>
                  <Label className="text-sm text-muted-foreground">{t.name}</Label>
                  <p className="font-semibold break-words">{bankDetails.bankName}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">IBAN</Label>
                  <div className="flex items-center gap-2">
                    <p className="font-mono font-semibold flex-1 break-all">{bankDetails.iban}</p>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => copyToClipboard(bankDetails.iban)}
                      data-testid="button-copy-iban"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">BIC</Label>
                  <p className="font-mono font-semibold break-all">{bankDetails.bic}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">{t.reference}</Label>
                  <p className="font-semibold text-destructive break-words">{bankDetails.reference}</p>
                </div>
                <div className="pt-2 border-t">
                  <Label className="text-sm text-muted-foreground">{t.amount}</Label>
                  <p className="font-bold text-2xl text-primary">{bankDetails.amount.toFixed(2)} €</p>
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-3 rounded-lg space-y-2">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>✅ {t.immediateTransfer} :</strong> {t.delivery24h}
                </p>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>⏱️ {t.standardTransfer} :</strong> {t.delivery4872h}
                </p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 p-3 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
                  ⚠️ {t.importantReferenceNote} "{bankDetails.reference}"
                </p>
              </div>
              <Button onClick={() => {
                setShowBankModal(false);
                setIsConfirmingOrder(false);
                navigate('/dashboard');
              }} className="w-full" data-testid="button-close-bank-modal">
                {t.viewMyOrders}
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
