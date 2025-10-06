import { useState, useEffect } from 'react';
import { X, CheckCircle, Building2, AlertTriangle, Info, Ticket, Plus, CreditCard, Package, Truck, Shield } from 'lucide-react';
import { useLocation } from 'wouter';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { generateOrderReference, initializeNowPayment, saveOrder, Order } from '../lib/cart';
import { showToast } from './ToastNotifications';
import { queryClient } from '@/lib/queryClient';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaymentMethod = 'bank-transfer' | 'prepaid-tickets' | 'nowpayments';

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, total, clearCart } = useCart();
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank-transfer');
  const [orderReference, setOrderReference] = useState<string>('');
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [showTicketConfirmation, setShowTicketConfirmation] = useState(false);
  const [ticketCodes, setTicketCodes] = useState<string[]>(['']);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    phone: ''
  });

  // Reset modal state when modal opens or closes
  useEffect(() => {
    if (!isOpen) {
      // Reset all state when modal closes
      setShowPaymentDetails(false);
      setShowTicketConfirmation(false);
      setOrderReference('');
      setLoading(false);
      setPaymentMethod('bank-transfer');
      setTicketCodes(['']);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        country: '',
        phone: ''
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const addTicketCode = () => {
    setTicketCodes([...ticketCodes, '']);
  };

  const removeTicketCode = (index: number) => {
    if (ticketCodes.length > 1) {
      setTicketCodes(ticketCodes.filter((_, i) => i !== index));
    }
  };

  const updateTicketCode = (index: number, value: string) => {
    const newCodes = [...ticketCodes];
    newCodes[index] = value;
    setTicketCodes(newCodes);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderRef = generateOrderReference();
      setOrderReference(orderRef);
      
      const order: Order = {
        reference: orderRef,
        items: [...cart],
        total,
        status: 'pending',
        date: new Date().toISOString(),
        customerInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          phone: formData.phone
        }
      };

      saveOrder(order);
      
      if (paymentMethod === 'nowpayments') {
        const customerName = `${formData.firstName} ${formData.lastName}`;
        const paymentResult = await initializeNowPayment(order, formData.email, customerName);
        
        if (paymentResult.success && paymentResult.redirectUrl) {
          clearCart();
          onClose();
          showToast(`${t('orderPlaced')} ${orderRef}. Redirecting to payment...`, 'success');
          
          window.location.href = paymentResult.redirectUrl;
        } else {
          showToast(paymentResult.error || 'Payment initialization failed', 'error');
          setLoading(false);
          return;
        }
        
      } else if (paymentMethod === 'prepaid-tickets') {
        const validCodes = ticketCodes.filter(code => code.trim() !== '');
        if (validCodes.length === 0) {
          showToast('Please enter at least one ticket code', 'error');
          setLoading(false);
          return;
        }
        
        console.log('Sending email with ticket codes:', {
          orderRef,
          codes: validCodes,
          customerEmail: formData.email,
          total
        });
        
        clearCart();
        setShowTicketConfirmation(true);
        
      } else {
        clearCart();
        showToast(`${t('orderPlaced')} ${orderRef}`, 'success');
        setShowPaymentDetails(true);
      }
      
    } catch (error) {
      showToast('Order failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Auto-redirect to dashboard after 3 seconds for ticket confirmation
  useEffect(() => {
    if (showTicketConfirmation) {
      const timer = setTimeout(() => {
        onClose();
        setLocation('/dashboard');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showTicketConfirmation, onClose, setLocation]);

  // Ticket Confirmation Modal
  if (showTicketConfirmation) {
    const handleCloseTicketModal = () => {
      queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
      onClose();
      setLocation('/dashboard');
    };

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" data-testid="ticket-confirmation-modal">
        <div className="bg-background rounded-2xl shadow-2xl max-w-md w-full">
          {/* Success Header */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-white rounded-t-2xl">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-white/20 rounded-full">
                <CheckCircle className="h-16 w-16" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center">Commande envoyée !</h2>
          </div>

          <div className="p-8">
            {/* Confirmation Message */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
              <p className="text-center text-base text-green-800 dark:text-green-100 leading-relaxed">
                Vous venez de recevoir une notification suite à votre commande.<br />
                Nous procéderons à la vérification du paiement.<br />
                Vous recevrez une confirmation définitive d'ici quelques minutes.
              </p>
            </div>

            {/* Close Button */}
            <button 
              onClick={handleCloseTicketModal}
              className="w-full mt-6 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-3.5 rounded-xl font-semibold text-base hover:shadow-xl transition-all active:scale-[0.98]"
              data-testid="button-close-ticket-confirmation"
            >
              Voir mes commandes
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showPaymentDetails) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" data-testid="payment-details-modal">
        <div className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Success Header */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 sm:p-8 text-white rounded-t-2xl">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-white/20 rounded-full">
                <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">{t('orderReceived')}</h2>
            <div className="flex items-center justify-center gap-2 text-white/90">
              <span className="text-sm sm:text-base">{t('orderNumber')}:</span>
              <span className="font-mono bg-white/20 px-3 py-1 rounded-lg font-semibold text-base sm:text-lg">
                {orderReference}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Bank Transfer Details */}
            {paymentMethod === 'bank-transfer' && (
              <div className="bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4 sm:p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-600 text-white rounded-lg">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-blue-900 dark:text-blue-100">
                    {t('bankTransferTitle')}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
                      {t('ibanLabel')}:
                    </label>
                    <div className="font-mono bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-lg border-2 border-blue-200 dark:border-blue-800 text-sm sm:text-base font-semibold">
                      FR76 1234 5678 9012 3456 7890 123
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
                      {t('bicLabel')}:
                    </label>
                    <div className="font-mono bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-lg border-2 border-blue-200 dark:border-blue-800 text-sm sm:text-base font-semibold">
                      LUXIFRPP
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
                      {t('transferReference')}:
                    </label>
                    <div className="font-mono bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 sm:p-4 rounded-lg text-base sm:text-lg font-bold">
                      {orderReference}
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3 sm:p-4">
                    <div className="flex gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-100">
                        {t('transferInstructions')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Confirmation Message */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800 rounded-xl p-4 sm:p-5 mb-6">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm sm:text-base text-green-800 dark:text-green-100 font-medium">
                    {t('paymentInstructions')}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <button 
              onClick={onClose}
              className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-3.5 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:shadow-xl transition-all active:scale-[0.98]"
              data-testid="button-close-payment-details"
            >
              {t('continueShopping')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-0 sm:p-4" data-testid="checkout-modal">
      <div className="bg-background rounded-none sm:rounded-2xl shadow-2xl w-full sm:max-w-4xl h-full sm:h-auto sm:max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-4 sm:p-6 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold" data-testid="checkout-title">
                {t('checkout')}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {t('checkoutSubtitle')}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              data-testid="button-close-checkout"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8" data-testid="checkout-form">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column - Forms */}
            <div className="space-y-6">
              {/* Shipping Information */}
              <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold">{t('shippingInfo')}</h3>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('firstName')}</label>
                    <input 
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                      required
                      data-testid="input-firstname"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('lastName')}</label>
                    <input 
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                      required
                      data-testid="input-lastname"
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-2">{t('emailAddress')}</label>
                    <input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                      required
                      data-testid="input-email"
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-2">{t('completeAddress')}</label>
                    <input 
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                      required
                      data-testid="input-address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('city')}</label>
                    <input 
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                      required
                      data-testid="input-city"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('country')}</label>
                    <select 
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                      required
                      data-testid="input-country"
                    >
                      <option value="">{t('selectCountry')}</option>
                      <option value="FR">France</option>
                      <option value="PL">Poland</option>
                      <option value="ES">Spain</option>
                      <option value="PT">Portugal</option>
                      <option value="IT">Italy</option>
                      <option value="HU">Hungary</option>
                      <option value="DE">Germany</option>
                    </select>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-2">{t('phone')}</label>
                    <input 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                      required
                      data-testid="input-phone"
                    />
                  </div>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold">{t('paymentMethod')}</h3>
                </div>
                
                <div className="space-y-3">
                  {/* Bank Transfer */}
                  <label className={`flex items-start p-4 border-2 rounded-xl cursor-pointer hover:bg-muted/50 transition-all ${paymentMethod === 'bank-transfer' ? 'border-primary bg-primary/5 shadow-md' : 'border-border'}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="bank-transfer" 
                      checked={paymentMethod === 'bank-transfer'}
                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      className="mr-3 mt-1 w-4 h-4 text-primary" 
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <Building2 className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold">{t('bankTransfer')}</span>
                        <span className="ml-auto text-green-600 text-xs font-medium px-2 py-1 bg-green-50 dark:bg-green-950/30 rounded-full">
                          {t('active')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{t('bankTransferDescription')}</p>
                    </div>
                  </label>

                  {/* Prepaid Tickets */}
                  <label className={`flex items-start p-4 border-2 rounded-xl cursor-pointer hover:bg-muted/50 transition-all ${paymentMethod === 'prepaid-tickets' ? 'border-primary bg-primary/5 shadow-md' : 'border-border'}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="prepaid-tickets" 
                      checked={paymentMethod === 'prepaid-tickets'}
                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      className="mr-3 mt-1 w-4 h-4 text-primary" 
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <Ticket className="h-5 w-5 text-orange-600" />
                        <span className="font-semibold">{t('prepaidTicketsTitle')}</span>
                        <span className="ml-auto text-green-600 text-xs font-medium px-2 py-1 bg-green-50 dark:bg-green-950/30 rounded-full">
                          {t('active')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{t('prepaidTicketsDescription')}</p>
                    </div>
                  </label>

                  {/* Ticket Codes Input */}
                  {paymentMethod === 'prepaid-tickets' && (
                    <div className="ml-8 space-y-3 bg-muted/30 border border-border rounded-lg p-4">
                      <h4 className="font-medium text-sm">{t('ticketCode')}s:</h4>
                      {ticketCodes.map((code, index) => (
                        <div key={index} className="flex gap-2">
                          <input 
                            type="text"
                            value={code}
                            onChange={(e) => updateTicketCode(index, e.target.value)}
                            placeholder={`${t('ticketCode')} ${index + 1}`}
                            className="flex-1 px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                            data-testid={`input-ticket-code-${index}`}
                          />
                          {ticketCodes.length > 1 && (
                            <button 
                              type="button"
                              onClick={() => removeTicketCode(index)}
                              className="px-3 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                              data-testid={`button-remove-ticket-${index}`}
                            >
                              <X className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button 
                        type="button"
                        onClick={addTicketCode}
                        className="flex items-center gap-2 text-sm text-primary hover:underline font-medium"
                        data-testid="button-add-ticket-code"
                      >
                        <Plus className="h-4 w-4" />
                        {t('addTicketCode')}
                      </button>
                    </div>
                  )}

                  {/* MaxelPay */}
                  <label className={`flex items-start p-4 border-2 rounded-xl cursor-pointer hover:bg-muted/50 transition-all ${paymentMethod === 'maxelpay' ? 'border-primary bg-primary/5 shadow-md' : 'border-border'}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="maxelpay" 
                      checked={paymentMethod === 'maxelpay'}
                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      className="mr-3 mt-1 w-4 h-4 text-primary" 
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <span className="font-semibold">{t('maxelPay')}</span>
                        <span className="ml-auto text-green-600 text-xs font-medium px-2 py-1 bg-green-50 dark:bg-green-950/30 rounded-full">
                          {t('active')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{t('maxelPayDescription')}</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Right Column - Order Summary */}
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold">{t('orderSummary')}</h3>
                </div>
                
                {/* Cart Items */}
                <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto pr-2" data-testid="checkout-items">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm line-clamp-2">{item.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">{t('qty')}: {item.quantity}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">€{(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pricing Summary */}
                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('subtotal')}</span>
                    <span className="font-medium" data-testid="checkout-subtotal">€{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('shipping')}</span>
                    <span className="font-medium text-green-600">{t('free')}</span>
                  </div>
                  <div className="h-px bg-border my-3"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">{t('total')}</span>
                    <span className="text-2xl font-bold text-primary" data-testid="checkout-total">
                      €{total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="button-place-order"
              >
                {loading ? t('loading') : t('placeOrder')}
              </button>
              
              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center mb-2">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-xs text-muted-foreground">{t('securePayment')}</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto bg-blue-100 dark:bg-blue-950/30 rounded-full flex items-center justify-center mb-2">
                    <Truck className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="text-xs text-muted-foreground">{t('freeShipping')}</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto bg-purple-100 dark:bg-purple-950/30 rounded-full flex items-center justify-center mb-2">
                    <Package className="h-5 w-5 text-purple-600" />
                  </div>
                  <p className="text-xs text-muted-foreground">{t('yearWarranty')}</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
