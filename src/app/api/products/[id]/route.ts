import { fetchProductById } from "@/server/services";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const productId = +params.id;
  if (!productId) {
    return NextResponse.json(
      { error: "Product ID is required and should be a number." },
      { status: 400 }
    );
  }

  try {
    const product = await fetchProductById(productId);
    return NextResponse.json(product);
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
