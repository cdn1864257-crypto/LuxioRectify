import { useState, useEffect } from 'react';
import { Language, translations, detectLanguage } from '../lib/translations';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const detectedLang = detectLanguage();
    setLanguage(detectedLang);
    // Save detected language to localStorage if not already there
    if (!localStorage.getItem('luxio-language')) {
      localStorage.setItem('luxio-language', detectedLang);
    }
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
    // For non-string values like testimonials array, return empty string
    return '';
  };

  const getTestimonials = () => {
    const dict = translations[language] ?? translations.en;
    const value = dict.testimonials ?? translations.en.testimonials;
    return Array.isArray(value) ? value : [];
  };

  return {
    language,
    changeLanguage,
    getTestimonials,
    t
  };
}
