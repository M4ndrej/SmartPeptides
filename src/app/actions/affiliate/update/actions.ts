"use server";

import { ActionFactory } from "@/helpers/server_actions";
import { z } from "zod";

const updateValidation = z
  .object({
    name: z.string().min(2),
    address: z.string().min(2),
    payment_method: z.enum(["store_credit", "ach", "cashapp", "zelle"]),
    account_holder_name: z.string().optional(),
    account_number: z.string().optional(),
    routing_number: z.string().optional(),
    cash_app_name: z.string().optional(),
    cash_app_tag: z.string().optional(),
    zelle_name: z.string().optional(),
    zelle_email: z.string().optional(),
    zelle_phone: z.string().optional(),
  })
  .refine(
    (data) => {
      switch (data.payment_method) {
        case "ach":
          return (
            data.account_holder_name &&
            data.account_number &&
            data.routing_number
          );
        case "cashapp":
          return data.cash_app_name && data.cash_app_tag;
        case "zelle":
          return data.zelle_name && (data.zelle_email || data.zelle_phone);
        default:
          return true;
      }
    },
    {
      message: "Please fill all the required fields",
      path: ["payment_method"],
    }
  );

const updateAffiliate = ActionFactory({
  validator: updateValidation,
  queryKey: "myaffiliate/v2/update",
  errorMessage: "Cannot update affiliate this time, please try again!",
  includeCookie: true,
  dontAddKeys: true,
});

export default updateAffiliate;
