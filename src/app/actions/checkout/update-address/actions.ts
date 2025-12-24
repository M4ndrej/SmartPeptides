"use server";
import { headers } from "next/headers";
import { z } from "zod";

// fetchers
import { cartFetcher } from "@/helpers/server_fetchers";

// types
import { State } from "@/types/addresses";
import { ShippingAddress } from "@/types/cart_types";

export type UpdateUserAddressProps = {
  email?: string[] | undefined;
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

const updateUserValidation = z.object({
  email: z.string().email(),
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

export default async function updateAddressAction(
  formData: FormData,
  availableStates: State[]
) {
  const headersList = headers();

  const sendData = {
    email: formData.get("email"),
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    address_1: formData.get("address_1"),
    address_2: formData.get("address_2"),
    city: formData.get("city"),
    postcode: formData.get("postcode"),
    country: formData.get("country"),
    phone: formData.get("phone"),
  };

  const validatedFields = updateUserValidation.safeParse(sendData);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const updateShippData: ShippingAddress = {
    ...validatedFields.data,
    state: "",
    phone: "",
  };

  // Validate phone numbers separate
  const validatePhoneNumbers =
    phoneValidationForNonNmiUsers.safeParse(sendData);
  // sendData.country === "CA" || sendData.country === "US"
  //   ? phoneValidationForNmiUsers.safeParse(sendData)
  //   : phoneValidationForNonNmiUsers.safeParse(sendData);

  // Return early if the form data is invalid
  if (!validatePhoneNumbers.success) {
    return {
      errors: validatePhoneNumbers.error.flatten().fieldErrors,
    };
  }

  updateShippData.phone = validatePhoneNumbers.data.phone!;

  // If there are available states when you choose a country validate the state first!
  if (availableStates.length) {
    const onlyState = { state: formData.get("state") };
    const onlyStateValid = onlyValidateState.safeParse(onlyState);
    if (!onlyStateValid.success) {
      return {
        errors: onlyStateValid.error.flatten().fieldErrors,
      };
    }

    updateShippData.state = onlyStateValid.data.state!;
  }

  const updateUserAddressResponse = await cartFetcher({
    url: `${process.env.API_URL}/wc/store/cart/update-customer`,
    method: "POST",
    data: {
      shipping_address: updateShippData, //   checkoutData!.shipping_address,
      billing_address: updateShippData, //checkoutData!.billing_address,
    },
    apiType: "user",
    request: null,
    ipAddress: headersList.get("X-Forwarded-For")!,
  });

  if (updateUserAddressResponse.status === 200) {
    const data = await updateUserAddressResponse.json();
    return { success: data };
  } else {
    const dataFormated = await updateUserAddressResponse.json();
    const mainError = dataFormated?.data.details.shipping_address.code.replace(
      "invalid_",
      ""
    );
    return {
      errors: { [mainError]: [dataFormated?.data.params.shipping_address] },
    };
  }
}
