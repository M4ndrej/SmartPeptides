// hooks/useChatLogic.ts
import { useEffect, useState, ChangeEvent, useCallback } from "react";
import Cookies from "js-cookie";
import {
  validateChatInput,
  validateOrderInput,
} from "@/helpers/chat_validation_schema";
import { useMessageHandler } from "@/hooks/useChatMessageHandler";
import { formatMessages } from "@/utils/chatUtils";
import { ChatOption, ChatMessageType } from "@/types/chat";
import { defaultChatMessage, defaultOrderMessage } from "@/data/chat_data";
import {
  sendMessageToConversation,
  sendOrderMessageToConversation,
} from "@/lib/chat_coversation";
import { useFetchChatMessages } from "./useFetchChatMessages";
import { ChannelType, MessagePayload, OrderMessagePayload } from "@/types/chat";
import { canonicalizeText, generateCustomId } from "@/helpers/chat_helpers";
interface useChatLogicProps {
  selectedChatOption: ChatOption | null;
  isChatWidgetOpen: boolean;
  selectedFile?: File | null;
  setSelectedFile?: (file: File | null) => void;
}

export const useChatLogic = ({
  selectedChatOption,
  isChatWidgetOpen,
  selectedFile,
  setSelectedFile,
}: useChatLogicProps) => {
  const channelType = selectedChatOption?.name as ChannelType | undefined;
  const isChat = channelType === ChannelType.Chat;
  const isOrder = channelType === ChannelType.Order;

  const { messages: chatMessages, appendMessages: appendChatMessages } =
    useMessageHandler([defaultChatMessage]);
  const { messages: orderMessages, appendMessages: appendOrderMessages } =
    useMessageHandler([defaultOrderMessage]);

  const [chatInput, setChatInput] = useState("");
  const [orderInput, setOrderInput] = useState({
    email: "",
    orderId: "",
    message: "",
    imageUrl: "",
  });

  const [isFirstOrderMessage, setIsFirstOrderMessage] = useState(
    !Cookies.get("orderConversationId")
  );

  const [chatConversationId, setChatConversationId] = useState<string | null>(
    Cookies.get("chatConversationId") || null
  );
  const [orderConversationId, setOrderConversationId] = useState<string | null>(
    Cookies.get("orderConversationId") || null
  );
  const [isChatUserCreated, setIsChatUserCreated] = useState(
    !!Cookies.get("chatUserId")
  );
  const [isOrderUserCreated, setIsOrderUserCreated] = useState(
    !!Cookies.get("orderUserId")
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | null>>(
    {}
  );

  const { messages: chatFetchedMessages, refresh: chatRefresh } =
    useFetchChatMessages(
      chatConversationId || "",
      isChat,
      isChatWidgetOpen,
      "chat"
    );
  const { messages: orderFetchedMessages, refresh: orderRefresh } =
    useFetchChatMessages(
      orderConversationId || "",
      isOrder,
      isChatWidgetOpen,
      "order"
    );

  useEffect(() => {
    if (chatFetchedMessages.length) {
      appendChatMessages(
        formatMessages(chatFetchedMessages, defaultChatMessage)
      );
    }
    if (orderFetchedMessages.length) {
      appendOrderMessages(
        formatMessages(orderFetchedMessages, defaultOrderMessage)
      );
    }
  }, [
    chatFetchedMessages,
    orderFetchedMessages,
    appendChatMessages,
    appendOrderMessages,
  ]);

  useEffect(() => {
    setFieldErrors({});
  }, [isChat]);

  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFieldErrors((prev) => ({ ...prev, [id]: null }));
      if (isChat) {
        setChatInput(value);
      } else if (isOrder) {
        setOrderInput((prev) => ({ ...prev, [id]: value }));
      }
    },
    [isChat, isOrder]
  );

  const handleSendMessage = useCallback(async () => {
    const validationResult = isChat
      ? validateChatInput({ message: chatInput })
      : isFirstOrderMessage
        ? validateOrderInput(orderInput)
        : validateChatInput({ message: orderInput.message });

    if (!validationResult.isValid) {
      setFieldErrors(
        Object.keys(validationResult.errors).reduce(
          (acc, key) => {
            acc[key] = validationResult.errors[key]?.[0] || null;
            return acc;
          },
          {} as Record<string, string | null>
        )
      );
      return;
    }
    setFieldErrors({});

    try {
      if (isChat) {
        const canonicalInput = canonicalizeText(chatInput);
        const clientId = generateCustomId();

        const newMessage: ChatMessageType = {
          clientId,
          userName: "Me",
          userImage: "/images/user.svg",
          messageText: canonicalInput,
          status: "sent",
          optimistic: true,
        };
        appendChatMessages([newMessage]);

        const payload: MessagePayload = {
          conversationId: chatConversationId!,
          userId: Cookies.get("chatUserId")!,
          message: chatInput,
          imageUrl: "",
          channelType: ChannelType.Chat,
        };

        await sendMessageToConversation(
          payload,
          setChatConversationId,
          setIsChatUserCreated,
          isChatUserCreated,
          chatRefresh
        );

        setChatInput("");
      } else if (isOrder) {
        if (isFirstOrderMessage) {
          const canonicalOrderMessage = canonicalizeText(orderInput.message);
          const clientId = generateCustomId();

          const newMessage: ChatMessageType = {
            clientId,
            userName: "Me",
            userImage: "/images/user.svg",
            messageText: canonicalOrderMessage,
            status: "sent",
            optimistic: true,
          };

          appendOrderMessages([newMessage]);

          const payload: OrderMessagePayload = {
            conversationId: orderConversationId || "",
            userId: Cookies.get("orderUserId") || "",
            message: orderInput.message,
            imageUrl: "",
            channelType: ChannelType.Order,
            email: orderInput.email,
            orderId: orderInput.orderId,
          };

          await sendOrderMessageToConversation(
            payload,
            setOrderConversationId,
            setIsOrderUserCreated,
            isOrderUserCreated,
            orderRefresh
          );

          setOrderInput((prev) => ({ ...prev, message: "", imageUrl: "" }));
          setIsFirstOrderMessage(false);
        } else {
          const canonicalOrderMessage = canonicalizeText(orderInput.message);
          const clientId = generateCustomId();

          const newOrderMessage: ChatMessageType = {
            clientId,
            userName: "Me",
            userImage: "/images/user.svg",
            messageText: canonicalOrderMessage,
            status: "sent",
            optimistic: true,
          };

          appendOrderMessages([newOrderMessage]);

          const payload: MessagePayload = {
            conversationId: orderConversationId!,
            userId: Cookies.get("orderUserId")!,
            message: orderInput.message,
            imageUrl: orderInput.imageUrl,
            channelType: ChannelType.Order,
          };

          await sendMessageToConversation(
            payload,
            setOrderConversationId,
            setIsOrderUserCreated,
            isOrderUserCreated,
            orderRefresh
          );

          setOrderInput((prev) => ({ ...prev, message: "", imageUrl: "" }));
        }
      }
    } catch (error) {
      const systemErrorMessage: ChatMessageType = {
        userName: defaultChatMessage.userName,
        userImage: defaultChatMessage.userImage,
        messageText:
          "An error occurred while sending the message. Please try again later.",
      };
      if (isChat) {
        appendChatMessages([systemErrorMessage]);
      } else if (isOrder) {
        appendOrderMessages([systemErrorMessage]);
      }
      if (isChat) setChatInput("");
      else setOrderInput((prev) => ({ ...prev, message: "", imageUrl: "" }));
    }
  }, [
    isChat,
    isOrder,
    chatInput,
    orderInput,
    isFirstOrderMessage,
    chatConversationId,
    orderConversationId,
    isChatUserCreated,
    isOrderUserCreated,
    sendMessageToConversation,
    sendOrderMessageToConversation,
    setChatConversationId,
    setIsChatUserCreated,
    setOrderConversationId,
    setIsOrderUserCreated,
    chatRefresh,
    orderRefresh,
    appendChatMessages,
    appendOrderMessages,
  ]);

  const handleSendImage = useCallback(
    async (file: File) => {
      if (!selectedFile) return;
      try {
        const formData = new FormData();
        formData.append("image", file);

        const uploadRes = await fetch("/api/chat/upload-image", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) throw new Error("Image upload failed");
        const { data } = await uploadRes.json();
        const imageUrl = data.url;

        if (setSelectedFile) {
          setSelectedFile(null);
        }

        if (isChat) {
          const payload: MessagePayload = {
            conversationId: chatConversationId!,
            userId: Cookies.get("chatUserId")!,
            message: "",
            imageUrl,
            channelType: ChannelType.Chat,
          };

          await sendMessageToConversation(
            payload,
            setChatConversationId,
            setIsChatUserCreated,
            isChatUserCreated,
            chatRefresh
          );

          setChatInput("");
        } else if (isOrder) {
          if (isFirstOrderMessage) {
            const payload: OrderMessagePayload = {
              conversationId: orderConversationId || "",
              userId: Cookies.get("orderUserId") || "",
              message: "",
              imageUrl: imageUrl,
              channelType: ChannelType.Order,
              email: orderInput.email,
              orderId: orderInput.orderId,
            };

            await sendOrderMessageToConversation(
              payload,
              setOrderConversationId,
              setIsOrderUserCreated,
              isOrderUserCreated,
              orderRefresh
            );

            setOrderInput((prev) => ({ ...prev, message: "", imageUrl: "" }));
            setIsFirstOrderMessage(false);
          } else {
            const payload: MessagePayload = {
              conversationId: orderConversationId!,
              userId: Cookies.get("orderUserId")!,
              message: orderInput.message,
              imageUrl,
              channelType: ChannelType.Order,
            };

            await sendMessageToConversation(
              payload,
              setOrderConversationId,
              setIsOrderUserCreated,
              isOrderUserCreated,
              orderRefresh
            );

            setOrderInput((prev) => ({ ...prev, message: "", imageUrl: "" }));
          }
        }
      } catch (error) {
        const systemErrorMessage: ChatMessageType = {
          userName: defaultChatMessage.userName,
          userImage: defaultChatMessage.userImage,
          messageText:
            "An error occurred while sending the image. Please try again later.",
          status: "read",
        };
        if (isChat) {
          appendChatMessages([systemErrorMessage]);
        } else if (isOrder) {
          appendOrderMessages([systemErrorMessage]);
        }
      }
    },
    [
      isChat,
      isOrder,
      selectedFile,
      chatConversationId,
      orderConversationId,
      isChatUserCreated,
      isOrderUserCreated,
      sendMessageToConversation,
      sendOrderMessageToConversation,
      setChatConversationId,
      setIsChatUserCreated,
      setOrderConversationId,
      setIsOrderUserCreated,
      chatRefresh,
      orderRefresh,
      appendChatMessages,
      appendOrderMessages,
      orderInput.email,
      orderInput.orderId,
    ]
  );

  return {
    chatMessages,
    orderMessages,
    chatInput,
    orderInput,
    handleInput,
    handleSendMessage,
    handleSendImage,
    fieldErrors,
    setFieldErrors,
    isFirstOrderMessage,
  };
};
