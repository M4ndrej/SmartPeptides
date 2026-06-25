export const metadata = {
  title: "Cart",
  description: "Cart",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/cart/`,
    },
  }),
};

import CartPage from "@/components/CartPage/CartPage";
import { WithContext } from "schema-dts";

export default async function CartDeskt() {
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
        "@id": "https://smartpeptides.bio//cart/#webpage",
        url: "https://smartpeptides.bio//cart/",
        name: "Cart - SMART PEPTIDES",
        datePublished: "2017-09-27T17:17:24-05:00",
        dateModified: "2023-08-24T09:49:48-05:00",
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

      <CartPage />
    </>
  );
}
