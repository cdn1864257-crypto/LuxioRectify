import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/lib/translations';
import { Button } from '@/components/ui/button';

const cookieConsentTranslations: Record<Language, {
  message: string;
  accept: string;
  reject: string;
  learnMore: string;
}> = {
  en: {
    message: 'We use cookies to ensure you get the best experience on our site.',
    accept: 'Accept',
    reject: 'Reject',
    learnMore: 'Privacy Policy',
  },
  fr: {
    message: 'Nous utilisons des cookies pour vous garantir la meilleure expérience sur notre site.',
    accept: 'Accepter',
    reject: 'Refuser',
    learnMore: 'Politique de confidentialité',
  },
  es: {
    message: 'Usamos cookies para garantizarte la mejor experiencia en nuestro sitio.',
    accept: 'Aceptar',
    reject: 'Rechazar',
    learnMore: 'Política de privacidad',
  },
  pt: {
    message: 'Utilizamos cookies para garantir a melhor experiência em nosso site.',
    accept: 'Aceitar',
    reject: 'Rejeitar',
    learnMore: 'Política de privacidade',
  },
  pl: {
    message: 'Używamy plików cookie, aby zapewnić najlepsze wrażenia na naszej stronie.',
    accept: 'Akceptuj',
    reject: 'Odrzuć',
    learnMore: 'Polityka prywatności',
  },
  it: {
    message: 'Utilizziamo i cookie per garantirti la migliore esperienza sul nostro sito.',
    accept: 'Accetta',
    reject: 'Rifiuta',
    learnMore: 'Informativa sulla privacy',
  },
  hu: {
    message: 'Cookie-kat használunk a legjobb élmény biztosításához oldalunkon.',
    accept: 'Elfogadom',
    reject: 'Elutasítom',
    learnMore: 'Adatvédelmi irányelvek',
  },
};

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const t = cookieConsentTranslations[language] || cookieConsentTranslations.en;

  useEffect(() => {
    const consentGiven = localStorage.getItem('luxio-cookie-consent');
    if (!consentGiven) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    const allPrefs: CookiePreferences = { essential: true, analytics: true, marketing: true };
    localStorage.setItem('luxio-cookie-consent', 'accepted');
    localStorage.setItem('luxio-cookie-preferences', JSON.stringify(allPrefs));
    localStorage.setItem('luxio-cookie-consent-date', new Date().toISOString());
    setIsVisible(false);
  };

  const handleReject = () => {
    const essentialOnly: CookiePreferences = { essential: true, analytics: false, marketing: false };
    localStorage.setItem('luxio-cookie-consent', 'rejected');
    localStorage.setItem('luxio-cookie-preferences', JSON.stringify(essentialOnly));
    localStorage.setItem('luxio-cookie-consent-date', new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in slide-in-from-bottom-5 fade-in duration-500"
      data-testid="cookie-consent-banner"
    >
      <div className="relative bg-background/95 backdrop-blur-md border border-border/50 rounded-xl shadow-lg p-5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
            <Cookie className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground leading-relaxed mb-4">
              {t.message}
              {' '}
              <a 
                href="/privacy" 
                className="text-primary hover:underline font-medium"
                data-testid="cookie-privacy-link"
              >
                {t.learnMore}
              </a>
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={handleReject}
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none"
                data-testid="cookie-reject"
              >
                {t.reject}
              </Button>
              <Button
                onClick={handleAccept}
                size="sm"
                className="flex-1 sm:flex-none"
                data-testid="cookie-accept"
              >
                {t.accept}
              </Button>
            </div>
          </div>
          <button
            onClick={handleReject}
            className="absolute top-2 right-2 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
            aria-label="Close"
            data-testid="cookie-close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function getCookiePreferences(): CookiePreferences {
  const storedPreferences = localStorage.getItem('luxio-cookie-preferences');
  if (storedPreferences) {
    try {
      return JSON.parse(storedPreferences);
    } catch (e) {
      return { essential: true, analytics: false, marketing: false };
    }
  }
  return { essential: true, analytics: false, marketing: false };
}
