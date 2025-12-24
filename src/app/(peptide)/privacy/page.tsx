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
        "@id": "https://valuepeptide.com//privacy/#webpage",
        url: "https://valuepeptide.com//privacy/",
        name: "Privacy Policy - VALUE PEPTIDE",
        datePublished: "2023-07-26T07:29:59-05:00",
        dateModified: "2023-11-07T07:10:01-06:00",
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

      <PrivacyPolicy />
    </>
  );
}
