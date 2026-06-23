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
        "@id": "https://smartpeptides.com//tracking/#webpage",
        url: "https://smartpeptides.com//tracking/",
        name: "Order Tracking - SMART PEPTIDES",
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

      <Tracking />
    </>
  );
}
