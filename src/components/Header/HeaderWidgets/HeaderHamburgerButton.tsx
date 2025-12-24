import { FC } from "react";
import HamburgerIcon from "../../Icons/HamburgerIcon";
import { useSidePopoverContext } from "@/context/SidePopoverContext";

const HeaderHamburgerButton: FC = () => {
  const { handlePopoverAction } = useSidePopoverContext();

  return (
    <button
      className="group/hamburger flex items-center justify-center"
      type="button"
      onClick={() => handlePopoverAction(true, "navigation")}
    >
      <HamburgerIcon className="!fill-black group-hover/hamburger:!stroke-[#E7461E] sm:!h-6 sm:!w-6" />
    </button>
  );
};

export default HeaderHamburgerButton;
