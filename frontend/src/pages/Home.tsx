import { useState } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { StatsSection } from '../components/StatsSection';
import { ProductGrid } from '../components/ProductGrid';
import { SecurePaymentSection } from '../components/SecurePaymentSection';
import { ReviewsSection } from '../components/ReviewsSection';
import { Footer } from '../components/Footer';
import { CartSidebar } from '../components/CartSidebar';
import { CheckoutModal } from '../components/CheckoutModal';
import { ToastNotifications } from '../components/ToastNotifications';
import { UserProfile } from '../components/UserProfile';
import { useAuth } from '../hooks/use-auth';
import { useLanguage } from '../hooks/use-language';
import { getProductsByCategory } from '../lib/products';
import { showToast } from '../components/ToastNotifications';

export default function Home() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleProceedToCheckout = () => {
    if (!user) {
      // Redirect to static checkout for non-logged users
      showToast(t('loginRequired'), 'info');
      setCartOpen(false);
      setCheckoutOpen(true); // Allow checkout without login as per specs
      return;
    }
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header 
        onToggleCart={() => setCartOpen(!cartOpen)} 
        onToggleProfile={() => setProfileOpen(!profileOpen)}
      />
      <main>
        <Hero />
        <StatsSection />
        
        <ProductGrid
          id="smartphones"
          title={t('latestSmartphones')}
          subtitle="Premium devices with up to 22% off"
          products={getProductsByCategory('smartphones')}
        />
        
        <ProductGrid
          id="watches"
          title={t('smartWatchesFitness')}
          subtitle="Track your health with discounts up to 37%"
          products={getProductsByCategory('watches')}
          className="bg-muted"
        />
        
        <ProductGrid
          id="sneakers"
          title={t('premiumSneakers')}
          subtitle="Step up your style with 17% off + free shipping"
          products={getProductsByCategory('sneakers')}
        />
        
        <ProductGrid
          id="gadgets"
          title={t('smartHomeGadgets')}
          subtitle="Upgrade your home with 13% off + free delivery"
          products={getProductsByCategory('gadgets')}
          className="bg-muted"
        />
        
        <ProductGrid
          id="mobility"
          title={t('urbanMobility')}
          subtitle="Electric scooters & bikes with 13% off + free shipping"
          products={getProductsByCategory('mobility')}
        />
        
        <SecurePaymentSection />
        <ReviewsSection />
      </main>
      <Footer />
      
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={handleProceedToCheckout}
      />
      
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
      
      <UserProfile
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
      
      <ToastNotifications />
    </div>
  );
}
