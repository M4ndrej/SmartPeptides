"use server";

import {
  abakaPayment,
  flexipayPayment,
  isCreditCardError,
  paymenTechPayment,
  quantAuthPayment,
} from "@/helpers/checkout_helpers";
import { cartFetcher } from "@/helpers/server_fetchers";
import {
  BillingAddress,
  CheckoutPaymentAddData,
  PaymentMethods,
} from "@/types/payment";
import { cookies, headers } from "next/headers";
import { z } from "zod";

export type PlaceOrderErrorProps = {
  terms?: string[] | undefined;
  privacy?: string[] | undefined;
  "nmi-card-number"?: string[] | undefined;
  "nmi-card-expiry"?: string[] | undefined;
  "nmi-card-cvc"?: string[] | undefined;

  "credit-card-number"?: string[] | undefined;
  "credit-card-expiry"?: string[] | undefined;
  "credit-card-cvc"?: string[] | undefined;
  "credit-card-type"?: string[] | undefined;

  first_name?: string[] | undefined;
  last_name?: string[] | undefined;
  address_1?: string[] | undefined;
  address_2?: string[] | undefined;
  city?: string[] | undefined;
  postcode?: string[] | undefined;
  state?: string[] | undefined;
  country?: string[] | undefined;
  phone?: string[] | undefined;
  email?: string[] | undefined;
};

const validateDifferentBillingAddress = z.object({
  first_name: z.string().min(2).max(30),
  last_name: z.string().min(2).max(30),
  address_1: z.string().min(2).max(30),
  address_2: z.string().max(30).optional().nullable(),
  city: z.string().min(1).max(30),
  postcode: z.string().min(1).max(30),
  state: z.string().min(1).max(30),
  country: z.string().min(1).max(30),
  phone: z
    .string()
    .refine(
      (value) => /^[0-9]\d{9}$/.test(value),
      "Please enter a valid phone number!!!"
    ),
});

