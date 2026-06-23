export const metadata = {
  title: "Contact Us",
  description: "Contact Us",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/contact/`,
    },
  }),
};

import ContactPage from "@/components/Contact/Contact";
import { WebPage, WithContext } from "schema-dts";

export default async function Contact() {
  const jsonLd: WithContext<any> = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://smartpeptides.com//#organization",
        name: "Smart Peptides",
        url: "https://smartpeptides.com/",
        logo: "https://smartpeptides.com//images/logo.svg",
        description:
          "Leading provider of high-quality research peptides and peptide blends for scientific research and development.",
        address: { "@type": "PostalAddress", addressCountry: "US" },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          url: "https://smartpeptides.com//contact",
        },
        sameAs: [
          "https://www.facebook.com/profile.php?id=61577011570165",
          "https://www.instagram.com/peptide.city/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://smartpeptides.com//#website",
        url: "https://smartpeptides.com/",
        name: "SMART PEPTIDES",
        publisher: { "@id": "https://smartpeptides.com//#organization" },
        inLanguage: "en-US",
      },
      {
        "@type": "ImageObject",
        "@id": "/images/contactUs.svg",
        url: "/images/contactUs.svg",
        width: "200",
        height: "200",
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": "https://smartpeptides.com//contact/#webpage",
        url: "https://smartpeptides.com//contact",
        name: "Contact Us - SMART PEPTIDES",
        description:
          "Get in touch with Smart Peptides for customer support, sales inquiries, and general questions about our research peptides.",
        datePublished: "2023-07-25T11:41:52-05:00",
        dateModified: "2024-01-08T07:35:43-06:00",
        about: { "@id": "https://smartpeptides.com//#organization" },
        isPartOf: { "@id": "https://smartpeptides.com//#website" },
        primaryImageOfPage: {
          "@id": "/images/contactUs.svg",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "ContactPage",
        "@id": "https://smartpeptides.com//contact/#contactpage",
        url: "https://smartpeptides.com//contact",
        name: "Contact Us - SMART PEPTIDES",
        description:
          "Get in touch with Smart Peptides for customer support, sales inquiries, and general questions about our research peptides.",
        mainEntity: {
          "@id": "https://smartpeptides.com//#organization",
        },
        isPartOf: {
          "@id": "https://smartpeptides.com//contact/#webpage",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://smartpeptides.com//contact/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://smartpeptides.com//",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Contact Us",
            item: "https://smartpeptides.com//contact",
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ContactPage />
    </>
  );
}
