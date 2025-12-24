import { hfetch } from "@/helpers/fetchers";
import { BlogResponseList } from "@/types/blog";
import { cookies } from "next/headers";
import "server-only";

export async function getBlogsList(category?: string) {
  const excludedCategories = ["peptide-market", "peptide-shop", "peptide-cc"];
  const includedCategories = category ? [category] : ["value-peptide"];

  const excludedString = excludedCategories.join(",");
  const includedString = includedCategories.join(",");

  var myHeaders = new Headers();
  const woocomerceLoggedUser = cookies().get(`${process.env.WP_LOGGED_IN}`);
  if (woocomerceLoggedUser) {
    myHeaders.append(
      "Cookie",
      `${woocomerceLoggedUser?.name}=${woocomerceLoggedUser?.value}`
    );
  }

  const blogs = await hfetch(
    `${process.env.API_URL}/myblogs/v2/list?excluded_cats=${excludedString}&included_cats=${includedString}`,
    {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      next: { revalidate: 3600 },
    }
  );

  return blogs.json() as Promise<BlogResponseList>;
}

export async function getBlogs(searchParams: any) {
  const url = new URL(`${process.env.API_URL}/wp/v2/posts`);
  if (searchParams)
    Object.keys(searchParams).forEach((key) =>
      url.searchParams.append(key, searchParams[key])
    );

  const res = await hfetch(url, { next: { revalidate: 3600 } });

  return res.json();
}

export async function getBlogBySlug(slug: string) {
  var myHeaders = new Headers();

  const woocomerceLoggedUser = cookies().get(`${process.env.WP_LOGGED_IN}`);

  if (woocomerceLoggedUser) {
    myHeaders.append(
      "Cookie",
      `${woocomerceLoggedUser?.name}=${woocomerceLoggedUser?.value}`
    );
  }

  var requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
    next: { revalidate: 3600 },
  };

  const res = await hfetch(
    `${process.env.API_URL}/myblogs/v2/byslug/?slug=${slug}&per_page=1?v=1`,
    requestOptions
  );

  return res.json();
}

export async function getBlogCategories() {
  const res = await hfetch(
    `${process.env.API_URL}/wp/v2/categories/?per_page=50`
  );

  return res.json();
}
