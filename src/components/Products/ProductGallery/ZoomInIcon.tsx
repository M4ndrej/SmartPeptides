import { FC } from "react";

interface ZoomInIconProps {
  type?: string;
}

const ZoomInIcon: FC<ZoomInIconProps> = () => {
  return (
    <div className="group h-[28px] w-[28px]">
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.5 24.5L19.425 19.425M22.1667 12.8333C22.1667 17.988 17.988 22.1667 12.8333 22.1667C7.67868 22.1667 3.5 17.988 3.5 12.8333C3.5 7.67868 7.67868 3.5 12.8333 3.5C17.988 3.5 22.1667 7.67868 22.1667 12.8333Z"
          className="stroke-[#C8C8C8] transition-colors duration-200 group-hover:stroke-white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 8L13 17.5"
          className="stroke-[#C8C8C8] transition-colors duration-200 group-hover:stroke-white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M18 13H8"
          className="stroke-[#C8C8C8] transition-colors duration-200 group-hover:stroke-white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default ZoomInIcon;
