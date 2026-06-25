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
        "@id": "https://smartpeptides.bio//#organization",
        name: "SMART PEPTIDES",
      },
      {
        "@type": "WebSite",
        "@id": "https://smartpeptides.bio//#website",
        url: "https://smartpeptides.bio/",
        name: "SMART PEPTIDES",
        publisher: { "@id": "https://smartpeptides.bio//#organization" },
        inLanguage: "en-US",
      },
      {
        "@type": "CollectionPage",
        "@id": "https://smartpeptides.bio//shop/#webpage",
        url: "https://smartpeptides.bio//shop/",
        name: "Buy Research Peptides and Blends Online - Buy Peptides ONLINE SHOP",
        isPartOf: { "@id": "https://smartpeptides.bio//#website" },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://smartpeptides.bio//shop/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://smartpeptides.bio//",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Shop",
            item: "https://smartpeptides.bio//shop/",
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
