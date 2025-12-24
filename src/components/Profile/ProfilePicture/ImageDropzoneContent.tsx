import Image from "next/image";
import { FC } from "react";

interface ImageDropzoneContentProps {
  imageSize: number;
  isInvalid: boolean;
}

const ImageDropzoneContent: FC<ImageDropzoneContentProps> = ({
  imageSize,
  isInvalid,
}) => {
  if (isInvalid) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <span className="font-D14px-M13px text-center font-bold text-red">
          INVALID FILE TYPE
        </span>
        <span className="font-D12px-M11px text-center font-semibold">
          MAXIMUM FILE SIZE 5MB
        </span>
        <span className="font-D12px-M11px text-center font-semibold">
          SUPPORTED FORMATS
        </span>
        <div className="mt-2 flex items-center justify-center gap-1">
          {["JPG", "PNG"].map((type) => (
            <div
              key={type}
              className="font-D12px-M11px rounded-[1px] bg-yellow px-1 py-0.5 font-black text-white"
            >
              {type}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Image
        width={imageSize}
        height={imageSize}
        src="/images/drop-zone-focus.png"
        alt="Drop zone focus image"
      />
      <div className="flex flex-col items-center justify-center">
        <span className="font-D14px-M13px text-center font-bold">
          DRAG IMAGE HERE
        </span>
        <span className="font-D12px-M11px text-center font-semibold">
          OR CLICK TO ADD
        </span>
      </div>
    </>
  );
};

export default ImageDropzoneContent;
