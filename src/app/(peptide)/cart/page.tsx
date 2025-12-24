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
        "@id": "https://valuepeptide.com//cart/#webpage",
        url: "https://valuepeptide.com//cart/",
        name: "Cart - VALUE PEPTIDE",
        datePublished: "2017-09-27T17:17:24-05:00",
        dateModified: "2023-08-24T09:49:48-05:00",
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

      <CartPage />
    </>
  );
}
