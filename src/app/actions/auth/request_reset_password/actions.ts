"use server";

import { ActionFactory } from "@/helpers/server_actions";
import { z } from "zod";

const resetValidation = z.object({
  username: z.string().email(),
});

const requestResetPassword = ActionFactory({
  validator: resetValidation,
  method: "POST",
  queryKey: "myauth/v2/request_password_reset",
  errorMessage: "Cannot request password reset this time, please try again!",
});

export default requestResetPassword;
