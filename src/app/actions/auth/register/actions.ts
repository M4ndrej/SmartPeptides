"use server";

import { ActionFactory } from "@/helpers/server_actions";
import { cookies } from "next/headers";
import { z } from "zod";

const registerValidation = z.object({
  email: z.string().email(),
  subscribe: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
});

const registerUser = ActionFactory({
  validator: registerValidation,
  queryKey: "myauth/v2/register",
  queryParams: {
    registration_cookie: cookies().get("registeredUser")?.value ?? "",
  },
  includeAffiliateCookie: true,
  includeUTMCookie: true,
  errorMessage: "Cannot register user this time, please try again!",
  onSuccess: (data) => {
    const cookieData = cookies();
    cookieData.set("registeredUser", data?.user?.registration_cookie);
    return {
      success: true,
    };
  },
  dontAddKeys: true,
});

export default registerUser;
