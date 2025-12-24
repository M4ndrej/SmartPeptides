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
    <span className="text-[#E7461E] transition duration-200 group-hover:text-[#E7461E]">
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
        stroke="#E7461E"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition duration-200 group-hover:stroke-[#E7461E]"
      />
    </svg>
  </div>
);

export default MoreResultsButton;
