import ProductItemPage from "@/components/Products/ProductItemPage";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { fetchStaticParams } from "@/server/staticService";
import { fetchProductBySlug } from "@/server/services";
import { SlugMetaProps } from "@/types/static";
import { getComProductSlug } from "@/helpers/product_helper";

export const revalidate = 3600;
export const dynamicParams = true;

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

  const staticProduct = staticData.products.find(
    (p) => getComProductSlug(p, false) === params.slug
  );
  if (staticProduct) {
    return {
      title: `${staticProduct.name} For Sale`,
      description: staticProduct.meta.description,
      ...(process.env.ENVIRONMENT === "production" && {
        alternates: {
          canonical: `/${getComProductSlug(staticProduct)}/`,
        },
      }),
      openGraph: {
        title: staticProduct.meta.title,
        description: staticProduct.meta.description,
        images: [staticProduct.meta.image.src],
        type: "website",
        siteName: "SMART PEPTIDES",
      },
    };
  }

  // Fallback to WooCommerce API when static data is unavailable
  console.log("generateMetadata: staticProduct not found for slug:", params.slug, "| trying fetchProductBySlug");
  const product = await fetchProductBySlug(params.slug);
  console.log("generateMetadata: fetchProductBySlug result:", product?.id ?? "NOT FOUND");
  if (product) {
    return {
      title: `${product.name} For Sale`,
      description: product.short_description || product.description,
      openGraph: {
        title: product.name,
        description: product.short_description || product.description,
        images: product.images?.[0]?.src ? [product.images[0].src] : [],
        type: "website",
        siteName: "SMART PEPTIDES",
      },
    };
  }

  return notFound();
}

// RENDER PAGES
export default async function ItemPage({
  params,
}: {
  params: { slug: string; type: string };
}) {
  const staticData = await fetchStaticParams();
  console.log("Static data:",staticData);

  const staticProduct = staticData.products.find(
    (p) => getComProductSlug(p, false) === params.slug
  );

  if (staticProduct) {
    return <ProductItemPage slug={staticProduct.slug} />;
  }

  // Fallback to WooCommerce API when static data is unavailable
  const product = await fetchProductBySlug(params.slug);
  if (product) {
    return <ProductItemPage slug={product.slug} />;
  }

  console.log("ItemPage: calling notFound()");
  return notFound();
}
