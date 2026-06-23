import React from "react";

type MoreResultsButtonProps = {
  goToShopPageHandler: () => void;
};

const MoreResultsButton: React.FC<MoreResultsButtonProps> = ({
  goToShopPageHandler,
}) => (
  <div
    onClick={goToShopPageHandler}
    className="font-16px-ALL group mx-auto flex cursor-pointer items-center gap-[16px] text-center"
  >
    <span className="text-[#333333] transition duration-200 group-hover:text-[#333333]">
      MORE RESULTS
    </span>
    <svg
      width="7"
      height="12"
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 11.5L6 6L1 0.5"
        stroke="#333333"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition duration-200 group-hover:stroke-[#333333]"
      />
    </svg>
  </div>
);

export default MoreResultsButton;
