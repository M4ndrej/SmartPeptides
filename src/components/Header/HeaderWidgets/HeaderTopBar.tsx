import { FC } from "react";
import HeaderSearchButton from "./HeaderSearchButton";
import HeaderSocials from "./HeaderSocials";
import HeaderUserButtons from "./HeaderUserButtons";
import HeaderWishlistButton from "./HeaderWishlistButton";
import ThemeToggleButton from "@/components/ThemeToggleButton/ThemeToggleButton";

interface HeaderTopBarProps {
  isOpen?: boolean;
}

const HeaderTopBar: FC<HeaderTopBarProps> = ({ isOpen = true }) => {
  return (
    <div
      id="header-top-bar"
      className="flex h-[30px] items-center border-b-[1px] border-[#FFE9E3] py-[3px] dark:border-borderColor"
    >
      <div className="container-padding-inline relative m-[auto] flex w-full max-w-[1264px] justify-between sm:flex sm:max-w-none">
        <div className="sm:hidden md:order-first md:hidden xl:order-first"></div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform sm:hidden">
          <div className="font-13px-ALL sm:font-12px-ALL mx-[20px]">
            Free shipping for all order over $150 USD
          </div>
        </div>

        <div className="flex items-center sm:order-first md:order-first lg:order-first xl:order-last">
          {/* <HeaderSocials className="h-4 sm:top-0" /> */}
        </div>

        <div className="sm:order-last md:order-last lg:order-last xl:hidden">
          <div className="flex items-center justify-end gap-4">
            <div className="flex items-center justify-end gap-2">
              <div className="md:hidden lg:hidden">
                <HeaderWishlistButton isSmaller={true} />
              </div>
              <div>
                <HeaderSearchButton isSmaller={true} />
              </div>
              <div>
                <HeaderUserButtons isJustIcon={true} showMenu={isOpen} />
              </div>
              <div className="xl:hidden">
                <ThemeToggleButton isSmaller={true} width={24} height={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTopBar;
