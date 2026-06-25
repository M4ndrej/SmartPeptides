import { getComProductSlug } from "@/helpers/product_helper";
import { fetchStaticParams } from "@/server/staticService";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticData = await fetchStaticParams();

  // Products, exclude tirz and syringe.
  const productPages = staticData.products
    .filter((p) => p.id !== 56914 && p.id !== 11557)
    .map((p) => ({
      url: `https://smartpeptides.bio//${getComProductSlug(p)}/`,
      lastModified: new Date(),
    }));

  // Blogs
  const blogPages = staticData.blogs.map((b) => ({
    url: `https://smartpeptides.bio//${b.slug}/`,
    lastModified: new Date(),
  }));

  // Blog categories
  const blogCatPages = staticData.blogCategories.map((b) => ({
    url: `https://smartpeptides.bio//${b.slug}/`,
    lastModified: new Date(),
  }));

  // Categories
  const categories = [
    {
      url: `https://smartpeptides.bio//peptides/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.bio/blends/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.bio/peptides/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.bio//peptide-supplies/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];

  // Static pages
  const staticPages = [
    {
      url: `https://smartpeptides.bio//`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    } as any,
    {
      url: `https://smartpeptides.bio//profile/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.bio//shop/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.bio//contact/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.bio//blog/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.bio//faq/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.bio//sign-in/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.bio//about/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.bio//privacy/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.bio//refunds/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.bio//terms/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.bio//shipping/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.bio//discount/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://smartpeptides.bio//cart/`,
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
