import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noindex?: boolean;
}

export function SEO({
  title = 'Luxio Market - Smartphones, Montres, Sneakers Premium | Jusqu\'à 37% de Réduction',
  description = 'Découvrez les derniers smartphones, montres connectées, sneakers premium et gadgets high-tech avec jusqu\'à 37% de réduction. Livraison gratuite, paiement sécurisé crypto et carte bancaire.',
  keywords = 'smartphone, montre connectée, sneakers, gadgets, high-tech, iPhone, Samsung, luxe, premium, réduction',
  canonicalUrl = 'https://www.luxiomarket.shop/',
  ogImage = 'https://www.luxiomarket.shop/og-image.jpg',
  noindex = false,
}: SEOProps) {
  const robotsContent = noindex 
    ? 'noindex, nofollow' 
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonicalUrl} />
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
