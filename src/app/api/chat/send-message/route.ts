import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { conversationId, userId, message, imageUrl } = await req.json();

  const FRESHCHAT_API_KEY = process.env.FRESHCHAT_API_KEY;
  const FRESHCHAT_BASE_URL = process.env.FRESHCHAT_BASE_URL;

  try {
    const messageParts: any[] = [];

    if (message && message.trim() !== "") {
      messageParts.push({
        text: {
          content: message,
        },
      });
    }

    if (imageUrl && imageUrl.trim() !== "") {
      messageParts.push({
        image: {
          url: imageUrl,
        },
      });
    }

    if (messageParts.length === 0) {
      return NextResponse.json(
        { error: "No message content provided." },
        { status: 400 }
      );
    }

    const sendMessageResponse = await fetch(
      `${FRESHCHAT_BASE_URL}/conversations/${conversationId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${FRESHCHAT_API_KEY}`,
        },
        body: JSON.stringify({
          message_parts: messageParts,
          message_type: "normal",
          actor_type: "user",
          actor_id: userId,
        }),
      }
    );

    const sendMessageData = await sendMessageResponse.json();

    if (!sendMessageResponse.ok) {
      return NextResponse.json(
        { error: sendMessageData.message },
        { status: sendMessageResponse.status }
      );
    }

    return NextResponse.json(
      { success: true, status: "sent" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
