// lib/chat_conversation.ts
import Cookies from "js-cookie";
import { parseUserCookie } from "@/utils/chatUtils";
import { ChannelType, MessagePayload, OrderMessagePayload } from "@/types/chat";

const userInfo = parseUserCookie();
const firstName = userInfo?.user?.username || "";

export const sendMessageToConversation = async (
  payload: MessagePayload,
  setConversationId: (conversationId: string) => void,
  setIsUserCreated: (isUserCreated: boolean) => void,
  isUserCreated: boolean,
  refresh: () => void
) => {
  const {
    conversationId,
    userId,
    message,
    imageUrl = "",
    channelType,
  } = payload;

  if (!isUserCreated) {
    // Create User
    const userResponse = await fetch("/api/chat/create-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...(firstName && { first_name: firstName }),
      }),
    });
    const userData = await userResponse.json();
    Cookies.set(`${channelType}UserId`, userData.userId, {
      expires: 7,
      secure: true,
      sameSite: "Lax",
      path: "/",
    });

    // Create Conversation
    const conversationBody: any = {
      userId: userData.userId,
      channelType: channelType,
    };

    if (channelType === "order") {
      const orderPayload = payload as OrderMessagePayload;
      conversationBody.email = orderPayload.email;
      conversationBody.orderId = orderPayload.orderId;
      conversationBody.message = message;
      conversationBody.imageUrl = imageUrl || "";
    } else {
      conversationBody.message = message;
      conversationBody.imageUrl = imageUrl || "";
    }

    const conversationResponse = await fetch("/api/chat/create-conversation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(conversationBody),
    });
    const conversationData = await conversationResponse.json();

    Cookies.set(
      `${channelType}ConversationId`,
      conversationData.conversationId,
      {
        expires: 7,
        secure: true,
        sameSite: "Lax",
        path: "/",
      }
    );
    setConversationId(conversationData.conversationId);
    setIsUserCreated(true);

    // Optionally send the initial message
    // if (channelType === ChannelType.Chat && message.trim() !== "") {
    //   const initialPayload: MessagePayload = {
    //     conversationId: conversationData.conversationId,
    //     userId: userData.userId,
    //     message,
    //     imageUrl: "",
    //     channelType: ChannelType.Chat,
    //   };
    //   await sendMessageToConversation(
    //     initialPayload,
    //     setConversationId,
    //     setIsUserCreated,
    //     true,
    //     refresh
    //   );
    // }
  } else {
    // Send Message (Text and/or Image)
    await fetch("/api/chat/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId,
        userId,
        message,
        imageUrl: imageUrl || "",
      }),
    });
  }

  refresh();
};

export const sendOrderMessageToConversation = async (
  orderPayload: OrderMessagePayload,
  setOrderConversationId: (orderConversationId: string) => void,
  setIsOrderUserCreated: (isOrderUserCreated: boolean) => void,
  isOrderUserCreated: boolean,
  orderRefresh: () => void
) => {
  const orderUserId = Cookies.get("orderUserId");
  const orderConversationId = Cookies.get("orderConversationId");

  const payload: OrderMessagePayload = {
    conversationId: orderConversationId || "",
    userId: orderUserId || "",
    message: orderPayload.message,
    imageUrl: orderPayload.imageUrl,
    channelType: ChannelType.Order,
    email: orderPayload.email,
    orderId: orderPayload.orderId,
  };

  await sendMessageToConversation(
    payload,
    setOrderConversationId,
    setIsOrderUserCreated,
    isOrderUserCreated,
    orderRefresh
  );
};
