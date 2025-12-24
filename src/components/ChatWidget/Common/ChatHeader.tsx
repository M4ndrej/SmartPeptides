"use client";
import { FC } from "react";

interface ChatHeaderProps {
  chatTitle?: string;
  showStatus?: boolean;
  onBackButton: () => void;
}

const ChatHeader: FC<ChatHeaderProps> = ({
  chatTitle,
  showStatus,
  onBackButton,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-x-[8px]">
        <div
          className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[3px] bg-[#E7461E] hover:bg-[#E7461E]"
          onClick={onBackButton}
        >
          <svg
            width="7"
            height="13"
            viewBox="0 0 7 13"
            fill="none"
            className="mr-[2px]"
          >
            <path
              d="M6 1L1 6.5L6 12"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {chatTitle ? (
          <div className="flex flex-col gap-y-[2px]">
            <div className="font-12px-ALL font-bold text-textWhite">
              {chatTitle}
            </div>
            {showStatus ? (
              <div className="text-[11px] leading-[14px] text-textWhite">
                Typically replies within 4 minutes
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
