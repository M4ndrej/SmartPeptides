import AuthorizedImage from "@/components/Image/Image";
import { Image as ImageType } from "@/types/product";

interface MainImageProps {
  adjustedImages: (ImageType | ImageType[])[];
  currentIndex: number;
}

const MainImage = ({ adjustedImages, currentIndex }: MainImageProps) => {
  const currentImage = adjustedImages[currentIndex];

  if (Array.isArray(currentImage) && currentImage.length === 2) {
    return (
      <div className="flex h-full w-full items-center justify-center gap-0">
        <div className="relative h-full w-1/2">
          <AuthorizedImage
            src={currentImage[0].src}
            fill
            alt={currentImage[0].alt}
            draggable={false}
            className="h-full w-full select-none object-contain"
          />
        </div>
        <div className="relative h-full w-1/2">
          <AuthorizedImage
            src={currentImage[1].src}
            fill
            alt={currentImage[1].alt}
            draggable={false}
            className="h-full w-full select-none object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <AuthorizedImage
        src={
          Array.isArray(currentImage) ? currentImage[0].src : currentImage.src
        }
        fill
        alt={
          Array.isArray(currentImage) ? currentImage[0].alt : currentImage.alt
        }
        draggable={false}
        className="select-none object-contain"
      />
    </div>
  );
};

export default MainImage;
