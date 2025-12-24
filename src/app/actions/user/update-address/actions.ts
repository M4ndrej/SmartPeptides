"use server";

import { globalFetcher } from "@/helpers/server_fetchers";
import { z } from "zod";

export type UpdateUserAddressErrors = {
  first_name?: string[] | undefined;
  last_name?: string[] | undefined;
  address_1?: string[] | undefined;
  address_2?: string[] | undefined;
  city?: string[] | undefined;
  postcode?: string[] | undefined;
  state?: string[] | undefined;
  country?: string[] | undefined;
  phone?: string[] | undefined;
};

const updateShippingAddressValidation = z.object({
  first_name: z.string().min(2).max(30),
  last_name: z.string().min(2).max(30),
  address_1: z.string().min(2).max(30),
  address_2: z.string().max(30).optional().nullable(),
  city: z.string().min(1).max(30),
  postcode: z.string().min(1).max(30),
  country: z.string().min(1).max(30),
});

const onlyValidateState = z.object({
  state: z.string().min(1).max(30),
});

const phoneValidationForNonNmiUsers = z.object({
  phone: z
    .string()
    .refine(
      (value) => /^\+?\d{6,12}$/.test(value),
      "Please enter a valid phone number!!!"
    ),
});

export default async function updateUserAddress(
  formData: FormData,
  useDifferentBillingAddress: boolean,
  userId: number
) {
  const shippingAddressData = {
    first_name: formData.get("ship_first_name"),
    last_name: formData.get("ship_last_name"),
    address_1: formData.get("ship_address_1"),
    address_2: formData.get("ship_address_2"),
    city: formData.get("ship_city"),
    postcode: formData.get("ship_postcode"),
    country: formData.get("ship_country"),
    state: formData.get("ship_state"),
    phone: formData.get("ship_phone"),
  };

  const billingAddressData = {
    first_name: formData.get("billing_first_name"),
    last_name: formData.get("billing_last_name"),
    address_1: formData.get("billing_address_1"),
    address_2: formData.get("billing_address_2"),
    city: formData.get("billing_city"),
    postcode: formData.get("billing_postcode"),
    country: formData.get("billing_country"),
    state: formData.get("billing_state"),
    phone: formData.get("billing_phone"),
  };

  const validatedFields =
    updateShippingAddressValidation.safeParse(shippingAddressData);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      type: "ship",
    };
  }

  // Validate phone numbers separate
  const validatePhoneNumbers =
    phoneValidationForNonNmiUsers.safeParse(shippingAddressData);

  // shippingAddressData.country === "CA"
  //   ? phoneValidationForNmiUsers.safeParse(shippingAddressData)
  //   : phoneValidationForNonNmiUsers.safeParse(shippingAddressData);

  // Return early if the form data is invalid
  if (!validatePhoneNumbers.success) {
    return {
      errors: validatePhoneNumbers.error.flatten().fieldErrors,
      type: "ship",
    };
  }

  // If there are available states when you choose a country validate the state first!
  const hasShippStates = formData.get("ship_has_states");
  if (hasShippStates !== "0") {
    const onlyState = { state: formData.get("ship_state") };
    const onlyStateValid = onlyValidateState.safeParse(onlyState);
    if (!onlyStateValid.success) {
      return {
        errors: onlyStateValid.error.flatten().fieldErrors,
        type: "ship",
      };
    }
  }

  // IF USER USES DIFFERENT BILLING ADDRESS
  if (useDifferentBillingAddress) {
    const validatedFields =
      updateShippingAddressValidation.safeParse(billingAddressData);

    // Return early if the form data is invalid
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        type: "billing",
      };
    }
  }

  const updateCartData = {
    billing: useDifferentBillingAddress
      ? { ...billingAddressData }
      : { ...shippingAddressData },
    shipping: { ...shippingAddressData },
  };

  const res = await globalFetcher({
    url: `${process.env.API_URL}/wc/v3/customers/${userId}`,
    method: "POST",
    data: updateCartData,
    apiType: "global",
  });

  try {
    const data = await res.json();
    return {
      success: data,
    };
  } catch (e: any) {
    return {
      errors: {
        phone: e.message || "Unable to update your address, please try again!",
      },
    };
  }
}
