import { FC } from "react";
import Triangle from "../Icons/Triangle";

interface BannerTitleProps {
  title: string;
  bannerColor?: string;
  titleColor?: string;
}

const BannerTitle: FC<BannerTitleProps> = ({
  title,
  bannerColor,
  titleColor,
}) => {
  return (
    <div
      className="absolute left-[-5px] top-3 flex items-center justify-center rounded-b-[5px] rounded-tr-[5px] px-3 py-2"
      style={{
        backgroundColor: bannerColor ?? "#333333",
      }}
    >
      <Triangle
        className="absolute left-0 top-[-5px]"
        width={5}
        height={5}
        style={{
          filter: "brightness(0.66)",
          fill: bannerColor ?? "#333333",
        }}
      />
      <span
        className="font-14px-ALL select-none text-center font-bold uppercase"
        style={{
          color: titleColor ?? "#FFFFFF",
        }}
      >
        {title}
      </span>
    </div>
  );
};

export default BannerTitle;
