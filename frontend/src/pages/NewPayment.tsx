import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { getApiUrl } from '@/lib/config';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ShoppingBag, CreditCard, Building2, Ticket, Zap, X, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

type PaymentMethod = 'bank-transfer' | 'nowpayments' | 'pcs-transcash';
type TicketType = 'PCS' | 'TransCash';

interface TicketCode {
  code: string;
  amount: number;
}

export default function NewPayment() {
  const { user } = useAuth();
  const { cart, total, clearCart } = useCart();
  const [, navigate] = useLocation();
  const [cartOpen, setCartOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('nowpayments');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [showBankConfirmModal, setShowBankConfirmModal] = useState(false);
  const [bankDetails, setBankDetails] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [ticketType, setTicketType] = useState<TicketType>('PCS');
  const [ticketCodes, setTicketCodes] = useState<TicketCode[]>([{ code: '', amount: 0 }]);
  const [isConfirmingOrder, setIsConfirmingOrder] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
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
        title: "Paiement réussi !",
        description: orderRef ? `Commande ${orderRef} confirmée` : "Votre commande a été confirmée",
      });
      setTimeout(() => navigate('/dashboard'), 3000);
      return;
    }

    // If returning from NowPayments with cancellation
    if (paymentCancelled) {
      toast({
        title: "Paiement annulé",
        description: "Le paiement a été annulé. Votre panier est toujours disponible.",
        variant: "destructive",
      });
      return;
    }

    // If returning from NowPayments with pending status
    if (paymentPending) {
      toast({
        title: "Paiement en attente",
        description: "Votre paiement est en cours de traitement. Vous recevrez une confirmation par email.",
      });
      return;
    }

    // If returning from NowPayments with error
    if (paymentError) {
      toast({
        title: t.error,
        description: "Une erreur s'est produite lors du paiement. Veuillez réessayer.",
        variant: "destructive",
      });
      return;
    }
    
    // Only redirect to cart if cart is empty AND we're not returning from NowPayments
    if (cart.length === 0 && !isConfirmingOrder && !showBankModal && !showTicketModal && !fromNowPayments) {
      navigate('/cart');
      return;
    }
  }, [user, cart, navigate, isConfirmingOrder, showBankModal, showTicketModal, paymentSuccess, paymentCancelled, paymentPending, paymentError, orderRef, clearCart, toast, fromNowPayments, t]);

  if (!user) {
    return null;
  }

  // Allow rendering if cart has items OR if returning from NowPayments OR if confirming order
  if (cart.length === 0 && !isConfirmingOrder && !showBankModal && !showTicketModal && !fromNowPayments) {
    return null;
  }

  const ticketTotal = ticketCodes.reduce((sum, ticket) => sum + (ticket.amount || 0), 0);

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
      const response = await fetch(getApiUrl('/api/payment/bank-transfer'), {
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
      title: t.redirectingToCryptoPayment || "Redirection vers NOWPayments",
      description: "Vous allez être redirigé vers la page de paiement sécurisée..."
    });

    try {
      const response = await fetch(getApiUrl('/api/payment/nowpayments-init'), {
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

  const handleTicketPayment = async () => {
    const validCodes = ticketCodes.filter(t => t.code.trim() !== '' && t.amount > 0);
    
    if (validCodes.length === 0) {
      toast({
        title: t.error,
        description: t.enterTicketCode,
        variant: 'destructive'
      });
      return;
    }

    if (ticketTotal < total) {
      toast({
        title: t.error,
        description: t.insufficientAmount,
        variant: 'destructive'
      });
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch(getApiUrl('/api/payment/submit-order'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerEmail: user.email,
          customerName: `${user.firstName} ${user.lastName}`,
          productId: cart[0]?.id || 'multi',
          productName: cart.length === 1 ? cart[0].name : `${cart.length} produits`,
          productModel: undefined,
          productPrice: total,
          totalAmount: total,
          codeType: ticketType,
          codes: validCodes.map(t => t.code)
        })
      });

      const data = await response.json();

      if (data.success) {
        clearCart();
        setShowTicketModal(true);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast({
        title: t.error,
        description: error instanceof Error ? error.message : t.orderFailed,
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayment = () => {
    if (paymentMethod === 'bank-transfer') {
      handleBankTransferClick();
    } else if (paymentMethod === 'nowpayments') {
      handleNowPayments();
    } else if (paymentMethod === 'pcs-transcash') {
      handleTicketPayment();
    }
  };

  const addTicketCode = () => {
    setTicketCodes([...ticketCodes, { code: '', amount: 0 }]);
  };

  const removeTicketCode = (index: number) => {
    if (ticketCodes.length > 1) {
      setTicketCodes(ticketCodes.filter((_, i) => i !== index));
    }
  };

  const updateTicketCode = (index: number, field: 'code' | 'amount', value: string | number) => {
    const updated = [...ticketCodes];
    if (field === 'code') {
      updated[index].code = value as string;
    } else {
      updated[index].amount = Number(value);
    }
    setTicketCodes(updated);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isPaymentReady = () => {
    if (paymentMethod === 'pcs-transcash') {
      return ticketTotal >= total && ticketCodes.some(t => t.code.trim() !== '');
    }
    return true;
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
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-accent" onClick={() => setPaymentMethod('nowpayments')}>
                  <RadioGroupItem value="nowpayments" id="nowpayments" data-testid="radio-nowpayments" />
                  <Label htmlFor="nowpayments" className="flex-1 cursor-pointer">
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
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-accent" onClick={() => setPaymentMethod('bank-transfer')}>
                  <RadioGroupItem value="bank-transfer" id="bank-transfer" data-testid="radio-bank-transfer" />
                  <Label htmlFor="bank-transfer" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      <div>
                        <p className="font-semibold">{t.bankTransfer}</p>
                        <p className="text-sm text-muted-foreground">{t.bankTransferDescription}</p>
                      </div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-accent" onClick={() => setPaymentMethod('pcs-transcash')}>
                  <RadioGroupItem value="pcs-transcash" id="pcs-transcash" data-testid="radio-pcs-transcash" />
                  <Label htmlFor="pcs-transcash" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Ticket className="h-5 w-5" />
                      <div>
                        <p className="font-semibold">{t.ticketsPCS}</p>
                        <p className="text-sm text-muted-foreground">{t.prepaidTicketsDescription}</p>
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === 'pcs-transcash' && (
                <div className="space-y-4 p-4 bg-accent rounded-lg">
                  <div className="space-y-2">
                    <Label>{t.ticketCode}</Label>
                    <RadioGroup value={ticketType} onValueChange={(value) => setTicketType(value as TicketType)}>
                      <div className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="PCS" id="pcs" />
                          <Label htmlFor="pcs">PCS</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="TransCash" id="transcash" />
                          <Label htmlFor="transcash">TransCash</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    {ticketCodes.map((ticket, index) => (
                      <div key={index} className="flex gap-2 items-end">
                        <div className="flex-1">
                          <Label htmlFor={`code-${index}`}>Code {index + 1}</Label>
                          <Input
                            id={`code-${index}`}
                            placeholder={t.ticketCodePlaceholder}
                            value={ticket.code}
                            onChange={(e) => updateTicketCode(index, 'code', e.target.value)}
                            data-testid={`input-ticket-code-${index}`}
                          />
                        </div>
                        <div className="w-32">
                          <Label htmlFor={`amount-${index}`}>{t.amount}</Label>
                          <Input
                            id={`amount-${index}`}
                            type="number"
                            placeholder="0.00"
                            value={ticket.amount || ''}
                            onChange={(e) => updateTicketCode(index, 'amount', e.target.value)}
                            data-testid={`input-ticket-amount-${index}`}
                          />
                        </div>
                        {ticketCodes.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeTicketCode(index)}
                            data-testid={`button-remove-ticket-${index}`}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTicketCode}
                    className="w-full"
                    data-testid="button-add-ticket"
                  >
                    {t.addTicketCode}
                  </Button>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{t.ticketsTotal}:</span>
                      <span className="font-bold text-lg">{ticketTotal.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{t.requiredAmount}:</span>
                      <span className="text-sm">{total.toFixed(2)} €</span>
                    </div>
                    {ticketTotal > 0 && ticketTotal < total && (
                      <p className="text-sm text-destructive mt-2">{t.missingAmount}: {(total - ticketTotal).toFixed(2)} €</p>
                    )}
                    {ticketTotal >= total && (
                      <p className="text-sm text-green-600 mt-2">✓ {t.amountValidated}</p>
                    )}
                  </div>
                </div>
              )}

              <Button
                onClick={handlePayment}
                disabled={isProcessing || !isPaymentReady()}
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
        <DialogContent className="max-w-lg" data-testid="dialog-bank-confirm">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="text-3xl font-bold text-primary">Luxio</div>
            </div>
            <DialogTitle className="text-center">{t.bankTransferTitle}</DialogTitle>
            <DialogDescription className="text-center">
              {t.verifyTransferDetails}
            </DialogDescription>
          </DialogHeader>
          {bankDetails && (
            <div className="space-y-4">
              <div className="p-4 bg-accent rounded-lg space-y-3">
                <div>
                  <Label className="text-sm text-muted-foreground">{t.beneficiary}</Label>
                  <p className="font-semibold">{bankDetails.bankName}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">IBAN</Label>
                  <div className="flex items-center gap-2">
                    <p className="font-mono font-semibold flex-1">{bankDetails.iban}</p>
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
                  <p className="font-mono font-semibold">{bankDetails.bic}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">{t.orderReference}</Label>
                  <p className="font-semibold text-primary">{bankDetails.orderReference}</p>
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
        <DialogContent className="max-w-lg" data-testid="dialog-bank-transfer">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="text-3xl font-bold text-primary">Luxio</div>
            </div>
            <DialogTitle className="text-center">{t.bankTransferTitle}</DialogTitle>
            <DialogDescription className="text-center">
              {t.transferInstructions}
            </DialogDescription>
          </DialogHeader>
          {bankDetails && (
            <div className="space-y-4">
              <div className="text-center pb-3 border-b">
                <Label className="text-sm text-muted-foreground">{t.orderNumber}</Label>
                <p className="font-bold text-lg text-primary">{bankDetails.orderReference}</p>
              </div>
              <div className="p-4 bg-accent rounded-lg space-y-3">
                <div>
                  <Label className="text-sm text-muted-foreground">{t.name}</Label>
                  <p className="font-semibold">{bankDetails.bankName}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">IBAN</Label>
                  <div className="flex items-center gap-2">
                    <p className="font-mono font-semibold flex-1">{bankDetails.iban}</p>
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
                  <p className="font-mono font-semibold">{bankDetails.bic}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">{t.reference}</Label>
                  <p className="font-semibold text-destructive">{bankDetails.reference}</p>
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

      <Dialog open={showTicketModal} onOpenChange={(open) => {
        if (!open) {
          setShowTicketModal(false);
          navigate('/dashboard');
        }
      }}>
        <DialogContent className="max-w-lg" data-testid="dialog-ticket-confirmation">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="text-3xl font-bold text-primary">Luxio</div>
            </div>
            <DialogTitle className="text-center">{t.orderSent}</DialogTitle>
            <DialogDescription className="text-center text-base">
              {t.ticketPaymentMessage}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-4 rounded-lg text-center">
              <p className="text-sm text-green-800 dark:text-green-200 font-medium">
                ✅ {t.ticketCodeSent}
              </p>
            </div>
            <Button onClick={() => {
              setShowTicketModal(false);
              navigate('/dashboard');
            }} className="w-full" data-testid="button-close-ticket-modal">
              {t.viewMyOrders}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />

      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
