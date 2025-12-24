// api/chat/upload-file/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const FRESHCHAT_API_KEY = process.env.FRESHCHAT_API_KEY!;
  const FRESHCHAT_BASE_URL = process.env.FRESHCHAT_BASE_URL!;

  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  const uploadResponse = await fetch(`${FRESHCHAT_BASE_URL}/files/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${FRESHCHAT_API_KEY}`,
    },
    body: formData,
  });

  if (!uploadResponse.ok) {
    const errorData = await uploadResponse.json();
    return NextResponse.json(
      { error: errorData },
      { status: uploadResponse.status }
    );
  }

  const data = await uploadResponse.json();

  return NextResponse.json({ data }, { status: 200 });
}
