import { FaqOption } from "@/types/faq";
import Image from "next/image";
import { FC } from "react";

export const FaqHeader: FC<{
  isFaqSelected: boolean;
  selectedFaq: FaqOption | null;
}> = ({ isFaqSelected, selectedFaq }) => (
  <div className="relative flex items-center gap-x-[8px] bg-[#f0f0f0] p-4 dark:bg-transparent">
    {isFaqSelected && !selectedFaq ? (
      <>
        <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[5px] bg-red2">
          <div className="font-medium text-black">F</div>
        </div>
        <div>
          <div className="font-12px-ALL text-gray2">CATEGORY</div>
          <div className="font-12px-ALL font-bold">FAQ</div>
        </div>
      </>
    ) : selectedFaq ? (
      <div className="font-13px-ALL font-bold">{selectedFaq.title}</div>
    ) : (
      <>
        <div className="font-14px-ALL font-bold">FAQ&rsquo;s</div>
        <div className="absolute right-[16px] cursor-pointer rounded-full transition-all duration-300">
          <Image
            src="/images/search_icon.svg"
            width={16}
            height={16}
            alt="Search"
          />
        </div>
      </>
    )}
  </div>
);
