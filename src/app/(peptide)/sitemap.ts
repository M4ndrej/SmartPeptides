import { getComProductSlug } from "@/helpers/product_helper";
import { fetchStaticParams } from "@/server/staticService";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticData = await fetchStaticParams();

  // Products, exclude tirz and syringe.
  const productPages = staticData.products
    .filter((p) => p.id !== 56914 && p.id !== 11557)
    .map((p) => ({
      url: `https://smartpeptides.com//${getComProductSlug(p)}/`,
      lastModified: new Date(),
    }));

  // Blogs
  const blogPages = staticData.blogs.map((b) => ({
    url: `https://smartpeptides.com//${b.slug}/`,
    lastModified: new Date(),
  }));

  // Blog categories
  const blogCatPages = staticData.blogCategories.map((b) => ({
    url: `https://smartpeptides.com//${b.slug}/`,
    lastModified: new Date(),
  }));

  // Categories
  const categories = [
    {
      url: `https://smartpeptides.com//peptides/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.com/blends/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.com/peptides/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.com//peptide-supplies/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];

  // Static pages
  const staticPages = [
    {
      url: `https://smartpeptides.com//`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    } as any,
    {
      url: `https://smartpeptides.com//profile/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.com//shop/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.com//contact/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.com//blog/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.com//faq/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.com//sign-in/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.com//about/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.com//privacy/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.com//refunds/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.com//terms/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.com//shipping/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.com//discount/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.com//cart/`,
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
