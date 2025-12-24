import classNames from "classnames";
import { ChangeEvent, FC } from "react";

interface TextareaProps {
  label: string;
  required: boolean;
  name?: string;
  customClass: string;
  value?: string;
  errorInput?: boolean;
  customErrorText?: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: FC<TextareaProps> = ({
  label,
  required,
  name,
  customClass,
  value,
  errorInput,
  customErrorText,
  placeholder,
  onChange,
}) => {
  return (
    <div className="relative">
      {label && (
        <label
          className={`font-D16px-M13px pointer-events-none absolute max-h-[48px] w-[100%] overflow-hidden whitespace-nowrap pl-[16px] pt-[12px] text-gray2`}
          htmlFor={name}
          style={{ opacity: value ? 0 : 1 }}
        >
          {label}
          {/*  If input is required show red (*) */}
          {required && <span className="text-[#E7461E]">*</span>}
        </label>
      )}

      <textarea
        required={required}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={classNames({
          "rounded-[5px] border border-borderGray px-[16px] py-[12px] outline-0":
            true,
          [customClass]: true,
          "border-red": errorInput,
        })}
      ></textarea>
      {errorInput && (
        <div className="font-12px-ALL my-[4px] text-red">
          {customErrorText ? customErrorText : "Field is required/invalid"}
        </div>
      )}
    </div>
  );
};

export default Textarea;
