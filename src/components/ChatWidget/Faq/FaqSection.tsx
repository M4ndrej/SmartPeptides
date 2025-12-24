import ContentCard from "../Common/ContentCard";
import { FC } from "react";
import { FaqOption } from "@/types/faq";
import { ChatOption } from "@/types/chat";
import { FaqArticle } from "./FaqArticle";
import { FaqHeader } from "./FaqHeader";
import FaqList from "./FaqList";

interface FaqSectionProps {
  isFaqSelected: boolean;
  setIsFaqSelected: (value: boolean) => void;
  searchText: string;
  chatOptions: ChatOption[];
  selectedChatOption: ChatOption | null;
  selectedFaq: FaqOption | null;
  setSelectedFaq: (faq: FaqOption | null) => void;
}

export const FaqSection: FC<FaqSectionProps> = ({
  isFaqSelected,
  setIsFaqSelected,
  searchText,
  chatOptions,
  selectedChatOption,
  selectedFaq,
  setSelectedFaq,
}) => {
  const faqHeight = selectedChatOption
    ? "h-0 overflow-hidden"
    : isFaqSelected && !selectedFaq
      ? "h-[388px] overflow-auto"
      : selectedFaq
        ? "h-[444px] overflow-auto"
        : "h-[117px] overflow-hidden";

  return (
    <div
      className={`scrollbar mx-4 ${isFaqSelected ? "mt-0" : "mt-4"} rounded-[8px] bg-white shadow-sm transition-all duration-300 ${faqHeight} `}
    >
      <FaqHeader isFaqSelected={isFaqSelected} selectedFaq={selectedFaq} />
      {isFaqSelected && !selectedFaq ? (
        <FaqList searchText={searchText} setSelectedFaq={setSelectedFaq} />
      ) : selectedFaq ? (
        <FaqArticle selectedFaq={selectedFaq} />
      ) : (
        <div>
          <ContentCard
            chatOption={chatOptions[2]}
            onClick={() => setIsFaqSelected(true)}
          />
        </div>
      )}
    </div>
  );
};
