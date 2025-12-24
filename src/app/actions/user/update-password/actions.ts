"use server";

import { hfetch } from "@/helpers/fetchers";
import { cookies } from "next/headers";
import { z } from "zod";

const passwordValidation = z
  .object({
    currentPassword: z.string().min(6, "Password is too short"),
    newPassword: z.string().min(6, "Password is too short"),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default async function updateUserPassword(formData: FormData) {
  const sendData = {
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const validatedFields = passwordValidation.safeParse(sendData);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const woocomerceLoggedUser = cookies().get(`${process.env.WP_LOGGED_IN}`);

  const { currentPassword, newPassword, confirmPassword } =
    validatedFields.data;

  const updateUrl = `?password_current=${currentPassword}&password_1=${newPassword}&password_2=${confirmPassword}&cookie=${woocomerceLoggedUser?.value}`;

  const updateUser = await hfetch(
    `${process.env.API_URL}/myauth/v2/update_user_password/${updateUrl}`
  );

  if (updateUser.status === 200) {
    const result = await updateUser.json();

    if (result.error) return { error: result.error };

    const woocomerceSession = updateUser.headers.getSetCookie();

    woocomerceSession.map((cook) => {
      const coookieSplit = cook.split(";");
      const cookieSplitValue = coookieSplit[0].split("=");
      if ([`${process.env.WP_LOGGED_IN}`].includes(cookieSplitValue[0])) {
        cookies().set(cookieSplitValue[0], cookieSplitValue[1], {
          expires: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          ).getTime(),
        });
      }

      return {
        success: true,
      };
    });
  } else {
    return { error: "Unable to update password, please try again!" };
  }
}
