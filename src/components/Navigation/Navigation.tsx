"use client";

import classNames from "classnames";
import { FC, useState, useEffect, useContext } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AnimateHeight from "react-animate-height";

import { pages } from "@/data/pages_data";
import { peptidesDropMenuLinks } from "@/data/peptides_dropmenu_links";
import { ThemeContext } from "@/context/theme-provider";
import { UPDATE_MEGA_MENU } from "@/context/constants";

import HeaderNavIcons from "../HeaderNavIcons/HeaderNavIcons";
import LoggedUserInfo from "../Header/LoggedUserInfo/LoggedUserInfo";
import MegaMenuMobileSlider from "../MegaMenu/MegaMenuMobileSliderSection";
import NavigationUsefulLinks from "./NavigationUsefulLinks";
import NavigationSidebarSocialAndPhoneInfo from "./NavigationSidebarSocialAndPhoneInfo";
import { DropdownList } from "./Dropdown/DropdownList";
import { DropdownLink } from "./Dropdown/DropdownLink";

interface NavigationProps {
  closePopover?: () => void;
  scrolledFromTop?: number;
  iconXinPopover?: boolean;
  handlePopoverAction?: (open: boolean, type: string, fromTop: boolean) => void;
}

const HeaderNavigation: FC<NavigationProps> = ({
  closePopover,
  handlePopoverAction,
  iconXinPopover,
}) => {
  const activePath = usePathname();
  const activePage = "/" + activePath.split("/")[1];
  const appContext: any = useContext(ThemeContext);
  const { peptidesCat: peptidesCategory, currentRoute } = appContext.state;
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const subRouteLink = currentRoute?.subRoute?.link?.replace("/", "");
  const isNumericSubRoute = /^\d+$/.test(subRouteLink || "");

  const openLoginModal = () => {
    closePopover?.();
    document.querySelector<HTMLElement>(".login-btn")?.click();
  };

  const openRegisterModal = () => {
    closePopover?.();
    document.querySelector<HTMLElement>(".register-btn")?.click();
  };

  const toggleDropdownHandler = (
    event: React.MouseEvent<HTMLDivElement>,
    type: string
  ) => {
    event.preventDefault();
    const isSameDropdown = openDropdown === type;
    setOpenDropdown(isSameDropdown ? null : type);

    appContext.dispatch({
      type: UPDATE_MEGA_MENU,
      payload: {
        megaMenuShown: !isSameDropdown,
        megaMenuType: type,
        peptidesCat: "Peptides",
      },
    });
  };

  const selectPeptideCategoriesHandler = (
    category: string,
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    appContext.dispatch({
      type: UPDATE_MEGA_MENU,
      payload: { peptidesCat: category },
    });
  };

  useEffect(() => {
    if (!openDropdown) {
      appContext.dispatch({
        type: UPDATE_MEGA_MENU,
        payload: { megaMenuShown: false },
      });
    }
  }, [openDropdown, appContext.dispatch]);

  return (
    <div className="relative h-full bg-darkgray">
      <div className="mb-4 ml-4 mr-6 mt-6 flex items-center justify-between bg-darkgray sm:mx-[10px] sm:mr-0 xl:hidden">
        <LoggedUserInfo
          inSidebar
          openLoginModal={openLoginModal}
          openRegisterModal={openRegisterModal}
          closePopover={closePopover}
        />
        <HeaderNavIcons
          isInSidebar
          handlePopoverAction={handlePopoverAction}
          closePopover={closePopover}
          hasIconX={iconXinPopover}
        />
      </div>

      <nav
        id="navigation"
        className="nav h-full overflow-hidden sm:mx-0 sm:min-w-[100%] sm:flex-col sm:items-baseline md:mx-0 md:flex md:min-w-[330px] md:max-w-[330px] md:flex-col md:items-start lg:flex lg:min-w-[330px] lg:flex-col lg:items-start  xl:inline-flex  xl:flex-row xl:items-center xl:gap-[8px]"
      >
        {pages
          .filter((page) => page.showInNav)
          .map((page, index, filteredPages) => {
            const isActivePage =
              activePage === page.link ||
              (page.link === "/shop" &&
                isNumericSubRoute &&
                activePath !== "/");

            const isDropdownOpen = openDropdown === page.title;
            const isPageActive =
              isDropdownOpen || (!openDropdown && isActivePage);

            const isAboveActive =
              index < filteredPages.length - 1 &&
              (filteredPages[index + 1].link === activePage ||
                openDropdown === filteredPages[index + 1].title);

            const pageClasses = classNames(
              "title underlineNew font-D16px-M14px group relative w-full whitespace-nowrap text-textWhite transition-colors duration-200 ease-in-out",
              {
                "flex flex-col": page.hasDropdown,
                "border-b border-[#4A4A4A] text-darkgray xl:border-none":
                  !isPageActive && !isAboveActive && page.title !== "FAQ",
                "bg-[#242424] font-bold border-b-none": isPageActive,
              }
            );

            return (
              <div key={page.link} className={pageClasses}>
                {!page.hasDropdown ? (
                  <Link
                    href={page.link}
                    className="block"
                    onClick={closePopover}
                  >
                    <div className="py-2 pl-4">{page.title}</div>
                  </Link>
                ) : (
                  <DropdownLink
                    page={page}
                    toggleDropdownHandler={toggleDropdownHandler}
                    isDropdownOpen={isDropdownOpen}
                    isActivePage={isActivePage}
                  />
                )}
                {page.hasDropdown && (
                  <AnimateHeight
                    height={isDropdownOpen ? "auto" : 0}
                    duration={200}
                  >
                    <div onClick={(e) => e.stopPropagation()}>
                      <DropdownList
                        page={page}
                        peptidesDropMenuLinks={peptidesDropMenuLinks}
                        selectPeptideCategoriesHandler={
                          selectPeptideCategoriesHandler
                        }
                        activeCategoryInDropdown={peptidesCategory}
                        closePopover={closePopover}
                      />
                      {page.title === "Buy Peptides" && (
                        <MegaMenuMobileSlider
                          closeSidebar={closePopover}
                          peptidesCategory={peptidesCategory}
                        />
                      )}
                    </div>
                  </AnimateHeight>
                )}
              </div>
            );
          })}
        <div className=" flex flex-col items-start px-4 xl:hidden">
          <div className="mb-5 mt-10 grid gap-2">
            <NavigationUsefulLinks closePopover={closePopover} />
          </div>
          <NavigationSidebarSocialAndPhoneInfo />
        </div>
      </nav>
    </div>
  );
};

export default HeaderNavigation;
