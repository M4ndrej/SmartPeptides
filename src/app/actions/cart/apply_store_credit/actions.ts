"use server";

import { ActionFactory } from "@/helpers/server_actions";
import { z } from "zod";

const applyCreditValidation = z.object({
  amount: z
    .string()
    .refine((val) => !isNaN(+val), { message: "Expected a number!" }),
});

const applyStoreCredit = ActionFactory({
  validator: applyCreditValidation,
  queryKey: "mycart/v2/apply_credit",
  errorMessage: "Cannot apply credit this time, please try again!",
  includeCookie: true,
  dontAddKeys: true,
});

export default applyStoreCredit;
