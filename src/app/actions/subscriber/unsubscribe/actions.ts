"use server";

import { ActionFactory } from "@/helpers/server_actions";
import { z } from "zod";

const unsubscribeValidation = z.object({
  email: z.string().email(),
  code: z.string().min(5).max(30),
});

const unsubscribeSubscriber = ActionFactory({
  validator: unsubscribeValidation,
  method: "DELETE",
  queryKey: "mysubscriber/v2/unsubscribe",
  errorMessage: "Cannot unsubscribe this time, please try again!",
});

export default unsubscribeSubscriber;
