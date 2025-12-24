"use server";

import { hfetch } from "@/helpers/fetchers";
import { headers } from "next/headers";
import { z } from "zod";

export type ContactUsValidationErros = {
  email?: string[] | undefined;
  firstname?: string[] | undefined;
  lastname?: string[] | undefined;
  message?: string[] | undefined;
};

const contactSchema = z.object({
  firstname: z
    .string()
    .min(2, "First name is too short")
    .max(50, "First name is too long"),
  lastname: z
    .string()
    .min(2, "Last name is too short")
    .max(50, "Last name is too long"),
  email: z.string().email("Invalid email address"),
  message: z
    .string()
    .min(10, "Message is too short")
    .max(500, "Message is too long"),
  username: z.string().optional(),
});

export default async function sendContactUsFormAction(formData: FormData) {
  const headersList = headers();

  const sendData = {
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    email: formData.get("email"),
    message: formData.get("message"),
    username: formData.get("username"),
  };

  const validatedFields = contactSchema.safeParse(sendData);

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
  myHeaders.append("Content-Type", "application/json");

  const xForwardedIpAddress = headersList.get("X-Forwarded-For");
  if (xForwardedIpAddress) {
    const ipAddressParts = xForwardedIpAddress?.split(" ");
    const realIpAddress = ipAddressParts?.[1] || xForwardedIpAddress;
    myHeaders.set("X-Forwarded-For", realIpAddress!);
  }

  var requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(validatedFields.data),
    redirect: "follow",
  };

  try {
    const contactUsResponse = await hfetch(
      `${process.env.API_URL}/mycontact/v2/send_message`,
      requestOptions
    );

    if (!contactUsResponse.ok) {
      return {
        errors: {
          message: ["Something went wrong, please try later!"],
        },
      };
    }

    const result = await contactUsResponse.json();
    return result;
  } catch (e) {
    return {
      errors: {
        message: ["Something went wrong, please try later!"],
      },
    };
  }
}
