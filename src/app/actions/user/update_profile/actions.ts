"use server";

import { ActionFactory } from "@/helpers/server_actions";
import { cookies } from "next/headers";
import { z } from "zod";

const updateUserValidation = z
  .object({
    lastname: z.string().min(2).max(30),
    firstname: z.string().min(1).max(30),
    email: z.string().email(),
    currentPassword: z
      .string()
      .min(6, "Password is too short")
      .optional()
      .or(z.literal("")),
    newPassword: z
      .string()
      .min(6, "Password is too short")
      .optional()
      .or(z.literal("")),
    confirmPassword: z.string().min(6).optional().or(z.literal("")),
  })
  .refine((data) => data.newPassword == data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const updateProfile = ActionFactory({
  validator: updateUserValidation,
  method: "POST",
  queryKey: "myauth/v2/update_profile",
  includeCookie: true,
  errorMessage: "Cannot update profile this time, please try again!",
  onSuccess: (data, res) => {
    const cookieData = cookies();
    const loggedUser = JSON.parse(cookieData.get("loggedUser")?.value ?? "{}");
    cookieData.set(
      "loggedUser",
      JSON.stringify({ ...loggedUser, user: data.user })
    );

    const wpSession = res.headers.getSetCookie();
    wpSession.forEach((strCookie) => {
      const cookie = strCookie.split(";").at(0)?.split("=");
      if (cookie && cookie?.[0] == process.env.WP_LOGGED_IN) {
        const cookieValue = decodeURIComponent(cookie[1]);
        cookieData.set(process.env.WP_LOGGED_IN, cookieValue, {
          expires: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          ).getTime(),
        });
      }
    });

    return {
      success: true,
    };
  },
  dontAddKeys: true,
});

export default updateProfile;
