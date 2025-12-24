import { ChatMessageType } from "@/types/chat";
import Cookies from "js-cookie";

export const formatMessages = (
  messages: {
    actor_type: string;
    messageText: string;
    messageImage?: string;
    messageFile?: {
      file_name: string;
      file_extension_type: string;
      file_size: number;
      file_hash: string;
      file_content_type: string;
      url: string; // ensure we have url here as well
    };
    status?: string;
  }[],
  defaultUser: { userName: string; userImage: string }
): ChatMessageType[] => {
  return messages
    .map((msg) => ({
      userName:
        msg.actor_type === "agent" || msg.actor_type === "system"
          ? defaultUser.userName
          : "Me",
      userImage:
        msg.actor_type === "agent" || msg.actor_type === "system"
          ? defaultUser.userImage
          : "/images/user.svg",
      messageText: msg.messageText,
      messageImage: msg.messageImage || "",
      messageFile: msg.messageFile || undefined,
      status: msg.status,
    }))
    .reverse();
};

export const parseUserCookie = () => {
  const regCookieData = Cookies.get("loggedUser");
  if (regCookieData) {
    try {
      return JSON.parse(regCookieData);
    } catch (error) {
      console.error("Error parsing loggedUser cookie:", error);
      return null;
    }
  }
  return null;
};
