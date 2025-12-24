"use client";
import React, { FC, useState } from "react";
import { ChatToggleButton } from "./Common/ChatToggleButton";
import { WidgetContainer } from "./Common/WidgetContainer";
import { WidgetTitleBar } from "./Common/WidgetTitleBar";
import { ChatOption } from "@/types/chat";
import { chatOptions } from "@/data/chat_data";
import classNames from "classnames";
import { FaqOption } from "@/types/faq";
import { FaqSection } from "./Faq/FaqSection";
import ChatWithUsSection from "./ChatWithUs/ChatWithUsSection";

interface ChatWidgetProps {
  className?: string;
}

const ChatWidget: FC<ChatWidgetProps> = ({ className }) => {
  const [isChatWidgetOpen, setIsChatWidgetOpen] = useState(false);
  const [selectedChatOption, setSelectedChatOption] =
    useState<ChatOption | null>(null);
  const [isFaqSelected, setIsFaqSelected] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<FaqOption | null>(null);
  const [searchText, setSearchText] = useState("");

  const widgetBodyClass = classNames({
    "relative flex w-full flex-col  transition-all duration-300 sm:h-[calc(100%-25px)]":
      true,
    "top-[-28px]": selectedChatOption || isFaqSelected,
    "top-[-70px]": !selectedChatOption && !isFaqSelected,
  });

  return (
    <>
      <div
        className={classNames(
          "fixed bottom-[20px] right-[6px] z-[30] md:right-[14px]  lg:right-[16px] ",
          className
        )}
      >
        {/*  <ChatToggleButton
          isChatWidgetOpen={isChatWidgetOpen}
          setIsChatWidgetOpen={setIsChatWidgetOpen}
        /> */}
        <WidgetContainer isChatWidgetOpen={isChatWidgetOpen}>
          <WidgetTitleBar
            selectedChatOption={selectedChatOption}
            setSelectedChatOption={setSelectedChatOption}
            isFaqSelected={isFaqSelected}
            setIsFaqSelected={setIsFaqSelected}
            searchText={searchText}
            setSearchText={setSearchText}
            selectedFaq={selectedFaq}
            setSelectedFaq={setSelectedFaq}
          />
          <div className={widgetBodyClass}>
            <ChatWithUsSection
              selectedChatOption={selectedChatOption}
              setSelectedChatOption={setSelectedChatOption}
              isFaqSelected={isFaqSelected}
              isChatWidgetOpen={isChatWidgetOpen}
            />
            <FaqSection
              isFaqSelected={isFaqSelected}
              setIsFaqSelected={setIsFaqSelected}
              searchText={searchText}
              chatOptions={chatOptions}
              selectedChatOption={selectedChatOption}
              selectedFaq={selectedFaq}
              setSelectedFaq={setSelectedFaq}
            />
          </div>
        </WidgetContainer>
      </div>
    </>
  );
};
export default ChatWidget;
