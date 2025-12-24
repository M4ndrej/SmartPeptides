"use client";

import MegaMenu from "@/components/MegaMenu/MegaMenu";
import Overlay from "@/components/Overlay/Overlay";
import { useThemeContext } from "@/context/theme-provider";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";

interface HeaderMegaMenuProps {
  isOpen: boolean;
  menuType: string;
  setIsOpen: (value: boolean) => void;
}

const HeaderMegaMenu: FC<HeaderMegaMenuProps> = ({
  isOpen,
  menuType,
  setIsOpen,
}) => {
  const appContext = useThemeContext();
  const path = usePathname();
  const [isMearchModalOpen, setIsMerchModalOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [
    path,
    appContext.state.showCartModal,
    appContext.state.productAddedToCart,
  ]);

  // useEffect(() => {
  //   const mainScrollContent = document.querySelector(
  //     "#main-scroll-content"
  //   ) as HTMLElement;

  //   const scrollBar = document.querySelector("#scrollbar") as HTMLElement;

  //   if (isOpen) {
  //     mainScrollContent.style.overflow = "hidden";
  //     scrollBar.style.display = "none";
  //     document.body.classList.add("megaMenuOpen");
  //   } else {
  //     mainScrollContent.style.overflow = "";
  //     scrollBar.style.display = "block";
  //     document.body.classList.remove("megaMenuOpen");
  //   }
  // }, [isOpen]);

  return (
    <>
      <Overlay
        isOpen={isOpen}
        onClose={() => {}}
        customClass={classNames("xl:!top-[140px] !hidden xl:!flex")}
      />
      <AnimateHeight
        height={isOpen ? "auto" : 0}
        duration={200}
        className={classNames(
          "ease-[cubic-bezier(0.11, 0, 0.5, 0)] absolute left-0 z-[99999999999999] lg:top-[32px] xl:top-[40px] xl:w-[100vw]"
        )}
      >
        <div
          className={classNames("z-[99999999999999]")}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => !isMearchModalOpen && setIsOpen(false)}
        >
          <MegaMenu
            menuType={menuType}
            setIsMearchModalOpen={setIsMerchModalOpen}
          />
        </div>
      </AnimateHeight>
    </>
  );
};

export default HeaderMegaMenu;
