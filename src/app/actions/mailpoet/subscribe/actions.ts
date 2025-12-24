"use server";

import { hfetch } from "@/helpers/fetchers";
import { headers } from "next/headers";
import { z } from "zod";

export type SubscribeValidationErros = {
  email?: string[] | undefined;
};

const subscribeValidation = z.object({
  email: z.string().email(),
  username: z.string().optional(),
});

export default async function subscribeToMailpoetAction(formData: FormData) {
  const headersList = headers();

  const sendData = {
    email: formData.get("email"),
    username: formData.get("username"),
  };

  const validatedFields = subscribeValidation.safeParse(sendData);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (validatedFields.data.username) {
    return { success: true, f: true };
  }

  var myHeaders = new Headers();

  const xForwardedIpAddress = headersList.get("X-Forwarded-For");
  if (xForwardedIpAddress) {
    const ipAddressParts = xForwardedIpAddress?.split(" ");
    const realIpAddress = ipAddressParts?.[1] || xForwardedIpAddress;
    myHeaders.set("X-Forwarded-For", realIpAddress!);
  }

  var requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  const subscribeRequest = await hfetch(
    `${process.env.API_URL}/myaffiliate/v2/mailpoet-subscribe?email=${validatedFields.data.email}`,
    requestOptions
  );

  if (subscribeRequest.status === 200) {
    return {
      sucess: true,
    };
  }

  return {
    errors: {
      email: ["Something went wrong!"],
    },
  };
}
