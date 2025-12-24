"use server";

import { ActionFactory } from "@/helpers/server_actions";
import { z } from "zod";

const updateValidation = z.object({
  email: z.string().email(),
  code: z.string().min(5).max(30),
  last_name: z.string().min(5).max(30),
  first_name: z.string().min(1).max(30),
});

const updateSubscriber = ActionFactory({
  validator: updateValidation,
  method: "PATCH",
  queryKey: "mysubscriber/v2/update",
  errorMessage: "Cannot update subscription this time, please try again!",
});

export default updateSubscriber;
