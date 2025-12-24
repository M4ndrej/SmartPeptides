"use server";

import { ActionFactory } from "@/helpers/server_actions";
import { z } from "zod";

const verifyValidation = z.object({
  email: z.string().email(),
  code: z.string().max(12).min(12),
});

const verifySubscriber = ActionFactory({
  validator: verifyValidation,
  queryKey: "mysubscriber/v2/verify",
  errorMessage: "Cannot verify subscription this time, please try again!",
});

export default verifySubscriber;
