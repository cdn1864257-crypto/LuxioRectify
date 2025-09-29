import { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/use-language';

export function TestimonialsCarousel() {
  const { t, getTestimonials } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback testimonials if not available in translations
  const fallbackTestimonials = [
    {
      name: 'Sarah Johnson',
      avatar: 'SJ',
      rating: 5,
      text: 'Amazing shopping experience! Got my iPhone 15 Pro with 20% off and it arrived the next day. Luxio\'s customer service is exceptional.',
      verified: true
    },
    {
      name: 'Michael Chen',
      avatar: 'MC',
      rating: 5,
      text: 'The Apple Watch Ultra 2 I ordered exceeded my expectations. Great quality, fast delivery, and excellent packaging protection.',
      verified: true
    },
    {
      name: 'Emma Rodriguez',
      avatar: 'ER',
      rating: 5,
      text: 'Love my new Air Jordan sneakers! Perfect fit, authentic quality, and the discount made it such a great deal.',
      verified: true
    },
    {
      name: 'David Thompson',
      avatar: 'DT',
      rating: 5,
      text: 'The smart home gadgets work perfectly together. Easy setup and the prices on Luxio are unbeatable.',
      verified: true
    },
    {
      name: 'Lisa Martinez',
      avatar: 'LM',
      rating: 5,
      text: 'Electric scooter arrived perfectly assembled and ready to ride. Great build quality and smooth checkout process.',
      verified: true
    },
    {
      name: 'James Wilson',
      avatar: 'JW',
      rating: 5,
      text: 'Fantastic experience with my Galaxy S24 Ultra purchase. Premium packaging and lightning-fast shipping to my doorstep.',
      verified: true
    },
    {
      name: 'Rachel Kim',
      avatar: 'RK',
      rating: 5,
      text: 'The Garmin watch is perfect for my fitness goals. Luxio offers the best prices and their payment system is secure.',
      verified: true
    },
    {
      name: 'Alex Foster',
      avatar: 'AF',
      rating: 5,
      text: 'Outstanding product quality and customer care. My smart speaker setup was effortless thanks to their detailed guides.',
      verified: true
    }
  ];

  // Get testimonials from translations, fallback to default
  const translatedTestimonials = getTestimonials();
  const testimonials = translatedTestimonials.length > 0 ? translatedTestimonials : fallbackTestimonials;
  
  const itemsPerView = 3;
  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [maxIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  return (
    <section className="py-16" data-testid="testimonials-carousel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" data-testid="testimonials-title">
            {t('whatCustomersSay')}
          </h2>
          <p className="text-slate-600 dark:text-slate-300" data-testid="testimonials-subtitle">
            {t('realReviews')}
          </p>
        </div>
        
        <div className="relative">
          {/* Carousel container */}
          <div className="overflow-hidden" data-testid="carousel-container">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                width: `${(testimonials.length * 100) / itemsPerView}%`
              }}
              data-testid="carousel-track"
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={`${testimonial.name}-${index}`}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / testimonials.length}%` }}
                  data-testid={`testimonial-${index}`}
                >
                  <div className="bg-card border border-border rounded-lg p-6 shadow-sm h-full">
                    {/* Star rating */}
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400" data-testid={`rating-${index}`}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <i key={i} className="fas fa-star text-sm"></i>
                        ))}
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-300 ml-2">
                        {testimonial.rating}.0
                      </span>
                    </div>
                    
                    {/* Testimonial text */}
                    <p 
                      className="text-slate-700 dark:text-slate-300 mb-4 text-sm leading-relaxed" 
                      data-testid={`testimonial-text-${index}`}
                    >
                      "{testimonial.text}"
                    </p>
                    
                    {/* Author info */}
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                        {testimonial.avatar}
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-sm" data-testid={`author-${index}`}>
                          {testimonial.name}
                        </div>
                        {testimonial.verified && (
                          <div className="text-xs text-green-600 dark:text-green-400 flex items-center">
                            <i className="fas fa-check-circle mr-1"></i>
                            {t('verifiedPurchase')}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-slate-800 rounded-full p-2 shadow-lg border border-border hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors z-10"
            data-testid="prev-button"
            aria-label="Previous testimonials"
          >
            <i className="fas fa-chevron-left text-slate-600 dark:text-slate-400"></i>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-slate-800 rounded-full p-2 shadow-lg border border-border hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors z-10"
            data-testid="next-button"
            aria-label="Next testimonials"
          >
            <i className="fas fa-chevron-right text-slate-600 dark:text-slate-400"></i>
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2" data-testid="dots-indicator">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex 
                  ? 'bg-primary' 
                  : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
              }`}
              data-testid={`dot-${index}`}
              aria-label={`Go to testimonial set ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile swipe hint */}
        <div className="text-center mt-4 text-xs text-slate-500 dark:text-slate-400 md:hidden">
          <i className="fas fa-hand-point-left mr-1"></i>
          Swipe to navigate
        </div>
      </div>
    </section>
  );
}