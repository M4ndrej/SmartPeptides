import Tracking from "@/components/Tracking/Tracking";
import { WithContext } from "schema-dts";

export const metadata = {
  title: "Order Tracking",
  description: "Order Tracking",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/tracking/`,
    },
  }),
};

export default async function OrderTracking() {
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
        "@id": "https://valuepeptide.com//tracking/#webpage",
        url: "https://valuepeptide.com//tracking/",
        name: "Order Tracking - VALUE PEPTIDE",
        datePublished: "2023-07-26T13:04:07-05:00",
        dateModified: "2023-11-07T07:08:39-06:00",
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

      <Tracking />
    </>
  );
}
