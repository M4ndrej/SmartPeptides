import { hfetch } from "@/helpers/fetchers";
import { NextResponse } from "next/server";

export async function GET() {
  const cities = await hfetch(`${process.env.API_URL}/wc/v3/data/countries`);

  const data = await cities.json();

  return NextResponse.json(data);
}
