"use server";

import { hfetch } from "@/helpers/fetchers";
import { z } from "zod";

export type TrackingValidationErros = {
  email?: string[] | undefined;
  orderId?: string[] | undefined;
};

const trackingValidation = z.object({
  orderId: z.string().min(1),
  email: z.string().email(),
});

export default async function submitTrackingFormAction(formData: FormData) {
  const sendData = {
    email: formData.get("email"),
    orderId: formData.get("orderId"),
  };

  const validatedFields = trackingValidation.safeParse(sendData);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await hfetch(
      `${process.env.API_URL}/mytracking/v2/get_order_data?email=${validatedFields.data.email}&order_id=${validatedFields.data.orderId}`
    );

    const orderData = await res.json();

    if (!res.ok) {
      return {
        error: "Please enter correct information",
      };
    }

    if (orderData.code) {
      return {
        error: "Order ID and Billing email do not match",
      };
    }

    return {
      order: orderData,
    };
  } catch (e) {
    return {
      error: "Please enter correct informations!",
    };
  }
}
