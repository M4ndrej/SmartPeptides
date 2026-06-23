import classNames from "classnames";
import {
  DetailedHTMLProps,
  FC,
  FocusEvent,
  ReactNode,
  Ref,
  TextareaHTMLAttributes,
  memo,
  useState,
} from "react";
import MyInputLabel from "./MyInputLabel";

type InheritedProps = Omit<
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
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

type MyTextAreaProps = InheritedProps & {
  inputRef?: Ref<HTMLTextAreaElement>;
  animation?: boolean;
  reverseColors?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  asteriskClassName?: string;
  label?: string;
  width?: string;
  pwIgnore?: boolean;
  isError?: boolean;
  errorMessage?: string;
  icon?: ReactNode;
};

const MyTextArea: FC<MyTextAreaProps> = ({
  inputRef,
  containerClassName,
  labelClassName,
  asteriskClassName,
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
  disabled,
  value,
  onFocus,
  onBlur,
  ...restProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <div className={classNames("relative", containerClassName)}>
      {/* Default label for rest of the inputs in app*/}
      {!animation && label && (
        <MyInputLabel
          isFocused={isFocused}
          isEmpty={!value}
          label={label}
          name={name}
          required={required}
          className={labelClassName}
          asteriskClassName={asteriskClassName}
          reverseColors={reverseColors}
        />
      )}

      <textarea
        ref={inputRef}
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
          "font-16px-ALL scrollbar h-[48px] w-full rounded-[5px] border border-borderColor bg-inputColor px-[16px] py-[12px] placeholder-gray2 outline-0 transition-colors duration-300 ease-linear dark:border-none dark:text-[#333333]",
          isFocused && "!border-[#333333] dark:!border-none",
          isFocused && !reverseColors && "!bg-[#f0f0f0] dark:!bg-inputColor",
          isFocused && reverseColors && "!bg-inputColor",
          value &&
            !isFocused &&
            !reverseColors &&
            !disabled &&
            "!border-light-blue2 !bg-[#f0f0f0] !text-[#333333] dark:!bg-inputColor",
          value &&
            !isFocused &&
            reverseColors &&
            !disabled &&
            "!border-white !bg-white !text-[#333333] dark:!bg-inputColor",
          isError && "!border-red !bg-lightred !text-red",
          disabled &&
            "!border-lightgray !bg-lightgray text-gray2 dark:!bg-inputColor",
          className
        )}
        {...restProps}
      />
      {icon && (
        <div
          className={classNames(
            "absolute right-3 top-[50%] translate-y-[-50%]"
          )}
        >
          {icon}
        </div>
      )}
      {isError && (
        <div className="font-12px-ALL my-[4px] text-red">
          {errorMessage ?? "Field is required"}
        </div>
      )}
    </div>
  );
};

MyTextArea.displayName = "MyTextArea";

export default memo(MyTextArea);
