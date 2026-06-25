"use client";
import { ChatOption } from "@/types/chat";
import { FC } from "react";

interface ContentCardProps {
  chatOption: ChatOption;
  onClick: () => void;
}

const ContentCard: FC<ContentCardProps> = ({ chatOption, onClick }) => {
  return (
    <>
      <div
        className="m-[2px] flex cursor-pointer items-center gap-x-[8px] rounded-[5px] p-[14px] transition-all duration-300 hover:bg-lightgray"
        onClick={onClick}
      >
        <div
          className={`flex h-[32px] w-[32px] items-center justify-center rounded-[5px] ${
            chatOption.chatheadBgColor
              ? `${chatOption.chatheadBgColor}`
              : "bg-[#9A9A9F]2"
          }`}
        >
          <div className="font-medium text-black">
            {chatOption.chatheadLetter}
          </div>
        </div>
        <div>
          <div className="font-12px-ALL font-bold">{chatOption.title}</div>
          {chatOption.text && (
            <div className="text-[11px] leading-[14px] text-gray2">
              {chatOption.text}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ContentCard;
