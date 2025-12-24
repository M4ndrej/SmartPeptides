import { FC } from "react";

interface SidebarMobileHeaderProps {
  title?: string;
  additionalParentClass?: string;
  hideUnderline?: boolean;
  closeBtnAction: () => void;
  customCloseBtnClass?: string;
  fixedPosition?: boolean;
  count?: number;
}

const SidebarMobileHeader: FC<SidebarMobileHeaderProps> = ({
  title,
  hideUnderline,
  closeBtnAction,
  additionalParentClass,
  customCloseBtnClass,
  fixedPosition,
  count,
}) => {
  return (
    <div
      className={`overflow-hidden sm:pt-[16px] ${additionalParentClass} ${
        fixedPosition
          ? "fixed-header sm:fixed sm:left-0 sm:z-[2] sm:h-[77px] sm:w-full sm:bg-white sm:!pt-[16px]"
          : ""
      }`}
    >
      <div className="font-D32px-M24px mx-auto hidden w-fit text-center font-bold sm:block">
        {title} {count !== 0 && count !== undefined && <span>({count}) </span>}
      </div>
      {!hideUnderline && (
        <div className="m-auto mb-[24px] mt-[16px] hidden h-[1px] w-[48px] bg-[#E7461E] sm:block"></div>
      )}
      <div
        className={`group absolute right-[10px] top-[22px] z-[3] hidden bg-white sm:block ${customCloseBtnClass}`}
        onClick={closeBtnAction}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[16px] w-[16px] "
        >
          <path
            d="M1 1.00195L16.9989 17.0008"
            stroke="#999999"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="transition duration-200 group-hover:stroke-[#E7461E]"
          />
          <path
            d="M1 16.998L16.9989 0.999157"
            stroke="#999999"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="transition duration-200 group-hover:stroke-[#E7461E]"
          />
        </svg>
      </div>
    </div>
  );
};

export default SidebarMobileHeader;
