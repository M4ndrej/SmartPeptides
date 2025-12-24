"use server";
import { ActionFactory } from "@/helpers/server_actions";
import { cookies } from "next/headers";
import { z } from "zod";

const deleteProfileValidation = z.object({});

const deleteProfile = ActionFactory({
  validator: deleteProfileValidation,
  method: "DELETE",
  queryKey: "myauth/v2/delete_profile",
  includeCookie: true,
  errorMessage: "Cannot delete profile this time, please try again!",
  onSuccess: () => {
    const cookieData = cookies();
    cookieData.delete(`${process.env.WP_LOGGED_IN}`);
    cookieData.delete(`${process.env.WC_SESSION}`);
    cookieData.delete("woocommerce_cart_hash");
    cookieData.delete("woocommerce_items_in_cart");
    cookieData.delete("Nonce-Cart");
    cookieData.delete("loggedUser");
    return {
      success: true,
    };
  },
  dontAddKeys: true,
});

export default deleteProfile;
