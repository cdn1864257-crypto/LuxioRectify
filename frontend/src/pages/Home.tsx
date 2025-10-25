import { useState } from 'react';
import { Link } from 'wouter';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { StatsSection } from '../components/StatsSection';
import { ProductGrid } from '../components/ProductGrid';
import { TestimonialsCarousel } from '../components/TestimonialsCarousel';
import { Footer } from '../components/Footer';
import { CartSidebar } from '../components/CartSidebar';
import { SEO } from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';
import { useProducts, getProductsByCategory } from '../hooks/use-products';
import { Button } from '../components/ui/button';

export default function Home() {
  const { t } = useLanguage();
  const [cartOpen, setCartOpen] = useState(false);
  
  // Load products dynamically from MongoDB (with static fallback)
  const { products, loading } = useProducts();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO />
      <Header 
        onToggleCart={() => setCartOpen(!cartOpen)}
      />
      <main>
        <Hero />
        <StatsSection />
        
        {loading && (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">Chargement des produits...</p>
          </div>
        )}
        
        <ProductGrid
          id="smartphones"
          title={t('latestSmartphones')}
          subtitle="Premium devices with up to 22% off"
          products={loading ? [] : getProductsByCategory(products, 'smartphones').slice(0, 8)}
        />
        
        <div className="flex justify-center pb-16">
          <Link href="/premium">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6"
              data-testid="button-view-all-smartphones"
            >
              {t('viewAllSmartphones')} →
            </Button>
          </Link>
        </div>
        
        <ProductGrid
          id="watches"
          title={t('smartWatchesFitness')}
          subtitle="Track your health with discounts up to 37%"
          products={loading ? [] : getProductsByCategory(products, 'watches')}
          className="bg-muted"
        />
        
        <ProductGrid
          id="sneakers"
          title={t('premiumSneakers')}
          subtitle="Step up your style with 17% off + free shipping"
          products={loading ? [] : getProductsByCategory(products, 'sneakers')}
        />
        
        <ProductGrid
          id="gadgets"
          title={t('smartHomeGadgets')}
          subtitle="Upgrade your home with 13% off + free delivery"
          products={loading ? [] : getProductsByCategory(products, 'gadgets')}
          className="bg-muted"
        />
        
        <ProductGrid
          id="mobility"
          title={t('urbanMobility')}
          subtitle="Electric scooters & bikes with 13% off + free shipping"
          products={loading ? [] : getProductsByCategory(products, 'mobility')}
        />
        
        <TestimonialsCarousel />
      </main>
      <Footer />
      
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </div>
  );
}
