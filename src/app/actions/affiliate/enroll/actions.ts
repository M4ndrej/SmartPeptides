"use server";

import { ActionFactory } from "@/helpers/server_actions";
import { cookies } from "next/headers";
import { z } from "zod";

const enrollValidation = z
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

const enrollUser = ActionFactory({
  validator: enrollValidation,
  queryKey: "myaffiliate/v2/enroll",
  errorMessage: "Cannot enroll user this time, please try again!",
  includeCookie: true,
  dontAddKeys: true,
  onSuccess: () => {
    const cookieData = cookies();
    const loggedUser = JSON.parse(cookieData.get("loggedUser")?.value ?? "{}");
    loggedUser.user.has_affiliate = true;
    cookieData.set("loggedUser", JSON.stringify(loggedUser));
    return {
      success: true,
    };
  },
});

export default enrollUser;
