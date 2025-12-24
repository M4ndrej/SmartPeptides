import { FC } from "react";
import { FAQS_DATA } from "@/data/faqs_data";
import { FaqOption } from "@/types/faq";

interface FaqListProps {
  setSelectedFaq: (faq: FaqOption | null) => void;
  searchText: string;
}

const FaqList: FC<FaqListProps> = ({ setSelectedFaq, searchText }) => {
  return (
    <div className="p-[16px]">
      <div className="flex flex-col gap-y-[24px]">
        {FAQS_DATA.filter((faq) =>
          faq.title.toLowerCase().includes(searchText.toLowerCase())
        ).map((item, index) => (
          <div key={index} onClick={() => setSelectedFaq(FAQS_DATA[index])}>
            <div className="flex cursor-pointer items-center gap-x-[8px] hover:underline">
              <svg width="13" height="17" viewBox="0 0 13 17" fill="none">
                <path
                  d="M8.44153 1H2C1.44772 1 1 1.44772 1 2V15C1 15.5523 1.44771 16 2 16H11C11.5523 16 12 15.5523 12 15V4.57071C12 4.30632 11.8953 4.05269 11.7088 3.86529L9.15032 1.29458C8.96265 1.10601 8.70757 1 8.44153 1Z"
                  strokeWidth="0.8"
                  className="stroke-black"
                />
                <path
                  d="M8.85742 1V3.55263C8.85742 4.10492 9.30514 4.55263 9.85742 4.55263H12.0003"
                  strokeWidth="0.8"
                  className="stroke-black"
                />
                <path
                  d="M4.20791 7.90709C3.62325 5.2944 8.3407 4.43496 8.25729 7.76116C8.19718 8.28871 7.96545 8.85745 6.6922 9.93061C6.29848 10.2662 6.06285 10.6319 6.03636 10.803"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-black"
                />
                <path
                  d="M5.94014 12.8419C6.20614 12.8419 6.42178 12.6263 6.42178 12.3603C6.42178 12.0943 6.20614 11.8787 5.94014 11.8787C5.67413 11.8787 5.4585 12.0943 5.4585 12.3603C5.4585 12.6263 5.67413 12.8419 5.94014 12.8419Z"
                  className="fill-black"
                />
              </svg>

              <div className="font-13px-ALL">{item.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqList;
