import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/translations';

const SUPPORTED_LANGUAGES: Language[] = ['fr', 'en', 'pt', 'es', 'it', 'hu', 'pl'];

export function LanguageRedirect() {
  const [, setLocation] = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(Boolean);
    const firstPart = pathParts[0];

    if (!SUPPORTED_LANGUAGES.includes(firstPart as Language)) {
      const newPath = currentPath === '/' ? `/${language}` : `/${language}${currentPath}`;
      setLocation(newPath);
    }
  }, [language, setLocation]);

  return null;
}
