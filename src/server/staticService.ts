import { hfetch } from "@/helpers/fetchers";
import {
  StaticBlogCategoryList,
  StaticBlogList,
  StaticData,
  StaticProductCategoryList,
  StaticProductList,
} from "@/types/static";

// export async function getStaticRedirects() {
//   const redirects = await hfetch(
//     `${process.env.API_URL}/mystatic/v2/get_static_redirects/`,
//     { next: { revalidate: 3600 } }
//   );
//   if (!redirects.ok) return [];
//   return redirects.json() as Promise<StaticRedirectList>;
// }

export async function getStaticProductCategoriesData(
  excludedCategories: string[]
) {
  const excludedString = excludedCategories.join(",");
  const catList = await hfetch(
    `${process.env.API_URL}/mystatic/v2/get_static_product_categories/?exclude=${excludedString}`,
    { next: { revalidate: 3600 } }
  );
  if (!catList.ok) return [];
  return catList.json() as Promise<StaticProductCategoryList>;
}

export async function getStaticProductData(
  excludedCategories: string[],
  includedCategories: string[]
) {
  const excludedString = excludedCategories.join(",");
  const includedString = includedCategories.join(",");
  const productList = await hfetch(
    `${process.env.API_URL}/mystatic/v2/get_static_products/?exclude=${excludedString}&include=${includedString}`,
    { next: { revalidate: 3600 } }
  );
  if (!productList.ok) return [];
  return productList.json() as Promise<StaticProductList>;
}

export async function getStaticBlogCategoriesData(
  excludedCategories: string[]
) {
  const excludedString = excludedCategories.join(",");
  const catList = await hfetch(
    `${process.env.API_URL}/mystatic/v2/get_static_blog_categories/?exclude=${excludedString}`,
    { next: { revalidate: 3600 } }
  );
  if (!catList.ok) return [];
  return catList.json() as Promise<StaticBlogCategoryList>;
}

export async function getStaticBlogs(
  excludedCategories: string[],
  includedCategories: string[]
) {
  const excludedString = excludedCategories.join(",");
  const includedString = includedCategories.join(",");
  const productList = await hfetch(
    `${process.env.API_URL}/mystatic/v2/get_static_blogs/?exclude=${excludedString}&include=${includedString}`,
    { next: { revalidate: 3600 } }
  );
  if (!productList.ok) return [];
  return productList.json() as Promise<StaticBlogList>;
}

export async function fetchStaticParams(): Promise<StaticData> {
  // const redirectsP = getStaticRedirects();
  const prodCatsP = getStaticProductCategoriesData([
    "uncategorized",
    "peptide-market",
    "peptide-cc",
    "peptides",
    "peptide-shop",
    "is-research",
    "bactwater",
    "merch",
  ]);
  const prodListP = getStaticProductData(
    ["peptide-market", "peptide-shop", "peptide-cc", "merch", "is-research"],
    [
      "peptides",
      "blends",
      "cosmetic",
      "supplies",
      "peptides",
    ]
  );
  const blogCatsP = getStaticBlogCategoriesData([
    "peptide-market",
    "peptide-science",
    "peptide-shop",
    "peptide-cc",
    "peptides",
    "skin-care",
    "general",
    "fertility",
    "peptides-blog",
    "is-research",
  ]);
  const blogListP = getStaticBlogs(
    ["peptide-market", "peptide-shop", "peptide-cc", "is-research"],
    ["peptides"]
  );

  const [prodCats, prodList, blogCats, blogList] = await Promise.all([
    prodCatsP,
    prodListP,
    blogCatsP,
    blogListP,
  ]);

  return {
    // redirects: [],
    productCategories: prodCats,
    products: prodList,
    blogCategories: blogCats,
    blogs: blogList,
  };
}
