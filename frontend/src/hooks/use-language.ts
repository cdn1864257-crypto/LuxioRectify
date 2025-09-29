import { useState, useEffect } from 'react';
import { Language, translations, detectLanguage } from '../lib/translations';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const detectedLang = detectLanguage();
    setLanguage(detectedLang);
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('luxio-language', lang);
  };

  const t = (key: keyof typeof translations.en): string => {
    const value = translations[language][key] || translations.en[key];
    if (typeof value === 'string') {
      return value;
    }
    // For non-string values like testimonials array, return empty string
    return '';
  };

  const getTestimonials = () => {
    const value = translations[language].testimonials || translations.en.testimonials;
    return Array.isArray(value) ? value : [];
  };

  return {
    language,
    changeLanguage,
    getTestimonials,
    t
  };
}
