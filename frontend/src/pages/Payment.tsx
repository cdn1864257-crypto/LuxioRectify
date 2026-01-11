import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getApiUrl } from '@/lib/config';
import { generatePaymentReference } from '@/lib/payment-reference';
import { SEO } from '@/components/SEO';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ShoppingBag, CreditCard, Building2, Ticket, Check, Copy, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { queryClient } from '@/lib/queryClient';
import type { Language } from '@/lib/translations';

export default function Payment() {
  const { user } = useAuth();
  const { cart, total, clearCart } = useCart();
  const { language, changeLanguage, t } = useLanguage();
  const [, navigate] = useLocation();
  const [cartOpen, setCartOpen] = useState(false);
  const { toast } = useToast();

  // Bank Transfer Modal
  const [bankTransferOpen, setBankTransferOpen] = useState(false);
  const [bankTransferLoading, setBankTransferLoading] = useState(false);
  const [bankTransferConfirmed, setBankTransferConfirmed] = useState(false);
  const [bankTransferData, setBankTransferData] = useState<any>(null);

  // OxaPay Modal
  const [oxapayLoading, setNowpaymentsLoading] = useState(false);

  // Tickets Modal
  const [ticketsOpen, setTicketsOpen] = useState(false);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [ticketType, setTicketType] = useState<'PCS' | 'TransCash'>('PCS');
  const [ticketCodes, setTicketCodes] = useState<string[]>(['', '', '']);
  const [ticketsSuccess, setTicketsSuccess] = useState(false);

  // Check for OxaPay return
  const urlParams = new URLSearchParams(window.location.search);
  const paymentSuccess = urlParams.get('success') === 'true';
  const paymentCancelled = urlParams.get('cancelled') === 'true';
  const paymentPending = urlParams.get('pending') === 'true';
  const paymentError = urlParams.get('error') === 'true';
  const orderRef = urlParams.get('order');
  const langParam = urlParams.get('lang');
  const fromOxaPay = paymentSuccess || paymentCancelled || paymentPending || paymentError;

  // Restore language from URL if returning from OxaPay
  useEffect(() => {
    if (langParam && fromOxaPay) {
      const validLangs: Language[] = ['en', 'fr', 'es', 'pt', 'pl', 'it', 'hu'];
      if (validLangs.includes(langParam as Language)) {
        changeLanguage(langParam as Language);
        console.log(`[Payment] Restored language from URL: ${langParam}`);
      }
    }
  }, [langParam, fromOxaPay, changeLanguage]);

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
      // Invalider le cache des commandes pour forcer le rechargement
      queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
      toast({
        title: "Paiement réussi !",
        description: orderRef ? `Commande ${orderRef} confirmée` : "Votre commande a été confirmée",
      });
      setTimeout(() => navigate('/dashboard'), 3000);
      return;
    }

    // If returning from OxaPay with cancellation
    if (paymentCancelled) {
      toast({
        title: "Paiement annulé",
        description: "Le paiement a été annulé. Votre panier est toujours disponible.",
        variant: "destructive",
      });
      return;
    }

    // If returning from OxaPay with pending status
    if (paymentPending) {
      toast({
        title: "Paiement en attente",
        description: "Votre paiement est en cours de traitement. Vous recevrez une confirmation par email.",
      });
      return;
    }

    // If returning from OxaPay with error
    if (paymentError) {
      toast({
        title: "Erreur de paiement",
        description: "Une erreur s'est produite lors du paiement. Veuillez réessayer.",
        variant: "destructive",
      });
      return;
    }
    
    // Only redirect to cart if cart is empty AND we're not returning from OxaPay
    if (cart.length === 0 && !fromOxaPay) {
      navigate('/cart');
      return;
    }
  }, [user, cart, navigate, paymentSuccess, paymentCancelled, paymentPending, paymentError, orderRef, clearCart, toast, fromOxaPay]);

  if (!user) {
    return null;
  }

  // Allow rendering if cart has items OR if returning from OxaPay
  if (cart.length === 0 && !fromOxaPay) {
    return null;
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copié !",
      description: `${label} copié dans le presse-papiers`,
    });
  };

  // Generate standardized payment reference using centralized function
  const generateOrderReference = () => {
    const firstName = user?.firstName || 'User';
    const lastName = user?.lastName || '';
    const fullName = `${firstName} ${lastName}`.trim();
    // Fallback to "User" if name is empty after trimming
    return generatePaymentReference(fullName || 'User');
  };

  const handleBankTransferConfirm = async () => {
    setBankTransferLoading(true);
    try {
      const response = await fetch(getApiUrl('/api/payment/bank-transfer'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          customerEmail: user.email,
          customerName: user.firstName + ' ' + user.lastName,
          totalAmount: total,
          language: language,
          cartItems: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setBankTransferConfirmed(true);
        // Invalider le cache des commandes
        queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
        toast({
          title: "Email envoyé",
          description: "Les informations de paiement ont été envoyées à votre adresse e-mail",
        });
        setTimeout(() => {
          clearCart();
          navigate('/dashboard');
        }, 3000);
      } else {
        toast({
          title: "Erreur",
          description: data.error || "Une erreur est survenue",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer la commande",
        variant: "destructive",
      });
    } finally {
      setBankTransferLoading(false);
    }
  };

  const handleOxaPay = async () => {
    setNowpaymentsLoading(true);
    try {
      const response = await fetch(getApiUrl('/api/payment/oxapay-init'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          customerEmail: user.email,
          customerName: user.firstName + ' ' + user.lastName,
          totalAmount: total,
          language: language,
          cartItems: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (response.ok && data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        toast({
          title: "Erreur",
          description: data.error || "Impossible d'initialiser le paiement OxaPay",
          variant: "destructive",
        });
        setNowpaymentsLoading(false);
      }
    } catch (error) {
      console.error('Erreur OxaPay:', error);
      toast({
        title: "Erreur",
        description: "Impossible de se connecter à OxaPay",
        variant: "destructive",
      });
      setNowpaymentsLoading(false);
    }
  };

  const handleTicketsSubmit = async () => {
    const validCodes = ticketCodes.filter(code => code.trim() !== '');
    
    if (validCodes.length === 0) {
      toast({
        title: "Codes manquants",
        description: "Veuillez entrer au moins un code de paiement",
        variant: "destructive",
      });
      return;
    }

    setTicketsLoading(true);
    try {
      const firstItem = cart[0];
      const response = await fetch(getApiUrl('/api/payment/submit-order'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          customerEmail: user.email,
          customerName: user.firstName + ' ' + user.lastName,
          productId: firstItem.id,
          productName: firstItem.name,
          productModel: '',
          productPrice: firstItem.price,
          totalAmount: total,
          language: language,
          codeType: ticketType,
          codes: validCodes,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTicketsSuccess(true);
        // Invalider le cache des commandes
        queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
        setTimeout(() => {
          clearCart();
          navigate('/dashboard');
        }, 5000);
      } else {
        toast({
          title: "Erreur",
          description: data.error || "Impossible de soumettre la commande",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erreur lors de la soumission des tickets:', error);
      toast({
        title: "Erreur",
        description: "Impossible de soumettre les codes de paiement",
        variant: "destructive",
      });
    } finally {
      setTicketsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO page="payment" />
      <Header onToggleCart={() => setCartOpen(!cartOpen)} />
      
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Bouton retour */}
          <Link href="/cart">
            <Button variant="ghost" className="mb-6" data-testid="button-back-to-cart">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au panier
            </Button>
          </Link>

          {/* En-tête */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-payment-title">
              Paiement
            </h1>
            <p className="text-muted-foreground">
              Choisissez votre moyen de paiement
            </p>
          </div>

          {/* Résumé de commande */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Résumé de la commande
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Articles */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantité: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      {(item.price * item.quantity).toFixed(2)} €
                    </p>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="pt-4 border-t">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary" data-testid="text-total-amount">
                    {total.toFixed(2)} €
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Moyens de paiement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Moyens de paiement
              </CardTitle>
              <CardDescription>
                Sélectionnez votre méthode de paiement préférée
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Virement bancaire */}
              <Button
                variant="outline"
                className="w-full justify-start h-auto py-6 px-6"
                onClick={() => {
                  setBankTransferOpen(true);
                  setBankTransferConfirmed(false);
                  setBankTransferData({
                    orderReference: generateOrderReference(),
                  });
                }}
                data-testid="button-bank-transfer"
              >
                <div className="flex items-center gap-4 w-full">
                  <Building2 className="h-6 w-6 text-primary" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-base">Virement bancaire</div>
                    <div className="text-sm text-muted-foreground">
                      Paiement sécurisé par virement
                    </div>
                  </div>
                </div>
              </Button>

              {/* Separator */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
              </div>

              {/* OxaPay */}
              <Button
                variant="outline"
                className="w-full justify-start h-auto py-6 px-6 border-2 border-primary/20 bg-primary/5"
                onClick={handleOxaPay}
                disabled={oxapayLoading}
                data-testid="button-oxapay"
              >
                <div className="flex items-center gap-4 w-full">
                  <CreditCard className="h-6 w-6 text-primary" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-base flex items-center gap-2">
                      OxaPay
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                        Recommandé
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Paiement par cryptocurrency sécurisé
                    </div>
                  </div>
                  {oxapayLoading && <Loader2 className="h-5 w-5 animate-spin" />}
                </div>
              </Button>

              {/* Separator */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
              </div>

              {/* Tickets PCS/TransCash */}
              <Button
                variant="outline"
                className="w-full justify-start h-auto py-6 px-6"
                onClick={() => setTicketsOpen(true)}
                data-testid="button-tickets"
              >
                <div className="flex items-center gap-4 w-full">
                  <Ticket className="h-6 w-6 text-primary" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-base">Tickets PCS / TransCash</div>
                    <div className="text-sm text-muted-foreground">
                      Paiement par codes de paiement
                    </div>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />

      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Modal Virement bancaire */}
      <Dialog open={bankTransferOpen} onOpenChange={(open) => {
        setBankTransferOpen(open);
        if (!open) {
          setBankTransferConfirmed(false);
          setBankTransferData(null);
        }
      }}>
        <DialogContent className="w-[96vw] max-w-[480px] sm:max-w-2xl max-h-[92vh] overflow-y-auto p-3 sm:p-6">
          <DialogHeader className="space-y-2 sm:space-y-3">
            <div className="text-center mb-2 sm:mb-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">Luxio</h1>
            </div>
            <DialogTitle className="text-lg sm:text-xl md:text-2xl text-center">
              Informations de virement
            </DialogTitle>
            <DialogDescription className="text-center text-xs sm:text-sm">
              Effectuez votre virement bancaire avec les informations ci-dessous
            </DialogDescription>
          </DialogHeader>

          {bankTransferConfirmed ? (
            <div className="py-8 text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">
                  ✅ Les informations de paiement ont été envoyées à votre adresse e-mail.
                </h3>
                <p className="text-muted-foreground font-semibold">
                  Merci pour votre confiance.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Redirection vers votre tableau de bord...
                </p>
              </div>
            </div>
          ) : bankTransferData && (
            <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
              {/* Informations bancaires */}
              <div className="w-full bg-gradient-to-br from-orange-400 to-orange-600 dark:from-orange-600 dark:to-orange-800 rounded-lg p-3 sm:p-6 space-y-3 sm:space-y-4 overflow-hidden">
                <h3 className="font-semibold text-base sm:text-lg mb-4 text-white">Coordonnées bancaires</h3>
                
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-blue-100 text-xs sm:text-sm">Bénéficiaire</span>
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 rounded px-2 py-1.5 sm:px-3 sm:py-2">
                      <span className="font-mono font-bold text-xs sm:text-sm text-white break-all flex-1">Matt Luxio</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard('Matt Luxio', 'Bénéficiaire')}
                        className="flex-shrink-0 text-white hover:bg-white/20 h-7 w-7 p-0"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-blue-100 text-xs sm:text-sm">IBAN</span>
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 rounded px-2 py-1.5 sm:px-3 sm:py-2">
                      <span className="font-mono font-bold text-[10px] sm:text-xs text-white break-all flex-1">ES6115632626383268707364</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard('ES6115632626383268707364', 'IBAN')}
                        className="flex-shrink-0 text-white hover:bg-white/20 h-7 w-7 p-0"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-blue-100 text-xs sm:text-sm">BIC</span>
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 rounded px-2 py-1.5 sm:px-3 sm:py-2">
                      <span className="font-mono font-bold text-xs sm:text-sm text-white break-all flex-1">NTSBESM1XXX</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard('NTSBESM1XXX', 'BIC')}
                        className="flex-shrink-0 text-white hover:bg-white/20 h-7 w-7 p-0"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-blue-100 text-xs sm:text-sm">{t('orderReference')}</span>
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 rounded px-2 py-1.5 sm:px-3 sm:py-2">
                      <span className="font-mono font-bold text-xs sm:text-sm text-white break-all flex-1">
                        {t('paymentDeposit')} {bankTransferData.orderReference}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(`${t('paymentDeposit')} ${bankTransferData.orderReference}`, t('orderReference'))}
                        className="flex-shrink-0 text-white hover:bg-white/20 h-7 w-7 p-0"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 pt-2 sm:pt-3 border-t border-white/30">
                    <span className="text-blue-100 text-xs sm:text-sm">Montant à virer</span>
                    <div className="bg-white/10 rounded px-2 py-2 sm:px-3 sm:py-3">
                      <span className="font-bold text-xl sm:text-2xl md:text-3xl text-white">
                        {total.toFixed(2)} €
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                <h4 className="font-semibold flex items-center gap-2 text-xs sm:text-sm md:text-base">
                  📋 Instructions
                </h4>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm leading-relaxed">
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                    <span>Effectuez le virement vers le compte ci-dessus</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                    <span>Veillez à indiquer la référence : <strong className="text-primary break-all">{t('paymentDeposit')} {bankTransferData.orderReference}</strong></span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                    <span>Vous recevrez un email de confirmation</span>
                  </li>
                </ul>
              </div>

              {/* Délais de livraison */}
              <div className="bg-green-50 dark:bg-green-950 rounded-lg p-3 sm:p-4 space-y-1.5 sm:space-y-2">
                <div className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm">
                  <span className="text-green-600 dark:text-green-400 font-bold flex-shrink-0">✓</span>
                  <p className="font-semibold text-green-800 dark:text-green-200">
                    Virement immédiat : Livraison en 24h
                  </p>
                </div>
                <div className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm">
                  <span className="text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0">⏱</span>
                  <p className="text-muted-foreground">
                    Virement standard : 48-72h selon votre banque
                  </p>
                </div>
              </div>

              {/* Boutons de confirmation */}
              <div className="space-y-2 sm:space-y-3 pt-2">
                <Button
                  className="w-full text-sm sm:text-base"
                  size="lg"
                  onClick={handleBankTransferConfirm}
                  disabled={bankTransferLoading}
                  data-testid="button-confirm-bank-transfer"
                >
                  {bankTransferLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" />
                      <span className="text-sm sm:text-base">Envoi en cours...</span>
                    </>
                  ) : (
                    <span className="text-sm sm:text-base">Oui, je procède au virement</span>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full text-sm sm:text-base"
                  size="lg"
                  onClick={() => {
                    setBankTransferOpen(false);
                    setBankTransferConfirmed(false);
                    setBankTransferData(null);
                  }}
                  disabled={bankTransferLoading}
                  data-testid="button-cancel-bank-transfer"
                >
                  Non, je choisis une autre méthode
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal Tickets */}
      <Dialog open={ticketsOpen} onOpenChange={setTicketsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold text-primary mb-2">Luxio</h1>
            </div>
            <DialogTitle className="text-2xl text-center">
              {ticketsSuccess ? 'Commande reçue' : 'Paiement par tickets'}
            </DialogTitle>
          </DialogHeader>

          {ticketsSuccess ? (
            <div className="py-8 text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  Vous venez de recevoir une notification suite à votre commande.
                </h3>
                <p className="text-muted-foreground">
                  Nous procéderons à la vérification du paiement.
                </p>
                <p className="text-muted-foreground font-semibold">
                  Vous recevrez une confirmation définitive d'ici quelques minutes.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Un email récapitulatif a été envoyé à <strong>{user.email}</strong>
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 py-4">
              <div>
                <Label htmlFor="ticket-type">Type de ticket</Label>
                <Select
                  value={ticketType}
                  onValueChange={(value: 'PCS' | 'TransCash') => setTicketType(value)}
                >
                  <SelectTrigger id="ticket-type" data-testid="select-ticket-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PCS">PCS</SelectItem>
                    <SelectItem value="TransCash">TransCash</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Codes de paiement</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Entrez vos codes {ticketType} (minimum 1, maximum 3)
                </p>
                <div className="space-y-3">
                  {ticketCodes.map((code, index) => (
                    <Input
                      key={index}
                      placeholder={`Code ${index + 1}`}
                      value={code}
                      onChange={(e) => {
                        const newCodes = [...ticketCodes];
                        newCodes[index] = e.target.value;
                        setTicketCodes(newCodes);
                      }}
                      data-testid={`input-ticket-code-${index}`}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950 rounded-lg p-4">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  ⚠️ <strong>Important :</strong> Vos codes seront vérifiés par notre équipe. 
                  Vous recevrez une confirmation par email une fois la validation effectuée.
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="font-semibold">Montant total :</span>
                <span className="font-bold text-2xl text-green-600 dark:text-green-400">
                  {total.toFixed(2)} €
                </span>
              </div>

              <Button
                className="w-full"
                onClick={handleTicketsSubmit}
                disabled={ticketsLoading}
                data-testid="button-submit-tickets"
              >
                {ticketsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  'Soumettre les codes'
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
