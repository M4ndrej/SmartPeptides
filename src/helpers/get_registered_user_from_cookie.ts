import { RegisteredUser } from "@/types/user";

export const getRegisteredUserFromCookie = (cookieValue?: string) => {
  if (!cookieValue) return undefined;
  const regCookieData = cookieValue.split("|");

  return {
    username: regCookieData?.[1] ?? "",
    email: regCookieData?.[2] ?? "",
    password: "",
  } as RegisteredUser;
};
