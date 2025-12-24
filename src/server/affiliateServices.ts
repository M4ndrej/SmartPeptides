import { globalFetcher } from "@/helpers/server_fetchers";
import {
  AffiliateBonusesSummary,
  AffiliateCreative,
  AffiliateCustomersSummary,
  AffiliateInfo,
  AffiliateLifetimeCustomersSummary,
  AffiliatePayoutsSummary,
  AffiliateSalesSummary,
  AffliateOverview,
} from "@/types/affiliates";

export async function fetchAffiliateData() {
  const affiliateData = await globalFetcher({
    url: `${process.env.API_URL}/myaffiliate/v2/get_profile`,
    method: "GET",
    apiType: "global",
  });

  if (!affiliateData.ok) return undefined;
  return affiliateData.json() as Promise<AffiliateInfo>;
}

export async function fetchAffiliateOverview() {
  const res = await globalFetcher({
    url: `${process.env.API_URL}/myaffiliate/v2/get_full_profile_overview`,
    method: "GET",
    apiType: "global",
  });

  if (!res.ok) return undefined;
  return res.json() as Promise<AffliateOverview>;
}

export async function fetchAffiliateSalesSummary() {
  const res = await globalFetcher({
    url: `${process.env.API_URL}/myaffiliate/v2/get_profile_sales_summary`,
    method: "GET",
    apiType: "global",
  });

  if (!res.ok) return undefined;
  return res.json() as Promise<AffiliateSalesSummary>;
}

export async function fetchAffiliatePayoutsSummary() {
  const res = await globalFetcher({
    url: `${process.env.API_URL}/myaffiliate/v2/get_profile_payouts_summary`,
    method: "GET",
    apiType: "global",
  });

  if (!res.ok) return undefined;
  return res.json() as Promise<AffiliatePayoutsSummary>;
}

export async function fetchAffiliateCustomersSummary() {
  const res = await globalFetcher({
    url: `${process.env.API_URL}/myaffiliate/v2/get_profile_customers_summary`,
    method: "GET",
    apiType: "global",
  });

  if (!res.ok) return undefined;
  return res.json() as Promise<AffiliateCustomersSummary>;
}

export async function fetchAffiliateLifetimeCustomersSummary() {
  const res = await globalFetcher({
    url: `${process.env.API_URL}/myaffiliate/v2/get_profile_lifetime_customers_summary`,
    method: "GET",
    apiType: "global",
  });

  if (!res.ok) return undefined;
  return res.json() as Promise<AffiliateLifetimeCustomersSummary>;
}

export async function fetchAffiliateBonusesSummary() {
  const res = await globalFetcher({
    url: `${process.env.API_URL}/myaffiliate/v2/get_profile_bonuses_summary`,
    method: "GET",
    apiType: "global",
  });

  if (!res.ok) return undefined;
  return res.json() as Promise<AffiliateBonusesSummary>;
}

export async function fetchAffiliateCreatives() {
  const res = await globalFetcher({
    url: `${process.env.API_URL}/myaffiliate/v2/get_creatives`,
    method: "GET",
    apiType: "global",
  });

  if (!res.ok) return [];
  return res.json() as Promise<AffiliateCreative[]>;
}
