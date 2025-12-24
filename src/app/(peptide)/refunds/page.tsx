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
        "@id": "https://valuepeptide.com//#organization",
        name: "VALUE PEPTIDE",
      },
      {
        "@type": "WebSite",
        "@id": "https://valuepeptide.com//#website",
        url: "https://valuepeptide.com/",
        name: "VALUE PEPTIDE",
        publisher: {
          "@id": "https://valuepeptide.com//#organization",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": "https://valuepeptide.com//refunds/#webpage",
        url: "https://valuepeptide.com//refunds/",
        name: "Refund and Returns Policy - VALUE PEPTIDE",
        datePublished: "2023-07-25T10:24:25-05:00",
        dateModified: "2023-11-04T18:16:42-05:00",
        isPartOf: {
          "@id": "https://valuepeptide.com//#website",
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
