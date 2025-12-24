"use client";

import classNames from "classnames";
import { FC, ReactNode } from "react";
import CheckIcon from "../Icons/CheckIcon";
import XMarkIcon from "../Icons/XMarkIcon";

interface SuccessMessageProps {
  message: string;
  customClass?: string;
  customIcon?: ReactNode;
  hideSuccessMessage: () => void;
}

const SuccessMessage: FC<SuccessMessageProps> = ({
  message,
  customClass,
  customIcon,
  hideSuccessMessage,
}) => {
  return (
    <div
      className={classNames(
        "flex w-full items-center justify-between gap-2 rounded-[5px] bg-successGreen px-2 py-[5px]",
        customClass
      )}
    >
      <div className="flex items-center gap-x-2">
        {customIcon ?? (
          <CheckIcon
            withCircle={true}
            width={20}
            height={20}
            strokeWidth={1}
            className="!stroke-black"
          />
        )}
        <div>
          <div className="font-14px-ALL font-bold">Success!</div>
          <div className="font-12px-ALL">{message}</div>
        </div>
      </div>
      {hideSuccessMessage && (
        <button
          type="button"
          className="flex cursor-pointer items-center justify-center bg-none"
          onClick={hideSuccessMessage}
        >
          <XMarkIcon width={16} height={16} className="!stroke-black" />
        </button>
      )}
    </div>
  );
};

export default SuccessMessage;
