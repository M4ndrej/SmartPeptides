import { hfetch } from "@/helpers/fetchers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const _firstName = searchParams.get("_firstName");
  const _lastName = searchParams.get("_lastName");
  const _phoneNumber = searchParams.get("_phoneNumber");
  const _email = searchParams.get("_email");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      _firstName,
      _lastName,
      _phoneNumber,
      _email,
    }),
    redirect: "follow",
  };

  const res = await hfetch(
    `${process.env.API_URL}/myaffiliate/v2/register`,
    requestOptions
  );
  const result = await res.json();

  return NextResponse.json(result);
}
