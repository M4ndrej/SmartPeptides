"use server";
import { hfetch } from "@/helpers/fetchers";
import { ActionResult } from "@/helpers/server_actions";
import { cookies, headers } from "next/headers";
import { z } from "zod";

const uploadProfilePictureValidation = z.object({
  picture: z.any(),
});

const uploadProfilePicture = async (
  formData?: FormData
): Promise<ActionResult> => {
  const headersList = headers();
  const sendData = formData ? Object.fromEntries(formData) : {};
  const validatedFields = uploadProfilePictureValidation.safeParse(sendData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error!.flatten().fieldErrors,
    };
  }

  let myHeaders = new Headers();
  const xForwardedIpAddress = headersList.get("X-Forwarded-For");
  if (xForwardedIpAddress) {
    const ipAddressParts = xForwardedIpAddress?.split(" ");
    const realIpAddress = ipAddressParts?.[1] || xForwardedIpAddress;
    myHeaders.set("X-Forwarded-For", realIpAddress!);
  }

  const cookie = cookies().get(`${process.env.WP_LOGGED_IN}`)?.value;
  myHeaders.append("Cookie", `${process.env.WP_LOGGED_IN}=${cookie}`);

  const reqOpts: RequestInit = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: formData,
  };

  const res = await hfetch(
    `${process.env.API_URL}/myauth/v2/upload_profile_picture?cookie=${cookie ?? ""}`,
    reqOpts,
    false
  );

  try {
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error:
          data?.message ??
          "Cannot upload profile picture this time, please try again!",
      };
    }

    return {
      success: true,
    };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      error:
        error?.message ??
        "Cannot upload profile picture this time, please try again!",
    };
  }
};

export default uploadProfilePicture;
