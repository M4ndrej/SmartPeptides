"use server";

import { ActionFactory } from "@/helpers/server_actions";
import { cookies } from "next/headers";
import { z } from "zod";

const passwordValidation = z
  .object({
    new_password: z.string().min(6, "Password is too short"),
    confirm_password: z.string().min(6),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

const setNewPassword = ActionFactory({
  validator: passwordValidation,
  method: "POST",
  queryKey: "myauth/v2/set_new_password",
  includeCookie: true,
  errorMessage: "Cannot set password this time, please try again!",
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
});

export default setNewPassword;
