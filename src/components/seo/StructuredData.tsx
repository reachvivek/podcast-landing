import Script from 'next/script';

export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "EcoSpace Podcast Studio",
    "image": "https://ecospace.ae/images/og-image.jpg",
    "logo": "https://ecospace.ae/images/IMG_20251121_085355_649.png",
    "@id": "https://ecospace.ae",
    "url": "https://ecospace.ae",
    "telephone": "+971-XX-XXX-XXXX",
    "priceRange": "AED 350 - AED 2500",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Dubai World Trade Center",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "postalCode": "",
      "addressCountry": "AE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.2285,
      "longitude": 55.2855
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "08:00",
      "closes": "22:00"
    },
    "sameAs": [
      "https://instagram.com/podcast.ecospace",
      "https://twitter.com/podcast.ecospace"
    ],
    "description": "Dubai's premier podcast studio at Dubai World Trade Center. Professional recording, video production, editing services. State-of-the-art equipment and expert team."
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "EcoSpace Podcast Studio",
    "image": "https://ecospace.ae/images/og-image.jpg",
    "@id": "https://ecospace.ae",
    "url": "https://ecospace.ae",
    "telephone": "+971-XX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Dubai World Trade Center",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "addressCountry": "AE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.2285,
      "longitude": 55.2855
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Podcast Recording & Production",
    "provider": {
      "@type": "Organization",
      "name": "EcoSpace Podcast Studio",
      "url": "https://ecospace.ae"
    },
    "areaServed": {
      "@type": "City",
      "name": "Dubai"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Podcast Studio Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Audio Podcast Recording",
            "description": "Professional audio podcast recording with state-of-the-art equipment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Video Podcast Production",
            "description": "Full video podcast production with professional cameras and lighting"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Podcast Editing",
            "description": "Professional post-production editing services"
          }
        }
      ]
    }
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
