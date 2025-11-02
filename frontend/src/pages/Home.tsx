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
import { OrganizationSchema, WebSiteSchema, BreadcrumbSchema, OfferCatalogSchema } from '../components/StructuredData';
import { useLanguage } from '../contexts/LanguageContext';
import { useProducts, getProductsByCategory } from '../hooks/use-products';
import { Button } from '../components/ui/button';

export default function Home() {
  const { t, language } = useLanguage();
  const [cartOpen, setCartOpen] = useState(false);
  
  // Load products dynamically from MongoDB (with static fallback)
  const { products, loading } = useProducts();

  const breadcrumbItems = [
    { name: 'Luxio', url: `https://luxiomarket.shop/${language}` },
    { name: t('home') || 'Home', url: `https://luxiomarket.shop/${language}` }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO />
      <OrganizationSchema />
      <WebSiteSchema language={language} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <OfferCatalogSchema />
      <Header 
        onToggleCart={() => setCartOpen(!cartOpen)}
      />
      <main>
        <Hero />
        <StatsSection />
        
        {loading && (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">{t('loadingProducts')}</p>
          </div>
        )}
        
        <ProductGrid
          id="smartphones"
          title={t('latestSmartphones')}
          subtitle={t('smartphonesSubtitle')}
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
          subtitle={t('watchesSubtitle')}
          products={loading ? [] : getProductsByCategory(products, 'watches')}
          className="bg-muted"
        />
        
        <ProductGrid
          id="sneakers"
          title={t('premiumSneakers')}
          subtitle={t('sneakersSubtitle')}
          products={loading ? [] : getProductsByCategory(products, 'sneakers')}
        />
        
        <ProductGrid
          id="gadgets"
          title={t('smartHomeGadgets')}
          subtitle={t('gadgetsSubtitle')}
          products={loading ? [] : getProductsByCategory(products, 'gadgets')}
          className="bg-muted"
        />
        
        <ProductGrid
          id="mobility"
          title={t('urbanMobility')}
          subtitle={t('mobilitySubtitle')}
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
