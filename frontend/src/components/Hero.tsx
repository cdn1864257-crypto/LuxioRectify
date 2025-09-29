import { useLanguage } from '../contexts/LanguageContext';

export function Hero() {
  const { t } = useLanguage();

  const scrollToProducts = () => {
    const element = document.getElementById('smartphones');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-primary/95 to-slate-800 text-white py-20 overflow-hidden" data-testid="hero-section">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMS4xLjktMiAyLTJoNGMxLjEgMCAyIC45IDIgMnY0YzAgMS4xLS45IDItMiAyaC00Yy0xLjEgMC0yLS45LTItMnYtNHpNMTYgMzZjMC0xLjEuOS0yIDItMmg0YzEuMSAwIDIgLjkgMiAydjRjMCAxLjEtLjkgMi0yIDJoLTRjLTEuMSAwLTItLjktMi0ydi00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" data-testid="hero-title">
                {t('heroTitle')}
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed" data-testid="hero-subtitle">
                {t('heroSubtitle')}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToProducts}
                className="bg-white text-primary px-6 py-2.5 rounded-md font-medium hover:bg-white/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                data-testid="button-shop-now"
              >
                {t('shopNow')}
              </button>
              <button 
                onClick={scrollToProducts}
                className="border-2 border-white text-white px-6 py-2.5 rounded-md font-medium hover:bg-white/10 transition-colors backdrop-blur-sm"
                data-testid="button-view-deals"
              >
                {t('viewDeals')}
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1592286927505-b0c2c58c4c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80" 
                alt="Premium smartphones collection showcasing latest technology" 
                className="w-full h-auto object-cover"
                data-testid="hero-image"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white text-primary px-6 py-3 rounded-lg shadow-xl">
              <p className="text-sm font-medium">Up to 37% OFF</p>
              <p className="text-xs text-muted-foreground">Limited time offer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
