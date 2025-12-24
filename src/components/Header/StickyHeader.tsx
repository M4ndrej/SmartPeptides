import classNames from "classnames";
import Logo from "../Logo/Logo";
import HeaderPopoverButtons from "./HeaderWidgets/HeaderPopoverButtons";
import HeaderNavigation from "./HeaderWidgets/HeaderNavigation";
import { FC } from "react";
import StickyTopBar from "./StickyTopBar";
import HeaderHamburgerButton from "./HeaderWidgets/HeaderHamburgerButton";

interface StickyHeaderProps {
  isVisible: boolean;
}

const StickyHeader: FC<StickyHeaderProps> = ({ isVisible }) => {
  return (
    <header
      id="sticky-header"
      className={classNames(
        "fixed left-0 right-0 top-0 z-[3] shadow-globalShadow transition-opacity duration-150",
        isVisible ? "opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      {/* BG */}
      <div className="absolute inset-0 z-[-1] bg-whiteBackdrop backdrop-blur-[4px]" />
      {/* Top Bar */}
      <StickyTopBar />
      {/* Main */}
      <div
        id="header-main"
        className={classNames(
          "container-padding-inline m-[auto] flex min-h-[60px] w-[100%] max-w-[1264px] items-center justify-between"
        )}
      >
        <div className="flex shrink-0 basis-1/4 items-center xl:hidden">
          <HeaderHamburgerButton />
        </div>

        <div className="z-10 flex items-center justify-start gap-6">
          <Logo className="h-[37px] w-[288px] xs:!h-[20px] xs:!w-[163px] sm:h-[29px] sm:w-[225px]" />
          <HeaderNavigation isSticky={true} />
        </div>

        <div className="flex shrink-0 basis-1/4 items-center justify-end xl:w-auto">
          <HeaderPopoverButtons />
        </div>
      </div>
    </header>
  );
};

export default StickyHeader;
