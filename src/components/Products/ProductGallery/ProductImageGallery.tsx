import { useState, useEffect, FC } from "react";
import CustomModal from "../../CustomModal/CustomModal";
import useStandaloneModalAnimation from "@/hooks/useStandaloneModalAnimation";
import { Image as ImageType } from "@/types/product";
import { useZoomAndDrag } from "@/hooks/useZoomAndDrag";
import GalleryTopBar from "./GalleryTopBar";
import GalleryNavigation from "./GalleryNavigation";
import MainImage from "./MainImage";
import classNames from "classnames";
import useScreenSize from "@/hooks/useScreenSize";

interface ProductImageGalleryProps {
  images: ImageType[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  hasPartedImage?: boolean;
  isVariation?: boolean;
  productName?: string;
  initialIndex?: number;
}

const ProductImageGallery: FC<ProductImageGalleryProps> = ({
  images,
  isOpen,
  setIsOpen,
  hasPartedImage,
  initialIndex,
}) => {
  const { showModal, animationClass } = useStandaloneModalAnimation({
    isOpen,
    animationDuration: 250,
    enterAnimationClass: "animate-slide-in-down",
    exitAnimationClass: "animate-slide-out-up",
  });
  const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);
  const { width } = useScreenSize();
  const isMobileScreen = width < 768;
  const zoomScale = width < 767 ? 2.5 : 1.6;

  const {
    isZoomed,
    toggleZoom,
    translate,
    dragStart,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    getCursor,
    resetZoom,
  } = useZoomAndDrag();

  const adjustedImages = hasPartedImage
    ? [[images[1], images[2]], ...images.slice(3)]
    : images.map((img) => [img]);

  useEffect(() => {
    if (isOpen && initialIndex !== undefined) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  const handleNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % adjustedImages.length);
    resetZoom();
  };

  const handlePrevious = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + adjustedImages.length) % adjustedImages.length
    );
    resetZoom();
  };

  const handleClose = () => {
    setIsOpen(false);
    resetZoom();
  };

  return (
    <CustomModal
      isOpen={showModal}
      onClose={handleClose}
      hideLogo={true}
      modalType="ProductGalleryModal"
      hideCloseButton={true}
      animationClass={animationClass}
    >
      <div
        className={classNames(
          "relative mx-auto flex items-center justify-center overflow-hidden bg-white",
          "h-[643px] xs:h-[550px] sm:w-full md:h-[90vh] md:w-[703px] from834:h-[85vh] from834:w-[794px] lg:h-[90vh] lg:w-[960px] xl:z-[99999999] xl:h-screen xl:w-[664px]",
          "transition-transform duration-300 ease-in-out",
          {
            "scale-[2.5]": isZoomed && isMobileScreen,
            "scale-[1.6]": isZoomed && !isMobileScreen,
            "scale-100": !isZoomed,
            "cursor-zoom-in": !isZoomed,
            "cursor-grab": isZoomed && !dragStart,
            "cursor-grabbing": isZoomed && dragStart,
          }
        )}
        style={{
          transform: `scale(${isZoomed ? zoomScale : 1}) translate(${translate.x}px, ${translate.y}px)`,
          transition: dragStart ? "none" : undefined,
        }}
        onClick={toggleZoom}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={classNames(
            "relative flex h-full w-full items-center justify-center"
          )}
        >
          <MainImage
            adjustedImages={adjustedImages}
            currentIndex={currentIndex}
          />
        </div>
      </div>

      {/* Top bar */}
      <div className="absolute left-0 top-0 z-[9999999] w-screen">
        <GalleryTopBar
          currentIndex={currentIndex}
          isZoomed={isZoomed}
          adjustedImages={adjustedImages}
          toggleZoom={toggleZoom}
          handleClose={handleClose}
        />
      </div>
      {/* Navigation */}
      <div className="absolute left-0 top-1/2 z-[9999999] w-screen -translate-y-1/2">
        <GalleryNavigation
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      </div>
    </CustomModal>
  );
};

export default ProductImageGallery;
