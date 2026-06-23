import classNames from "classnames";
import {
  DetailedHTMLProps,
  FC,
  FocusEvent,
  InputHTMLAttributes,
  ReactNode,
  Ref,
  memo,
  useState,
} from "react";
import EyeIcon from "../Icons/EyeIcon";
import MyInputLabel from "./MyInputLabel";

type InheritedProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  | "label"
  | "style"
  | "id"
  | "autoComplete"
  | "key"
  | "aria-invalid"
  | "aria-label"
  | "aria-errormessage"
  | "ref"
>;

type MyInputProps = InheritedProps & {
  inputRef?: Ref<HTMLInputElement>;
  animation?: boolean;
  reverseColors?: boolean;
  containerClassName?: string;
  inputContainerClassName?: string;
  labelClassName?: string;
  asteriskClassName?: string;
  iconContainerClassName?: string;
  label?: string;
  width?: string;
  pwIgnore?: boolean;
  isError?: boolean;
  errorMessage?: string;
  icon?: ReactNode;
};

const MyInput: FC<MyInputProps> = ({
  inputRef,
  containerClassName,
  inputContainerClassName,
  labelClassName,
  asteriskClassName,
  iconContainerClassName,
  className,
  animation,
  reverseColors,
  label,
  width,
  pwIgnore,
  isError,
  errorMessage,
  icon,
  name,
  required,
  type,
  disabled,
  value,
  onFocus,
  onBlur,
  ...restProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [currentType, setCurrentType] = useState(type || "text");

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <div className={classNames("relative", containerClassName)}>
      <div className={classNames("relative", inputContainerClassName)}>
        {/* Default label for rest of the inputs in app*/}
        {!animation && label && !disabled && (
          <MyInputLabel
            isFocused={isFocused}
            isEmpty={!value}
            isError={isError}
            label={label}
            name={name}
            required={required}
            disabled={disabled}
            className={labelClassName}
            asteriskClassName={asteriskClassName}
            reverseColors={reverseColors}
          />
        )}

        <input
          ref={inputRef}
          type={currentType}
          name={name}
          id={name}
          required={required}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          style={{ width: width, transition: "all 0.3s" }}
          autoComplete={pwIgnore ? "off" : "on"}
          data-1p-ignore={pwIgnore}
          data-bwignore={pwIgnore}
          data-lpignore={pwIgnore}
          aria-label={name}
          aria-invalid={isError}
          aria-errormessage={errorMessage}
          className={classNames(
            "font-16px-ALL h-[48px] w-full appearance-none rounded-[5px] border border-gray4 bg-inputColor px-[16px] py-[12px] placeholder-gray2 !outline-none outline-0 transition-colors duration-300 ease-linear dark:border-none",
            isFocused && "!border-[#333333] dark:border-none",
            isFocused && !reverseColors && "!bg-[#f0f0f0] dark:!bg-transparent",
            isFocused && reverseColors && "!bg-inputColor ",
            value &&
              !isFocused &&
              !reverseColors &&
              !disabled &&
              "!border-light-blue2 !bg-[#f0f0f0] !text-[#333333] dark:!bg-transparent",
            value &&
              !isFocused &&
              reverseColors &&
              !disabled &&
              "!border-white !bg-white !text-[#333333] dark:!border-none",
            isError && "!border-red !bg-lightred !text-red",
            disabled &&
              "!border-lightgray !bg-lightgray text-gray2 dark:text-[#333333]",
            className
          )}
          {...restProps}
        />
        {type === "password" && !icon && (
          <div className="absolute right-4 top-[50%] translate-y-[-50%] cursor-pointer">
            <EyeIcon
              width={24}
              height={24}
              strokeWidth={1.5}
              withSlash={currentType == "text"}
              className="transition-colors duration-200 hover:!stroke-[#333333]"
              onClick={() =>
                setCurrentType(currentType === "password" ? "text" : "password")
              }
            />
          </div>
        )}
        {icon && (
          <div
            className={classNames(
              "absolute right-3 top-[50%] translate-y-[-50%]",
              iconContainerClassName
            )}
          >
            {icon}
          </div>
        )}
      </div>
      {isError && (
        <div className="font-12px-ALL my-[4px] text-red">
          {errorMessage ?? "Field is required"}
        </div>
      )}
    </div>
  );
};

MyInput.displayName = "MyInput";

export default memo(MyInput);
