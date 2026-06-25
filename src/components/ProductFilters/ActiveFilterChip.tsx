import React from "react";
import classNames from "classnames";

interface ActiveFilterChipProps {
  filterName: string;
  filterValue: string;
  displayValue: string;
  isHovered: boolean;
  onRemove: () => void;
  onHover: (hover: boolean) => void;
}

const ActiveFilterChip: React.FC<ActiveFilterChipProps> = ({
  filterName,
  filterValue,
  displayValue,
  isHovered,
  onRemove,
  onHover,
}) => {
  return (
    <React.Fragment>
      <div
        className={classNames({
          "line-clamp-1 max-w-[208px] break-all sm:max-w-[100%]": true,
          "line-through": isHovered,
        })}
      >
        {displayValue}
      </div>
      <svg
        width="13"
        height="14"
        viewBox="0 0 13 14"
        fill="none"
        className="min-h-[14px] min-w-[13px] cursor-pointer [&_circle]:hover:fill-[#9A9A9F]"
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        onClick={onRemove}
      >
        <circle cx="6.5" cy="7" r="6.5" fill="#C7C7C7" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.50004 7.70714L8.64648 9.85359L9.35359 9.14648L7.20714 7.00004L9.35359 4.85359L8.64648 4.14648L6.50004 6.29293L4.35359 4.14648L3.64648 4.85359L5.79293 7.00004L3.64648 9.14648L4.35359 9.85359L6.50004 7.70714Z"
          fill="white"
        />
      </svg>
    </React.Fragment>
  );
};

export default ActiveFilterChip;
