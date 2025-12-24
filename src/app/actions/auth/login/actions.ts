"use server";
import { hfetch } from "@/helpers/fetchers";
import { isValidEmail } from "@/helpers/validation_helpers";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginValidation = z.object({
  password: z.string().min(5).max(30),
  username: z.string().min(1).max(30).email(),
});

export default async function loginUser(
  formData: FormData,
  redirectAfterLogin: string = ""
) {
  const cookieData = cookies();
  const headersList = headers();
  const sendData = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const validatedFields = loginValidation.safeParse(sendData);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const usernameOrEmail = validatedFields.data.username;
  const password = validatedFields.data.password;

  const usernameParamOrEmail = isValidEmail(usernameOrEmail)
    ? "email"
    : "username";

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

  const login = await hfetch(
    `${
      process.env.API_URL
    }/myauth/v2/generate_auth_cookie/?${usernameParamOrEmail}=${usernameOrEmail}&password=${encodeURIComponent(
      password!
    )}`,
    requestOptions
  );

  try {
    const data = await login.json();

    if (!login.ok) {
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

    if (!redirectAfterLogin) {
      return {
        isDefaultPassword: data?.user?.is_default_password ?? false,
        success: true,
      };
    }
  } catch (error: any) {
    console.error(error);
    return {
      error: error?.message ?? "Cannot log in this time, please try again!",
    };
  }

  // Redirections has to go outside of try catch block
  if (redirectAfterLogin) redirect(redirectAfterLogin);
  return {
    success: true,
  };
}
