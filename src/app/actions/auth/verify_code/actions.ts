"use server";

import { ActionFactory } from "@/helpers/server_actions";
import { cookies } from "next/headers";
import { z } from "zod";

const verifyCodeValidation = z.object({
  email: z.string().email(),
  code: z.string().min(6).max(6),
});

const verifyCode = ActionFactory({
  validator: verifyCodeValidation,
  queryKey: "myauth/v2/verify_guest_code",
  includeCookie: true,
  errorMessage: "Cannot verify code this time, please try again!",
  onSuccess: (data) => {
    const cookieData = cookies();

    if (data?.cookie_name && data?.cookie && data?.cookie_expiration) {
      cookieData.set(data.cookie_name, data.cookie, {
        expires: +data.cookie_expiration,
      });
      cookieData.set("loggedUser", JSON.stringify(data), {
        expires: +data.cookie_expiration,
      });
      cookieData.delete("registeredUser");

      return {
        success: true,
        additional: {
          was_logged: true,
        },
      };
    }

    cookieData.set("verifiedEmail", data.email, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // One Day
    });
    return {
      success: true,
      additional: {
        was_logged: false,
      },
    };
  },
});

export default verifyCode;
