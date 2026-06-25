import { ChatMessageType, ChatOption } from "@/types/chat";

export const chatOptions: ChatOption[] = [
  {
    name: "chat",
    chatheadBgColor: "bg-[#9A9A9F]2",
    chatheadLetter: "C",
    title: "Chat with us",
    text: "Hello there! Need help? Reac...",
  },
  {
    name: "order",
    chatheadBgColor: "bg-darkgray",
    chatheadLetter: "O",
    title: "Order status and tracking",
    text: "Hi! We are here to help you ...",
  },
  {
    name: "faq",
    chatheadBgColor: "bg-red2",
    chatheadLetter: "F",
    title: "FAQ",
  },
];

export const defaultChatMessage: ChatMessageType = {
  userName: "Smart Peptides",
  userImage: "/images/chat-logo.svg",
  messageText:
    "Hello there! Need help? Reach out to us right here, and we'll get back to you as soon as we can!",
};

export const defaultOrderMessage: ChatMessageType = {
  userName: "Smart Peptides",
  userImage: "/images/chat-logo.svg",
  messageText:
    "We are currently away. Please leave a message and our team will reach out to you at the earliest.",
};
