import {
  cardProcessorFirstDigit,
  payWithFlexipayValidation,
  payWithMVCardValidation,
} from "@/data/checkout_helpers_data";
import {
  CreditCardErrors,
  CreditCardPaymentDataResponse,
} from "@/types/payment";

export function isCreditCardError(
  data: CreditCardPaymentDataResponse
): data is { errors: CreditCardErrors } {
  return "errors" in data;
}

export const determineCardType = (cardNumber: string): string | null => {
  if (!cardNumber || cardNumber.length < 2) {
    return null;
  }
  const firstDigit = cardNumber.charAt(0);
  return cardProcessorFirstDigit[firstDigit] ?? null;
};

export const quantAuthPayment = (
  formData: FormData,
  selectedPayment: string
): CreditCardPaymentDataResponse => {
  const cardData = {
    "credit-card-number": formData.get("credit-card-number")?.toString(),
    "credit-card-expiry": formData.get("credit-card-expiry")?.toString(),
    "credit-card-cvc": formData.get("credit-card-cvc")?.toString(),
  };
  const validatedFields = payWithMVCardValidation.safeParse(cardData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  return [
    {
      key: `${selectedPayment}-card-number`,
      value: validatedFields.data["credit-card-number"],
    },
    {
      key: `${selectedPayment}-card-expiry`,
      value: validatedFields.data["credit-card-expiry"],
    },
    {
      key: `${selectedPayment}-card-cvc`,
      value: validatedFields.data["credit-card-cvc"],
    },
  ];
};

export const paymenTechPayment = (
  formData: FormData
): CreditCardPaymentDataResponse => {
  const cardData = {
    "credit-card-number": formData.get("credit-card-number")?.toString(),
    "credit-card-expiry": formData.get("credit-card-expiry")?.toString(),
    "credit-card-cvc": formData.get("credit-card-cvc")?.toString(),
  };
  const validatedFields = payWithMVCardValidation.safeParse(cardData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  return [
    {
      key: `paymen_technologies_cc_number`,
      value: validatedFields.data["credit-card-number"] ?? "",
    },
    {
      key: `paymen_technologies_cc_expiry`,
      value: validatedFields.data["credit-card-expiry"] ?? "",
    },
    {
      key: `paymen_technologies_cc_cvc`,
      value: validatedFields.data["credit-card-cvc"] ?? "",
    },
    {
      key: `transaction_hash`,
      value: "peptideshop123",
    },
  ];
};

export const flexipayPayment = (
  formData: FormData
): CreditCardPaymentDataResponse => {
  const cardData = {
    "credit-card-number": formData.get("credit-card-number"),
    "credit-card-expiry": formData.get("credit-card-expiry"),
    "credit-card-cvc": formData.get("credit-card-cvc"),
    "credit-card-type": formData.get("credit-card-type"),
  };
  const validatedFields = payWithFlexipayValidation.safeParse(cardData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  return [
    {
      key: `flexipay-card-number`,
      value: validatedFields.data["credit-card-number"],
    },
    {
      key: `flexipay-card-expiry`,
      value: validatedFields.data["credit-card-expiry"],
    },
    {
      key: `flexipay-card-cvc`,
      value: validatedFields.data["credit-card-cvc"],
    },
    {
      key: `flexipay-card-type`,
      value: validatedFields.data["credit-card-type"],
    },
  ];
};

export const abakaPayment = (
  formData: FormData
): CreditCardPaymentDataResponse => {
  const cardData = {
    "credit-card-number": formData.get("credit-card-number"),
    "credit-card-expiry": formData.get("credit-card-expiry"),
    "credit-card-cvc": formData.get("credit-card-cvc"),
  };

  const validatedFields = payWithMVCardValidation.safeParse(cardData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const [expMonth, expYear] =
    validatedFields.data["credit-card-expiry"].split("/");
  const cardType = determineCardType(
    validatedFields.data["credit-card-number"]
  );

  return [
    {
      key: `billing_credircard`,
      value: validatedFields.data["credit-card-number"],
    },
    {
      key: `billing_expdatemonth`,
      value: expMonth,
    },
    {
      key: `billing_expdateyear`,
      value: expYear,
    },
    {
      key: `billing_ccvnumber`,
      value: validatedFields.data["credit-card-cvc"],
    },
    {
      key: `billing_cardtype`,
      value: cardType ?? "",
    },
  ];
};

export const createPeptenCardRedirect = async (
  email: string,
  orderId: number,
  amount: number
): Promise<{ redirectUrl?: string; error?: string }> => {
  try {
    const response = await fetch("/api/redirect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        order_id: orderId,
        amount,
      }),
    });

    const data = await response.json();

    if (response.ok && data.redirectUrl) {
      return { redirectUrl: data.redirectUrl };
    } else {
      return { error: data.error || "Failed to create payment redirect" };
    }
  } catch (error) {
    return { error: "Network error occurred while creating payment redirect" };
  }
};
