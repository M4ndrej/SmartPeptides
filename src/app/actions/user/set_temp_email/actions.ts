"use server";
import { ActionFactory } from "@/helpers/server_actions";
import { z } from "zod";

const tempEmailValidation = z.object({
  email: z.string().email().min(1).max(30),
});

const setTempEmail = ActionFactory({
  validator: tempEmailValidation,
  queryKey: "myauth/v2/set_temporary_email_address",
  includeCookie: true,
  errorMessage: "Cannot set temporary email this time, please try again!",
});

export default setTempEmail;
