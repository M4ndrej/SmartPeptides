import React from "react";

type ClearInputButtonProps = {
  searchTermLength: number;
  handleClearInputSearch: () => void;
};

const ClearInputButton: React.FC<ClearInputButtonProps> = ({
  searchTermLength,
  handleClearInputSearch,
}) => (
  <>
    {searchTermLength ? (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="treansition absolute top-[5px] z-[2] cursor-pointer select-none  duration-300 sm:right-[8px]
                  sm:top-[6px] md:right-[2px] lg:right-[15px] xl:right-[35px]
                   [&_path]:hover:stroke-[#E7461E]"
        onClick={handleClearInputSearch}
      >
        <path
          d="M5 5L14.9993 14.9993"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="stroke-gray2"
        />
        <path
          d="M5 15L14.9993 5.00069"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="stroke-gray2"
        />
      </svg>
    ) : (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute  top-0 z-[2] cursor-pointer select-none sm:right-[8px] sm:top-[6px] sm:!h-[24px] sm:!w-[24px] md:right-[2px] lg:right-[15px] xl:right-[35px]"
      >
        <circle
          cx="15.2292"
          cy="15.2295"
          r="9.53329"
          transform="rotate(-45 15.2292 15.2295)"
          strokeWidth="1.5"
          className="stroke-gray2"
        />
        <path
          d="M22.5332 22.6836L26.7758 26.9262"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="stroke-gray2"
        />
      </svg>
    )}
  </>
);

export default ClearInputButton;
