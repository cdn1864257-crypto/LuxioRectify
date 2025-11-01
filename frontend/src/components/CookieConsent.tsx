import { useState, useEffect } from 'react';
import { Cookie, Shield, Info, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/lib/translations';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

const cookieConsentTranslations: Record<Language, {
  title: string;
  description: string;
  essentialOnly: string;
  acceptAll: string;
  customize: string;
  savePreferences: string;
  learnMore: string;
  cookiePolicy: string;
  privacyPolicy: string;
  essentialCookiesTitle: string;
  essentialCookiesDescription: string;
  analyticsCookiesTitle: string;
  analyticsCookiesDescription: string;
  marketingCookiesTitle: string;
  marketingCookiesDescription: string;
  customizeTitle: string;
  customizeDescription: string;
}> = {
  en: {
    title: 'We Value Your Privacy',
    description: 'We use cookies and similar technologies to provide you with a secure, personalized shopping experience. Our cookies help us authenticate users, maintain your session, analyze site usage, and deliver relevant content. You have full control over your cookie preferences and can customize them at any time. All cookie data is processed in accordance with GDPR and international privacy regulations.',
    essentialOnly: 'Essential only',
    acceptAll: 'Accept all',
    customize: 'Customize preferences',
    savePreferences: 'Save my preferences',
    learnMore: 'Learn more about our cookies',
    cookiePolicy: 'Cookie Policy',
    privacyPolicy: 'Privacy Policy',
    essentialCookiesTitle: 'Essential Cookies (Required)',
    essentialCookiesDescription: 'These cookies are strictly necessary for the website to function and cannot be disabled. They enable core functionality such as secure authentication, session management, shopping cart operations, and CSRF protection. Without these cookies, critical features would not work properly.',
    analyticsCookiesTitle: 'Analytics & Performance Cookies (Optional)',
    analyticsCookiesDescription: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They help us improve site performance, identify popular products, and optimize user experience. No personally identifiable information is collected.',
    marketingCookiesTitle: 'Marketing & Advertising Cookies (Optional)',
    marketingCookiesDescription: 'These cookies are used to deliver personalized advertisements and measure the effectiveness of our marketing campaigns. They track your browsing habits across websites to show you relevant products and offers. You can opt-out while still enjoying our services.',
    customizeTitle: 'Customize Your Cookie Preferences',
    customizeDescription: 'We believe in transparency and giving you control. Below you can enable or disable different categories of cookies. Please note that essential cookies cannot be disabled as they are required for the website to function securely and provide core services like authentication and shopping cart management.',
  },
  fr: {
    title: 'Nous Respectons Votre Vie Privée',
    description: 'Nous utilisons des cookies et technologies similaires pour vous offrir une expérience d\'achat sécurisée et personnalisée. Nos cookies nous permettent d\'authentifier les utilisateurs, maintenir votre session, analyser l\'utilisation du site et proposer du contenu pertinent. Vous avez un contrôle total sur vos préférences et pouvez les modifier à tout moment. Toutes les données sont traitées conformément au RGPD et aux réglementations internationales.',
    essentialOnly: 'Essentiels uniquement',
    acceptAll: 'Tout accepter',
    customize: 'Personnaliser les préférences',
    savePreferences: 'Enregistrer mes préférences',
    learnMore: 'En savoir plus sur nos cookies',
    cookiePolicy: 'Politique de cookies',
    privacyPolicy: 'Politique de confidentialité',
    essentialCookiesTitle: 'Cookies Essentiels (Requis)',
    essentialCookiesDescription: 'Ces cookies sont strictement nécessaires au fonctionnement du site et ne peuvent être désactivés. Ils permettent des fonctionnalités essentielles comme l\'authentification sécurisée, la gestion de session, le panier d\'achat et la protection CSRF. Sans ces cookies, les fonctionnalités critiques ne fonctionneraient pas correctement.',
    analyticsCookiesTitle: 'Cookies Analytiques & Performance (Optionnels)',
    analyticsCookiesDescription: 'Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site en collectant des informations de manière anonyme. Ils nous permettent d\'améliorer les performances du site, identifier les produits populaires et optimiser l\'expérience utilisateur. Aucune information personnellement identifiable n\'est collectée.',
    marketingCookiesTitle: 'Cookies Marketing & Publicité (Optionnels)',
    marketingCookiesDescription: 'Ces cookies sont utilisés pour diffuser des publicités personnalisées et mesurer l\'efficacité de nos campagnes marketing. Ils suivent vos habitudes de navigation pour vous montrer des produits et offres pertinents. Vous pouvez refuser tout en profitant de nos services.',
    customizeTitle: 'Personnalisez Vos Préférences de Cookies',
    customizeDescription: 'Nous croyons en la transparence et en votre droit de contrôle. Ci-dessous, vous pouvez activer ou désactiver différentes catégories de cookies. Les cookies essentiels ne peuvent être désactivés car ils sont requis pour le fonctionnement sécurisé du site et les services essentiels comme l\'authentification et le panier d\'achat.',
  },
  es: {
    title: 'Usamos cookies',
    description: 'Utilizamos cookies esenciales para proporcionar autenticación segura y gestión de sesión. Estas cookies son necesarias para el correcto funcionamiento del sitio web.',
    essentialOnly: 'Solo esenciales',
    acceptAll: 'Aceptar todo',
    customize: 'Personalizar',
    savePreferences: 'Guardar preferencias',
    learnMore: 'Más información',
    cookiePolicy: 'Política de cookies',
    privacyPolicy: 'Política de privacidad',
    essentialCookiesTitle: 'Cookies Esenciales',
    essentialCookiesDescription: 'Requeridas para autenticación y gestión de sesión. No se pueden desactivar.',
    analyticsCookiesTitle: 'Cookies Analíticas',
    analyticsCookiesDescription: 'Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web.',
    marketingCookiesTitle: 'Cookies de Marketing',
    marketingCookiesDescription: 'Utilizadas para ofrecer publicidad personalizada.',
    customizeTitle: 'Preferencias de cookies',
    customizeDescription: 'Elija qué cookies desea permitir. Las cookies esenciales no se pueden desactivar ya que son necesarias para el funcionamiento del sitio web.',
  },
  pt: {
    title: 'Usamos cookies',
    description: 'Utilizamos cookies essenciais para fornecer autenticação segura e gerenciamento de sessão. Esses cookies são necessários para o funcionamento adequado do site.',
    essentialOnly: 'Apenas essenciais',
    acceptAll: 'Aceitar tudo',
    customize: 'Personalizar',
    savePreferences: 'Salvar preferências',
    learnMore: 'Saiba mais',
    cookiePolicy: 'Política de cookies',
    privacyPolicy: 'Política de privacidade',
    essentialCookiesTitle: 'Cookies Essenciais',
    essentialCookiesDescription: 'Necessários para autenticação e gerenciamento de sessão. Não podem ser desativados.',
    analyticsCookiesTitle: 'Cookies de Análise',
    analyticsCookiesDescription: 'Ajudam-nos a entender como os visitantes interagem com nosso site.',
    marketingCookiesTitle: 'Cookies de Marketing',
    marketingCookiesDescription: 'Usados para fornecer anúncios personalizados.',
    customizeTitle: 'Preferências de cookies',
    customizeDescription: 'Escolha quais cookies você deseja permitir. Os cookies essenciais não podem ser desativados, pois são necessários para o funcionamento do site.',
  },
  pl: {
    title: 'Używamy plików cookie',
    description: 'Używamy niezbędnych plików cookie do zapewnienia bezpiecznego uwierzytelniania i zarządzania sesją. Te pliki cookie są niezbędne do prawidłowego działania witryny.',
    essentialOnly: 'Tylko niezbędne',
    acceptAll: 'Zaakceptuj wszystkie',
    customize: 'Dostosuj',
    savePreferences: 'Zapisz preferencje',
    learnMore: 'Dowiedz się więcej',
    cookiePolicy: 'Polityka plików cookie',
    privacyPolicy: 'Polityka prywatności',
    essentialCookiesTitle: 'Niezbędne pliki cookie',
    essentialCookiesDescription: 'Wymagane do uwierzytelniania i zarządzania sesją. Nie można ich wyłączyć.',
    analyticsCookiesTitle: 'Pliki cookie analityczne',
    analyticsCookiesDescription: 'Pomagają nam zrozumieć, jak odwiedzający wchodzą w interakcję z naszą witryną.',
    marketingCookiesTitle: 'Pliki cookie marketingowe',
    marketingCookiesDescription: 'Używane do dostarczania spersonalizowanych reklam.',
    customizeTitle: 'Preferencje plików cookie',
    customizeDescription: 'Wybierz, które pliki cookie chcesz zezwolić. Niezbędne pliki cookie nie mogą być wyłączone, ponieważ są niezbędne do działania witryny.',
  },
  it: {
    title: 'Utilizziamo i cookie',
    description: 'Utilizziamo cookie essenziali per fornire autenticazione sicura e gestione della sessione. Questi cookie sono necessari per il corretto funzionamento del sito.',
    essentialOnly: 'Solo essenziali',
    acceptAll: 'Accetta tutto',
    customize: 'Personalizza',
    savePreferences: 'Salva preferenze',
    learnMore: 'Maggiori informazioni',
    cookiePolicy: 'Politica dei cookie',
    privacyPolicy: 'Informativa sulla privacy',
    essentialCookiesTitle: 'Cookie Essenziali',
    essentialCookiesDescription: 'Necessari per autenticazione e gestione della sessione. Non possono essere disabilitati.',
    analyticsCookiesTitle: 'Cookie Analitici',
    analyticsCookiesDescription: 'Ci aiutano a capire come i visitatori interagiscono con il nostro sito web.',
    marketingCookiesTitle: 'Cookie di Marketing',
    marketingCookiesDescription: 'Utilizzati per fornire pubblicità personalizzate.',
    customizeTitle: 'Preferenze cookie',
    customizeDescription: 'Scegli quali cookie vuoi consentire. I cookie essenziali non possono essere disabilitati poiché sono necessari per il funzionamento del sito web.',
  },
  hu: {
    title: 'Sütiket használunk',
    description: 'Alapvető sütiket használunk a biztonságos hitelesítés és munkamenet-kezelés biztosítására. Ezek a sütik szükségesek a webhely megfelelő működéséhez.',
    essentialOnly: 'Csak alapvető',
    acceptAll: 'Összes elfogadása',
    customize: 'Testreszabás',
    savePreferences: 'Beállítások mentése',
    learnMore: 'Tudjon meg többet',
    cookiePolicy: 'Sütiszabályzat',
    privacyPolicy: 'Adatvédelmi irányelvek',
    essentialCookiesTitle: 'Alapvető sütik',
    essentialCookiesDescription: 'Szükséges a hitelesítéshez és munkamenet-kezeléshez. Nem tiltható le.',
    analyticsCookiesTitle: 'Analitikai sütik',
    analyticsCookiesDescription: 'Segítenek megérteni, hogyan lépnek kapcsolatba a látogatók a weboldalunkkal.',
    marketingCookiesTitle: 'Marketing sütik',
    marketingCookiesDescription: 'Személyre szabott hirdetések megjelenítésére használjuk.',
    customizeTitle: 'Süti beállítások',
    customizeDescription: 'Válassza ki, mely sütiket szeretné engedélyezni. Az alapvető sütik nem tilthatók le, mivel szükségesek a webhely működéséhez.',
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
  const [showDetails, setShowDetails] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });
  const t = cookieConsentTranslations[language] || cookieConsentTranslations.en;

  useEffect(() => {
    const consentGiven = localStorage.getItem('luxio-cookie-consent');
    if (!consentGiven) {
      setIsVisible(true);
    } else {
      const storedPreferences = localStorage.getItem('luxio-cookie-preferences');
      if (storedPreferences) {
        try {
          setPreferences(JSON.parse(storedPreferences));
        } catch (e) {
          console.error('Failed to parse cookie preferences', e);
        }
      }
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('luxio-cookie-consent', 'customized');
    localStorage.setItem('luxio-cookie-preferences', JSON.stringify(prefs));
    localStorage.setItem('luxio-cookie-consent-date', new Date().toISOString());
  };

  const handleAcceptAll = () => {
    const allPrefs = { essential: true, analytics: true, marketing: true };
    savePreferences(allPrefs);
    setPreferences(allPrefs);
    setIsVisible(false);
    setShowCustomize(false);
  };

  const handleEssentialOnly = () => {
    const essentialPrefs = { essential: true, analytics: false, marketing: false };
    savePreferences(essentialPrefs);
    setPreferences(essentialPrefs);
    setIsVisible(false);
    setShowCustomize(false);
  };

  const handleSaveCustom = () => {
    savePreferences(preferences);
    setIsVisible(false);
    setShowCustomize(false);
  };

  const handleOpenCustomize = () => {
    setShowCustomize(true);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div 
        className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg animate-in slide-in-from-bottom-5 duration-500"
        data-testid="cookie-consent-banner"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-start gap-3">
                <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    {t.title}
                    <Shield className="h-4 w-4 text-primary" aria-hidden="true" />
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t.description}
                  </p>
                  
                  {showDetails && (
                    <div className="mt-4 p-4 bg-accent/50 rounded-lg border animate-in fade-in-50 duration-300">
                      <div className="flex items-start gap-2 mb-2">
                        <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
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
                    className="text-sm text-primary hover:underline mt-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                    data-testid="cookie-learn-more"
                    aria-expanded={showDetails}
                  >
                    {showDetails ? '▼' : '▶'} {t.learnMore}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleEssentialOnly}
                className="px-4 py-2 text-sm font-medium text-foreground bg-accent hover:bg-accent/80 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                data-testid="cookie-essential-only"
              >
                {t.essentialOnly}
              </button>
              <button
                onClick={handleOpenCustomize}
                className="px-4 py-2 text-sm font-medium text-foreground bg-secondary hover:bg-secondary/80 rounded-md transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                data-testid="cookie-customize"
              >
                <Settings className="h-4 w-4" aria-hidden="true" />
                {t.customize}
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                data-testid="cookie-accept-all"
              >
                {t.acceptAll}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showCustomize} onOpenChange={setShowCustomize}>
        <DialogContent className="sm:max-w-[500px]" data-testid="cookie-customize-dialog">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" aria-hidden="true" />
              {t.customizeTitle}
            </DialogTitle>
            <DialogDescription>
              {t.customizeDescription}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-start justify-between gap-4 p-4 border rounded-lg bg-accent/20">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="h-4 w-4 text-primary" aria-hidden="true" />
                  <h4 className="font-semibold text-sm">{t.essentialCookiesTitle}</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t.essentialCookiesDescription}
                </p>
              </div>
              <Switch
                checked={true}
                disabled={true}
                aria-label={t.essentialCookiesTitle}
                data-testid="cookie-switch-essential"
              />
            </div>

            <div className="flex items-start justify-between gap-4 p-4 border rounded-lg hover:bg-accent/10 transition-colors">
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">{t.analyticsCookiesTitle}</h4>
                <p className="text-xs text-muted-foreground">
                  {t.analyticsCookiesDescription}
                </p>
              </div>
              <Switch
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, analytics: checked })
                }
                aria-label={t.analyticsCookiesTitle}
                data-testid="cookie-switch-analytics"
              />
            </div>

            <div className="flex items-start justify-between gap-4 p-4 border rounded-lg hover:bg-accent/10 transition-colors">
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">{t.marketingCookiesTitle}</h4>
                <p className="text-xs text-muted-foreground">
                  {t.marketingCookiesDescription}
                </p>
              </div>
              <Switch
                checked={preferences.marketing}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, marketing: checked })
                }
                aria-label={t.marketingCookiesTitle}
                data-testid="cookie-switch-marketing"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setShowCustomize(false)}
              className="px-4 py-2 text-sm font-medium text-foreground bg-secondary hover:bg-secondary/80 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              data-testid="cookie-customize-cancel"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveCustom}
              className="px-6 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              data-testid="cookie-customize-save"
            >
              {t.savePreferences}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
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
