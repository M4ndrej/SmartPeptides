import { PaymentMethods } from "@/types/payment";

export const redirectMethods: PaymentMethods[] = [
  "coinbase",
  "nowpayments_gateway",
  "fiatsystems",
  "unipayment",
  "egift-certificate",
  "oaktree",
  "placetopay",
  "vidamagica",
];

export type PaymentMethodConfig = {
  included?: string[];
  excluded?: string[];
};

export const paymentMethodConfigs: Partial<
  Record<PaymentMethods, PaymentMethodConfig>
> = {
  cashapp: {
    included: ["US", "GB"],
  },
  zelle: {
    included: ["US"],
  },
  venmo: {
    included: ["US", "PR", "GU", "VI", "UM"],
  },
  paymentechnologies: {
    included: ["US"],
  },
  "egift-certificate": {
    included: ["US"],
  },
  fiatsystems: {
    excluded: ["US"],
  },
  // gwpaymentplugin: {
  //   excluded: ["US"],
  // },
  dfinsell: {
    included: ["US"],
  },
};
