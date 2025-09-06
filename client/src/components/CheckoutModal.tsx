import { useState } from 'react';
import { useCart } from '../hooks/use-cart';
import { useLanguage } from '../hooks/use-language';
import { generateOrderReference, generateMaxelPayUrl, saveOrder, Order } from '../lib/cart';
import { showToast } from './ToastNotifications';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, total, clearCart } = useCart();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    phone: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderRef = generateOrderReference();
      
      const order: Order = {
        reference: orderRef,
        items: [...cart],
        total,
        status: 'pending',
        date: new Date().toISOString(),
        customerInfo: formData
      };

      // Save order to localStorage
      saveOrder(order);
      
      // Generate MaxelPay URL
      const paymentUrl = generateMaxelPayUrl(order);
      
      // Clear cart
      clearCart();
      
      // Close modal
      onClose();
      
      // Show success message
      showToast(`${t('orderPlaced')} ${orderRef}. Redirecting to payment...`, 'success');
      
      // In a real implementation, redirect to MaxelPay
      console.log('Redirect to MaxelPay:', paymentUrl);
      
      // Simulate successful payment after 2 seconds
      setTimeout(() => {
        showToast(t('paymentSuccessful'), 'success');
      }, 2000);
      
    } catch (error) {
      showToast('Order failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

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
                <label className="block text-sm font-medium mb-2">{t('address')}</label>
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
                  <option value="">Select Country</option>
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
              <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted">
                <input type="radio" name="payment" value="maxelpay" className="mr-3" defaultChecked />
                <i className="fas fa-credit-card mr-3 text-primary"></i>
                <span className="font-medium">MaxelPay</span>
                <span className="ml-auto text-green-600 text-sm">Available</span>
              </label>
              <label className="flex items-center p-4 border border-border rounded-lg cursor-not-allowed opacity-50">
                <input type="radio" name="payment" value="payu" className="mr-3" disabled />
                <i className="fas fa-university mr-3"></i>
                <span className="font-medium">PayU</span>
                <span className="ml-auto text-yellow-600 text-sm">Coming Soon</span>
              </label>
              <label className="flex items-center p-4 border border-border rounded-lg cursor-not-allowed opacity-50">
                <input type="radio" name="payment" value="transak" className="mr-3" disabled />
                <i className="fab fa-bitcoin mr-3"></i>
                <span className="font-medium">Transak</span>
                <span className="ml-auto text-yellow-600 text-sm">Coming Soon</span>
              </label>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            data-testid="button-place-order"
          >
            {loading ? 'Processing...' : t('placeOrder')}
          </button>
        </form>
      </div>
    </div>
  );
}
