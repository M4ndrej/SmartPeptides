import { FC } from "react";

type CloseButtonProps = {
  closePopover: any;
};

const CloseButton: FC<CloseButtonProps> = ({ closePopover }) => {
  return (
    <div
      className={`container-padding-inline group z-[3] mb-[8px] ml-auto flex w-full cursor-pointer justify-end bg-white sm:mb-0`}
      onClick={closePopover}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1.00195L16.9989 17.0008"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="transtion stroke-gray2 duration-300 group-hover:stroke-[#9A9A9F]"
        />
        <path
          d="M1 16.998L16.9989 0.999157"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="transtion stroke-gray2 duration-300 group-hover:stroke-[#9A9A9F]"
        />
      </svg>
    </div>
  );
};

export default CloseButton;
