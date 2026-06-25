import { FC, useCallback, useEffect, useMemo, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselCustomDots from "@/components/CarouselCustomDots/CarouselCustomDots";
import CarouselCustomArrows from "../CarouselCustomArrows/CarouselCustomArrows";
import classNames from "classnames";
import { isMobile, isTablet } from "react-device-detect";
import AuthorizedImage from "../Image/Image";
import { Image as ImageType } from "@/types/product";

interface ImageSlideProps {
  popoverOpened?: boolean;
  images?: ImageType[];
  hasPartedImage?: boolean;
  isVariation?: boolean;
  customClass?: string;
  productName?: string;
  pictureName?: string;
  onClose?: () => void;
}

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ImageSlide: FC<ImageSlideProps> = ({
  popoverOpened,
  images,
  customClass,
  onClose,
  hasPartedImage,
  isVariation,
  productName,
  pictureName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shownContent, setShownContent] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nOfImages = useMemo(() => {
    if (hasPartedImage) {
      return images?.length ? images?.length - 2 : 0;
    }
    return images?.length;
  }, [hasPartedImage, isVariation, images]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (popoverOpened) {
      openPopover();
    } else {
      closePopover();
    }
  }, [popoverOpened]);

  const openPopover = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      setShownContent(true);
    }, 50);
  }, []);

  const closePopover = () => {
    setShownContent(false);
    document.body.style.overflow = "auto";

    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      <div
        className={`fixed inset-0 z-[21] overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "pointer-events-auto opacity-[1]"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`fixed inset-0 bg-backdrop  backdrop-blur-[4px] transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-[1]" : "opacity-0"
          }`}
          onClick={onClose}
        ></div>
        <div
          className={`pointer-events-none absolute inset-y-0 left-[50%] top-[50%] h-[100%] w-[100%] translate-x-[-50%] translate-y-[-50%] p-[16px] transition-all duration-300 ease-in-out sm:p-[10px] md:p-[24px] ${customClass}`}
        >
          <div
            className={`relative m-auto flex h-full w-[502px] flex-col items-center justify-center gap-y-[16px] transition-all duration-300 ease-in-out sm:w-[100%] sm:gap-y-[10px] lg:w-[592px] [&_.react-multi-carousel-dot-list]:relative ${
              shownContent
                ? "translate-y-0 opacity-[1]"
                : "translate-y-[-100px] opacity-0"
            } ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
          >
            <div className="flex w-[100%] items-center justify-between">
              <p className="font-D24px-M16px font-bold text-white">
                {productName}
              </p>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`group cursor-pointer select-none ${
                  isOpen ? "pointer-events-auto" : "pointer-events-none"
                }`}
                onClick={onClose}
              >
                <path
                  d="M1 1.00293L16.9989 17.0018"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="transition duration-300 group-hover:stroke-[#9A9A9F]"
                />
                <path
                  d="M1 16.999L16.9989 1.00013"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="transition duration-300 group-hover:stroke-[#9A9A9F]"
                />
              </svg>
            </div>

            <Carousel
              showDots={!isMobile || isTablet}
              arrows={!isMobile || isTablet}
              renderDotsOutside
              swipeable={true}
              draggable={true}
              responsive={responsive}
              customTransition="transform 300ms ease-in-out"
              transitionDuration={500}
              containerClass={`w-[502px] h-[580px] mb-[30px] lg:w-[592px] lg:h-[640px] carousel-container relative !static md:h-[580px] md:w-[502px] sm:w-[100%] sm:h-[auto] ${
                shownContent ? "pointer-events-auto" : "pointer-events-none"
              }`}
              dotListClass="w-[100%] snap-x sm:overflow-y-hidden !justify-start sm:overflow-auto sm:flex-nowrap sm:!justify-start"
              itemClass="carousel-item-padding-40-px"
              customLeftArrow={
                <CarouselCustomArrows
                  side="left"
                  onClick={() => {}}
                  productItemArrows={true}
                  slide={true}
                />
              }
              customRightArrow={
                <CarouselCustomArrows
                  side="right"
                  onClick={() => {}}
                  productItemArrows={true}
                  slide={true}
                />
              }
              customDot={
                <CarouselCustomDots
                  index={0}
                  active
                  images={images!}
                  onClick={() => {}}
                  hasPartedImage={hasPartedImage}
                  wrapperClass
                />
              }
              beforeChange={handleSlideChange}
            >
              {images
                ?.filter((image, i) => !hasPartedImage || ![0, 1].includes(i))
                ?.map((image: any, i: number) => (
                  <div
                    key={i}
                    className={classNames({
                      "relative flex h-[580px] w-[502px] items-center justify-center bg-lightgray sm:h-[60vh] sm:w-[100%] md:h-[580px] md:w-[auto] lg:h-[640px] lg:w-[592px]":
                        true,
                    })}
                  >
                    {hasPartedImage && i === 0 ? (
                      <div className="flex h-full w-full scale-90 items-center justify-center gap-0">
                        {images?.[1]?.src && (
                          <AuthorizedImage
                            src={images[1].src}
                            width={491}
                            height={653}
                            alt={images[1].alt}
                            draggable={false}
                            className="object-fit h-full w-full !scale-100 select-none"
                          />
                        )}
                        {image?.src && (
                          <AuthorizedImage
                            src={image.src}
                            width={491}
                            height={653}
                            alt={image.alt}
                            draggable={false}
                            className="object-fit h-full w-full !scale-100 select-none"
                          />
                        )}
                      </div>
                    ) : (
                      <AuthorizedImage
                        src={image.src}
                        width={502}
                        height={709}
                        alt={image.alt}
                        draggable={false}
                        className={classNames({
                          "object-fit h-full w-full select-none": true,
                          "object-cover sm:scale-[1.1] sm:object-contain":
                            i === 0,
                        })}
                      />
                    )}
                  </div>
                ))}
            </Carousel>
            <div className="absolute  left-0 z-[9000] w-full sm:bottom-[21%] md:bottom-[336px] lg:bottom-[316px] xl:bottom-[150px]">
              <div className="flex w-full items-center justify-between">
                <p className="font-D16px-M13px font-bold text-white">
                  {images?.[currentIndex]?.name}
                </p>
                <p className="font-D16px-M12px font-normal text-white">
                  Picture {currentIndex + 1}/{nOfImages}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlide;
