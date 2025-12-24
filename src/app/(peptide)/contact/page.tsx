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
        "@id": "https://valuepeptide.com//#organization",
        name: "Value Peptide",
        url: "https://valuepeptide.com/",
        logo: "https://valuepeptide.com//images/logo.svg",
        description:
          "Leading provider of high-quality research peptides and peptide blends for scientific research and development.",
        address: { "@type": "PostalAddress", addressCountry: "US" },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          url: "https://valuepeptide.com//contact",
        },
        sameAs: [
          "https://www.facebook.com/profile.php?id=61577011570165",
          "https://www.instagram.com/peptide.city/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://valuepeptide.com//#website",
        url: "https://valuepeptide.com/",
        name: "VALUE PEPTIDE",
        publisher: { "@id": "https://valuepeptide.com//#organization" },
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
        "@id": "https://valuepeptide.com//contact/#webpage",
        url: "https://valuepeptide.com//contact",
        name: "Contact Us - VALUE PEPTIDE",
        description:
          "Get in touch with Value Peptide for customer support, sales inquiries, and general questions about our research peptides.",
        datePublished: "2023-07-25T11:41:52-05:00",
        dateModified: "2024-01-08T07:35:43-06:00",
        about: { "@id": "https://valuepeptide.com//#organization" },
        isPartOf: { "@id": "https://valuepeptide.com//#website" },
        primaryImageOfPage: {
          "@id": "/images/contactUs.svg",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "ContactPage",
        "@id": "https://valuepeptide.com//contact/#contactpage",
        url: "https://valuepeptide.com//contact",
        name: "Contact Us - VALUE PEPTIDE",
        description:
          "Get in touch with Value Peptide for customer support, sales inquiries, and general questions about our research peptides.",
        mainEntity: {
          "@id": "https://valuepeptide.com//#organization",
        },
        isPartOf: {
          "@id": "https://valuepeptide.com//contact/#webpage",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://valuepeptide.com//contact/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://valuepeptide.com//",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Contact Us",
            item: "https://valuepeptide.com//contact",
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
