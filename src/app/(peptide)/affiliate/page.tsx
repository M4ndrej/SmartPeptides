/* export const metadata = {
  title: "Affiliate",
  description: "Affiliate",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/affiliate/`,
    },
  }),
  robots: {
    index: false,
    follow: false,
  },
}; */

import { notFound } from "next/navigation";
//import Affiliate from "@/components/Affiliate/Affiliate";
import { WithContext } from "schema-dts";

export default async function AffiliatePage() {
   return notFound();

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
        "@id": "https://smartpeptides.com//affiliate/#webpage",
        url: "https://smartpeptides.com//affiliate/",
        name: "Smart Peptides Affiliate Program - SMART PEPTIDES",
        datePublished: "2023-11-02T13:06:34-05:00",
        dateModified: "2024-01-08T08:21:07-06:00",
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

      {/* <Affiliate /> */}
    </>
  );
}
