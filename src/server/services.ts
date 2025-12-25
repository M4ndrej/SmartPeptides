import { hfetch } from "@/helpers/fetchers";
import { globalFetcher } from "@/helpers/server_fetchers";
import { generateFilterParamString } from "@/helpers/shop_filters";
import { Category } from "@/types/category";
import { PaginationType } from "@/types/global";
import { Order, OrdersList } from "@/types/orders";
import { AvailablePayments } from "@/types/payments";
import { ProductList, ProductNew } from "@/types/product";
import { TagsList } from "@/types/tags";
import { TrackingFullDetails } from "@/types/tracking";
import { IUserInfo, SpecificUser, UserVICData } from "@/types/user";
import { cookies } from "next/headers";

export async function fetchProducts(paramString: string) {
  const productList = await hfetch(
    `${process.env.API_URL}/wc/v1/products/?${paramString}`,
    { cache: "force-cache" }
    // { next: { revalidate: 3600 } }
  );
  if (!productList.ok) return [];
  return productList.json() as Promise<ProductList>;
}

export async function fetchProductBySlug(slug: string) {
  const params = generateFilterParamString({
    slug: slug,
    per_page: 1,
  });
  const productList = await fetchProducts(params);
  return productList[0];
}

export async function fetchProductById(productId: number) {
  const req = await globalFetcher({
    url: `${process.env.API_URL}/wc/v1/products/${productId}`,
    method: "GET",
    apiType: "global",
  });
  if (!req.ok) return undefined;
  return req.json() as Promise<ProductNew>;
}

export async function fetchCategories() {
  const categoryList = await hfetch(
    `${process.env.API_URL}/wc/v1/products/categories/`,
    { next: { revalidate: 3600 } }
  );
  if (!categoryList.ok) return [];

  const allCategories = (await categoryList.json()) as Category[];
  return allCategories.filter((c: Category) =>
    [
      //"cosmetic-peptides",
      // "merch",
      "peptide-blends",
      "peptide-supplies",
      "peptides",
    ].includes(c.slug)
  );
}

export async function fetchTags(categoryList?: string) {
  const tagList = await hfetch(
    `${process.env.API_URL}/myproducts/v2/tags/?v=2&category=${categoryList ?? "peptides"}`,
    { next: { revalidate: 3600 } }
  );

  if (!tagList.ok) return [];
  return tagList.json() as Promise<TagsList>;
}

export async function fetchUserData() {
  const userCookie = cookies().get(`${process.env.WP_LOGGED_IN}`);
  const userData = await hfetch(
    `${process.env.API_URL}/myauth/v2/get_user_info?cookie=${userCookie?.value ?? ""}`
  );

  if (!userData.ok) return undefined;
  return userData.json() as Promise<{ user: IUserInfo }>;
}

export async function fetchUserVICData() {
  const userCookie = cookies().get(`${process.env.WP_LOGGED_IN}`);
  const userData = await hfetch(
    `${process.env.API_URL}/myauth/v2/get_user_vic_info?cookie=${userCookie?.value ?? ""}`
  );

  if (!userData.ok) return undefined;
  return userData.json() as Promise<UserVICData>;
}

export async function fetchUserOrders(page?: number, perPage?: number) {
  const userData = await fetchUserData();

  const userId = userData?.user?.id;
  if (!userId) return undefined;

  const userOrders = await globalFetcher({
    url: `${process.env.API_URL}/myorders/v2/get_profile_orders?customer=${userId}&page=${page ?? ""}&per_page=${perPage ?? ""}`,
    method: "GET",
    apiType: "global",
  });

  if (!userOrders.ok) return undefined;
  return (await userOrders.json()) as Promise<{
    orders: OrdersList;
    pagination: PaginationType;
  }>;
}

export async function fetchTrackingData(orderId: number, email: string) {
  const trackingData = await globalFetcher({
    url: `${process.env.API_URL}/mytracking/v2/get_tracking_data?order_id=${orderId}&email=${email}`,
    method: "GET",
    apiType: "global",
  });

  if (!trackingData.ok) return undefined;
  return trackingData.json() as Promise<TrackingFullDetails>;
}

export async function fetchOrderData(orderId: number) {
  const order = await hfetch(`${process.env.API_URL}/wc/v2/orders/${orderId}`);

  if (!order.ok) return undefined;
  return order.json() as Promise<Order>;
}

export async function fetchNewOrderData(orderId: number) {
  const order = await hfetch(`${process.env.API_URL}/wc/v3/orders/${orderId}`);

  if (!order.ok) return undefined;
  return order.json() as Promise<Order>;
}

export async function fetchAvailablePayments() {
  const payments = await hfetch(
    `${process.env.API_URL}/myproducts/v2/get_available_payments`,
    { next: { revalidate: 0 } }
  );
  if (!payments.ok) return undefined;
  return payments.json() as Promise<AvailablePayments>;
}

export async function isSpecificProductsUser() {
  try {
    const wpLoggedIn = cookies().get(`${process.env.WP_LOGGED_IN}`)?.value;
    if (!wpLoggedIn) return undefined;

    const request = await hfetch(
      `${process.env.API_URL}/myauth/v2/show_specific_products?cookie=${wpLoggedIn}`,
      { cache: "no-store" }
    );

    if (!request.ok) return undefined;
    return request.json() as Promise<SpecificUser>;
  } catch (error) {
    return undefined;
  }
}

export const getRelatedProducts = async (mainProduct: ProductNew) => {
  const resultsP = mainProduct.related_ids.map(async (id) => {
    const res = await fetchProductById(id);
    return res;
  });
  console.log("resultsP", resultsP);

  const results = (await Promise.all(resultsP)) as ProductNew[];
  console.log("results", results);
  const relatedProducts = results.filter(
    (r) =>
      r?.categories?.[0]?.slug !== "customs" &&
      r?.id !== 56914 &&
      r?.categories?.some((c) => c.slug === "peptides")
  );

  return relatedProducts;
};
