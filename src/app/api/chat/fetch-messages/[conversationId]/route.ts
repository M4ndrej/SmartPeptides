// api/chat/fetch-messages/[conversationId]/route.ts
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { conversationId: string } }
) {
  const { conversationId } = params;
  const FRESHCHAT_API_KEY = process.env.FRESHCHAT_API_KEY;
  const FRESHCHAT_BASE_URL = process.env.FRESHCHAT_BASE_URL;

  try {
    const messagesResponse = await fetch(
      `${FRESHCHAT_BASE_URL}/conversations/${conversationId}/messages`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${FRESHCHAT_API_KEY}`,
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!messagesResponse.ok) {
      throw new Error("Failed to fetch messages");
    }

    const messageData = await messagesResponse.json();

    const messages = messageData.messages.flatMap((msg: any) => {
      const isRead = msg.actor_type === "agent" || msg.actor_type === "system";
      let messageText = "";
      let messageImage = "";
      // let messageFile: any = null;

      if (Array.isArray(msg.message_parts)) {
        for (const part of msg.message_parts) {
          if (part.text?.content) {
            messageText = part.text.content;
          } else if (part.image?.url) {
            messageImage = part.image.url;
            break;
          }
          //  else if (part.file) {
          //   const rawExtension = part.file.file_extension || "";
          //   const cleanedExtension = rawExtension.startsWith(".")
          //     ? rawExtension.slice(1)
          //     : rawExtension;

          //   messageFile = {
          //     file_name: part.file.name,
          //     file_extension_type: cleanedExtension,
          //     file_size: part.file.file_size_in_bytes,
          //     file_hash: part.file.fileHash,
          //     file_content_type: part.file.contentType,
          //     url: part.file.url,
          //   };
          // }
        }
      }

      if (!messageText && !messageImage) {
        return [];
      }

      const userName = msg.actor_type === "user" ? "Me" : "Agent";
      const userImage =
        msg.actor_type === "user" ? "/images/user.svg" : "/images/agent.svg";

      return [
        {
          actor_type: msg.actor_type,
          userName,
          userImage,
          messageText,
          messageImage,
          // messageFile,
          status: isRead ? "read" : "delivered",
        },
      ];
    });

    return NextResponse.json({ messages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
