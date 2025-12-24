import { getComProductSlug } from "@/helpers/product_helper";
import { fetchStaticParams } from "@/server/staticService";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticData = await fetchStaticParams();

  // Products, exclude tirz and syringe.
  const productPages = staticData.products
    .filter((p) => p.id !== 56914 && p.id !== 11557)
    .map((p) => ({
      url: `https://valuepeptide.com//${getComProductSlug(p)}/`,
      lastModified: new Date(),
    }));

  // Blogs
  const blogPages = staticData.blogs.map((b) => ({
    url: `https://valuepeptide.com//${b.slug}/`,
    lastModified: new Date(),
  }));

  // Blog categories
  const blogCatPages = staticData.blogCategories.map((b) => ({
    url: `https://valuepeptide.com//${b.slug}/`,
    lastModified: new Date(),
  }));

  // Categories
  const categories = [
    {
      url: `https://valuepeptide.com//peptides/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://valuepeptide.com//peptide-blends/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://valuepeptide.com//cosmetic-peptides/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://valuepeptide.com//peptide-supplies/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];

  // Static pages
  const staticPages = [
    {
      url: `https://valuepeptide.com//`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    } as any,
    {
      url: `https://valuepeptide.com//profile/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://valuepeptide.com//shop/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://valuepeptide.com//contact/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://valuepeptide.com//blog/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://valuepeptide.com//faq/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://valuepeptide.com//sign-in/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://valuepeptide.com//about/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://valuepeptide.com//privacy/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://valuepeptide.com//refunds/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://valuepeptide.com//terms/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://valuepeptide.com//shipping/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://valuepeptide.com//discount/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://valuepeptide.com//cart/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];

  return [
    ...productPages,
    ...blogPages,
    ...blogCatPages,
    ...categories,
    ...staticPages,
  ];
}
