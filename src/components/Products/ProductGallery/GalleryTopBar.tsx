import ZoomOutIcon from "./ZoomOutIcon";
import ZoomInIcon from "./ZoomInIcon";
import ModalCloseButton from "@/components/CustomModal/ModalCloseButton";
import { FC } from "react";

interface GalleryTopBarProps {
  currentIndex: number;
  isZoomed: boolean;
  adjustedImages: any[];
  toggleZoom: (e: React.MouseEvent) => void;
  handleClose: () => void;
}

const GalleryTopBar: FC<GalleryTopBarProps> = ({
  currentIndex,
  isZoomed,
  adjustedImages,
  toggleZoom,
  handleClose,
}) => {
  return (
    <div className="absolute top-8 flex w-full items-center justify-between px-8 sm:px-4 md:top-4 lg:top-4 xl:top-[28px]">
      <p className="font-16px-ALL text-[#C8C8C8]">
        {currentIndex + 1} of {adjustedImages.length}
      </p>
      <div className="flex items-center gap-2">
        {isZoomed ? (
          <div
            onClick={(e) => {
              e.stopPropagation();
              toggleZoom(e);
            }}
            className="cursor-pointer select-none"
          >
            <ZoomOutIcon />
          </div>
        ) : (
          <div
            onClick={(e) => {
              e.stopPropagation();
              toggleZoom(e);
            }}
            className="cursor-pointer select-none"
          >
            <ZoomInIcon />
          </div>
        )}
        <ModalCloseButton
          onClose={handleClose}
          className="!static"
          type="prod-gallery"
        />
      </div>
    </div>
  );
};

export default GalleryTopBar;
