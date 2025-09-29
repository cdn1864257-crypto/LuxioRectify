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

  const t = (key: keyof typeof translations.en) => {
    return translations[language][key] || translations.en[key];
  };

  return {
    language,
    changeLanguage,
    t
  };
}
