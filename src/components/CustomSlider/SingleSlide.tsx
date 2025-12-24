import classNames from "classnames";
import { FC, ReactNode } from "react";
import { SliderOrientation } from "./Slider";

interface SingleSlideProps {
  sliderId: string;
  slideIndex: number;
  children: ReactNode;
  className?: string;
  dimension: number | string;
  orientation: SliderOrientation;
  setActiveIndex?: (index: number) => void;
}

const SingleSlide: FC<SingleSlideProps> = ({
  sliderId,
  children,
  slideIndex,
  className,
  dimension,
  orientation,
  setActiveIndex,
}) => {
  return (
    <div
      id={`${sliderId}-slide-${slideIndex}`}
      className={classNames(
        "flex shrink-0 !select-none items-center justify-center",
        className
      )}
      style={{
        width: orientation == "horizontal" ? dimension : "100%",
        height: orientation == "vertical" ? dimension : "100%",
      }}
      onClick={() => setActiveIndex?.(slideIndex)}
    >
      {children}
    </div>
  );
};

export default SingleSlide;
