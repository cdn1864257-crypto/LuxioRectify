import { useState, useEffect, useMemo } from 'react';
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
  const [, navigate] = useLocation();
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('tickets');
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();
  
  // États pour les tickets
  const [tickets, setTickets] = useState<TicketCode[]>([
    { id: '1', type: 'PCS', code: '', amount: '' }
  ]);
  
  // États pour le virement bancaire
  const [orderReference, setOrderReference] = useState<string>('');
  const [copied, setCopied] = useState(false);

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
    const newId = (tickets.length + 1).toString();
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
    const bankInfo = `IBAN: FR76 1234 5678 9012 3456 7890 123
BIC: LUXIFRPP
Référence: ${orderReference}
Montant: ${orderTotal.toFixed(2)} €`;

    try {
      await navigator.clipboard.writeText(bankInfo);
      setCopied(true);
      toast({
        title: "Copié !",
        description: "Les informations bancaires ont été copiées dans le presse-papier",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de copier les informations",
        variant: "destructive"
      });
    }
  };

  const handleTicketPayment = async () => {
    // Valider que tous les tickets ont un code et un montant
    const validTickets = tickets.filter(t => t.code.trim() && t.amount);
    
    if (validTickets.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir au moins un ticket avec un code et un montant",
        variant: "destructive"
      });
      return;
    }

    if (!isTicketAmountValid) {
      toast({
        title: "Montant insuffisant",
        description: `Le total des tickets (${ticketsTotal.toFixed(2)} €) est inférieur au montant de la commande (${orderTotal.toFixed(2)} €)`,
        variant: "destructive"
      });
      return;
    }

    setProcessing(true);

    try {
      // Préparer les données pour l'envoi
      const orderData = {
        customerEmail: user?.email || '',
        customerName: `${user?.firstName || ''} ${user?.lastName || ''}`,
        productId: cart[0].id,
        productName: cart.map(item => `${item.name} x${item.quantity}`).join(', '),
        productModel: cart.length > 1 ? `${cart.length} articles` : '',
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
          title: "Commande envoyée !",
          description: `Votre commande #${result.orderId} a été envoyée. Vous recevrez un email de confirmation.`,
        });
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        throw new Error(result.error || 'Erreur lors de l\'envoi');
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
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
        title: "Commande enregistrée",
        description: `Commande #${orderReference} - Effectuez le virement avec la référence indiquée`,
      });
      setProcessing(false);
    }, 1500);
  };

  const handleMaxelPay = async () => {
    if (!user) return;
    
    setProcessing(true);
    
    try {
      // Créer l'objet commande pour Maxelpay
      const order = {
        reference: orderReference,
        items: cart,
        total: orderTotal,
        status: 'pending' as const,
        date: new Date().toISOString(),
        customerInfo: {
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address || '',
          city: user.city || '',
          country: user.country || '',
          phone: user.phone || ''
        }
      };

      // Générer l'URL Maxelpay
      const { generateMaxelPayUrl, saveOrder } = await import('@/lib/cart');
      saveOrder(order);
      const paymentUrl = generateMaxelPayUrl(order);
      
      // Afficher la notification avant la redirection
      toast({
        title: "Redirection vers MaxelPay",
        description: "Vous allez être redirigé vers la plateforme de paiement sécurisée",
      });
      
      // Attendre un peu pour que l'utilisateur voie la notification
      setTimeout(() => {
        clearCart();
        // Redirection vers Maxelpay
        window.location.href = paymentUrl;
      }, 1000);
      
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la redirection vers MaxelPay",
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
                              <span className="font-medium">Tickets PCS / TransCash</span>
                            </div>
                            <Badge variant="secondary">Immédiat</Badge>
                          </Label>
                        </div>

                        {paymentMethod === 'tickets' && (
                          <div className="px-4 pb-4 space-y-3">
                            <Separator className="mb-4" />
                            {tickets.map((ticket, index) => (
                              <div key={ticket.id} className="space-y-2 p-3 bg-muted/50 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium">Ticket {index + 1}</span>
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
                                    placeholder="Code du ticket"
                                    value={ticket.code}
                                    onChange={(e) => updateTicket(ticket.id, 'code', e.target.value)}
                                    className="sm:col-span-1"
                                    data-testid={`input-ticket-code-${index}`}
                                  />
                                  <Input
                                    type="number"
                                    placeholder="Montant (€)"
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
                              Ajouter un ticket
                            </Button>

                            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Total des tickets :</span>
                                <span className="text-lg font-bold" data-testid="text-tickets-total">
                                  {ticketsTotal.toFixed(2)} €
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Montant requis :</span>
                                <span className="text-lg font-bold text-primary">
                                  {orderTotal.toFixed(2)} €
                                </span>
                              </div>
                              {!isTicketAmountValid && ticketsTotal > 0 && (
                                <div className="mt-3 flex items-center gap-2 text-sm text-destructive">
                                  <AlertCircle className="h-4 w-4" />
                                  <span>Montant insuffisant ({(orderTotal - ticketsTotal).toFixed(2)} € manquant)</span>
                                </div>
                              )}
                              {isTicketAmountValid && (
                                <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                                  <CheckCircle2 className="h-4 w-4" />
                                  <span>Montant validé !</span>
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
                              <span className="font-medium">Virement bancaire</span>
                            </div>
                            <Badge variant="secondary">2-3 jours</Badge>
                          </Label>
                        </div>

                        {paymentMethod === 'bank' && (
                          <div className="px-4 pb-4">
                            <Separator className="mb-4" />
                            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                              <div>
                                <Label className="text-xs text-muted-foreground">IBAN</Label>
                                <p className="font-mono text-sm font-semibold mt-1">FR76 1234 5678 9012 3456 7890 123</p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">BIC</Label>
                                <p className="font-mono text-sm font-semibold mt-1">LUXIFRPP</p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">Référence (OBLIGATOIRE)</Label>
                                <p className="font-mono text-lg font-bold text-primary mt-1" data-testid="text-order-reference">
                                  {orderReference}
                                </p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">Montant</Label>
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
                                    Copié !
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copier toutes les informations
                                  </>
                                )}
                              </Button>
                              <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
                                <p className="text-xs text-amber-900 dark:text-amber-100">
                                  ⚠️ Important : N'oubliez pas d'indiquer la référence <strong>{orderReference}</strong> lors de votre virement
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* MaxelPay */}
                      <div 
                        className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                          paymentMethod === 'maxelpay' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setPaymentMethod('maxelpay')}
                        data-testid="payment-option-maxelpay"
                      >
                        <RadioGroupItem value="maxelpay" id="maxelpay" />
                        <Label htmlFor="maxelpay" className="flex-1 flex items-center justify-between cursor-pointer">
                          <div className="flex items-center gap-3">
                            <Wallet className="h-5 w-5 text-primary" />
                            <span className="font-medium">MaxelPay</span>
                          </div>
                          <Badge>Recommandé</Badge>
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
                        Traitement...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-5 w-5 mr-2" />
                        {paymentMethod === 'tickets' ? 'Envoyer les codes' : 'Confirmer le paiement'}
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
