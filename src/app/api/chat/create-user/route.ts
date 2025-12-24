import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { first_name } = await req.json();

  const FRESHCHAT_API_KEY = process.env.FRESHCHAT_API_KEY;
  const FRESHCHAT_BASE_URL = process.env.FRESHCHAT_BASE_URL;

  try {
    const userResponse = await fetch(`${FRESHCHAT_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${FRESHCHAT_API_KEY}`,
      },
      body: JSON.stringify({
        first_name,
      }),
    });
    const userData = await userResponse.json();
    if (!userResponse.ok) {
      return NextResponse.json(
        { error: userData },
        { status: userResponse.status }
      );
    }
    return NextResponse.json({ userId: userData.id }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
