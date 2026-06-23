"use client";

import Tooltip from "@/components/Tooltip/Tooltip";

const ScrollToTop = () => {
  const handleToTop = () => {
    const content = document.getElementById("main-scroll-content");
    content?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="group relative flex h-[52px] w-[52px] items-center justify-center rounded-[52px] bg-white shadow-globalShadow">
      <button
        onClick={handleToTop}
        className="flex h-full w-full items-center justify-center rounded-[52px] text-center"
      >
        <svg
          width="18"
          height="10"
          viewBox="0 0 18 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 9L9 1L17 9"
            stroke="#898989"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition duration-300 group-hover:stroke-[#333333]"
          />
        </svg>
      </button>
      <div>
        <Tooltip
          text="Back to Top"
          distance="left-[-105px] top-[16px] scale-[.7] translate-x-[30px] group-hover:translate-x-[0] ease-[cubic-bezier(0.11, 0, 0.5, 0)] group-hover:scale-[1] opacity-0 transition duration-150 group-hover:opacity-100"
          pointerSide="right"
        />
      </div>
    </div>
  );
};

export default ScrollToTop;
