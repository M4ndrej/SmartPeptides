export interface ChatOption {
  name: string;
  chatheadBgColor: string;
  chatheadLetter: string;
  title: string;
  text?: string;
}

export interface ChatMessageType {
  clientId?: string;
  userName: string;
  userImage: string;
  messageText?: string;
  status?: string;
  messageImage?: string;
  messageFile?: {
    file_name: string;
    file_extension_type: string; // no dot here
    file_size: number;
    file_hash: string;
    file_content_type: string;
    url: string; // Add this field for the file URL
  };
  optimistic?: boolean;
}

export interface ChatToggleButtonProps {
  isChatWidgetOpen: boolean;
  setIsChatWidgetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface WidgetContainerProps {
  isChatWidgetOpen: boolean;
  children?: React.ReactNode;
}

export enum ChannelType {
  Chat = "chat",
  Order = "order",
}

export interface MessagePayload {
  conversationId: string;
  userId: string;
  message: string;
  imageUrl?: string;
  channelType: ChannelType;
}

export interface OrderMessagePayload extends MessagePayload {
  email: string;
  orderId: string;
}
