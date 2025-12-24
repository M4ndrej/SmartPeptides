// api/chat/send-file-message/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { conversationId, userId, fileData } = await req.json();

  if (
    !conversationId ||
    !userId ||
    !fileData ||
    !fileData.fileHash ||
    !fileData.name ||
    !fileData.url ||
    !fileData.file_size_in_bytes ||
    !fileData.contentType ||
    !fileData.file_extension
  ) {
    return NextResponse.json(
      { error: "Missing required file fields" },
      { status: 400 }
    );
  }

  const FRESHCHAT_API_KEY = process.env.FRESHCHAT_API_KEY!;
  const FRESHCHAT_BASE_URL = process.env.FRESHCHAT_BASE_URL!;

  const messageBody = {
    message_parts: [
      {
        file: {
          fileHash: fileData.fileHash,
          fileSource: fileData.fileSource || "FRESHCHAT",
          name: fileData.name,
          url: fileData.url,
          file_size_in_bytes: fileData.file_size_in_bytes,
          contentType: fileData.contentType,
          file_extension: fileData.file_extension,
        },
      },
    ],
    message_type: "normal",
    actor_type: "user",
    actor_id: userId,
  };

  const sendMessageResponse = await fetch(
    `${FRESHCHAT_BASE_URL}/conversations/${conversationId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${FRESHCHAT_API_KEY}`,
      },
      body: JSON.stringify(messageBody),
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
    { success: true, message: sendMessageData },
    { status: 200 }
  );
}
