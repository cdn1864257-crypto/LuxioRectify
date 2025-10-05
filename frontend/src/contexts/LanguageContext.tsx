import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, detectLanguage, detectLanguageAsync } from '../lib/translations';

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
  getTestimonials: () => Array<{
    name: string;
    avatar: string;
    rating: number;
    text: string;
    verified: boolean;
  }>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => detectLanguage());

  useEffect(() => {
    const detectAndSetLanguage = async () => {
      const detectedLang = await detectLanguageAsync();
      setLanguage(detectedLang);
      if (!localStorage.getItem('luxio-language')) {
        localStorage.setItem('luxio-language', detectedLang);
      }
    };

    detectAndSetLanguage();
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('luxio-language', lang);
  };

  const t = (key: keyof typeof translations.en): string => {
    const dict = translations[language] ?? translations.en;
    const value = dict[key] ?? translations.en[key];
    if (typeof value === 'string') {
      return value;
    }
    return '';
  };

  const getTestimonials = () => {
    const dict = translations[language] ?? translations.en;
    const value = dict.testimonials ?? translations.en.testimonials;
    return Array.isArray(value) ? value : [];
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, getTestimonials }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
