import Image from "next/image";
import Input from "../../Input/Input";
import ChatHeader from "./ChatHeader";
import { ChangeEvent, FC } from "react";
import { ChatOption } from "@/types/chat";
import { FaqOption } from "@/types/faq";

interface WidgetTitleBarProps {
  selectedChatOption: ChatOption | null;
  setSelectedChatOption: (option: ChatOption | null) => void;
  isFaqSelected: boolean;
  setIsFaqSelected: (isSelected: boolean) => void;
  searchText: string;
  setSearchText: (text: string) => void;
  selectedFaq: FaqOption | null;
  setSelectedFaq: (faq: FaqOption | null) => void;
}

export const WidgetTitleBar: FC<WidgetTitleBarProps> = ({
  selectedChatOption,
  setSelectedChatOption,
  isFaqSelected,
  setIsFaqSelected,
  searchText,
  setSearchText,
  selectedFaq,
  setSelectedFaq,
}) => {
  const handleBackButton = () => {
    if (selectedFaq) {
      setSelectedFaq(null);
    } else {
      setIsFaqSelected(false);
      setSelectedChatOption(null);
      setSearchText("");
    }
  };

  const handleSearch = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSearchText(e.target.value);
  };

  const titleHeight =
    selectedChatOption || selectedFaq
      ? "h-[90px]"
      : isFaqSelected
        ? "h-[138px]"
        : "h-[148px]";
  const searchHeight = isFaqSelected && !selectedFaq ? "block" : "hidden";
  const containerPosition =
    !selectedChatOption && !isFaqSelected
      ? "left-0"
      : "left-[-326px] sm:left-[-100vw]";

  return (
    <>
      <div
        className={`rounded-[8px] bg-[#333333] transition-all duration-300 sm:rounded-t-none ${titleHeight}`}
      >
        <div className="relative">
          <div
            className={`relative flex w-[652px] transition-all duration-300 sm:w-[200vw] ${containerPosition}`}
          >
            <div className="!w-[326px] min-w-[326px] p-[16px] sm:!w-[100vw] sm:min-w-[100vw]">
              <Image
                src="/images/chat-icon1.svg"
                width={42}
                height={37}
                alt="Chat icon"
              />
            </div>
            <div className="!w-[326px] min-w-[326px] p-[16px] sm:!w-[100vw] sm:min-w-[100vw]">
              <ChatHeader
                chatTitle={
                  selectedFaq
                    ? "FAQ"
                    : selectedChatOption
                      ? selectedChatOption?.title
                      : ""
                }
                showStatus={!!selectedChatOption}
                onBackButton={handleBackButton}
              />
            </div>
          </div>
          <div
            className={`relative top-[-10px] h-[40px] overflow-hidden px-[16px] transition-all duration-300 ${searchHeight}`}
          >
            <Input
              label="Search for answers"
              parentCustomClass="z-1"
              customLabelClass="!pt-[9px] !text-black"
              customClass="border-0 !bg-inputColor hover:!bg-black/[.2] !h-[40px] !text-black dark:!text-[#333333]"
              value={searchText}
              required={false}
              onChange={handleSearch}
            />
          </div>
          <div className="absolute right-0 top-[16px] z-0">
            <Image
              src="/images/chat-icon2.svg"
              width={167}
              height={132}
              alt="Chat icon 2"
              className="h-[132px] w-[167px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};
