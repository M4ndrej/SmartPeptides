"use server";

import { ActionFactory } from "@/helpers/server_actions";
import { z } from "zod";

const registerValidation = z.object({
  email: z.string().email(),
  username: z.string().optional(),
});

const registerSubscriber = ActionFactory({
  validator: registerValidation,
  queryKey: "mysubscriber/v2/register",
  additionalFields: {
    list_name: "peptide_shop",
  },
  includeUTMCookie: true,
  errorMessage: "Cannot register subscription this time, please try again!",
});

export default registerSubscriber;
