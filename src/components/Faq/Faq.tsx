"use client";
import { FAQS_DATA } from "@/data/faqs_data";
import classNames from "classnames";
import Image from "next/image";
import { FC, useState } from "react";
import AnimateHeight from "react-animate-height";
import PlusIcon from "../Icons/PlusIcon";
import MinusIcon from "../Icons/MinusIcon";

const FaqPage: FC = () => {
  const [showDescriptionIndex, setShowDescriptionIndex] = useState<number>();

  const handleDescription = (index: number) => {
    setShowDescriptionIndex(index === showDescriptionIndex ? -1 : index);
  };

  return (
    <>
      <div className="mt-[48px] w-[100%]">
        <div className=" container-padding-inline mx-auto w-[100%] max-w-[1264px]">
          {/* <h1 className="font-D32px-M24px pb-[16px] font-bold">{"FAQ’s"}</h1>
      <div className="mb-[16px] h-[2px] w-[48px] bg-[#E7461E]"></div> */}
        </div>
        <div className="container-padding-inline m-[auto] flex w-[100%] max-w-[1264px] items-center pb-[96px] sm:max-w-[100vw] sm:pb-[64px] md:max-w-[100vw] md:flex-col md:gap-[70px] lg:gap-[160px] xl:gap-[220px]">
          <div className="h-full w-[592px] sm:mr-0 sm:w-[100%] md:mr-0 md:w-[100%]">
            <h1 className="font-D32px-M24px pb-[16px] font-bold">{"FAQ's"}</h1>
            <div className="mb-[16px] h-[2px] w-[48px] bg-[#E7461E]"></div>
            {FAQS_DATA.map((item, index) => (
              <AnimateHeight
                height={showDescriptionIndex === index ? "auto" : 50}
                animateOpacity
                id="my-order"
                duration={400}
                key={index}
                className={classNames({
                  "duration-400 overflow-hidden transition ease-in-out sm:w-[100%]":
                    true,
                  "mb-[16px]": index < FAQS_DATA.length - 1,
                })}
              >
                <div
                  onClick={() => {
                    handleDescription(index);
                  }}
                  className={classNames({
                    "flex w-[592px] cursor-pointer items-center rounded-[5px] border-[1px] border-solid border-borderColor px-[14px] py-[12px] transition duration-300 ease-linear hover:border-[#E7461E] hover:bg-[#FFE9E3] sm:w-[100%] sm:px-[16px] sm:py-[13px] md:w-[100%] dark:hover:border-borderColor dark:hover:bg-transparent":
                      true,
                    "!border-[#E7461E] bg-[#FFE9E3] dark:!border-borderColor dark:bg-transparent":
                      showDescriptionIndex === index,
                  })}
                >
                  <div
                    className="font-D16px-M13px flex-1 font-bold"
                    dangerouslySetInnerHTML={{
                      __html: item.title,
                    }}
                  ></div>
                  <button
                    className="flex h-[12px] w-[12px] items-center"
                    onClick={() => {
                      handleDescription(index);
                    }}
                  >
                    {showDescriptionIndex === index ? (
                      <MinusIcon
                        width={13}
                        height={2}
                        className="select-none"
                      />
                    ) : (
                      <PlusIcon
                        width={12}
                        height={12}
                        className="select-none"
                      />
                    )}
                  </button>
                </div>
                <div
                  className="font-D16px-M13px px-[16px] pt-[16px] sm:max-h-[696px] sm:overflow-auto md:max-h-[496px] md:overflow-auto"
                  dangerouslySetInnerHTML={{
                    __html: `${item.description.replace(/<br\s*\/?>/gm, "\n")}`,
                  }}
                ></div>
              </AnimateHeight>
            ))}
          </div>
          <div className="!h-full !w-full max-w-[325px] sm:hidden md:m-auto ">
            <Image
              src="/images/FAQ.svg"
              width={321}
              height={622}
              alt="Contact"
              className="max-h-[622px] !w-full select-none object-contain md:max-h-[539px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqPage;
