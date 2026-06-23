import classNames from "classnames";
import HeaderTopBar from "./HeaderWidgets/HeaderTopBar";
import Logo from "../Logo/Logo";
import HeaderPopoverButtons from "./HeaderWidgets/HeaderPopoverButtons";
import HeaderNavigation from "./HeaderWidgets/HeaderNavigation";
import HeaderUserButtons from "./HeaderWidgets/HeaderUserButtons";
import HeaderHamburgerButton from "./HeaderWidgets/HeaderHamburgerButton";

export const StaticHeader = () => {
  return (
    <header id="header" className="relative w-full">
      <HeaderTopBar />
      <div
        id="header-main"
        className={classNames(
          "container-padding-inline m-auto flex w-full max-w-[1264px] items-center justify-between py-4"
        )}
      >
        <div className="flex shrink-0 basis-1/4 items-center xl:w-auto">
          <div className="xl:hidden">
            <HeaderHamburgerButton />
          </div>
          <div className="hidden xl:block">
            <Logo className="sm:!h-[16px] sm:!w-[137px]" />
          </div>
        </div>

        <div className="flex justify-center xl:hidden">
          <Logo className="h-[37px] w-[288px] xs:!h-[20px] xs:!w-[163px] sm:h-[29px] sm:w-[225px]" />
        </div>

        <div className="flex shrink-0 basis-1/4 items-center justify-end xl:w-auto">
          <HeaderPopoverButtons />
        </div>
      </div>

      <div className="hidden bg-[#f0f0f0] xl:flex dark:bg-transparent">
        <div
          id="header-link-section"
          className="mx-auto flex w-full max-w-[1264px] items-center justify-between px-8"
        >
          <HeaderNavigation />
          <HeaderUserButtons />
        </div>
      </div>
    </header>
  );
};
