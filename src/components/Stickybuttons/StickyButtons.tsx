"use client";

import { useScrollContext } from "@/context/ScrollContext";
import { useSidePopoverContext } from "@/context/SidePopoverContext";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { FC, useMemo } from "react";
import ChatWidget from "../ChatWidget";
import RecentlyViewedBtn from "./RecentlyViewed/RecentlyViewedBtn";
import ScrollToTop from "./ScrollToTop/ScrollToTop";
import SocialButton from "./SocialButton/SocialButton";

interface StickyButtonsProps {
  productSlugs: string[];
}

const StickyButtons: FC<StickyButtonsProps> = ({ productSlugs }) => {
  const { handlePopoverAction } = useSidePopoverContext();

  const { scrollTop } = useScrollContext(["scrollTop"]);
  const isVisible = scrollTop.get > 200;

  const activePath = usePathname();
  const isProductPage = useMemo(
    () => productSlugs.includes(activePath.slice(1, -1)),
    [activePath, productSlugs]
  );

  return (
    <>
      <div
        id="sticky-btns"
        className={classNames(
          "top pointer-events-none fixed bottom-[100px] right-[20px] z-20 flex flex-col gap-[16px] opacity-0 transition duration-300 sm:right-[10px]",
          isVisible && "pointer-events-auto opacity-100",
          isProductPage && "sm:!bottom-[165px]"
        )}
      >
        {/* <SocialButton
          type="instagram"
          goTo="https://www.instagram.com/peptide.city/"
        />
        <SocialButton type="fb" goTo="https://www.facebook.com/peptide.city/" />
        <ScrollToTop />
        <RecentlyViewedBtn handlePopoverAction={handlePopoverAction} /> */}
      </div>
      <ChatWidget
        className={classNames(
          isProductPage ? "sm:!bottom-[85px] sm:right-[10px]" : "bottom-[20px]"
        )}
      />
    </>
  );
};

export default StickyButtons;
