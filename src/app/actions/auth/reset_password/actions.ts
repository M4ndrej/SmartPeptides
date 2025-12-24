"use server";

import { ActionFactory } from "@/helpers/server_actions";
import { cookies } from "next/headers";
import { z } from "zod";

const passwordValidation = z
  .object({
    email: z.string().email(),
    code: z.string(),
    new_password: z.string().min(6, "Password is too short"),
    confirm_password: z.string().min(6, "Password is too short"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

const resetPassword = ActionFactory({
  validator: passwordValidation,
  method: "POST",
  queryKey: "myauth/v2/reset_password",
  errorMessage: "Cannot reset password this time, please try again!",
  onSuccess: (data) => {
    const cookieData = cookies();

    cookieData.set(data.cookie_name, data.cookie, {
      expires: +data.cookie_expiration,
    });
    cookieData.set("loggedUser", JSON.stringify(data), {
      expires: +data.cookie_expiration,
    });
    cookieData.delete("registeredUser");

    return {
      success: true,
    };
  },
});

export default resetPassword;