export default async function placeOrderAction(
  formData: FormData,
  orderId?: number
) {
  const headersList = headers();

  if (!formData.get("terms")) {
    return {
      errors: {
        terms: [
          "Please read and accept the terms and conditions to proceed with your order.",
        ],
      },
    };
  }

  if (!formData.get("privacy")) {
    return {
      errors: {
        privacy: [
          "Please read and accept the agreement to proceed with your order.",
        ],
      },
    };
  }

  const shippingAddress = {
    first_name: formData.get("shipping_first_naem") as string,
    last_name: formData.get("shipping_last_name") as string,
    address_1: formData.get("shipping_address_1") as string,
    address_2: formData.get("shipping_address_2") as string,
    company: formData.get("shipping_company") as string,
    city: formData.get("shipping_city") as string,
    postcode: formData.get("shipping_postcode") as string,
    state: formData.get("shipping_state") as string,
    country: formData.get("shipping_country") as string,
    phone: formData.get("shipping_phone") as string,
    email: formData.get("shipping_email") as string,
  };

  const selected_payment = formData.get("paymentOption") as PaymentMethods;
  const customer_note = formData.get("customer_note") as string;

  const utmInfo = cookies().get("utm_info")?.value ?? "";
  const ga4DataCookie = cookies().get("ga4_data")?.value;
  const propellerDataCookie = cookies().get("propeller_data")?.value;

  const orderData: CheckoutPaymentAddData = {
    shipping_address: shippingAddress,
    customer_note: customer_note,
    billing_address: { ...shippingAddress },
    payment_method: selected_payment,
    extensions: {
      subscribers: {
        optin: true,
        utm_info: utmInfo,
      },
    },
    ga4_data: ga4DataCookie ? JSON.parse(ga4DataCookie) : null,
    propeller_data: propellerDataCookie
      ? JSON.parse(propellerDataCookie)
      : null,
  };

  const useDifferentBillingAddress = formData.get("same-billing")!;
  if (+useDifferentBillingAddress) {
    const differentBillingData = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      address_1: formData.get("address_1"),
      address_2: formData.get("address_2"),
      city: formData.get("city"),
      postcode: formData.get("postcode"),
      state: formData.get("state"),
      country: formData.get("country"),
      phone: formData.get("phone"),
    };

    const validatedFields =
      validateDifferentBillingAddress.safeParse(differentBillingData);

    // Return early if the form data is invalid
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    orderData.billing_address = validatedFields.data as BillingAddress;
  }

  if (selected_payment === "quantumepay" || selected_payment === "authnet") {
    const creditResult = quantAuthPayment(formData, selected_payment);
    if (isCreditCardError(creditResult)) {
      return creditResult;
    }
    orderData.payment_data = creditResult;
  }

  if (selected_payment === "paymentechnologies") {
    const creditResult = paymenTechPayment(formData);
    if (isCreditCardError(creditResult)) {
      return creditResult;
    }
    orderData.payment_data = creditResult;
  }

  if (selected_payment === "flexipay") {
    const creditResult = flexipayPayment(formData);
    if (isCreditCardError(creditResult)) {
      return creditResult;
    }
    orderData.payment_data = creditResult;
  }

  if (selected_payment === "gwpaymentplugin") {
    const creditResult = abakaPayment(formData);
    if (isCreditCardError(creditResult)) {
      return creditResult;
    }
    orderData.payment_data = creditResult;
  }

  if (
    orderData?.shipping_address?.country !== "US" &&
    selected_payment === "quantumepay"
  ) {
    orderData.billing_address = {
      first_name: orderData?.shipping_address?.first_name!,
      last_name: orderData?.shipping_address?.last_name!,
      company: orderData?.shipping_address?.company!,
      address_1: "353 Remington Blvd",
      address_2: "",
      city: "Bolingbrook",
      state: "IL",
      postcode: "60440",
      country: "US",
      email: orderData?.billing_address?.email!,
      phone: "",
    };
  }

  // const emailSubscribe = formData.get("subscribe-to-mailpoet");
  // if (emailSubscribe) {
  //   orderData.extensions!.subscribers.optin = true;
  // }

  if (!!orderId) {
    orderData.billing_email = orderData?.billing_address?.email;
    delete orderData.extensions;
  }

  const placeOrderUrl =
    `${process.env.API_URL}/wc/store/checkout/` + (orderId ? `${orderId}` : "");

  const addOrderRequest = await cartFetcher({
    url: placeOrderUrl,
    method: "POST",
    data: orderData,
    apiType: "user",
    request: null,
    ipAddress: headersList.get("X-Forwarded-For")!,
  });

  const data = await addOrderRequest.json();

  // Do not erase.
  // console.log("SEND DATA");
  // console.log(orderData);
  // console.log(JSON.stringify(orderData));
  // console.log("SEND DATA");

  // console.log("RESPONSE");
  // console.log(data);
  // console.log(JSON.stringify(data));
  // console.log("RESPONSE");

  if (
    addOrderRequest.status !== 500 &&
    data.status !== "failed" &&
    data.payment_result?.payment_status !== "failure" &&
    ![400, 409, 500, 411, 402].includes(data.data?.status)
  ) {
    return { success: data };
  } else if (
    data.data?.status === 409 ||
    data.data?.status === 401 ||
    data.data?.status === 402
  ) {
    return {
      error: data?.message || "Something went wrong please try again!",
    };
  } else if (data.payment_result?.payment_details) {
    const message = data.payment_result?.payment_details?.find(
      (el: any) => el?.key === "message"
    );
    return {
      error:
        message?.value ||
        data.payment_result?.payment_details?.[2]?.value ||
        data.payment_result?.payment_details?.[0]?.value ||
        "Invalid card number provided. Please try again.",
    };
  } else if (data.code === "registration-error-email-exists") {
    return {
      error:
        "An account is already registered with your email address. Please log in before proceeding.",
    };
  } else if (data.code === "woocommerce_rest_invalid_address") {
    return {
      error: "There is a problem with address please try again!",
    };
  } else if (data.code === "invalid_order_update_status") {
    return {
      error: "This order is already completed!",
    };
  } else {
    return {
      error:
        "The customer’s bank suspects fraud – they will need to contact their bank for more information.",
    };
  }
}
