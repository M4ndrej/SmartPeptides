import ProductsListPage from "@/components/Products/ProductsListPage";
import { NOT_FOUND_METADATA } from "@/constants/notFoundMetadata";
import { shopPagePaths } from "@/data/product_data";
import { fetchStaticParams } from "@/server/staticService";
import { SlugMetaProps } from "@/types/static";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 3600;
export const dynamic = "force-static";

// GENERATE STATIC PAGES
export async function generateStaticParams() {
  const staticData = await fetchStaticParams();

  // Categories
  const categorySlugs = staticData.productCategories.map((category) => ({
    slug: category.slug,
  }));
  // Blogs
  // const blogSlugs = staticData.blogs.map((blog) => ({ slug: blog.slug }));
  // // Blog Categories
  // const blogCategorySlugs = staticData.blogCategories.map((category) => ({
  //   slug: category.slug,
  // }));

  return [
    ...categorySlugs,
    //  ...blogSlugs,
    //   ...blogCategorySlugs
  ];
}

export const dynamicParams = false;

// GENERATE STATIC METADATA
export async function generateMetadata({
  params,
}: SlugMetaProps): Promise<Metadata> {
  const staticData = await fetchStaticParams();

  const category = staticData.productCategories.find(
    (c) => c.slug === params.slug
  );
  if (category) {
    const categoryPath = `/${params.slug}/`;
    const categoryConfig = shopPagePaths.find((c) =>
      c.path.includes(categoryPath)
    );
    return {
      title: categoryConfig?.seoTitle ?? `${category.name}`,
      ...(process.env.ENVIRONMENT === "production" && {
        alternates: {
          canonical: categoryPath,
        },
      }),
      description: categoryConfig?.seoDescription,
      twitter: {
        description: categoryConfig?.seoDescription,
      },
    };
  }

  // const product = staticData.products.find((p) => p.slug === params.slug);
  // if (product) {
  //   return {
  //     title: product.meta.title,
  //     description: product.meta.description,
  //     ...(process.env.ENVIRONMENT === "production" && {
  //       alternates: {
  //         canonical: `/${params.slug}/`,
  //       },
  //     }),
  //     openGraph: {
  //       title: product.meta.title,
  //       description: product.meta.description,
  //       images: [product.meta.image.src],
  //       type: "website",
  //       siteName: "VALUE PEPTIDE",
  //     },
  //   };
  // }

  // const blogCat = staticData.blogCategories.find((b) => b.slug === params.slug);
  // if (blogCat) {
  //   return {
  //     title: blogCat.meta.title,
  //     description: blogCat.meta.description,
  //     ...(process.env.ENVIRONMENT === "production" && {
  //       alternates: {
  //         canonical: `/${params.slug}/`,
  //       },
  //     }),
  //   };
  // }

  // const blog = staticData.blogs.find((b) => b.slug === params.slug);
  // if (blog) {
  //   return {
  //     title: blog.meta.title,
  //     description: blog.meta.description,
  //     ...(process.env.ENVIRONMENT === "production" && {
  //       alternates: {
  //         canonical: `/${params.slug}/`,
  //       },
  //     }),
  //     openGraph: {
  //       title: blog.meta.title,
  //       description: blog.meta.description,
  //       images: [blog.meta.image.src],
  //       type: "website",
  //       siteName: "VALUE PEPTIDE",
  //     },
  //   };
  // }

  // Affiliate links
  // if (posts.affilateLinks.includes(params.slug)) {
  //   const affiliateLink = posts.affilateLinks.indexOf(params.slug);
  //   return permanentRedirect(
  //     `/?wpam_id=${posts.affiliateIds[affiliateLink]}`,
  //     RedirectType.replace
  //   );
  // }

  // return notFound();
  return NOT_FOUND_METADATA;
}

// RENDER STATIC PAGES
export default async function ItemPage({
  params,
}: {
  params: { slug: string; type: string };
}) {
  const staticData = await fetchStaticParams();

  const category = staticData.productCategories.find(
    (c) => c.slug === params.slug
  );
  if (category) {
    return <ProductsListPage slug={params.slug} />;
  }

  // const blogCat = staticData.blogCategories.find((b) => b.slug === params.slug);
  // if (blogCat) {
  //   return (
  //     <BlogCategory categoryName={blogCat.name} categorySlug={params.slug} />
  //   );
  // }

  // const blog = staticData.blogs.find((b) => b.slug === params.slug);
  // if (blog) {
  //   return <BlogContent slug={params.slug} />;
  // }

  notFound();
}
