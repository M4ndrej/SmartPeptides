"use server";

import { hfetch } from "@/helpers/fetchers";
import { cookies } from "next/headers";
import { z } from "zod";

const updateUserValidation = z.object({
  lastname: z.string().min(5).max(30),
  firstname: z.string().min(1).max(30),
  displayname: z.string().min(1).max(30),
  email: z.string().email(),
});

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

export default async function updateUser(formData: FormData) {
  let addPasswordParametersToUrl = "";
  const updatePassword = formData.get("currentPassword");
  if (updatePassword) {
    const passwordData = {
      currentPassword: formData.get("currentPassword"),
      newPassword: formData.get("newPassword"),
      confirmPassword: formData.get("confirmPassword"),
    };

    const validatedPasswordFields = passwordValidation.safeParse(passwordData);

    // Return early if the form data is invalid
    if (!validatedPasswordFields.success) {
      return {
        errors: validatedPasswordFields.error.flatten().fieldErrors,
      };
    } else {
      const { currentPassword, newPassword, confirmPassword } =
        validatedPasswordFields.data;

      addPasswordParametersToUrl = `&password_current=${encodeURIComponent(
        currentPassword!
      )}&password_1=${encodeURIComponent(
        newPassword!
      )}&password_2=${encodeURIComponent(confirmPassword!)}`;
    }
  }

  const sendData = {
    lastname: formData.get("lastname"),
    firstname: formData.get("firstname"),
    displayname: formData.get("displayname"),
    email: formData.get("email"),
  };

  const validatedFields = updateUserValidation.safeParse(sendData);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const woocomerceLoggedUser = cookies().get(`${process.env.WP_LOGGED_IN}`);

  const { email, firstname, lastname, displayname } = validatedFields.data;

  const updateUrl = `?account_email=${email}&account_first_name=${firstname}&account_last_name=${lastname}&account_display_name=${displayname}&cookie=${woocomerceLoggedUser?.value}${addPasswordParametersToUrl}`;

  const updateUser = await hfetch(
    `${process.env.API_URL}/myauth/v2/update_user_details/${updateUrl}`,
    undefined,
    true
  );

  if (updateUser.status === 200) {
    const result = await updateUser.json();

    if (result.error) return { error: result.error };

    const loggedUser = cookies().get("loggedUser");
    if (loggedUser) {
      const loggUser = JSON.parse(loggedUser.value);
      loggUser.user = {
        ...loggUser.user,
        email,
        firstname,
        lastname,
        displayname,
      };
      if (updatePassword) {
        loggUser.user.is_default_password = false;
        delete loggUser.user.registration_cookie;
      }
      cookies().set("loggedUser", JSON.stringify(loggUser));
    }

    if (updatePassword) {
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
      });
    }

    return {
      success: result,
    };
  } else {
    return {
      error: "Unable to update user profile!",
    };
  }
}
