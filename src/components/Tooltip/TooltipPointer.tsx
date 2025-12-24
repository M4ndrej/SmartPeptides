import classNames from "classnames";
import { FC } from "react";

interface TooltipPointerProps {
  pointerSide: string;
}

const TooltipPointer: FC<TooltipPointerProps> = ({ pointerSide }) => {
  return (
    <div
      className={classNames({
        "absolute top-[50%] h-[9px] w-[9px] translate-y-[-50%] rotate-45 rounded-[2px] bg-darkgray":
          true,
        "left-[-3px]": pointerSide === "left",
        "right-[-3px]": pointerSide === "right",
      })}
    ></div>
  );
};

export default TooltipPointer;
