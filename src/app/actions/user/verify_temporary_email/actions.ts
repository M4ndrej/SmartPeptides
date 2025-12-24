"use server";
import { ActionFactory } from "@/helpers/server_actions";
import { z } from "zod";

const updateTempEmailValidation = z.object({
  email: z.string().email().min(1).max(30),
  code: z.string().min(6).max(6),
});

const verifyTempEmail = ActionFactory({
  validator: updateTempEmailValidation,
  queryKey: "myauth/v2/verify_temporary_email_address",
  includeCookie: true,
  errorMessage: "Cannot verify email this time, please try again!",
});

export default verifyTempEmail;
