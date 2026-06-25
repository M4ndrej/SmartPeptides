import InsideScroll from "@/components/Scroll/InsideScroll";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import classNames from "classnames";
import { FC, useRef, useState } from "react";
import AnimateHeight, { Height } from "react-animate-height";

type InputCardTypeProps = {
  cardType: string;
  name?: string;
  errorInput?: boolean;
  customErrorText?: string;
  handleSelectType: (type: string) => void;
  className?: string;
  containerClassName?: string;
};

const InputCardType: FC<InputCardTypeProps> = ({
  cardType,
  name,
  errorInput,
  customErrorText,
  handleSelectType,
  className,
  containerClassName,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const cardTypes = ["debit", "credit"];

  const elRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState<Height>(0);
  const [shadowShown, setShadowShown] = useState(false);

  const toggleDropdownHandler = () => {
    setHeight(height === 0 ? "auto" : 0);

    if (!shadowShown) {
      setTimeout(() => {
        setShadowShown(true);
      }, 100);
    } else {
      setShadowShown(false);
    }
  };

  useOnClickOutside(elRef, () => {
    setHeight(0);
    setShadowShown(false);
  });

  const handleSelectFromDropdown = (type: string) => {
    if (inputRef.current) inputRef.current.value = "";
    handleSelectType(type);
    setHeight(0);
    setShadowShown(false);
  };

  return (
    <div
      className={classNames(
        "flex flex-col items-start justify-start",
        containerClassName
      )}
    >
      <div
        ref={elRef}
        className={classNames(
          "border-b-none w-full rounded-[5px] border border-[#E6E6E6]",
          height === "auto" && "!rounded-bl-none !rounded-br-none",
          className
        )}
      >
        <input type="string" hidden value={cardType} name={name} />
        {/* Button */}

        <div className="relative">
          <div
            className={classNames({
              "absolute left-[-1px] top-[-1.5px] z-[4] h-0 w-[calc(100%+2px)] rounded-[5px] bg-none opacity-0 shadow-globalShadow transition duration-150":
                true,
              "!h-[128px] !opacity-100": shadowShown,
            })}
          ></div>
          <div
            className="relative z-[9] cursor-pointer px-[16px] py-[12px] sm:px-[10px]"
            onClick={toggleDropdownHandler}
          >
            {!cardType && (
              <span className="font-D16px-M13px text-gray2">
                Card Type
                <span className="ml-[5px] text-red">*</span>
              </span>
            )}

            <span className="font-D16px-M13px text-darkgray">
              &ensp;{cardType.charAt(0).toUpperCase() + cardType.slice(1)}
            </span>
            <svg
              width="13"
              height="6"
              viewBox="0 0 13 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`absolute right-[16px] top-[21px] transition duration-300 ${
                height !== 0 ? "rotate-[-180deg]" : ""
              }`}
            >
              <path
                d="M1 0.5L6.5 5.5L12 0.5"
                stroke="#9A9A9F"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <AnimateHeight
            height={height}
            duration={200}
            className={classNames({
              "border-t-none absolute left-[-1px] top-[47px] z-[9] w-[calc(100%+2px)] rounded-bl-[4px] rounded-br-[4px] border-b-[1px] border-l-[1px] border-r-[1px] border-[#E6E6E6] bg-white":
                true,
              "!border-none": height === 0,
            })}
          >
            <InsideScroll className="h-[80px]">
              <ul className="mt-[4px] h-[100%] w-[100%]">
                {cardTypes.map((type) => (
                  <li
                    className={`font-D16px-M13px flex h-[35px] cursor-pointer items-center justify-start px-[16px] py-[12px] transition duration-200 hover:bg-[#f0f0f0] sm:px-[10px] sm:leading-[16px] `}
                    key={type}
                    onClick={() => handleSelectFromDropdown(type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </li>
                ))}
              </ul>
            </InsideScroll>
          </AnimateHeight>
        </div>
      </div>
      {errorInput && (
        <div className="font-12px-ALL my-[4px] text-red">
          {customErrorText ? customErrorText : "Field is required/invalid"}
        </div>
      )}
    </div>
  );
};

export default InputCardType;
