"use client";

import classNames from "classnames";
import {
  ChangeEvent,
  KeyboardEvent,
  forwardRef,
  useState,
  useEffect,
  FocusEventHandler,
} from "react";
import EyeIcon from "../Icons/EyeIcon";

interface InputProps {
  label?: string;
  required: boolean;
  type?: string;
  name?: string;
  customClass: string;
  customAsterisk?: string;
  parentCustomClass?: string;
  disabled?: boolean;
  value?: string;
  tabIndex?: number;
  customLabelClass?: string;
  placeholder?: string;
  animation?: boolean;
  pwIgnore?: boolean;
  maxlength?: number;
  dose?: string[];
  showDose?: boolean;
  showMlMg?: boolean;
  mlMgText?: string;
  style?: string;
  errorInput?: boolean;
  customErrorText?: string;
  inputPrefix?: string;
  max?: string;
  min?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  mcgOrMgChange?: (state: string) => void;
  doseEvent?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyUpChange?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      required,
      type,
      name,
      customClass,
      value,
      tabIndex,
      parentCustomClass,
      customAsterisk,
      customLabelClass,
      placeholder,
      animation,
      pwIgnore = true,
      maxlength,
      errorInput,
      dose,
      showDose,
      showMlMg,
      style,
      disabled,
      mlMgText,
      customErrorText,
      inputPrefix,
      max,
      min,
      onBlur,
      onChange,
      onKeyUpChange,
      mcgOrMgChange,
      doseEvent,
      onKeyDown,
    },
    ref
  ) => {
    const [currentType, setCurrentType] = useState(type || "text");

    const [animationElement, setAnimationElement] = useState("animate-typing");
    const [animationSeccondElement, setSeccondAnimationElement] =
      useState(false);
    const [mcgOrMg, setMcgOrMg] = useState("mcg");

    useEffect(() => {
      setTimeout(() => {
        setAnimationElement("animate-reverse-typing");
      }, 2000);
    }, [animation]);

    useEffect(() => {
      setTimeout(() => {
        setSeccondAnimationElement(true);
      }, 2500);
    }, [animationElement]);

    const changeMcgMg = (dos: string) => {
      if (mcgOrMgChange) {
        setMcgOrMg(dos);
        mcgOrMgChange(dos);
      }
    };

    return (
      <>
        <div className={`relative select-none ${parentCustomClass}`}>
          {/* Default label for rest of the inputs in app*/}
          {!animation && !showDose && (
            <label
              className={`font-D16px-M13px pointer-events-none absolute max-h-[48px] w-fit overflow-hidden whitespace-nowrap pl-[16px] pt-[12px] text-placeholderColor sm:pl-[10px] ${customLabelClass}`}
              htmlFor={name}
              style={{ opacity: value ? 0 : 1 }}
            >
              {label}
              {/*  If input is required show red (*) */}
              {required && (
                <span className={`ml-[3px] text-[#E7461E] ${customAsterisk}`}>
                  *
                </span>
              )}
            </label>
          )}
          {showMlMg && (
            <div className="pointer-events-none absolute right-[16px] flex gap-[3px] pl-[16px] pt-[7px] sm:pl-[10px]">
              {" "}
              <label
                className={`font-D16px-M13px relative top-[3px] flex h-[18px] w-[100%] cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-[6px]  text-[11px] text-gray3  sm:top-0 ${customLabelClass}`}
              >
                {mlMgText === "ml" ? "ml" : "mg"}
              </label>
            </div>
          )}
          {/*  Label with select options for dose (Mcg or Mg) in calculator */}
          {showDose && (
            <div className=" absolute right-[5px] flex gap-[3px] pl-[16px] pt-[7px]">
              {dose?.map((dos, index) => (
                <label
                  key={index}
                  className={`font-D16px-M13px relative top-[3px] flex h-[18px] w-[100%] cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap bg-lightgray px-[6px] text-[11px] text-gray3  sm:top-0 ${customLabelClass}`}
                  htmlFor={`${name}-${index}`}
                  style={{
                    background: dos === mcgOrMg ? "#F4FAFF" : "#F8F8F8",
                    color: dos === mcgOrMg ? "#E7461E" : "",
                  }}
                  onClick={() => changeMcgMg(dos)}
                >
                  {dos}
                </label>
              ))}
            </div>
          )}
          {/* Label with animation for input in the search bar in header */}
          {animation && (
            <div>
              <label
                style={{ opacity: value ? 0 : 1 }}
                className={`pointer-events-none absolute max-h-[48px] w-[100%] overflow-hidden whitespace-nowrap  pt-[5px] text-gray2 ${animationElement}`}
              >
                Peptide
              </label>
              {animationSeccondElement && (
                <label
                  style={{ opacity: value ? 0 : 1 }}
                  className={`pointer-events-none absolute max-h-[48px] w-[100%] animate-typingSeecondInputText overflow-hidden whitespace-nowrap  pt-[5px] text-gray2 `}
                >
                  {label}
                </label>
              )}
            </div>
          )}

          <input
            ref={ref}
            required={required}
            tabIndex={tabIndex}
            type={currentType}
            name={name}
            onBlur={(event) => {
              onBlur?.(event);
              event.target.style.color = "#E7461E";
              if (event.target.value.trim() !== "") {
                event.target.classList.remove("border", "border-[#E7461E]");
                event.target.classList.add("bg-[#FFE9E3]");
              } else {
                event.target.classList.remove("border-[#E7461E]");
              }
            }}
            onKeyUp={onKeyUpChange}
            onChange={(event) => {
              !showDose ? onChange?.(event) : doseEvent && doseEvent(event);
              event.target.style.color = "#333333";
            }}
            value={value}
            placeholder={placeholder}
            id={name}
            prefix={inputPrefix}
            disabled={disabled}
            style={{ width: style, transition: "all 0.3s" }}
            onKeyDown={onKeyDown}
            maxLength={maxlength}
            max={max}
            min={min}
            autoComplete={pwIgnore ? "off" : "on"}
            data-1p-ignore={pwIgnore}
            data-bwignore={pwIgnore}
            data-lpignore={pwIgnore}
            className={classNames({
              "font-D16px-M13px h-[48px] w-[100%] rounded-[5px] border border-borderColor bg-inputColor px-4 py-3 text-[#E7461E] !shadow-none !outline-none !ring-transparent transition-all ease-linear hover:border-borderColor  hover:bg-lightgray focus:border-[1px] focus:border-[#E7461E] focus:bg-[#FFE9E3] sm:px-[10px] sm:!text-[13px]  sm:!leading-[21px] focus:sm:!text-[13px] dark:focus:border-none dark:focus:bg-inputColor dark:focus:!text-textWhite":
                true,

              [customClass]: true,
              "border-red bg-[#FFE6E6]": errorInput,
            })}
          />
          {type === "password" && (
            <div className="absolute right-4 top-3 cursor-pointer">
              <EyeIcon
                width={24}
                height={24}
                strokeWidth={1.5}
                withSlash={currentType == "text"}
                className="hover:!stroke-[#E7461E]"
                onClick={() =>
                  setCurrentType(
                    currentType === "password" ? "text" : "password"
                  )
                }
              />
            </div>
          )}
        </div>
        {errorInput && (
          <div className="font-12px-ALL mb-[8px] mt-[4px] text-left text-red">
            {customErrorText ? customErrorText : "Field is required/invalid"}
          </div>
        )}
      </>
    );
  }
);

Input.displayName = "Input";

export default Input;
