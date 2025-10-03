import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { UserProfile } from '@/components/UserProfile';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Wallet, 
  Building2, 
  Lock, 
  CheckCircle2,
  ArrowLeft,
  Shield,
  Ticket,
  Plus,
  Trash2,
  Copy,
  Check,
  AlertCircle
} from 'lucide-react';

interface TicketCode {
  id: string;
  type: 'PCS' | 'TransCash';
  code: string;
  amount: string;
}

export default function Payment() {
  const { user } = useAuth();
  const { cart, total, clearCart } = useCart();
  const { t } = useLanguage();
  const [, navigate] = useLocation();
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('tickets');
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();
  
  // États pour les tickets
  const [tickets, setTickets] = useState<TicketCode[]>([
    { id: crypto.randomUUID(), type: 'PCS', code: '', amount: '' }
  ]);
  
  // États pour le virement bancaire
  const [orderReference, setOrderReference] = useState<string>('');
  const [copied, setCopied] = useState(false);
  
  // États pour l'adresse de livraison
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    country: '',
    phone: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/?login=true');
      return;
    }
    
    if (cart.length === 0) {
      navigate('/cart');
      return;
    }

    // Générer une référence de commande unique
    const ref = `LX${Date.now().toString().slice(-8)}`;
    setOrderReference(ref);
    
    // Pré-remplir l'adresse de livraison avec les données de l'utilisateur
    setShippingAddress({
      fullName: `${user.firstName} ${user.lastName}`,
      address: user.address || '',
      city: user.city || '',
      country: user.country || '',
      phone: user.phone || ''
    });
  }, [user, cart, navigate]);

  // Calculer le total des tickets
  const ticketsTotal = useMemo(() => {
    return tickets.reduce((sum, ticket) => {
      const amount = parseFloat(ticket.amount) || 0;
      return sum + amount;
    }, 0);
  }, [tickets]);

  // Total de la commande avec TVA
  const orderTotal = useMemo(() => total * 1.2, [total]);

  // Vérifier si le montant des tickets est suffisant
  const isTicketAmountValid = useMemo(() => {
    return ticketsTotal >= orderTotal;
  }, [ticketsTotal, orderTotal]);

  const addTicket = () => {
    const newId = crypto.randomUUID();
    setTickets([...tickets, { id: newId, type: 'PCS', code: '', amount: '' }]);
  };

  const removeTicket = (id: string) => {
    if (tickets.length > 1) {
      setTickets(tickets.filter(t => t.id !== id));
    }
  };

  const updateTicket = (id: string, field: keyof TicketCode, value: string) => {
    setTickets(tickets.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    ));
  };

  const copyBankDetails = async () => {
    const bankInfo = `${t.beneficiary}: Matt Luxio
IBAN: ES61 1563 2626 3832 6870 7364
BIC: NTSBESM1XXX
${t.referenceRequired}: ${orderReference}
${t.amount}: ${orderTotal.toFixed(2)} €`;

    try {
      await navigator.clipboard.writeText(bankInfo);
      setCopied(true);
      toast({
        title: t.copied,
        description: t.copyBankDetails,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: t.error,
        description: t.error,
        variant: "destructive"
      });
    }
  };

  const handleTicketPayment = async () => {
    // Valider que tous les tickets ont un code et un montant
    const validTickets = tickets.filter(t => t.code.trim() && t.amount);
    
    if (validTickets.length === 0) {
      toast({
        title: t.error,
        description: t.ticketPaymentInstructions,
        variant: "destructive"
      });
      return;
    }

    if (!isTicketAmountValid) {
      toast({
        title: t.insufficientAmount,
        description: `${t.ticketsTotal} ${ticketsTotal.toFixed(2)} € < ${t.requiredAmount} ${orderTotal.toFixed(2)} €`,
        variant: "destructive"
      });
      return;
    }

    setProcessing(true);

    try {
      // Préparer les données pour l'envoi
      const orderData = {
        customerEmail: user?.email || '',
        customerName: shippingAddress.fullName,
        customerAddress: shippingAddress.address,
        customerCity: shippingAddress.city,
        customerCountry: shippingAddress.country,
        customerPhone: shippingAddress.phone,
        productId: cart[0].id,
        productName: cart.map(item => `${item.name} x${item.quantity}`).join(', '),
        productModel: cart.length > 1 ? `${cart.length} ${cart.length > 1 ? t.items : t.item}` : '',
        productPrice: total,
        totalAmount: orderTotal,
        codeType: validTickets[0].type,
        codes: validTickets.map(t => `${t.code} (${t.amount}€)`)
      };

      const response = await fetch('/api/payment/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (response.ok) {
        clearCart();
        toast({
          title: t.orderSent,
          description: `${t.orderNumber} #${result.orderId}. ${t.orderConfirmationEmail}`,
        });
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        throw new Error(result.error || t.error);
      }
    } catch (error) {
      toast({
        title: t.error,
        description: error instanceof Error ? error.message : t.error,
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleBankTransfer = async () => {
    setProcessing(true);
    
    // Simuler l'enregistrement de la commande
    setTimeout(() => {
      clearCart();
      toast({
        title: t.orderRegistered,
        description: `${t.orderNumber} #${orderReference} - ${t.completeTransferWithReference}`,
      });
      setProcessing(false);
    }, 1500);
  };

  const handleMaxelPay = async () => {
    if (!user) return;
    
    setProcessing(true);
    
    try {
      // Créer l'objet commande pour Maxelpay
      const nameParts = shippingAddress.fullName.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      const order = {
        reference: orderReference,
        items: cart,
        total: orderTotal,
        status: 'pending' as const,
        date: new Date().toISOString(),
        customerInfo: {
          firstName,
          lastName,
          address: shippingAddress.address,
          city: shippingAddress.city,
          country: shippingAddress.country,
          phone: shippingAddress.phone
        }
      };

      // Générer l'URL Maxelpay
      const { generateMaxelPayUrl, saveOrder } = await import('@/lib/cart');
      saveOrder(order);
      const paymentUrl = generateMaxelPayUrl(order);
      
      // Afficher la notification avant la redirection
      toast({
        title: "MaxelPay",
        description: t.redirectingToMaxelPayDescription,
      });
      
      // Attendre un peu pour que l'utilisateur voie la notification
      setTimeout(() => {
        clearCart();
        // Redirection vers Maxelpay
        window.location.href = paymentUrl;
      }, 1000);
      
    } catch (error) {
      toast({
        title: t.error,
        description: t.error,
        variant: "destructive"
      });
      setProcessing(false);
    }
  };

  const handlePayment = async () => {
    if (paymentMethod === 'tickets') {
      await handleTicketPayment();
    } else if (paymentMethod === 'bank') {
      await handleBankTransfer();
    } else if (paymentMethod === 'maxelpay') {
      await handleMaxelPay();
    }
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
                {t.backToCart}
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-payment-title">
              {t.securedPayment}
            </h1>
            <p className="text-muted-foreground">
              {t.choosePaymentMethod}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    {t.paymentMethod}
                  </CardTitle>
                  <CardDescription>
                    {t.allTransactionsSecured}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-4">
                      {/* Paiement par tickets */}
                      <div 
                        className={`border-2 rounded-lg transition-colors ${
                          paymentMethod === 'tickets' ? 'border-primary bg-primary/5' : 'border-border'
                        }`}
                      >
                        <div 
                          className="flex items-center space-x-3 p-4 cursor-pointer"
                          onClick={() => setPaymentMethod('tickets')}
                          data-testid="payment-option-tickets"
                        >
                          <RadioGroupItem value="tickets" id="tickets" />
                          <Label htmlFor="tickets" className="flex-1 flex items-center justify-between cursor-pointer">
                            <div className="flex items-center gap-3">
                              <Ticket className="h-5 w-5 text-primary" />
                              <span className="font-medium">{t.ticketsPCS}</span>
                            </div>
                            <Badge variant="secondary">{t.immediate}</Badge>
                          </Label>
                        </div>

                        {paymentMethod === 'tickets' && (
                          <div className="px-4 pb-4 space-y-3">
                            <Separator className="mb-4" />
                            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                {t.ticketInstructionsTitle}
                              </h4>
                              <ul className="text-xs space-y-1.5 text-muted-foreground mb-3">
                                <li>• {t.ticketInstructionSelectType}</li>
                                <li>• {t.ticketInstructionCode}</li>
                                <li>• {t.ticketInstructionAmount}</li>
                                <li>• {t.ticketInstructionMulti}</li>
                                <li>• {t.ticketInstructionValidation}</li>
                              </ul>
                              <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800">
                                <p className="text-xs mb-2 font-medium">{t.dontHaveTickets}</p>
                                <a 
                                  href="https://www.recharge.com" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                  data-testid="link-recharge"
                                >
                                  {t.buyTickets} →
                                </a>
                              </div>
                            </div>
                            {tickets.map((ticket, index) => (
                              <div key={ticket.id} className="space-y-2 p-3 bg-muted/50 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium">{t.ticket} {index + 1}</span>
                                  {tickets.length > 1 && (
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeTicket(ticket.id)}
                                      data-testid={`button-remove-ticket-${index}`}
                                    >
                                      <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                  )}
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                  <Select
                                    value={ticket.type}
                                    onValueChange={(value) => updateTicket(ticket.id, 'type', value)}
                                  >
                                    <SelectTrigger data-testid={`select-ticket-type-${index}`}>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="PCS">PCS</SelectItem>
                                      <SelectItem value="TransCash">TransCash</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Input
                                    placeholder={t.ticketCodePlaceholder}
                                    value={ticket.code}
                                    onChange={(e) => updateTicket(ticket.id, 'code', e.target.value)}
                                    className="sm:col-span-1"
                                    data-testid={`input-ticket-code-${index}`}
                                  />
                                  <Input
                                    type="number"
                                    placeholder={t.ticketAmountPlaceholder}
                                    value={ticket.amount}
                                    onChange={(e) => updateTicket(ticket.id, 'amount', e.target.value)}
                                    min="0"
                                    step="0.01"
                                    data-testid={`input-ticket-amount-${index}`}
                                  />
                                </div>
                              </div>
                            ))}
                            
                            <Button
                              type="button"
                              variant="outline"
                              onClick={addTicket}
                              className="w-full"
                              data-testid="button-add-ticket"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              {t.addTicket}
                            </Button>

                            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">{t.ticketsTotal}</span>
                                <span className="text-lg font-bold" data-testid="text-tickets-total">
                                  {ticketsTotal.toFixed(2)} €
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{t.requiredAmount}</span>
                                <span className="text-lg font-bold text-primary">
                                  {orderTotal.toFixed(2)} €
                                </span>
                              </div>
                              {!isTicketAmountValid && ticketsTotal > 0 && (
                                <div className="mt-3 flex items-center gap-2 text-sm text-destructive">
                                  <AlertCircle className="h-4 w-4" />
                                  <span>{t.insufficientAmount} ({(orderTotal - ticketsTotal).toFixed(2)} € {t.missingAmount})</span>
                                </div>
                              )}
                              {isTicketAmountValid && (
                                <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                                  <CheckCircle2 className="h-4 w-4" />
                                  <span>{t.amountValidated}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Virement bancaire */}
                      <div 
                        className={`border-2 rounded-lg transition-colors ${
                          paymentMethod === 'bank' ? 'border-primary bg-primary/5' : 'border-border'
                        }`}
                      >
                        <div 
                          className="flex items-center space-x-3 p-4 cursor-pointer"
                          onClick={() => setPaymentMethod('bank')}
                          data-testid="payment-option-bank"
                        >
                          <RadioGroupItem value="bank" id="bank" />
                          <Label htmlFor="bank" className="flex-1 flex items-center justify-between cursor-pointer">
                            <div className="flex items-center gap-3">
                              <Building2 className="h-5 w-5 text-primary" />
                              <span className="font-medium">{t.bankTransfer}</span>
                            </div>
                            <Badge variant="secondary">{t.days23}</Badge>
                          </Label>
                        </div>

                        {paymentMethod === 'bank' && (
                          <div className="px-4 pb-4">
                            <Separator className="mb-4" />
                            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                {t.bankTransferInstructionsTitle}
                              </h4>
                              <ul className="text-xs space-y-1 text-muted-foreground">
                                <li>• {t.bankTransferInstruction1}</li>
                                <li>• {t.bankTransferInstruction2}</li>
                                <li>• {t.bankTransferInstruction3}</li>
                                <li>• {t.bankTransferInstruction4}</li>
                                <li>• {t.bankTransferInstruction5}</li>
                              </ul>
                            </div>
                            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                              <div>
                                <Label className="text-xs text-muted-foreground">{t.beneficiary}</Label>
                                <p className="font-semibold mt-1">Matt Luxio</p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">IBAN</Label>
                                <p className="font-mono text-sm font-semibold mt-1">ES61 1563 2626 3832 6870 7364</p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">BIC</Label>
                                <p className="font-mono text-sm font-semibold mt-1">NTSBESM1XXX</p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">{t.referenceRequired}</Label>
                                <p className="font-mono text-lg font-bold text-primary mt-1" data-testid="text-order-reference">
                                  {orderReference}
                                </p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">{t.amount}</Label>
                                <p className="text-2xl font-bold mt-1">{orderTotal.toFixed(2)} €</p>
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={copyBankDetails}
                                className="w-full mt-2"
                                data-testid="button-copy-bank-details"
                              >
                                {copied ? (
                                  <>
                                    <Check className="h-4 w-4 mr-2 text-green-600" />
                                    {t.copied}
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-4 w-4 mr-2" />
                                    {t.copyBankDetails}
                                  </>
                                )}
                              </Button>
                              <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
                                <p className="text-xs text-amber-900 dark:text-amber-100">
                                  ⚠️ {t.referenceRequired}: <strong>{orderReference}</strong>
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* MaxelPay */}
                      <div 
                        className={`border-2 rounded-lg transition-colors ${
                          paymentMethod === 'maxelpay' ? 'border-primary bg-primary/5' : 'border-border'
                        }`}
                      >
                        <div 
                          className="flex items-center space-x-3 p-4 cursor-pointer"
                          onClick={() => setPaymentMethod('maxelpay')}
                          data-testid="payment-option-maxelpay"
                        >
                          <RadioGroupItem value="maxelpay" id="maxelpay" />
                          <Label htmlFor="maxelpay" className="flex-1 flex items-center justify-between cursor-pointer">
                            <div className="flex items-center gap-3">
                              <Wallet className="h-5 w-5 text-primary" />
                              <span className="font-medium">MaxelPay</span>
                            </div>
                            <Badge>{t.recommended}</Badge>
                          </Label>
                        </div>
                        
                        {paymentMethod === 'maxelpay' && (
                          <div className="px-4 pb-4">
                            <Separator className="mb-4" />
                            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                {t.maxelPayInstructionsTitle}
                              </h4>
                              <ul className="text-xs space-y-1 text-muted-foreground mb-3">
                                <li>• {t.maxelPayInstruction1}</li>
                                <li>• {t.maxelPayInstruction2}</li>
                                <li>• {t.maxelPayInstruction3}</li>
                                <li>• {t.maxelPayInstruction4}</li>
                                <li>• {t.maxelPayInstruction5}</li>
                              </ul>
                              <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                                <CheckCircle2 className="h-4 w-4" />
                                <span className="font-medium">{t.maxelPayRecommendation}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </RadioGroup>

                  <div className="mt-6 p-4 bg-muted/50 rounded-lg flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{t.payment100Secure}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t.paymentInfoEncrypted}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{t.shippingAddress}</CardTitle>
                    {!isEditingAddress && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIsEditingAddress(true)}
                        data-testid="button-edit-address"
                      >
                        {t.editAddress}
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {isEditingAddress ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fullName">{t.fullName}</Label>
                        <Input
                          id="fullName"
                          value={shippingAddress.fullName}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                          placeholder={t.fullName}
                          data-testid="input-shipping-fullname"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">{t.completeAddress}</Label>
                        <Input
                          id="address"
                          value={shippingAddress.address}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                          placeholder={t.address}
                          data-testid="input-shipping-address"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">{t.city}</Label>
                          <Input
                            id="city"
                            value={shippingAddress.city}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                            placeholder={t.city}
                            data-testid="input-shipping-city"
                          />
                        </div>
                        <div>
                          <Label htmlFor="country">{t.country}</Label>
                          <Input
                            id="country"
                            value={shippingAddress.country}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                            placeholder={t.country}
                            data-testid="input-shipping-country"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone">{t.phone}</Label>
                        <Input
                          id="phone"
                          value={shippingAddress.phone}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                          placeholder={t.phone}
                          data-testid="input-shipping-phone"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="default" 
                          onClick={() => setIsEditingAddress(false)}
                          className="flex-1"
                          data-testid="button-save-address"
                        >
                          {t.saveAddress}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setShippingAddress({
                              fullName: user ? `${user.firstName} ${user.lastName}` : '',
                              address: user?.address || '',
                              city: user?.city || '',
                              country: user?.country || '',
                              phone: user?.phone || ''
                            });
                            setIsEditingAddress(false);
                          }}
                          className="flex-1"
                          data-testid="button-cancel-address"
                        >
                          {t.cancel}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="font-medium">{shippingAddress.fullName}</p>
                      {shippingAddress.address && <p className="text-sm text-muted-foreground">{shippingAddress.address}</p>}
                      {(shippingAddress.city || shippingAddress.country) && (
                        <p className="text-sm text-muted-foreground">
                          {[shippingAddress.city, shippingAddress.country].filter(Boolean).join(', ')}
                        </p>
                      )}
                      {shippingAddress.phone && <p className="text-sm text-muted-foreground">{shippingAddress.phone}</p>}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>{t.orderSummary}</CardTitle>
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
                      <span className="text-muted-foreground">{t.subtotal}</span>
                      <span className="font-medium">{total.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t.shipping}</span>
                      <span className="font-medium text-green-600">{t.free}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t.vat}</span>
                      <span className="font-medium">{(total * 0.2).toFixed(2)} €</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between pt-2">
                    <span className="text-lg font-semibold">{t.total}</span>
                    <span className="text-2xl font-bold text-primary" data-testid="text-total">
                      {orderTotal.toFixed(2)} €
                    </span>
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg" 
                    onClick={handlePayment}
                    disabled={processing || (paymentMethod === 'tickets' && !isTicketAmountValid)}
                    data-testid="button-confirm-payment"
                  >
                    {processing ? (
                      <>
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        {t.loading}
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-5 w-5 mr-2" />
                        {t.payNow}
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    {t.termsOfService}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <UserProfile isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </div>
  );
}
