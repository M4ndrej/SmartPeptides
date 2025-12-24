import { ProductNew } from "@/types/product";
import classNames from "classnames";
import { FC } from "react";
import Navigation from "../../components/Navigation/Navigation";
import MegaMenu from "../MegaMenu/MegaMenu";
import InsideScroll from "../Scroll/InsideScroll";

interface NavigationAndMegaMenuProps {
  megaMenuOpen: boolean;
  onClose?: () => void;
  handlePopoverAction?: (
    open: boolean,
    type: string,
    fromTop: boolean,
    product?: ProductNew
  ) => void;
  menuType: string;
}

const NavigationAndMegaMenu: FC<NavigationAndMegaMenuProps> = ({
  megaMenuOpen,
  handlePopoverAction,
  onClose,
  menuType,
}) => {
  return (
    <div
      className={classNames({
        "relative w-[330px] overflow-x-hidden bg-white sm:w-full xl:hidden":
          true,
        "overflow-hidden md:w-[710px] from834:!w-[777px] lg:!w-[967px]":
          megaMenuOpen,
      })}
    >
      <div
        className={classNames({
          "bg-white px-0 pl-0 text-white transition duration-1000 ease-in-out sm:h-auto sm:w-full md:h-auto lg:h-auto":
            true,
          "h-[100vh]": megaMenuOpen,
        })}
      >
        <div
          className={classNames({
            "from absolute right-0 top-0 transition duration-300 ease-in-out sm:hidden md:w-[380px] from834:w-[447px] lg:block lg:w-[637px] xl:hidden":
              true,
            "right-[150%]": !megaMenuOpen,
          })}
        >
          {megaMenuOpen && (
            <InsideScroll className="max-h-[100dvh]">
              <MegaMenu menuType={menuType} closePopover={onClose} />
            </InsideScroll>
          )}
        </div>
        <div className="fixed left-0 top-0 z-10 mr-auto h-full w-[330px] bg-darkgray sm:w-full">
          <Navigation
            closePopover={onClose}
            handlePopoverAction={handlePopoverAction}
            iconXinPopover={true}
          />
        </div>
      </div>
    </div>
  );
};

export default NavigationAndMegaMenu;
