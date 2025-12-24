import {
  Affiliate,
  AffiliateFormData,
  AvailablePaymentMethods,
} from "@/types/affiliates";

export const determinePaymentMethod = (
  affiliate?: Affiliate
): AvailablePaymentMethods => {
  if (affiliate?.cash_app_name) return "cashapp";
  if (affiliate?.zelle_name) return "zelle";
  if (affiliate?.account_number) return "ach";
  return "store_credit";
};

export const prepopulateAffiliateForm = (affiliate?: Affiliate) => {
  if (!affiliate) return undefined;
  let data = {} as AffiliateFormData;
  for (const key in affiliate) {
    if (key === "id" || key === "user_id") continue;
    data[key as keyof AffiliateFormData] = (
      affiliate?.[key as keyof Affiliate] || ""
    ).toString();
  }
  data.payment_method = determinePaymentMethod(affiliate);
  return data;
};
