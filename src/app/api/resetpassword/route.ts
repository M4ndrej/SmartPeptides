import { globalFetcher } from "@/helpers/server_fetchers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const usernameOrEmail = searchParams.get("user_login");

  const timeLine = new Date().getTime();
  try {
    const res = await globalFetcher({
      url: `${process.env.API_MAIN}/api/user/retrieve_password/?v=${timeLine}&user_login=${usernameOrEmail}`,
      method: "GET",
      apiType: "user",
    });

    const data = await res.json();

    if (data.status == "error") {
      data.error = "Username or email is wrong";
    }

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      {
        error: "Username or email is wrong",
        message: "Username or email is wrong",
      },
      {
        status: 500,
        statusText: "INTERVAL SERVER ERROR",
      }
    );
  }
}
