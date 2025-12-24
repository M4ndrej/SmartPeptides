import { paymentMethodConfigs } from "@/data/payment_methods";
import { PaymentMethods } from "@/types/payment";

export function checkPaymentForCountry(
  method: PaymentMethods,
  billingCountry?: string
) {
  const countryConfig = paymentMethodConfigs[method];
  // Empty (default true)
  if (!countryConfig) return true;
  // Excluded
  if (countryConfig.excluded?.includes(billingCountry ?? "")) {
    return false;
  }
  // Included not specified
  if (!countryConfig.included?.length) {
    return true;
  }
  // Included
  if (countryConfig.included?.includes(billingCountry ?? "")) {
    return true;
  }
  return false;
}
