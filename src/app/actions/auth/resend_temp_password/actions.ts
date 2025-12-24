"use server";

import { ActionFactory } from "@/helpers/server_actions";
import { cookies } from "next/headers";
import { z } from "zod";

const resendTempPasswordValidation = z.object({});

const resendTempPassword = ActionFactory({
  validator: resendTempPasswordValidation,
  queryKey: "myauth/v2/resend_registration_email",
  errorMessage: "Cannot send the email this time, please try again!",
  additionalFields: {
    registration_cookie: cookies().get("registeredUser")?.value ?? "",
  },
});

export default resendTempPassword;
