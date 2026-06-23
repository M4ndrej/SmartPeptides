export const revalidate = 3600; // ISR every hour
export const dynamic = "force-static";
import ProductsListPage from "@/components/Products/ProductsListPage";
import SubscriptionConfirmation from "@/components/SubscriptionConfirmation/SubscriptionConfirmation";
import { shopPagePaths } from "@/data/product_data";
import { Metadata } from "next";
import { Suspense } from "react";
import { WithContext } from "schema-dts";

export async function generateMetadata(): Promise<Metadata> {
  const shopPath = `/shop/`;
  const shopConfig = shopPagePaths.find((p) => p.path === shopPath);
  return {
    title: shopConfig?.seoTitle,
    ...(process.env.ENVIRONMENT === "production" && {
      alternates: {
        canonical: shopPath,
      },
    }),
    description: shopConfig?.seoDescription,
    twitter: {
      description: shopConfig?.seoDescription,
    },
  };
}

export default async function Products() {
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
        publisher: { "@id": "https://smartpeptides.com//#organization" },
        inLanguage: "en-US",
      },
      {
        "@type": "CollectionPage",
        "@id": "https://smartpeptides.com//shop/#webpage",
        url: "https://smartpeptides.com//shop/",
        name: "Buy Research Peptides and Blends Online - Buy Peptides ONLINE SHOP",
        isPartOf: { "@id": "https://smartpeptides.com//#website" },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://smartpeptides.com//shop/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://smartpeptides.com//",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Shop",
            item: "https://smartpeptides.com//shop/",
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ProductsListPage slug="shop" />
      <Suspense>
        <SubscriptionConfirmation />
      </Suspense>
    </>
  );
}
