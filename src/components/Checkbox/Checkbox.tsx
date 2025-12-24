import { FC } from "react";
import classNames from "classnames";
import CheckboxIcon from "../Icons/CheckboxIcon";
interface checkboxProps {
  checked?: boolean;
  rounded?: boolean;
  name?: string;
  errorInput?: boolean;
  customErrorText?: string;
  onChange?: (isChecked: boolean) => void;
}
const Checkbox: FC<checkboxProps> = ({
  checked,
  onChange,
  rounded,
  name,
  errorInput,
  customErrorText,
}) => {
  function changeStatus() {
    onChange?.(!checked);
  }

  return (
    <div>
      <input hidden type="checkbox" name={name} checked={checked} readOnly />
      {checked ? (
        <CheckboxIcon
          rounded={rounded}
          width={rounded ? 15 : 16}
          height={rounded ? 16 : 16}
          className={classNames({
            "mr-[8px] cursor-pointer": true,
            "h-[15px] w-[15px]": rounded,
            "h-[16px] w-[16px]": !rounded,
          })}
          onClick={changeStatus}
        />
      ) : (
        <div
          className={classNames({
            "mr-[8px] cursor-pointer select-none border-[1px]": true,
            "h-[13px] w-[13px] rounded-[50px] border-gray bg-gray": rounded,
            "h-[16px] w-[16px] rounded-[2px] border-light-gray-v2": !rounded,
          })}
          onClick={changeStatus}
        ></div>
      )}

      {/* {errorInput && (
        <div className="font-12px-ALL my-[4px] text-red">
          {customErrorText ? customErrorText : "Field is required/invalid"}
        </div>
      )} */}
    </div>
  );
};

export default Checkbox;
