import { useState } from 'react';
import { useCart } from '../hooks/use-cart';
import { useLanguage } from '../hooks/use-language';
import { generateOrderReference, generateMaxelPayUrl, saveOrder, Order } from '../lib/cart';
import { showToast } from './ToastNotifications';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaymentMethod = 'bank-transfer' | 'prepaid-tickets' | 'maxelpay';

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, total, clearCart } = useCart();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank-transfer');
  const [orderReference, setOrderReference] = useState<string>('');
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
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

      // Save order to localStorage
      saveOrder(order);
      
      if (paymentMethod === 'maxelpay') {
        // Generate MaxelPay URL and redirect
        const paymentUrl = generateMaxelPayUrl(order);
        clearCart();
        onClose();
        showToast(`${t('orderPlaced')} ${orderRef}. Redirecting to MaxelPay...`, 'success');
        
        // Simulate redirect (in real app, do: window.location.href = paymentUrl)
        console.log('Redirect to MaxelPay:', paymentUrl);
        setTimeout(() => {
          showToast(t('paymentSuccessful'), 'success');
        }, 2000);
        
      } else if (paymentMethod === 'prepaid-tickets') {
        // Send ticket codes via email (simulate)
        const validCodes = ticketCodes.filter(code => code.trim() !== '');
        if (validCodes.length === 0) {
          showToast('Please enter at least one ticket code', 'error');
          setLoading(false);
          return;
        }
        
        // In real app, send email to support@luxio-store.com
        console.log('Sending email with ticket codes:', {
          orderRef,
          codes: validCodes,
          customerEmail: formData.email,
          total
        });
        
        clearCart();
        showToast(`${t('ticketCodeSent')} - ${t('orderNumber')}: ${orderRef}`, 'success');
        setShowPaymentDetails(true);
        
      } else {
        // Bank transfer - show payment details
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

  if (showPaymentDetails) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" data-testid="payment-details-modal">
        <div className="bg-card rounded-lg shadow-xl max-w-2xl w-full p-6">
          <div className="text-center mb-6">
            <div className="text-green-600 text-5xl mb-4">
              <i className="fas fa-check-circle"></i>
            </div>
            <h2 className="text-2xl font-bold mb-2">{t('orderReceived')}</h2>
            <p className="text-lg">{t('orderNumber')}: <span className="font-mono bg-muted px-2 py-1 rounded">{orderReference}</span></p>
          </div>

          {paymentMethod === 'bank-transfer' && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <i className="fas fa-university mr-2 text-blue-600"></i>
                {t('bankTransferTitle')}
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">{t('ibanLabel')}:</label>
                  <div className="font-mono bg-white dark:bg-slate-800 p-2 rounded border text-lg">
                    FR76 1234 5678 9012 3456 7890 123
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">{t('bicLabel')}:</label>
                  <div className="font-mono bg-white dark:bg-slate-800 p-2 rounded border text-lg">
                    LUXIFRPP
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">{t('transferReference')}:</label>
                  <div className="font-mono bg-white dark:bg-slate-800 p-2 rounded border text-lg font-bold text-primary">
                    {orderReference}
                  </div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded p-3">
                  <p className="text-sm">
                    <i className="fas fa-exclamation-triangle mr-2 text-yellow-600"></i>
                    {t('transferInstructions')}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800 dark:text-green-200">
              <i className="fas fa-info-circle mr-2"></i>
              {t('paymentInstructions')}
            </p>
          </div>

          <button 
            onClick={onClose}
            className="w-full bg-primary text-primary-foreground py-3 rounded-md hover:bg-primary/90 transition-colors"
            data-testid="button-close-payment-details"
          >
            {t('continueShopping')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" data-testid="checkout-modal">
      <div className="bg-card rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold" data-testid="checkout-title">{t('checkout')}</h2>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            data-testid="button-close-checkout"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6" data-testid="checkout-form">
          {/* Shipping Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('shippingInfo')}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t('firstName')}</label>
                <input 
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
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
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                  data-testid="input-lastname"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">{t('emailAddress')}</label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                  data-testid="input-email"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">{t('completeAddress')}</label>
                <input 
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
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
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                  data-testid="input-city"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('country')}</label>
                <select 
                  value={formData.country}
                  onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
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
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">{t('phone')}</label>
                <input 
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                  data-testid="input-phone"
                />
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('orderSummary')}</h3>
            <div className="space-y-3 mb-4" data-testid="checkout-items">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">Qty: {item.quantity}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">€{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4">
              <div className="flex justify-between mb-2">
                <span>{t('subtotal')}:</span>
                <span data-testid="checkout-subtotal">€{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>{t('shipping')}:</span>
                <span className="text-green-600">{t('free')}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>{t('total')}:</span>
                <span data-testid="checkout-total">€{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Payment Method */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('paymentMethod')}</h3>
            <div className="space-y-3">
              {/* Bank Transfer */}
              <label className={`flex items-start p-4 border rounded-lg cursor-pointer hover:bg-muted transition-colors ${paymentMethod === 'bank-transfer' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="bank-transfer" 
                  checked={paymentMethod === 'bank-transfer'}
                  onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                  className="mr-3 mt-1" 
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <i className="fas fa-university mr-3 text-blue-600"></i>
                    <span className="font-medium">{t('bankTransfer')}</span>
                    <span className="ml-auto text-green-600 text-sm">{t('active')}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{t('bankTransferDescription')}</p>
                </div>
              </label>

              {/* Prepaid Tickets */}
              <label className={`flex items-start p-4 border rounded-lg cursor-pointer hover:bg-muted transition-colors ${paymentMethod === 'prepaid-tickets' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="prepaid-tickets" 
                  checked={paymentMethod === 'prepaid-tickets'}
                  onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                  className="mr-3 mt-1" 
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <i className="fas fa-ticket-alt mr-3 text-orange-600"></i>
                    <span className="font-medium">{t('prepaidTicketsTitle')}</span>
                    <span className="ml-auto text-green-600 text-sm">{t('active')}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{t('prepaidTicketsDescription')}</p>
                </div>
              </label>

              {/* Ticket Codes Input */}
              {paymentMethod === 'prepaid-tickets' && (
                <div className="ml-8 space-y-3 bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium text-sm">{t('ticketCode')}s:</h4>
                  {ticketCodes.map((code, index) => (
                    <div key={index} className="flex gap-2">
                      <input 
                        type="text"
                        value={code}
                        onChange={(e) => updateTicketCode(index, e.target.value)}
                        placeholder={`${t('ticketCode')} ${index + 1}`}
                        className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        data-testid={`input-ticket-code-${index}`}
                      />
                      {ticketCodes.length > 1 && (
                        <button 
                          type="button"
                          onClick={() => removeTicketCode(index)}
                          className="px-3 py-2 text-destructive hover:bg-destructive/10 rounded-md"
                          data-testid={`button-remove-ticket-${index}`}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      )}
                    </div>
                  ))}
                  <button 
                    type="button"
                    onClick={addTicketCode}
                    className="text-sm text-primary hover:underline"
                    data-testid="button-add-ticket-code"
                  >
                    <i className="fas fa-plus mr-1"></i>
                    {t('addTicketCode')}
                  </button>
                </div>
              )}

              {/* MaxelPay */}
              <label className={`flex items-start p-4 border rounded-lg cursor-pointer hover:bg-muted transition-colors ${paymentMethod === 'maxelpay' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="maxelpay" 
                  checked={paymentMethod === 'maxelpay'}
                  onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                  className="mr-3 mt-1" 
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <i className="fas fa-credit-card mr-3 text-primary"></i>
                    <span className="font-medium">{t('maxelPay')}</span>
                    <span className="ml-auto text-green-600 text-sm">{t('active')}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Fast and secure online payment</p>
                </div>
              </label>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            data-testid="button-place-order"
          >
            {loading ? t('loading') : t('placeOrder')}
          </button>
        </form>
      </div>
    </div>
  );
}