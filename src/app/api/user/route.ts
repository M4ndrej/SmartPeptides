import moment from "moment";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieData = cookies();
  const loggedUser = cookieData.get("loggedUser");
  const wpLoggedIn = cookieData.get(`${process.env.WP_LOGGED_IN}`);

  if (!loggedUser || !wpLoggedIn) {
    return NextResponse.json({ error: true });
  }

  try {
    const userData = JSON.parse(loggedUser.value);
    const cookieExpiration = userData.cookie.split("|");
    if (moment(+`${cookieExpiration[1]}000`).isBefore()) {
      return NextResponse.json({ error: true });
    }

    return NextResponse.json(userData);
  } catch (e) {
    console.error((e as Error)?.message);
    return NextResponse.json({ error: true });
  }
}
