"use client";

import useScreenSize from "@/hooks/useScreenSize";
import { ProductList } from "@/types/product";
import classNames from "classnames";
import { FC, useState } from "react";
import Slider from "../CustomSlider/Slider";
import SliderArrow from "../CustomSlider/SliderArrow";
import SliderDots from "../CustomSlider/SliderDots";
import SliderDotsLine from "../CustomSlider/SliderDotsLine";
import Overlay from "../Overlay/Overlay";
import ProductCard from "../ProductCard/ProductCard";
import ProductSkeleton from "../Skeletons/ProductSkeleton";
import useSWR from "swr";
import { fetcher } from "@/helpers/fetchers";

const getPerView = (width: number) => {
  if (width >= 1024 || !width) return 4;
  if (width >= 767) return 3;
  return 2;
};

const getGap = (width: number) => {
  if (width >= 1200 || !width) return 16;
  if (width >= 767) return 10;
  return 4;
};

interface ProductSliderProps {
  products?: ProductList;
  isLoading?: boolean;
  loadingNumber?: number;
  dotsType?: "progress" | "dots";
  closeSidebar?: () => void;
  className?: string;
}

const ProductSlider: FC<ProductSliderProps> = ({
  products,
  isLoading,
  loadingNumber = 4,
  dotsType,
  closeSidebar,
  className,
}) => {
  const { data: bestSellers, error } = useSWR<ProductList>(
    `/api/products/bestsellers`,
    fetcher
  );

  const usableProducts = products?.length
    ? products
    : bestSellers
      ? bestSellers
      : [];

  const { width } = useScreenSize();
  const slidesPerView = getPerView(width);
  const gap = getGap(width);

  const len = products?.length || 0;

  const [hasOverlay, setHasOverlay] = useState(false);

  return (
    <>
      <Overlay onClose={() => setHasOverlay(false)} isOpen={hasOverlay} />
      <Slider
        key={isLoading ? "loading" : "loaded"}
        slidesPerView={slidesPerView}
        translateMod={0}
        dragDesktop={true}
        setSlideOnClick={false}
        autoplay={false}
        gap={gap}
        duration={0.5}
        orientation="horizontal"
        containerClassName={classNames(
          dotsType && "!pb-10 sm:!pb-16",
          className
        )}
        className={classNames(len && len < 4 && "justify-center")}
        slideClassName="!items-start"
        renderDots={(setActiveIndex, activeIndex, totalSlides, perView) =>
          dotsType === "progress" ? (
            <SliderDotsLine
              setActiveIndex={setActiveIndex}
              activeIndex={activeIndex}
              totalSlides={totalSlides}
              perView={perView}
              className="absolute bottom-0 left-1/2 -translate-x-1/2"
            />
          ) : dotsType === "dots" ? (
            <SliderDots
              setActiveIndex={setActiveIndex}
              activeIndex={activeIndex}
              totalSlides={totalSlides}
              perView={perView}
              className="absolute bottom-0 left-1/2 -translate-x-1/2"
            />
          ) : null
        }
        arrowsOutside={true}
        renderNextArrow={(
          handleChangeSlide,
          activeIndex,
          totalSlides,
          slidesPerView
        ) => (
          <SliderArrow
            type="right"
            handleChangeSlide={handleChangeSlide}
            activeIndex={activeIndex}
            totalSlides={totalSlides}
            slidesPerView={slidesPerView}
            responsive={true}
            className="!right-0 !top-40 sm:!right-2 sm:!top-28 md:!right-2"
          />
        )}
        renderPrevArrow={(
          handleChangeSlide,
          activeIndex,
          totalSlides,
          slidesPerView
        ) => (
          <SliderArrow
            type="left"
            handleChangeSlide={handleChangeSlide}
            activeIndex={activeIndex}
            totalSlides={totalSlides}
            slidesPerView={slidesPerView}
            responsive={true}
            className="!left-0 !top-40 sm:!left-2 sm:!top-28 md:!left-2"
          />
        )}
      >
        {isLoading
          ? Array.from({ length: loadingNumber }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))
          : usableProducts?.map((product, index) => (
              <ProductCard
                key={product.id}
                mainProduct={product}
                // cardSize="md"
                selectFirstVariation={false}
                hideSelectWeightTooltip={true}
                // priority={index < 4} // Prioritize first 4 products
                // className="min-h-[262px] xs:min-h-[197px] md:min-h-[277px] from834:min-h-[309px] lg:h-[284px] xl:h-[333px]"
                closeSidebar={closeSidebar}
              />
            ))}
      </Slider>
    </>
  );
};

export default ProductSlider;
