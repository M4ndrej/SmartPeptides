export const metadata = {
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
};

import Affiliate from "@/components/Affiliate/Affiliate";
import { WithContext } from "schema-dts";

export default async function AffiliatePage() {
  // return redirect("/404");

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
        "@id": "https://valuepeptide.com//affiliate/#webpage",
        url: "https://valuepeptide.com//affiliate/",
        name: "Value Peptide Affiliate Program - VALUE PEPTIDE",
        datePublished: "2023-11-02T13:06:34-05:00",
        dateModified: "2024-01-08T08:21:07-06:00",
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

      <Affiliate />
    </>
  );
}
