"use server";

import { ActionFactory } from "@/helpers/server_actions";
import { z } from "zod";

const requestCashoutValdation = z.object({
  amount: z
    .string()
    .refine((val) => !isNaN(+val), { message: "Expected a number!" }),
});

const requestCashout = ActionFactory({
  validator: requestCashoutValdation,
  queryKey: "myaffiliate/v2/request_cashout",
  includeCookie: true,
  errorMessage: "Cannot request cashout this time, please try again!",
});

export default requestCashout;
