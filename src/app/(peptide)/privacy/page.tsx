export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/privacy/`,
    },
  }),
};

import PrivacyPolicy from "@/components/PrivacyPolicy/PrivacyPolicy";
import { WithContext } from "schema-dts";

export default async function PrivacyPolicyPage() {
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
        "@id": "https://smartpeptides.bio//privacy/#webpage",
        url: "https://smartpeptides.bio//privacy/",
        name: "Privacy Policy - SMART PEPTIDES",
        datePublished: "2023-07-26T07:29:59-05:00",
        dateModified: "2023-11-07T07:10:01-06:00",
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

      <PrivacyPolicy />
    </>
  );
}
