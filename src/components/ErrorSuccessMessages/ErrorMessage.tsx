"use client";

import { FC, ReactNode } from "react";
import XMarkIcon from "../Icons/XMarkIcon";
import classNames from "classnames";

interface ErrorMessageProps {
  message: string;
  customClass?: string;
  customIcon?: ReactNode;
  hideTitle?: boolean;
  hideErrorMessage?: () => void;
}

const ErrorMessage: FC<ErrorMessageProps> = ({
  message,
  customClass,
  customIcon,
  hideTitle,
  hideErrorMessage,
}) => {
  return (
    <div
      className={classNames(
        "flex w-full items-center justify-between gap-2 rounded-[5px] bg-warningRed px-2 py-[5px]",
        customClass
      )}
    >
      <div className="flex items-center gap-x-2">
        {customIcon ?? (
          <XMarkIcon
            withCircle={true}
            width={20}
            height={20}
            strokeWidth={1}
            className="!stroke-black"
          />
        )}
        <div>
          {!hideTitle && <div className="font-14px-ALL font-bold">Error!</div>}
          <div className="font-12px-ALL">{message}</div>
        </div>
      </div>
      {hideErrorMessage && (
        <button
          type="button"
          className="flex cursor-pointer items-center justify-center bg-none"
          onClick={hideErrorMessage}
        >
          <XMarkIcon width={16} height={16} className="!stroke-black" />
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
