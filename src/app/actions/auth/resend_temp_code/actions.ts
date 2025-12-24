"use server";

import { ActionFactory } from "@/helpers/server_actions";
import { z } from "zod";

const resendTempCodeValidation = z.object({
  email: z.string().email(),
});

const resendTempCode = ActionFactory({
  validator: resendTempCodeValidation,
  queryKey: "myauth/v2/resend_guest_code",
  errorMessage: "Cannot send the email this time, please try again!",
});

export default resendTempCode;
