"use server";
import { cookies } from "next/headers";

export default async function getLoggedUser() {
  const loggedUser = cookies().get("loggedUser");
  if (!loggedUser) {
    return {
      error: true,
    };
  }

  return {
    message: JSON.parse(loggedUser.value),
  };
}
