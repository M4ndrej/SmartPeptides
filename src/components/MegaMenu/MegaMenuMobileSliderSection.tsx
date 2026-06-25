import { FC } from "react";
import Slider from "../Slider/Slider";
import useSWR from "swr";
import { fetcher } from "@/helpers/fetchers";
import { MegaMenuProductList } from "@/types/product";
import { pages } from "@/data/pages_data";
import Link from "next/link";

interface MegaMenuMobileSliderProps {
  closeSidebar?: () => void;
  peptidesCategory: string;
}

const MegaMenuMobileSlider: FC<MegaMenuMobileSliderProps> = ({
  closeSidebar,
  peptidesCategory,
}) => {
  const { data: products, isLoading } = useSWR<MegaMenuProductList>(
    `/api/products/megamenu`,
    fetcher
  );
  const matchedPage = pages.find((page) => page.title === peptidesCategory);

  return (
    <div className="hidden pt-4 font-normal sm:block sm:w-[100vw] sm:bg-[#4d4d4d]">
      {peptidesCategory === "Peptides" && (
        <Slider
          navType="progress"
          section="slider"
          megaMenu
          data={products?.peptides}
          closeSidebar={closeSidebar}
          hideQuickviewAndWishlist={true}
          isMegaMenuMobile={true}
        />
      )}
      {peptidesCategory === "Peptide Blends" && (
        <Slider
          navType="progress"
          section="slider"
          megaMenu
          data={products?.blends}
          closeSidebar={closeSidebar}
          hideQuickviewAndWishlist={true}
          isMegaMenuMobile={true}
        />
      )}
      {peptidesCategory === "Cosmetic Peptides" && (
        <Slider
          navType="progress"
          section="slider"
          megaMenu
          data={products?.cosmetics}
          closeSidebar={closeSidebar}
          hideQuickviewAndWishlist={true}
          isMegaMenuMobile={true}
        />
      )}
      {peptidesCategory === "Peptide Supplies" && (
        <Slider
          navType="progress"
          section="slider"
          megaMenu
          data={products?.supplies}
          closeSidebar={closeSidebar}
          hideQuickviewAndWishlist={true}
          isMegaMenuMobile={true}
        />
      )}

      {matchedPage && (
        <Link
          href={matchedPage.link}
          onClick={() => closeSidebar && closeSidebar()}
          className="mx-auto mt-8 flex w-fit items-center gap-4 pb-4 text-[14px] font-normal uppercase leading-[22px] hover:text-gray"
        >
          See all {peptidesCategory}
          <svg
            width="6"
            height="12"
            viewBox="0 0 6 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 11.5L5.5 6L0.5 0.5"
              stroke="#FFFFFF"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      )}
    </div>
  );
};

export default MegaMenuMobileSlider;
