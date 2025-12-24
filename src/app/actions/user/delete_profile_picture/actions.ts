"use server";
import { ActionFactory } from "@/helpers/server_actions";
import { z } from "zod";

const deleteProfilePictureValidation = z.object({});

const deleteProfilePicture = ActionFactory({
  validator: deleteProfilePictureValidation,
  queryKey: "myauth/v2/delete_profile_picture",
  method: "DELETE",
  includeCookie: true,
  errorMessage: "Cannot delete profile picture this time, please try again!",
});

export default deleteProfilePicture;
