"use server";

import { ActionFactory } from "@/helpers/server_actions";
import { z } from "zod";

const setGuestCodeValidation = z.object({
  email: z.string().email(),
});

const setGuestCode = ActionFactory({
  validator: setGuestCodeValidation,
  queryKey: "myauth/v2/set_unverified_guest_code",
  errorMessage: "Cannot set code this time, please try again!",
});

export default setGuestCode;
