"use client";
import { FC, useState } from "react";
import Image from "next/image";
import { ChatMessageType } from "@/types/chat";
import classNames from "classnames";
import { createPortal } from "react-dom";
import useIsClientRender from "@/hooks/useIsClientRender";
import ChatImageModal from "../ChatImageModal/ChatImageModal";

export interface ChatMessageProps {
  chatMessage: ChatMessageType;
  alignRight?: boolean;
}

const MessageList: FC<ChatMessageProps> = ({ chatMessage, alignRight }) => {
  const isImageMessage = !!chatMessage.messageImage;
  const isClient = useIsClientRender();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownload = async (url: string) => {
    try {
      const downloadLink = document.createElement("a");
      downloadLink.href = `/api/chat/download-image?imageUrl=${encodeURIComponent(url)}`;
      downloadLink.download = "image.png";
      downloadLink.target = "_blank";
      downloadLink.click();
    } catch (error) {
      console.error("Error triggering the download:", error);
    }
  };

  return (
    <>
      <div
        className={`flex items-start gap-x-[8px] px-4 py-2  ${
          alignRight ? "justify-end" : "justify-start"
        }`}
      >
        <Image
          src={chatMessage.userImage}
          width={24}
          height={22}
          alt="User image"
          className={`${alignRight ? "order-2" : "order-1"}`}
        />
        <div
          className={`flex flex-col gap-y-[2px] ${
            alignRight ? "order-1" : "order-2"
          }`}
        >
          <div
            className={`font-12px-ALL uppercase text-gray2 ${
              alignRight ? "text-right" : "text-left"
            }`}
          >
            {chatMessage.userName}
          </div>
          <div
            className={classNames(
              "font-12px-ALL whitespace-normal break-words rounded-[20px] px-[14px] py-[12px]",
              alignRight
                ? "rounded-tr-[4px] bg-[#333333] text-textWhite"
                : "rounded-tl-[4px] bg-lightgray",
              isImageMessage &&
                "cursor-pointer !rounded-none !bg-white !px-0 !py-0",
              chatMessage.messageFile &&
                "cursor-pointer !rounded-none !bg-white !px-0 !py-0"
            )}
          >
            {isImageMessage ? (
              <div className={`flex gap-[8px] `}>
                <button
                  onClick={() =>
                    chatMessage.messageImage &&
                    handleDownload(chatMessage.messageImage)
                  }
                  className={`download hover:text-[#333333] ${alignRight ? "order-1" : "order-2"}`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray2 hover:text-[#333333]"
                  >
                    <path
                      d="M4 16.004V17C4 17.7956 4.33583 18.5587 4.9336 19.1213C5.53137 19.6839 6.34212 20 7.1875 20H17.8125C18.6579 20 19.4686 19.6839 20.0664 19.1213C20.6642 18.5587 21 17.7956 21 17V16M12.5 4.5V15.5M12.5 15.5L16.2188 12M12.5 15.5L8.78125 12"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <Image
                  priority
                  src={chatMessage.messageImage as string}
                  alt="Sent image"
                  width={125}
                  height={132}
                  className={`rounded-[5px] ${
                    alignRight ? "order-2" : "order-1"
                  }`}
                  onClick={() => setIsModalOpen(true)}
                />
              </div>
            ) : (
              chatMessage.messageText
            )}
          </div>
          {alignRight && (
            <div className="flex justify-end">
              {/* <div className="group relative"> */}
              <Image
                src={
                  chatMessage.status === "sent"
                    ? "/images/message_sent.png"
                    : "/images/message_seen.png"
                }
                width={16}
                height={8}
                alt="Message status"
              />
            </div>
          )}
        </div>
      </div>
      {isClient &&
        createPortal(
          <ChatImageModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            imageURL={chatMessage.messageImage}
          />,
          document.body
        )}
    </>
  );
};

export default MessageList;
