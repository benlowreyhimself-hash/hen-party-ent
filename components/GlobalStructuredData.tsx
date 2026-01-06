"use client";

import Script from "next/script";

// LocalBusiness and Service structured data for SEO
const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://henpartyentertainment.co.uk/#business",
    "name": "Hen Party Entertainment - Life Drawing with Ben",
    "description": "Mobile nude life drawing classes for hen parties across the UK. Professional, fun, and tasteful entertainment brought directly to your venue.",
    "url": "https://henpartyentertainment.co.uk",
    "telephone": "+447747571426",
    "email": "ben@henpartyentertainment.co.uk",
    "image": "https://henpartyentertainment.co.uk/hero-background.jpeg",
    "priceRange": "££",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bristol",
        "addressRegion": "South West England",
        "addressCountry": "GB"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 51.4545,
        "longitude": -2.5879
    },
    "areaServed": [
        { "@type": "City", "name": "Bristol" },
        { "@type": "City", "name": "Bath" },
        { "@type": "City", "name": "Cardiff" },
        { "@type": "City", "name": "Cheltenham" },
        { "@type": "City", "name": "Gloucester" },
        { "@type": "City", "name": "Oxford" },
        { "@type": "City", "name": "Swindon" },
        { "@type": "City", "name": "London" },
        { "@type": "City", "name": "Brighton" },
        { "@type": "City", "name": "Bournemouth" },
        { "@type": "City", "name": "Southampton" },
        { "@type": "City", "name": "Exeter" },
        { "@type": "City", "name": "Newport" },
        { "@type": "City", "name": "Swansea" }
    ],
    "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "09:00",
        "closes": "22:00"
    }
};

const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Hen Party Life Drawing",
    "provider": {
        "@type": "LocalBusiness",
        "@id": "https://henpartyentertainment.co.uk/#business"
    },
    "name": "Hen Party Life Drawing Class",
    "description": "A fun, classy nude life drawing experience for hen parties. Professional male model brings all materials to your venue. 90-minute session includes prosecco for the bride.",
    "offers": {
        "@type": "Offer",
        "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "30",
            "priceCurrency": "GBP",
            "unitText": "per person"
        },
        "availability": "https://schema.org/InStock"
    },
    "areaServed": {
        "@type": "Country",
        "name": "United Kingdom"
    }
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How much does hen party life drawing cost?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Life drawing costs £30 per person with a minimum charge of £300 (based on 10 people). Smaller groups are welcome but pay the minimum. A 10% discount applies when paying in full. The bride goes free and receives a complimentary bottle of prosecco."
            }
        },
        {
            "@type": "Question",
            "name": "What areas do you cover?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "I cover the entire South West and beyond, including Bristol, Bath, Cardiff, Cheltenham, Gloucester, Oxford, Swindon, London, Brighton, Bournemouth, Southampton, Exeter, Swansea, and more. I travel to your venue with all materials."
            }
        },
        {
            "@type": "Question",
            "name": "How long is a life drawing session?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sessions are 90 minutes long. This includes time for drawing, interactive games, and photo opportunities. I provide all materials including sketch pads and charcoal."
            }
        },
        {
            "@type": "Question",
            "name": "Is life drawing suitable for all ages?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "All participants must be 18 or over. Life drawing is a tasteful, artistic activity suitable for hen parties of all types - from wild weekends to classy celebrations. It's often the highlight of the hen do!"
            }
        }
    ]
};

export default function GlobalStructuredData() {
    return (
        <>
            <Script
                id="local-business-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
                strategy="afterInteractive"
            />
            <Script
                id="service-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
                strategy="afterInteractive"
            />
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                strategy="afterInteractive"
            />
        </>
    );
}
