"use client";

import classNames from "classnames";
import { FC, useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import Button from "../../Button/Button";
import { Range, getTrackBackground } from "react-range";
import RangeSliderIcon from "../../Icons/RangeSliderIcon";
import { getCroppedImage } from "@/helpers/create_canvas_image";

interface ImageCropProps {
  image: string;
  setCroppedImage: (image: string) => void;
  onCancel: () => void;
  className?: string;
  width?: number;
  height?: number;
}

const ImageCrop: FC<ImageCropProps> = ({
  image,
  setCroppedImage,
  className,
  onCancel,
  width = 352,
  height = 296,
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const onCropChange = (crop: Point) => {
    setCrop(crop);
  };

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onSubmit = async () => {
    try {
      const croppedImage = await getCroppedImage(image, croppedAreaPixels, 0);
      if (croppedImage) {
        setCroppedImage(croppedImage);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className={classNames(
        "flex flex-col items-center gap-2 rounded-[5px] border-4 border-dashed border-gray bg-lightgray px-[32px] py-[24px] transition-all duration-300",
        className
      )}
      style={{ width, height }}
    >
      <div
        className="relative"
        style={{
          width: width - 72,
          height: height - 142,
        }}
      >
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          maxZoom={5}
          cropShape="round"
          objectFit="contain"
          showGrid={false}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          onZoomChange={onZoomChange}
          cropSize={{
            width: height - 142,
            height: height - 142,
          }}
          classes={{
            containerClassName: "!rounded-[5px]",
            cropAreaClassName:
              "!shadow-lightImageBlur !border-4 !border-gray !border-dashed",
          }}
        />
      </div>
      <div className="relative w-full py-2">
        <Range
          step={0.1}
          min={1}
          max={5}
          values={[zoom]}
          onChange={(values) => setZoom(values[0])}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="h-[6px] rounded-sm"
              style={{
                background: getTrackBackground({
                  values: [zoom],
                  colors: ["#E7461E", "#EEEEEE"],
                  min: 1,
                  max: 5,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              key="thumb"
              className="flex h-[22px] w-[30px] items-center justify-center rounded-e-sm bg-white shadow-globalShadow"
            >
              <RangeSliderIcon />
            </div>
          )}
        />
      </div>
      <div className="flex w-full items-center justify-center gap-2">
        <Button
          text="CANCEL"
          customClass="w-full !bg-gray !text-gray2 dark:!bg-transparent !border-none"
          onPress={async () => onCancel()}
        />
        <Button
          text="CROP"
          customClass="w-full"
          highlighted={true}
          onPress={onSubmit}
        />
      </div>
    </div>
  );
};

export default ImageCrop;
