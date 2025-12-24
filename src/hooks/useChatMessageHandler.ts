import { useState, useCallback } from "react";
import { ChatMessageType } from "@/types/chat";
import { canonicalizeText } from "@/helpers/chat_helpers";

const filterUniqueMessages = (
  newMessages: ChatMessageType[],
  existingMessages: ChatMessageType[]
): ChatMessageType[] => {
  const generateMessageKey = (msg: ChatMessageType): string =>
    `${canonicalizeText(msg.messageText || "")}-${msg.messageImage || ""}-${msg.userName}`;

  const messageMap = new Map<string, ChatMessageType>();
  existingMessages.forEach((msg) => {
    const key = generateMessageKey(msg);
    messageMap.set(key, msg);
  });
  newMessages.forEach((newMsg) => {
    const key = generateMessageKey(newMsg);
    const existingMsg = messageMap.get(key);
    if (existingMsg) {
      messageMap.set(key, { ...existingMsg, ...newMsg, optimistic: false });
    } else {
      messageMap.set(key, newMsg);
    }
  });

  return Array.from(messageMap.values());
};

export const useMessageHandler = (initialState: ChatMessageType[]) => {
  const [messages, setMessages] = useState<ChatMessageType[]>(initialState);
  const appendMessages = useCallback((newMessages: ChatMessageType[]) => {
    setMessages((prevMessages) =>
      filterUniqueMessages(newMessages, prevMessages)
    );
  }, []);

  const clearMessages = useCallback(() => {
    setMessages(initialState);
  }, [initialState]);

  return { messages, appendMessages, clearMessages };
};
