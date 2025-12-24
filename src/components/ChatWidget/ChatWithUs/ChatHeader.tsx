import React from "react";
import ContentCard from "../Common/ContentCard";
import { ChatOption } from "@/types/chat";
import { chatOptions } from "@/data/chat_data";

interface ChatHeaderProps {
  setSelectedChatOption: (option: ChatOption) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ setSelectedChatOption }) => {
  return (
    <div>
      <div className="bg-[#FFE9E3] p-[16px] dark:bg-transparent">
        <div className="font-14px-ALL font-bold">Chat with us</div>
      </div>
      <div>
        {[0, 1].map((index) => (
          <React.Fragment key={index}>
            <ContentCard
              chatOption={chatOptions[index]}
              onClick={() => setSelectedChatOption(chatOptions[index])}
            />
            {index === 0 && (
              <div className="mx-[16px] h-[1px] bg-borderColor"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ChatHeader;
