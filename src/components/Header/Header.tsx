"use client";

import { useScrollContext } from "@/context/ScrollContext";
import classNames from "classnames";
import Logo from "../Logo/Logo";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";
import HeaderHamburgerButton from "./HeaderWidgets/HeaderHamburgerButton";
import HeaderNavigation from "./HeaderWidgets/HeaderNavigation";
import HeaderPopoverButtons from "./HeaderWidgets/HeaderPopoverButtons";
import HeaderUserButtons from "./HeaderWidgets/HeaderUserButtons";
import StickyTopBar from "./StickyTopBar";

const Header = () => {
  const { scrollTop } = useScrollContext(["scrollTop"]);
  const isSticky = scrollTop.get > 40;

  return (
    <>
      <div className="h-[90px] xs:!h-[86px] sm:h-[91px]" />
      <header id="header" className="relative w-full">
        <div
          id="header-sticky"
          className={classNames(
            "fixed left-0 right-0 top-0 z-[3] transition-opacity duration-150"
          )}
        >
          <div className="absolute inset-0 z-[-1] bg-whiteBackdrop backdrop-blur-[4px] transition-opacity duration-200" />
          <div
            className={classNames(
              "absolute inset-0 z-[-1] shadow-globalShadow transition-opacity duration-200",
              isSticky ? "opacity-100" : "opacity-0"
            )}
          />

          <StickyTopBar />
          <div
            id="header-main"
            className={classNames(
              "container-padding-inline m-auto flex min-h-[60px] w-full max-w-[1264px] items-center justify-between"
            )}
          >
            <div className="flex shrink-0 basis-1/4 items-center xl:hidden">
              <div className="xl:hidden">
                <HeaderHamburgerButton />
              </div>
            </div>

            {/* <div className="flex justify-center xl:hidden">
              <Logo className="h-[37px] w-[288px] xs:!h-[20px] xs:!w-[163px] sm:h-[29px] sm:w-[225px]" />
            </div> */}

            <div className="flex items-center justify-start gap-6 overflow-hidden">
              <Logo className="h-[37px] w-[288px] xs:!h-[20px] xs:!w-[163px] sm:h-[29px] sm:w-[225px]" />
              <HeaderNavigation isSticky={true} isTransitioning={!isSticky} />
            </div>

            <div className="flex shrink-0 basis-1/4 items-center justify-end whitespace-nowrap xl:w-auto">
              <HeaderPopoverButtons />
              <div className="hidden xl:block">
                <ThemeToggleButton />
              </div>
            </div>
          </div>
        </div>

        <div className="hidden min-h-[40px] bg-[#FFE9E3] xl:flex dark:bg-transparent">
          <div
            id="header-link-section"
            className="mx-auto flex w-full max-w-[1264px] items-center justify-between px-8"
          >
            <HeaderNavigation isTransitioning={isSticky} />
            <HeaderUserButtons showMenu={!isSticky} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
