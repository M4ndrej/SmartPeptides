import moment from "moment";
import { cookies } from "next/headers";

export const isUserLoggedIn = () => {
  const cookieData = cookies();

  try {
    const loggedUser = cookieData.get("loggedUser");
    const isWPLoggedIn = cookieData.get(`${process.env.WP_LOGGED_IN}`);
    if (loggedUser && isWPLoggedIn) {
      const user = JSON.parse(loggedUser.value);
      const cookieExpiration = user.cookie.split("|");

      return moment(+`${cookieExpiration[1]}000`).isAfter() ? user : null;
    }

    cookieData.delete("loggedUser");
    cookieData.delete(`${process.env.WP_LOGGED_IN}`);
    return null;
  } catch (e) {
    return null;
  }
};
