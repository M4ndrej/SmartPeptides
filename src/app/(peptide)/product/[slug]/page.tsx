import ProductItemPage from "@/components/Products/ProductItemPage";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { fetchStaticParams } from "@/server/staticService";
import { SlugMetaProps } from "@/types/static";
import { getComProductSlug } from "@/helpers/product_helper";

// export const revalidate = 3600;
// export const dynamicParams = true;
// export const revalidate = 3600; // ISR every hour
export const dynamic = "force-static";
export const dynamicParams = false;

// GENERATE STATIC PAGES
export async function generateStaticParams() {
  const staticData = await fetchStaticParams();

  // Products
  const productSlugs = staticData.products
    .filter((p) => p.id !== 56914 && p.id !== 11557)
    .map((product) => ({ slug: getComProductSlug(product, false) }));

  return productSlugs;
}

// GENERATE STATIC METADATA
export async function generateMetadata({
  params,
}: SlugMetaProps): Promise<Metadata> {
  const staticData = await fetchStaticParams();

  const product = staticData.products.find(
    (p) => getComProductSlug(p, false) === params.slug
  );
  if (product) {
    return {
      title: `${product.name} For Sale`,
      description: product.meta.description,
      ...(process.env.ENVIRONMENT === "production" && {
        alternates: {
          canonical: `/${getComProductSlug(product)}/`,
        },
      }),
      openGraph: {
        title: product.meta.title,
        description: product.meta.description,
        images: [product.meta.image.src],
        type: "website",
        siteName: "SMART PEPTIDES",
      },
    };
  }

  return notFound();
}

// RENDER STATIC PAGES
export default async function ItemPage({
  params,
}: {
  params: { slug: string; type: string };
}) {
  const staticData = await fetchStaticParams();

  const product = staticData.products.find(
    (p) => getComProductSlug(p, false) === params.slug
  );
  if (product) {
    return <ProductItemPage slug={product.slug} />;
  }

  return null;
}
