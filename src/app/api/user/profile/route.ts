import { fetchUserData } from "@/server/services";
import { NextResponse } from "next/server";

export async function GET() {
  const userData = await fetchUserData();
  if (userData) {
    return NextResponse.json(userData.user);
  }
  return NextResponse.json({ error: "Please login to proceed!" });
}
