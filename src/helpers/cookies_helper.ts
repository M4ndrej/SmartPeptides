import { LoggedUserData } from "@/types/user";
import moment from "moment";
import { cookies } from "next/headers";

export const getUserDataFromCookie = () => {
  const cookieData = cookies();
  const loggedUser = cookieData.get("loggedUser");
  if (!loggedUser) return undefined;

  try {
    const user = JSON.parse(loggedUser.value);
    const cookieExpiration = user.cookie.split("|");
    if (moment(+`${cookieExpiration[1]}000`).isBefore()) {
      return undefined;
    }

    return user as LoggedUserData;
  } catch (error) {
    return undefined;
  }
};
