import classNames from "classnames";
import Image from "next/image";
import { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import ImageDropzoneContent from "./ImageDropzoneContent";

interface ImageDropzoneProps {
  onImageChange: (image: string) => void;
  onError: (error: string) => void;
  onImageRejected?: (rejected: string) => void;
  className?: string;
  width?: number;
  height?: number;
}

const ImageDropzone: FC<ImageDropzoneProps> = ({
  onImageChange,
  onError,
  className,
  width = 352,
  height = 296,
}) => {
  const [isInvalid, setIsInvalid] = useState(false);

  const onDrop = useCallback((files: File[]) => {
    onError("");
    const reader = new FileReader();
    reader.onabort = () => onError("Error reading file");
    reader.onerror = () => onError("Error reading file");
    reader.onload = () => onImageChange(reader.result as string);
    reader.readAsDataURL(files[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxSize: 5 * 1024 * 1024,
    maxFiles: 1,
    onError: () => setIsInvalid(true),
    onDropRejected: () => setIsInvalid(true),
    onDropAccepted: () => setIsInvalid(false),
    onDrop,
  });

  return (
    <div
      {...getRootProps({ className: "dropzone" })}
      className={classNames(
        "flex flex-col items-center gap-2 rounded-[5px] border-4 border-dashed border-gray bg-white px-[14px] py-[24px] transition-all duration-300 hover:bg-lightgray",
        className
      )}
      style={{ width, height }}
    >
      <input {...getInputProps()} />
      <ImageDropzoneContent
        imageSize={0.68 * Math.min(width, height)}
        isInvalid={isInvalid}
      />
    </div>
  );
};

export default ImageDropzone;
