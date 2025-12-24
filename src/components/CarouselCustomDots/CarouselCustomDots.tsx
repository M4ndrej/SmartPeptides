import { FC } from "react";
import classNames from "classnames";
import React from "react";
import AuthorizedImage from "../Image/Image";
import { Image as ImageType } from "@/types/product";

interface CarouselProps {
  index: number;
  onClick: () => void;
  active: boolean;
  images: ImageType[];
  customClass?: string;
  wrapperClass?: boolean;
  hasPartedImage?: boolean;
}

const CarouselCustomDots: FC<CarouselProps> = ({
  index,
  active,
  images,
  customClass,
  onClick,
  wrapperClass,
  hasPartedImage,
}) => {
  const imagesList = images
    ?.filter((image, i) => !hasPartedImage || ![0, 1].includes(i))
    ?.map((image, i) => {
      if (hasPartedImage && i === 0) {
        return (
          <div
            className="flex h-full w-full items-center justify-center gap-0"
            key={`parted-${image?.id}`}
          >
            {images?.[1]?.src && (
              <AuthorizedImage
                src={images[1].src}
                width={491}
                height={653}
                alt={images[2].alt}
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
        );
      }
      return (
        <AuthorizedImage
          key={image.id}
          src={image.src}
          width={167}
          height={203}
          alt={image.name}
          className={classNames(
            `h-full w-full select-none object-cover`,
            customClass
          )}
        />
      );
    });

  return (
    <>
      <div
        onClick={() => onClick()}
        className={classNames(
          "custom-dot border-1 mr-[13px]  cursor-pointer snap-center border border-gray bg-lightgray opacity-[0.4] transition-all duration-300 last:mr-0 hover:opacity-[1] sm:mr-[9px] sm:mt-0 sm:h-[99px] sm:min-w-[81px] sm:max-w-[81px] md:mr-[16px] md:h-[205px] md:min-w-[169px] md:max-w-[169px] from834:h-[99px] from834:min-w-[82px] from834:max-w-[82px] lg:h-[132px] lg:w-[108px] lg:max-w-[108px] xl:h-[140px] xl:min-w-[112px] [&_img]:first:object-cover",
          active && "custom-dot--active !border-[#E7461E] opacity-[1]",
          wrapperClass &&
            "md:!h-[145px] md:!min-w-[113px] lg:h-[145px] lg:min-w-[138px] xl:h-[145px] xl:min-w-[138px]"
        )}
      >
        {React.Children.toArray(imagesList)[index]}
      </div>
    </>
  );
};

export default CarouselCustomDots;
