import { FC } from "react";
import { FaqOption } from "@/types/faq";

interface FaqArticleProps {
  selectedFaq: FaqOption;
}

export const FaqArticle: FC<FaqArticleProps> = ({ selectedFaq }) => {
  return (
    <div className="flex flex-col">
      <div className="scrollbar max-h-[284px] overflow-auto p-4 sm:max-h-full">
        <div
          className="font-14px-ALL"
          dangerouslySetInnerHTML={{
            __html: selectedFaq.description.replace(/<br\s*\/?>/gm, "\n"),
          }}
        ></div>
      </div>
      <div className="mb-4 mt-[21px] h-[1px] w-full bg-borderColor"></div>
    </div>
  );
};
