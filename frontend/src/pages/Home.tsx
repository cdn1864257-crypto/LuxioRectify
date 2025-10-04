import { useState } from 'react';
import { Link } from 'wouter';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { StatsSection } from '../components/StatsSection';
import { ProductGrid } from '../components/ProductGrid';
import { TestimonialsCarousel } from '../components/TestimonialsCarousel';
import { Footer } from '../components/Footer';
import { CartSidebar } from '../components/CartSidebar';
import { useLanguage } from '../contexts/LanguageContext';
import { getProductsByCategory } from '../lib/products';
import { Button } from '../components/ui/button';

export default function Home() {
  const { t } = useLanguage();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header 
        onToggleCart={() => setCartOpen(!cartOpen)}
      />
      <main>
        <Hero />
        <StatsSection />
        
        <ProductGrid
          id="smartphones"
          title={t('latestSmartphones')}
          subtitle="Premium devices with up to 22% off"
          products={getProductsByCategory('smartphones').slice(0, 8)}
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
