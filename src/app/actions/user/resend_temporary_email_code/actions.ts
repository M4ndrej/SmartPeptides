"use server";

import { ActionFactory } from "@/helpers/server_actions";
import { cookies } from "next/headers";
import { z } from "zod";

const resendTempEmailCodeValidation = z.object({});

const resendTempEmailCode = ActionFactory({
  validator: resendTempEmailCodeValidation,
  queryKey: "myauth/v2/resend_temporary_email_code",
  includeCookie: true,
  errorMessage: "Cannot send the email this time, please try again!",
});

export default resendTempEmailCode;
