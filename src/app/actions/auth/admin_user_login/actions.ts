"use server";
import { hfetch } from "@/helpers/fetchers";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { z } from "zod";

const adminLoginValidation = z.object({
  cookie: z.string().min(1).max(300),
  user_id: z.string().min(1).max(10),
});

export default async function adminUserLogin(formData: FormData) {
  const cookieData = cookies();
  const headersList = headers();
  const sendData = {
    cookie: formData.get("cookie"),
    user_id: formData.get("user_id"),
  };

  const validatedFields = adminLoginValidation.safeParse(sendData);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  var myHeaders = new Headers();

  const xForwardedIpAddress = headersList.get("X-Forwarded-For");
  if (xForwardedIpAddress) {
    const ipAddressParts = xForwardedIpAddress?.split(" ");
    const realIpAddress = ipAddressParts?.[1] || xForwardedIpAddress;
    myHeaders.set("X-Forwarded-For", realIpAddress!);
  }

  var requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const adminLogin = await hfetch(
    `${process.env.API_URL}/myauth/v2/admin_user_login/?cookie=${validatedFields.data.cookie}&user_id=${validatedFields.data.user_id}`,
    requestOptions
  );

  try {
    const data = await adminLogin.json();

    if (!adminLogin.ok) {
      return {
        error: data?.message ?? "Cannot log in this time, please try again!",
      };
    }

    cookieData.set(data.cookie_name, data.cookie, {
      expires: +data.cookie_expiration,
    });
    cookieData.set("loggedUser", JSON.stringify(data), {
      expires: +data.cookie_expiration,
    });
    cookieData.delete("registeredUser");
    cookieData.delete("verifiedEmail");
    revalidatePath("/profile");
    revalidatePath("/profile/");

    return {
      isDefaultPassword: data?.user?.is_default_password ?? false,
      success: true,
    };
  } catch (error: any) {
    console.error(error);
    return {
      error: error?.message ?? "Cannot log in this time, please try again!",
    };
  }
}
