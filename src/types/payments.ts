export interface AvailablePayments {
  [key: string]: PaymentOptions;
}

type PaymentOptions = {
  enabled: "yes" | "no";
  description: string | null;
  email?: string;
}