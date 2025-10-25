import { useEffect, ReactNode } from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/translations';

interface RouteWrapperProps {
  children: ReactNode;
  lang: Language;
}

const SUPPORTED_LANGUAGES: Language[] = ['fr', 'en', 'pt', 'es', 'it', 'hu', 'pl'];

export function RouteWrapper({ children, lang }: RouteWrapperProps) {
  const [location] = useLocation();
  const { changeLanguage, language } = useLanguage();

  useEffect(() => {
    if (SUPPORTED_LANGUAGES.includes(lang) && lang !== language) {
      changeLanguage(lang);
    }
  }, [lang, changeLanguage, language, location]);

  return <>{children}</>;
}
