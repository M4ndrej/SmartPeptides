export const metadata = {
  title: "Refunds and Returns",
  description: "Refunds and Returns",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/refunds/`,
    },
  }),
};

import RefundsAndReturns from "@/components/Refunds/Refunds";
import { WithContext } from "schema-dts";

export default async function Contact() {
  const jsonLd: WithContext<any> = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://smartpeptides.bio//#organization",
        name: "SMART PEPTIDES",
      },
      {
        "@type": "WebSite",
        "@id": "https://smartpeptides.bio//#website",
        url: "https://smartpeptides.bio/",
        name: "SMART PEPTIDES",
        publisher: {
          "@id": "https://smartpeptides.bio//#organization",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": "https://smartpeptides.bio//refunds/#webpage",
        url: "https://smartpeptides.bio//refunds/",
        name: "Refund and Returns Policy - SMART PEPTIDES",
        datePublished: "2023-07-25T10:24:25-05:00",
        dateModified: "2023-11-04T18:16:42-05:00",
        isPartOf: {
          "@id": "https://smartpeptides.bio//#website",
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

      <RefundsAndReturns />
    </>
  );
}
