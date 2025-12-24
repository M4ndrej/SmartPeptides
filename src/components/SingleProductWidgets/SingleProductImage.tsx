import { Image as ImageType } from "@/types/product";
import AuthorizedImage from "../Image/Image";
import { FC } from "react";
import classNames from "classnames";

interface SingleProductImageProps {
  image: ImageType;
  contain?: boolean;
  priority?: boolean;
}

const SingleProductImage: FC<SingleProductImageProps> = ({
  image,
  contain,
  priority,
}) => {
  return (
    <div className="relative flex h-[621px] w-[495px] cursor-pointer items-center justify-center bg-lightgray sm:h-[380px] sm:w-full md:h-[636px] md:w-full from834:h-[472px] from834:w-[377px] lg:h-[482px] lg:min-w-[472px] xl:h-[633px] xl:min-w-[491px]">
      <AuthorizedImage
        priority={priority}
        src={image.src}
        width={491}
        height={653}
        alt={image.alt}
        draggable={false}
        className={classNames(
          "h-full w-full scale-[.90] select-none sm:scale-[1]",
          contain ? "!object-contain" : "object-cover"
        )}
      />
    </div>
  );
};

export default SingleProductImage;
