export const metadata = {
  title: "Terms of Service",
  description: "Terms of Service",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/terms/`,
    },
  }),
};

import TermsOfService from "@/components/TermsOfService/TermsOfService";
import { WithContext } from "schema-dts";

export default async function Terms() {
  const jsonLd: WithContext<any> = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://smartpeptides.com//#organization",
        name: "SMART PEPTIDES",
      },
      {
        "@type": "WebSite",
        "@id": "https://smartpeptides.com//#website",
        url: "https://smartpeptides.com/",
        name: "SMART PEPTIDES",
        publisher: {
          "@id": "https://smartpeptides.com//#organization",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": "https://smartpeptides.com//terms/#webpage",
        url: "https://smartpeptides.com//terms/",
        name: "Terms of Service - SMART PEPTIDES",
        datePublished: "2023-07-26T13:04:07-05:00",
        dateModified: "2023-11-07T07:08:39-06:00",
        isPartOf: {
          "@id": "https://smartpeptides.com//#website",
        },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <TermsOfService />
    </>
  );
}
