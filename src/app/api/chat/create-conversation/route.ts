import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { userId, message, imageUrl, channelType, email, orderId } =
    await req.json();

  const FRESHCHAT_API_KEY = process.env.FRESHCHAT_API_KEY;
  const FRESHCHAT_BASE_URL = process.env.FRESHCHAT_BASE_URL;

  try {
    const channelResponse = await fetch(`${FRESHCHAT_BASE_URL}/channels`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${FRESHCHAT_API_KEY}`,
        Accept: "application/json",
      },
    });

    const channelsData = await channelResponse.json();
    if (
      !channelsData ||
      !channelsData.channels ||
      channelsData.channels.length === 0
    ) {
      return NextResponse.json(
        { error: "No channels available" },
        { status: channelResponse.status }
      );
    }

    const channelId =
      channelType === "order"
        ? channelsData.channels[1].id
        : channelsData.channels[0].id;

    const initialMessageParts: any[] = [];

    if (channelType === "order") {
      initialMessageParts.push(
        { text: { content: `Email: ${email}` } },
        { text: { content: `Order ID: ${orderId}` } }
      );
    }

    if (imageUrl) {
      initialMessageParts.push({ image: { url: imageUrl } });
    } else if (message) {
      initialMessageParts.push({ text: { content: message } });
    }

    const conversationResponse = await fetch(
      `${FRESHCHAT_BASE_URL}/conversations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${FRESHCHAT_API_KEY}`,
        },
        body: JSON.stringify({
          messages: [
            {
              message_parts: initialMessageParts,
              channel_id: channelId,
              message_type: "normal",
              actor_type: "user",
              actor_id: userId,
            },
          ],
          channel_id: channelId,
          users: [{ id: userId }],
        }),
      }
    );

    const conversationData = await conversationResponse.json();
    if (!conversationResponse.ok) {
      return NextResponse.json(
        { error: conversationData.message },
        { status: conversationResponse.status }
      );
    }

    return NextResponse.json(
      { conversationId: conversationData.conversation_id },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
