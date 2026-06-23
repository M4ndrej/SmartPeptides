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
        "@id": "https://smartpeptides.com//cart/#webpage",
        url: "https://smartpeptides.com//cart/",
        name: "Cart - SMART PEPTIDES",
        datePublished: "2017-09-27T17:17:24-05:00",
        dateModified: "2023-08-24T09:49:48-05:00",
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

      <CartPage />
    </>
  );
}
