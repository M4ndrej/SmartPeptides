import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Block all search engines from indexing
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
