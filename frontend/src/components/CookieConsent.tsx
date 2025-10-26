import { useState, useEffect } from 'react';
import { Cookie, Shield, Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/lib/translations';

const cookieConsentTranslations: Record<Language, {
  title: string;
  description: string;
  essentialOnly: string;
  acceptAll: string;
  learnMore: string;
  cookiePolicy: string;
  privacyPolicy: string;
  essentialCookiesTitle: string;
  essentialCookiesDescription: string;
}> = {
  en: {
    title: 'We use cookies',
    description: 'We use essential cookies to provide secure authentication and session management. These cookies are necessary for the website to function properly.',
    essentialOnly: 'Essential only',
    acceptAll: 'Accept',
    learnMore: 'Learn more',
    cookiePolicy: 'Cookie Policy',
    privacyPolicy: 'Privacy Policy',
    essentialCookiesTitle: 'Essential Cookies',
    essentialCookiesDescription: 'Required for authentication and session management. Cannot be disabled.',
  },
  fr: {
    title: 'Nous utilisons des cookies',
    description: 'Nous utilisons des cookies essentiels pour fournir une authentification sécurisée et la gestion de session. Ces cookies sont nécessaires au bon fonctionnement du site.',
    essentialOnly: 'Essentiels uniquement',
    acceptAll: 'Accepter',
    learnMore: 'En savoir plus',
    cookiePolicy: 'Politique de cookies',
    privacyPolicy: 'Politique de confidentialité',
    essentialCookiesTitle: 'Cookies Essentiels',
    essentialCookiesDescription: 'Requis pour l\'authentification et la gestion de session. Ne peuvent pas être désactivés.',
  },
  es: {
    title: 'Usamos cookies',
    description: 'Utilizamos cookies esenciales para proporcionar autenticación segura y gestión de sesión. Estas cookies son necesarias para el correcto funcionamiento del sitio web.',
    essentialOnly: 'Solo esenciales',
    acceptAll: 'Aceptar',
    learnMore: 'Más información',
    cookiePolicy: 'Política de cookies',
    privacyPolicy: 'Política de privacidad',
    essentialCookiesTitle: 'Cookies Esenciales',
    essentialCookiesDescription: 'Requeridas para autenticación y gestión de sesión. No se pueden desactivar.',
  },
  pt: {
    title: 'Usamos cookies',
    description: 'Utilizamos cookies essenciais para fornecer autenticação segura e gerenciamento de sessão. Esses cookies são necessários para o funcionamento adequado do site.',
    essentialOnly: 'Apenas essenciais',
    acceptAll: 'Aceitar',
    learnMore: 'Saiba mais',
    cookiePolicy: 'Política de cookies',
    privacyPolicy: 'Política de privacidade',
    essentialCookiesTitle: 'Cookies Essenciais',
    essentialCookiesDescription: 'Necessários para autenticação e gerenciamento de sessão. Não podem ser desativados.',
  },
  pl: {
    title: 'Używamy plików cookie',
    description: 'Używamy niezbędnych plików cookie do zapewnienia bezpiecznego uwierzytelniania i zarządzania sesją. Te pliki cookie są niezbędne do prawidłowego działania witryny.',
    essentialOnly: 'Tylko niezbędne',
    acceptAll: 'Zaakceptuj',
    learnMore: 'Dowiedz się więcej',
    cookiePolicy: 'Polityka plików cookie',
    privacyPolicy: 'Polityka prywatności',
    essentialCookiesTitle: 'Niezbędne pliki cookie',
    essentialCookiesDescription: 'Wymagane do uwierzytelniania i zarządzania sesją. Nie można ich wyłączyć.',
  },
  it: {
    title: 'Utilizziamo i cookie',
    description: 'Utilizziamo cookie essenziali per fornire autenticazione sicura e gestione della sessione. Questi cookie sono necessari per il corretto funzionamento del sito.',
    essentialOnly: 'Solo essenziali',
    acceptAll: 'Accetta',
    learnMore: 'Maggiori informazioni',
    cookiePolicy: 'Politica dei cookie',
    privacyPolicy: 'Informativa sulla privacy',
    essentialCookiesTitle: 'Cookie Essenziali',
    essentialCookiesDescription: 'Necessari per autenticazione e gestione della sessione. Non possono essere disabilitati.',
  },
  hu: {
    title: 'Sütiket használunk',
    description: 'Alapvető sütiket használunk a biztonságos hitelesítés és munkamenet-kezelés biztosítására. Ezek a sütik szükségesek a webhely megfelelő működéséhez.',
    essentialOnly: 'Csak alapvető',
    acceptAll: 'Elfogadom',
    learnMore: 'Tudjon meg többet',
    cookiePolicy: 'Sütiszabályzat',
    privacyPolicy: 'Adatvédelmi irányelvek',
    essentialCookiesTitle: 'Alapvető sütik',
    essentialCookiesDescription: 'Szükséges a hitelesítéshez és munkamenet-kezeléshez. Nem tiltható le.',
  },
};

export function CookieConsent() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const t = cookieConsentTranslations[language] || cookieConsentTranslations.en;

  useEffect(() => {
    const consentGiven = localStorage.getItem('luxio-cookie-consent');
    if (!consentGiven) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('luxio-cookie-consent', 'accepted');
    localStorage.setItem('luxio-cookie-consent-date', new Date().toISOString());
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('luxio-cookie-consent', 'essential');
    localStorage.setItem('luxio-cookie-consent-date', new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg"
      data-testid="cookie-consent-banner"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-3">
              <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  {t.title}
                  <Shield className="h-4 w-4 text-primary" />
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {t.description}
                </p>
                
                {showDetails && (
                  <div className="mt-4 p-4 bg-accent/50 rounded-lg border">
                    <div className="flex items-start gap-2 mb-2">
                      <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-sm mb-1">{t.essentialCookiesTitle}</h4>
                        <p className="text-xs text-muted-foreground">
                          {t.essentialCookiesDescription}
                        </p>
                        <ul className="mt-2 text-xs text-muted-foreground list-disc list-inside space-y-1">
                          <li>auth_token - JWT authentication (7 days)</li>
                          <li>connect.sid - Session management (24 hours)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-sm text-primary hover:underline mt-2"
                  data-testid="cookie-learn-more"
                >
                  {showDetails ? '▼' : '▶'} {t.learnMore}
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
            <button
              onClick={handleEssentialOnly}
              className="px-4 py-2 text-sm font-medium text-foreground bg-accent hover:bg-accent/80 rounded-md transition-colors"
              data-testid="cookie-essential-only"
            >
              {t.essentialOnly}
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors"
              data-testid="cookie-accept-all"
            >
              {t.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
