import PreviousButton from "./PreviousButton";
import NextButton from "./NextButton";
import { FC } from "react";

interface GalleryNavigationProps {
  handlePrevious: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleNext: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const GalleryNavigation: FC<GalleryNavigationProps> = ({
  handlePrevious,
  handleNext,
}) => {
  return (
    <div className="absolute top-1/2 flex w-full justify-between px-[56px] sm:px-4 xl:px-8">
      <button
        onClick={handlePrevious}
        className=" flex items-center justify-center text-white focus:outline-none"
        aria-label="Previous image"
      >
        <PreviousButton type="prod-gallery" />
      </button>
      <button
        onClick={handleNext}
        className=" items-center justify-center text-white focus:outline-none"
        aria-label="Next image"
      >
        <NextButton type="prod-gallery" />
      </button>
    </div>
  );
};

export default GalleryNavigation;
