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
  productSchema?: {
    name: string;
    price: number;
    originalPrice?: number;
    category: string;
    image?: string;
  };
}

const SITE_URL = 'https://www.luxiomarket.shop';

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
  ogImage,
  noindex = false,
  productSchema,
}: SEOProps) {
  const { language, t } = useLanguage();
  
  const seoTitle = title || t(`seo${page.charAt(0).toUpperCase() + page.slice(1)}Title` as any);
  const seoDescription = description || t(`seo${page.charAt(0).toUpperCase() + page.slice(1)}Description` as any);
  const seoKeywords = keywords || t(`seo${page.charAt(0).toUpperCase() + page.slice(1)}Keywords` as any);
  
  const pagePath = page === 'home' ? '' : `/${page}`;
  const canonicalUrl = `${SITE_URL}/${language}${pagePath}`;
  const siteName = t('seoOgSiteName');
  
  const seoLanguages: Language[] = ['en', 'fr', 'es', 'pt', 'it', 'hu', 'pl'];
  const ogLanguage = seoLanguages.includes(language) ? language : 'en';
  const defaultOgImage = `${SITE_URL}/og-image-${ogLanguage}.png`;
  const finalOgImage = ogImage || defaultOgImage;
  
  const robotsContent = noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Luxio Market",
    "url": SITE_URL,
    "logo": `${SITE_URL}/attached_assets/generated_images/Luxio_logo_light_version_7da1abfd.png`,
    "description": "Premium tech and lifestyle marketplace offering smartphones, smartwatches, sneakers, and smart home gadgets",
    "sameAs": [
      "https://www.facebook.com/luxiomarket",
      "https://twitter.com/luxiomarket",
      "https://www.instagram.com/luxiomarket"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "Contact@luxiomarket.shop",
      "contactType": "Customer Service"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Luxio Market",
    "url": SITE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/premium?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbSchema = page !== 'home' ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": seoTitle,
        "item": canonicalUrl
      }
    ]
  } : null;

  const productSchemaData = productSchema ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productSchema.name,
    "image": productSchema.image || finalOgImage,
    "description": seoDescription,
    "category": productSchema.category,
    "offers": {
      "@type": "Offer",
      "url": canonicalUrl,
      "priceCurrency": "USD",
      "price": productSchema.price,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Luxio Market"
      }
    }
  } : null;

  return (
    <Helmet>
      <html lang={language} />
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="robots" content={robotsContent} />
      <meta name="author" content="Luxio Market" />
      <meta name="theme-color" content="#000000" />
      <link rel="canonical" href={canonicalUrl} />
      
      {seoLanguages.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={`${SITE_URL}/${lang}${pagePath}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/en${pagePath}`} />
      
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content={seoTitle} />
      <meta property="og:locale" content={languageLocales[language]} />
      {seoLanguages.filter(lang => lang !== language).map((lang) => (
        <meta key={lang} property="og:locale:alternate" content={languageLocales[lang]} />
      ))}
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@luxiomarket" />
      <meta name="twitter:creator" content="@luxiomarket" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={finalOgImage} />
      <meta name="twitter:image:alt" content={seoTitle} />
      
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      {productSchemaData && (
        <script type="application/ld+json">
          {JSON.stringify(productSchemaData)}
        </script>
      )}
    </Helmet>
  );
}
