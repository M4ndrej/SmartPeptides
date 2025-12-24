import { isSpecificProductsUser } from "@/server/services";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const specProdUser = await isSpecificProductsUser();
  if (!specProdUser) {
    return NextResponse.json({ error: true }, { status: 401 });
  }
  return NextResponse.json(specProdUser);
}
