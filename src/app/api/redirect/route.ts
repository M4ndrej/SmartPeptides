import { NextRequest, NextResponse } from "next/server";
import { encryptPayload } from "@/utils/encryption";
import { validateRedirectUrl } from "@/helpers/validate_redirect_url";

export async function GET(req: NextRequest) {
  const target = req.nextUrl.searchParams.get("url");
  const baseUrl = process.env.STRIPE_REDIRECT_BASE_URL;

  if (!target) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!baseUrl) {
    return NextResponse.json(
      { error: "Service temporarily unavailable" },
      { status: 500 }
    );
  }

  try {
    validateRedirectUrl(target, baseUrl);
    const res = NextResponse.redirect(target);
    res.headers.set("Referrer-Policy", "no-referrer");
    return res;
  } catch (error) {
    return NextResponse.json(
      {
        error: "Invalid request",
      },
      { status: 400 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, order_id, amount } = await req.json();
    const baseUrl = process.env.STRIPE_REDIRECT_BASE_URL;

    if (!email || !order_id || !amount) {
      return NextResponse.json(
        { error: "Invalid request parameters" },
        { status: 400 }
      );
    }

    if (!baseUrl) {
      return NextResponse.json(
        { error: "Service temporarily unavailable" },
        { status: 500 }
      );
    }

    const encryptedPayload = encryptPayload({ email, order_id, amount });
    const redirectUrl = `${baseUrl}?payload=${encodeURIComponent(encryptedPayload)}`;

    validateRedirectUrl(redirectUrl, baseUrl);

    return NextResponse.json({ redirectUrl });
  } catch (error) {
    console.error("Payment redirect error:", error);
    return NextResponse.json(
      { error: "Payment processing error" },
      { status: 500 }
    );
  }
}
