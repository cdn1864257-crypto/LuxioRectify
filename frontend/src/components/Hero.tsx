import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'wouter';
import iphone17ProImage from '@assets/iphone17 pro1_1759187408941.jpeg';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden" data-testid="hero-section">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 animate-pulse"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-sm font-medium">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Nueva colección disponible
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight" data-testid="hero-title">
                {t('heroTitle')}
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl" data-testid="hero-subtitle">
                {t('heroSubtitle')}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/premium"
                className="group bg-white text-slate-900 px-8 py-3.5 rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2"
                data-testid="button-shop-now"
              >
                <span>{t('shopNow')}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <Link 
                href="/premium"
                className="border-2 border-white/50 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm"
                data-testid="button-view-deals"
              >
                {t('viewDeals')}
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-white/70">Envío gratis</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-white/70">Garantía 2 años</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-white/70">Pago seguro</span>
              </div>
            </div>
          </div>
          
          {/* Right content - Image showcase */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            {/* Main product image */}
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-blue-500/30 rounded-3xl blur-3xl"></div>
              
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                <img 
                  src={iphone17ProImage} 
                  alt="iPhone 17 Pro - Premium smartphone collection" 
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  loading="eager"
                  data-testid="hero-image"
                />
                
                {/* Floating discount badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-red-500 to-pink-600 text-white px-6 py-3 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform">
                  <p className="text-2xl font-bold">-37%</p>
                  <p className="text-xs">Ahorra hasta</p>
                </div>
                
                {/* Floating features */}
                <div className="absolute -bottom-4 -left-4 bg-white text-slate-900 px-6 py-4 rounded-2xl shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold">Entrega rápida</p>
                      <p className="text-xs text-slate-600">24-48h garantizado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative dots pattern */}
            <div className="absolute top-10 right-10 opacity-20">
              <div className="grid grid-cols-4 gap-2">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-white rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
