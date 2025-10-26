import { useState } from 'react';
import { useLocation } from 'wouter';
import { Language } from '../lib/translations';
import { useLanguage } from '../contexts/LanguageContext';

const languageFlags = {
  en: '🇺🇸',
  fr: '🇫🇷', 
  es: '🇪🇸',
  pt: '🇵🇹',
  pl: '🇵🇱',
  it: '🇮🇹',
  hu: '🇭🇺'
} as const;

const languageNames = {
  en: 'English',
  fr: 'Français',
  es: 'Español', 
  pt: 'Português',
  pl: 'Polski',
  it: 'Italiano',
  hu: 'Magyar'
} as const;

export function LanguageSelector() {
  const { language, changeLanguage } = useLanguage();
  const [location, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageSelect = (lang: Language) => {
    changeLanguage(lang);
    setIsOpen(false);
    
    const supportedLanguages = ['fr', 'en', 'pt', 'es', 'it', 'hu', 'pl'];
    
    // Parse location to preserve query parameters and hash fragments
    // Split on # first to get hash fragment
    const hashIndex = location.indexOf('#');
    const hashFragment = hashIndex !== -1 ? location.substring(hashIndex) : '';
    const pathAndQuery = hashIndex !== -1 ? location.substring(0, hashIndex) : location;
    
    // Split on ? to get query parameters
    const queryIndex = pathAndQuery.indexOf('?');
    const queryString = queryIndex !== -1 ? pathAndQuery.substring(queryIndex) : '';
    const pathname = queryIndex !== -1 ? pathAndQuery.substring(0, queryIndex) : pathAndQuery;
    
    const pathParts = pathname.split('/').filter(Boolean);
    const currentLangPrefix = supportedLanguages.find(l => pathParts[0] === l);
    
    let newPath: string;
    if (currentLangPrefix) {
      // Replace existing language prefix
      pathParts[0] = lang;
      newPath = '/' + pathParts.join('/');
    } else if (pathname === '/' || pathname === '') {
      // Handle root path
      newPath = `/${lang}`;
    } else {
      // Add language prefix to path without prefix
      newPath = `/${lang}${pathname}`;
    }
    
    // Preserve query parameters and hash fragment
    setLocation(newPath + queryString + hashFragment);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent transition-colors"
        data-testid="language-selector-trigger"
      >
        <span className="text-lg">{languageFlags[language]}</span>
        <span className="text-sm font-medium">{language.toUpperCase()}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-md shadow-lg z-50">
            <div className="py-1 max-h-[60vh] overflow-y-auto overflow-x-hidden [-webkit-overflow-scrolling:touch] scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              {Object.entries(languageFlags).map(([lang, flag]) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageSelect(lang as Language)}
                  className={`w-full px-4 py-2.5 text-left hover:bg-accent transition-colors flex items-center space-x-3 ${
                    language === lang ? 'bg-accent' : ''
                  }`}
                  data-testid={`language-option-${lang}`}
                >
                  <span className="text-lg flex-shrink-0">{flag}</span>
                  <div className="flex flex-col flex-grow min-w-0">
                    <span className="text-sm font-medium truncate">{languageNames[lang as Language]}</span>
                    <span className="text-xs text-muted-foreground">{lang.toUpperCase()}</span>
                  </div>
                  {language === lang && (
                    <svg 
                      className="w-4 h-4 flex-shrink-0 text-primary" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}