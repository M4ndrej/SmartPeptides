"use client";

import { useContext, useMemo, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import SidePopover from "../SidePopover/SidePopover";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FC } from "react";
import { Pagination, Navigation } from "swiper/modules";
import useSWR from "swr";
import { fetcher } from "@/helpers/fetchers";
import { ProductList } from "@/types/product";
import ArrowLeftIcon from "../Icons/ArrowLeftIcon";
import ArrowRightIcon from "../Icons/ArrowRightIcon";
import CustomProgressBar from "./CustomProgressBar/CustomProgressBar";
import classNames from "classnames";
import { ThemeContext } from "@/context/theme-provider";
import CustomProgressBarMegaMenu from "../CustomProgressBarMegaMenu/CustomProgressBarMegaMenu";
import ProductCard from "../ProductCard/ProductCard";
interface SliderProps {
  data?: any;
  favoritesIcon?: boolean;
  title?: string;
  navType?: string;
  pagination?: boolean;
  section?: string;
  megaMenu?: boolean;
  hideQuickviewAndWishlist?: boolean;
  closeSidebar?: () => void;
  isMegaMenuMobile?: boolean;
}

const Slider: FC<SliderProps> = ({
  data,
  favoritesIcon,
  title,
  navType,
  section,
  pagination,
  megaMenu,
  closeSidebar,
  hideQuickviewAndWishlist,
  isMegaMenuMobile,
}) => {
  const {
    data: bestSellers,
    error,
    isLoading,
  } = useSWR<ProductList>(`/api/products/bestsellers`, fetcher);

  const [hasOverlay, setHasOverlay] = useState(false);

  // const toggleOverlayHandler = () => {
  //   setHasOverlay((prevState) => !prevState);
  // };

  const products = data?.length ? data : bestSellers ? bestSellers : [];

  const [popoverOpened, handlePopover] = useState(false);
  const [popoverType, handlePopoverType] = useState("");
  const [activeProduct, setActiveProduct] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const appContext: any = useContext(ThemeContext);

  const handleSlideChange = (swiper: any) => {
    setCurrentSlide(swiper.activeIndex);
  };

  const sliderData = megaMenu ? data : products;

  const productCard = useMemo(() => {
    return sliderData?.map((item: any, i: number) => (
      <SwiperSlide
        key={i}
        className={products.length < 4 ? "min-w-[263px]" : ""}
      >
        <ProductCard
          overlayOpened={hasOverlay}
          mainProduct={item}
          section={section}
          selectFirstVariation={false}
          hideSelectWeightTooltip={true}
          fixedGridMode="5x5"
          hideQuickviewAndWishlist={hideQuickviewAndWishlist}
          closeSidebar={closeSidebar}
          isMegaMenuMobile={isMegaMenuMobile}
        />
      </SwiperSlide>
    ));
  }, [products, hasOverlay]);

  return (
    <div id="slider">
      {title && (
        <div className="w-full text-center">
          <div className="font-D32px-M24px font-bold">{title}</div>
          <div className="mx-auto mb-[40px] mt-[16px] h-[2px] w-[48px] bg-[#333333]"></div>
        </div>
      )}
      <div
        id="slider-wrapper"
        className={classNames({
          "relative m-auto flex max-w-[1264px] sm:px-0 xl:px-[16px] ": true,
        })}
      >
        <Swiper
          breakpoints={{
            1200: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              speed: 800,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              speed: 800,
              spaceBetween: 10,
            },
            767: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              speed: 800,
              spaceBetween: 10,
            },
            0: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 4,
            },
          }}
          onSlideChange={handleSlideChange}
          pagination={pagination ? { type: "bullets", clickable: true } : false}
          navigation={{
            nextEl: ".arrow-right-slide",
            prevEl: ".arrow-left-slide",
          }}
          // navigation={true}
          modules={[Pagination, Navigation]}
          className={classNames({
            "swiper-container xl:!px-[16px]": true,
            "sm:h-[332px] md:h-[452px] from834:h-[484px] lg:h-[459px] xl:h-[510px]":
              section === "slider-dots",
          })}
        >
          {/* <Overlay onClose={() => setHasOverlay(false)} isOpen={hasOverlay} /> */}
          {productCard}
        </Swiper>
        <div
          id="prev-btn"
          className={classNames({
            "arrow-left-slide group absolute top-[146px] z-[1] flex h-[40px] !min-h-[40px] w-[40px] !min-w-[40px] cursor-pointer items-center justify-center !rounded-[5px] p-0 font-[revicons] shadow-globalShadow transition duration-300 sm:left-[8px] sm:top-[85px] sm:h-[24px] sm:!min-h-[24px] sm:w-[24px] sm:!min-w-[24px] md:left-[15px] md:top-[120px] from834:top-[135px] lg:top-[123px] xl:top-[145px]":
              true,
            hidden: currentSlide === 0,
          })}
        >
          <ArrowLeftIcon type="slider" />
        </div>

        <div
          id="next-btn"
          className="arrow-right-slide group absolute right-[15px] top-[146px] z-[1] flex h-[40px] !min-h-[40px] w-[40px] !min-w-[40px] !max-w-[40px] cursor-pointer items-center justify-center !rounded-[5px]  p-0 font-[revicons] shadow-globalShadow transition duration-300 sm:right-[8px] sm:top-[85px] sm:h-[24px] sm:!min-h-[24px] sm:w-[24px] sm:!min-w-[24px] md:top-[120px] from834:top-[135px] lg:top-[123px] xl:top-[145px]"
        >
          <ArrowRightIcon type="slider" />
        </div>
      </div>
      {navType === "progress" && !megaMenu && (
        <CustomProgressBar currentSlide={currentSlide} />
      )}
      {megaMenu && <CustomProgressBarMegaMenu currentSlide={currentSlide} />}
      <SidePopover
        popoverOpened={popoverOpened}
        type={popoverType}
        fromTop={false}
        activeProduct={activeProduct!}
        onClose={() => {
          handlePopover(false);
        }}
      />
    </div>
  );
};
export default Slider;
