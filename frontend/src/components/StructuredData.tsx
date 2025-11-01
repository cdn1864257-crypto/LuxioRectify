import { Helmet } from 'react-helmet-async';
import { Product } from '@/lib/products';
import { Language } from '@/lib/translations';

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Luxio",
    "url": "https://luxiomarket.shop",
    "logo": "https://luxiomarket.shop/Luxio_logo_dark_version_6197255a.png",
    "sameAs": [
      "https://www.facebook.com/luxiomarket",
      "https://www.instagram.com/luxiomarket",
      "https://twitter.com/luxiomarket"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+33-1-234-567-89",
      "contactType": "customer service",
      "availableLanguage": ["French", "English", "Spanish", "Portuguese", "Polish", "Hungarian", "Italian"],
      "areaServed": ["FR", "BE", "CH", "LU", "ES", "PT", "PL", "HU", "IT", "US", "GB", "CA"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

interface WebSiteSchemaProps {
  language: Language;
}

export function WebSiteSchema({ language }: WebSiteSchemaProps) {

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Luxio",
    "url": `https://luxiomarket.shop/${language}`,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `https://luxiomarket.shop/${language}/premium?search={search_term_string}`
      },
      "query-input": {
        "@type": "PropertyValueSpecification",
        "valueRequired": true,
        "valueName": "search_term_string"
      }
    },
    "inLanguage": language
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

interface ProductSchemaProps {
  product: Product;
  language: Language;
}

export function ProductSchema({ product, language }: ProductSchemaProps) {
  // Get the variant with the lowest price
  const lowestPrice = product.variants && product.variants.length > 0
    ? Math.min(...product.variants.map(v => v.price))
    : product.price;

  const highestPrice = product.variants && product.variants.length > 0
    ? Math.max(...product.variants.map(v => v.price))
    : product.price;

  const availability = "InStock";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.image ? `https://luxiomarket.shop${product.image}` : undefined,
    "description": product.description || `${product.name} - Premium ${product.category}`,
    "brand": {
      "@type": "Brand",
      "name": product.name.split(' ')[0] // Extract brand from product name
    },
    "offers": {
      "@type": product.variants && product.variants.length > 1 ? "AggregateOffer" : "Offer",
      "url": `https://luxiomarket.shop/${language}/premium`,
      "priceCurrency": "EUR",
      ...(product.variants && product.variants.length > 1 ? {
        "lowPrice": lowestPrice.toFixed(2),
        "highPrice": highestPrice.toFixed(2),
        "offerCount": product.variants.length
      } : {
        "price": product.price.toFixed(2)
      }),
      "availability": `https://schema.org/${availability}`,
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      "seller": {
        "@type": "Organization",
        "name": "Luxio"
      }
    },
    ...(product.category && {
      "category": product.category
    }),
    ...(product.variants && product.variants.length > 0 && {
      "additionalProperty": [
        ...(product.variants.some(v => v.color) ? [{
          "@type": "PropertyValue",
          "name": "Color",
          "value": [...new Set(product.variants.map(v => v.color).filter(Boolean))].join(', ')
        }] : []),
        ...(product.variants.some(v => v.capacity) ? [{
          "@type": "PropertyValue",
          "name": "Storage Capacity",
          "value": [...new Set(product.variants.map(v => v.capacity).filter(Boolean))].join(', ')
        }] : [])
      ]
    })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

interface ItemListSchemaProps {
  products: Product[];
  listName: string;
}

export function ItemListSchema({ products, listName }: ItemListSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": listName,
    "numberOfItems": products.length,
    "itemListElement": products.slice(0, 20).map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "image": product.image ? `https://luxiomarket.shop${product.image}` : undefined,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "EUR",
          "price": product.price.toFixed(2),
          "availability": "https://schema.org/InStock"
        }
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

export function OfferCatalogSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": "Luxio Premium Tech",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "Smartphones Premium",
        "itemListElement": {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "category": "Smartphones"
          }
        }
      },
      {
        "@type": "OfferCatalog",
        "name": "Montres Connect\u00e9es",
        "itemListElement": {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "category": "Smartwatches"
          }
        }
      },
      {
        "@type": "OfferCatalog",
        "name": "Sneakers Premium",
        "itemListElement": {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "category": "Sneakers"
          }
        }
      },
      {
        "@type": "OfferCatalog",
        "name": "Gadgets High-Tech",
        "itemListElement": {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "category": "Tech Gadgets"
          }
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
