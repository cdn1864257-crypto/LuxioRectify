import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function TestimonialsCarousel() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const testimonials = [
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
    },
    {
      name: 'Sophie Laurent',
      avatar: 'SL',
      rating: 5,
      text: 'My Nike Air Max arrived in perfect condition. The quality is top-notch and the price was incredibly competitive.',
      verified: true
    },
    {
      name: 'Tom Anderson',
      avatar: 'TA',
      rating: 5,
      text: 'Bought a Samsung Galaxy Z Fold and couldn\'t be happier. Luxio made the whole process seamless from order to delivery.',
      verified: true
    },
    {
      name: 'Maria Santos',
      avatar: 'MS',
      rating: 5,
      text: 'The Fitbit tracker I ordered works wonderfully. Great customer support and the free shipping was a nice bonus.',
      verified: true
    },
    {
      name: 'Chris Taylor',
      avatar: 'CT',
      rating: 5,
      text: 'Amazing deals on tech products! Got a smart thermostat and security camera bundle at an incredible discount.',
      verified: true
    },
    {
      name: 'Nina Patel',
      avatar: 'NP',
      rating: 5,
      text: 'The e-bike I purchased is fantastic. Luxio\'s team answered all my questions and the delivery was super fast.',
      verified: true
    },
    {
      name: 'Daniel Brown',
      avatar: 'DB',
      rating: 5,
      text: 'Ordered Adidas sneakers and they fit perfectly! Authentic products, great prices, and excellent service overall.',
      verified: true
    },
    {
      name: 'Elena Popov',
      avatar: 'EP',
      rating: 5,
      text: 'Very satisfied with my Google Pixel 8 Pro. The checkout was easy and my order arrived earlier than expected.',
      verified: true
    }
  ];
  
  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(0);
    }
  }, [itemsPerView, currentIndex, maxIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    }, 4000);

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
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400" data-testid={`rating-${index}`}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-300 ml-2">
                        {testimonial.rating}.0
                      </span>
                    </div>
                    
                    <p 
                      className="text-slate-700 dark:text-slate-300 mb-4 text-sm leading-relaxed" 
                      data-testid={`testimonial-text-${index}`}
                    >
                      "{testimonial.text}"
                    </p>
                    
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
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
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

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-slate-800 rounded-full p-2 shadow-lg border border-border hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors z-10"
            data-testid="prev-button"
            aria-label="Previous testimonials"
          >
            <svg className="w-6 h-6 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-slate-800 rounded-full p-2 shadow-lg border border-border hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors z-10"
            data-testid="next-button"
            aria-label="Next testimonials"
          >
            <svg className="w-6 h-6 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

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

        <div className="text-center mt-4 text-xs text-slate-500 dark:text-slate-400 md:hidden">
          <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Swipe to navigate
        </div>
      </div>
    </section>
  );
}
