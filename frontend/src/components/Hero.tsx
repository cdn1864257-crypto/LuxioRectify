import { useLanguage } from '../hooks/use-language';

export function Hero() {
  const { t } = useLanguage();

  const scrollToProducts = () => {
    const element = document.getElementById('smartphones');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="gradient-hero text-white py-20" data-testid="hero-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="hero-title">
              {t('heroTitle')}
            </h1>
            <p className="text-xl mb-8 text-white/90" data-testid="hero-subtitle">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToProducts}
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                data-testid="button-shop-now"
              >
                {t('shopNow')}
              </button>
              <button 
                onClick={scrollToProducts}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
                data-testid="button-view-deals"
              >
                {t('viewDeals')}
              </button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Modern smartphones collection" 
              className="rounded-xl shadow-2xl w-full h-auto"
              data-testid="hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
