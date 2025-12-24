"use server";

import { ActionFactory } from "@/helpers/server_actions";
import { cookies } from "next/headers";
import { z } from "zod";

const checkEmailValidation = z.object({
  email: z.string().email(),
});

const checkGuestEmail = ActionFactory({
  validator: checkEmailValidation,
  queryKey: "myauth/v2/check_guest_email",
  errorMessage: "Cannot check email this time, please try again!",
  onSuccess: (data) => {
    const cookieData = cookies();
    cookieData.delete("verifiedEmail");
    return {
      success: true,
      additional: {
        existing_email: !!data?.existing_email,
      },
    };
  },
  dontAddKeys: true,
});

export default checkGuestEmail;
