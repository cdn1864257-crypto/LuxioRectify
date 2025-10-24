import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/lib/translations';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  page?: 'home' | 'premium' | 'dashboard' | 'cart' | 'payment';
  ogImage?: string;
  noindex?: boolean;
}

const SITE_URL = 'https://luxios.vercel.app';

const languageLocales: Record<Language, string> = {
  en: 'en_US',
  fr: 'fr_FR',
  es: 'es_ES',
  pt: 'pt_PT',
  pl: 'pl_PL',
  it: 'it_IT',
  hu: 'hu_HU',
};

export function SEO({
  title,
  description,
  keywords,
  page = 'home',
  ogImage = `${SITE_URL}/og-image.jpg`,
  noindex = false,
}: SEOProps) {
  const { language, t } = useLanguage();
  
  const seoTitle = title || t(`seo${page.charAt(0).toUpperCase() + page.slice(1)}Title` as any);
  const seoDescription = description || t(`seo${page.charAt(0).toUpperCase() + page.slice(1)}Description` as any);
  const seoKeywords = keywords || t(`seo${page.charAt(0).toUpperCase() + page.slice(1)}Keywords` as any);
  
  const pagePath = page === 'home' ? '/' : `/${page}`;
  const canonicalUrl = `${SITE_URL}${pagePath}?lang=${language}`;
  const siteName = t('seoOgSiteName');
  
  const robotsContent = noindex 
    ? 'noindex, nofollow' 
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  const languages: Language[] = ['en', 'fr', 'es', 'pt', 'pl', 'it', 'hu'];

  return (
    <Helmet>
      <html lang={language} />
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonicalUrl} />
      
      {languages.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={`${SITE_URL}${pagePath}?lang=${lang}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${pagePath}?lang=en`} />
      
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={languageLocales[language]} />
      {languages.filter(lang => lang !== language).map((lang) => (
        <meta key={lang} property="og:locale:alternate" content={languageLocales[lang]} />
      ))}
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
