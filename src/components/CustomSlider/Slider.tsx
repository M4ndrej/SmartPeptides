"use client";

import useMeasure from "@/hooks/useMeasure";
import classNames from "classnames";
import {
  Children,
  FC,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  TouchEvent as ReactTouchEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import SingleSlide from "./SingleSlide";

export type SliderOrientation = "horizontal" | "vertical";

const determineModification = (perView: number, translateMod?: number) => {
  const val = Math.floor(perView / 2);
  const evenMod = translateMod ?? 0.5;
  const isEven = perView % 2 === 0;
  return isEven ? evenMod : val;
};

const calculateTranslateVal = (
  index: number,
  total: number,
  perView: number,
  slideDimension: number,
  gap: number,
  translateMod?: number
) => {
  const modification = determineModification(perView, translateMod);
  if (index < modification) return 0;
  if (index > total + 1 - perView && total > perView) {
    return -(total - perView) * (slideDimension + gap);
  }
  return -(index - modification) * (slideDimension + gap);
};

const calculateSlideDimension = (
  width: number,
  perView: number,
  gap: number
) => {
  if (width === 0) return 0;
  return (width + gap) / perView - gap;
};

const calculateStableSlideDimension = (
  slideDimension: number,
  perView: number,
  gap: number
) => {
  if (slideDimension) return slideDimension;
  const percent = (100 / perView).toFixed(2);
  const modification = gap - gap / perView;
  return `calc(${percent}% - ${modification}px)`;
};

const calculateDragEndMove = (
  difference: number,
  slideDimension: number,
  perView: number
) => {
  if (difference > slideDimension) return perView;
  if (difference < -slideDimension) return -perView;
  if (difference > slideDimension / 5) return 1;
  if (difference < -slideDimension / 5) return -1;
  return 0;
};

export type ArrowRenderer = (
  handleChangeSlide: (size?: number) => void,
  activeIndex: number,
  totalSlides: number,
  slidesPerView: number
) => ReactNode;

export type DotsRenderer = (
  setActiveIndex: (index: number) => void,
  activeIndex: number,
  totalSlides: number,
  perView: number
) => ReactNode;

interface SliderProps {
  id?: string;
  children: ReactNode;
  activeIndex?: number;
  setActiveIndex?: (val: number) => void;
  width?: number;
  height?: number;
  fixedSlideWidth?: number;
  fixedSlideHeight?: number;
  orientation?: SliderOrientation;
  slidesPerView?: number;
  translateMod?: number;
  gap?: number;
  autoplay?: false | number;
  setSlideOnClick?: boolean;
  dragDesktop?: boolean;
  dragMobile?: boolean;
  duration?: number;
  className?: string;
  containerClassName?: string;
  slideClassName?: string;
  renderPrevArrow?: ArrowRenderer;
  renderNextArrow?: ArrowRenderer;
  renderDots?: DotsRenderer;
  arrowsOutside?: boolean;
  dotsOutside?: boolean;
  relativeContainer?: boolean;
}

const Slider: FC<SliderProps> = ({
  id,
  children,
  activeIndex: activeIndexControlled,
  setActiveIndex: setActiveIndexControlled,
  width,
  height,
  fixedSlideHeight,
  fixedSlideWidth,
  orientation = "horizontal",
  slidesPerView = 2,
  gap = 0,
  setSlideOnClick = true,
  dragDesktop = false,
  dragMobile = true,
  autoplay = false,
  duration = 0.5,
  className,
  containerClassName,
  slideClassName,
  renderPrevArrow,
  renderNextArrow,
  renderDots,
  translateMod,
  arrowsOutside = false,
  dotsOutside = false,
  relativeContainer = true,
}) => {
  const measureRef = useRef<HTMLDivElement>(null);
  const { width: measuredWidth, height: measuredHeight } =
    useMeasure(measureRef);

  const sliderRef = useRef<HTMLDivElement>(null);

  const randomId = useId();
  const usableId = id || randomId;

  const usableWidth = width || measuredWidth;
  const usableHeight = height || measuredHeight;

  const slideCount = Children.count(children);

  const [activeIndexInternal, setActiveIndexInternal] = useState(0);
  const activeIndex = activeIndexControlled ?? activeIndexInternal;
  const setActiveIndex = setActiveIndexControlled ?? setActiveIndexInternal;

  const [isDragging, setIsDragging] = useState(false);

  const dragStartVal = useRef(0);
  const dragStartOtherDirVal = useRef(0);
  const dragTranslateVal = useRef(0);

  const translateStyle = useMemo(
    () => (orientation === "horizontal" ? "translateX" : "translateY"),
    [orientation]
  );

  const slideDimension = useMemo(() => {
    if (orientation === "vertical" && fixedSlideHeight) {
      return fixedSlideHeight;
    }
    if (orientation === "horizontal" && fixedSlideWidth) {
      return fixedSlideWidth;
    }
    const dim = orientation === "horizontal" ? usableWidth : usableHeight;
    return calculateSlideDimension(dim, slidesPerView, gap);
  }, [
    usableWidth,
    usableHeight,
    orientation,
    slidesPerView,
    gap,
    fixedSlideHeight,
    fixedSlideWidth,
  ]);

  const stableSlideDimension = useMemo(
    () => calculateStableSlideDimension(slideDimension, slidesPerView, gap),
    [slideDimension, slidesPerView, gap]
  );

  const actualSlidesPerView = useMemo(() => {
    if (orientation === "vertical" && fixedSlideHeight) {
      return Math.floor(usableHeight / (fixedSlideHeight + gap));
    }
    if (orientation === "horizontal" && fixedSlideWidth) {
      return Math.floor(usableWidth / (fixedSlideWidth + gap));
    }
    return slidesPerView;
  }, [
    slidesPerView,
    usableHeight,
    usableWidth,
    orientation,
    fixedSlideHeight,
    fixedSlideWidth,
    gap,
  ]);

  const currentTranslateVal = useMemo(() => {
    const dim = orientation === "horizontal" ? usableWidth : usableHeight;
    if (dim == 0) return 0;
    return calculateTranslateVal(
      activeIndex,
      slideCount,
      actualSlidesPerView,
      slideDimension,
      gap,
      translateMod
    );
  }, [activeIndex, slideCount, actualSlidesPerView, slideDimension, gap]);

  const handleMoveBy = (amount: number) => {
    const sign = Math.sign(amount);
    const absAmount = Math.abs(amount);
    const compareVal = sign < 0 ? activeIndex : slideCount - 1 - activeIndex;
    const modifier = Math.min(absAmount, compareVal);
    setActiveIndex(activeIndex + sign * modifier);
  };

  const handleBack = (amount = actualSlidesPerView) => handleMoveBy(-amount);
  const handleForward = (amount = actualSlidesPerView) => handleMoveBy(amount);

  const handleManualTransform = (val: number) => {
    if (sliderRef.current) {
      const style = `${translateStyle}(${val}px)`;
      sliderRef!.current!.style.transform = style;
    }
  };

  const handleDragStart = (
    e: ReactTouchEvent<HTMLDivElement> | ReactMouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const clientY = "clientY" in e ? e.clientY : e.touches[0].clientY;
    const clientX = "clientX" in e ? e.clientX : e.touches[0].clientX;
    const clientVal = orientation === "horizontal" ? clientX : clientY;
    const otherDirVal = orientation === "horizontal" ? clientY : clientX;

    // Set drag values
    dragStartVal.current = clientVal;
    dragStartOtherDirVal.current = otherDirVal;
    dragTranslateVal.current = currentTranslateVal;
    setIsDragging(true);
  };

  const handleDraging = (e: MouseEvent | TouchEvent) => {
    e.stopPropagation();
    const clientY = "clientY" in e ? e.clientY : e.touches[0].clientY;
    const clientX = "clientX" in e ? e.clientX : e.touches[0].clientX;
    const clientVal = orientation === "horizontal" ? clientX : clientY;
    const otherDirVal = orientation === "horizontal" ? clientY : clientX;
    const diff = dragStartVal.current - clientVal;
    const otherDirDiff = dragStartOtherDirVal.current - otherDirVal;

    if (Math.abs(otherDirDiff) > Math.abs(diff)) {
      return;
    }

    dragTranslateVal.current = currentTranslateVal - diff;
    handleManualTransform(dragTranslateVal.current);
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent) => {
    e.stopPropagation();
    const clientY = "clientY" in e ? e.clientY : e.changedTouches[0].clientY;
    const clientX = "clientX" in e ? e.clientX : e.changedTouches[0].clientX;
    const clientVal = orientation === "horizontal" ? clientX : clientY;
    const diff = dragStartVal.current - clientVal;

    const moveBy = calculateDragEndMove(
      diff,
      slideDimension,
      actualSlidesPerView
    );

    if (
      moveBy &&
      activeIndex + moveBy >= 0 &&
      activeIndex + moveBy < slideCount
    ) {
      handleMoveBy(moveBy);
    } else {
      requestAnimationFrame(() => {
        handleManualTransform(currentTranslateVal);
      });
    }

    // Reset drag values
    dragTranslateVal.current = currentTranslateVal;
    dragStartVal.current = 0;
    dragStartOtherDirVal.current = 0;
    setIsDragging(false);
  };

  // Dragging events
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDraging);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("mouseleave", handleDragEnd);
      window.addEventListener("touchmove", handleDraging);
      window.addEventListener("touchend", handleDragEnd);
    }
    return () => {
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("mousemove", handleDraging);
      window.removeEventListener("mouseleave", handleDragEnd);
      window.removeEventListener("touchmove", handleDraging);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging]);

  // Autoplay
  useEffect(() => {
    if (autoplay && !isDragging) {
      const interval = setInterval(() => {
        const index = activeIndex !== slideCount - 1 ? activeIndex + 1 : 0;
        setActiveIndex(index);
      }, autoplay * 1000);
      return () => clearInterval(interval);
    }
  }, [activeIndex, autoplay, isDragging]);

  return (
    <>
      <div
        ref={measureRef}
        className={classNames(
          "flex h-full w-full items-start justify-start overflow-hidden",
          relativeContainer && "relative",
          containerClassName
        )}
        style={{
          width: width || "100%",
          height: height || "100%",
        }}
      >
        <div
          ref={sliderRef}
          className={classNames(
            "flex h-full grow items-center justify-start",
            dragDesktop && "select-none",
            orientation === "horizontal" ? "flex-row" : "flex-col",
            className
          )}
          style={{
            width: usableWidth || "100%",
            height: usableHeight || "100%",
            transform: `${translateStyle}(${currentTranslateVal}px)`,
            transition: "transform",
            transitionDuration: isDragging ? `100ms` : `${duration * 1000}ms`,
            touchAction: orientation === "horizontal" ? "pan-y" : "pan-x",
            gap,
          }}
          onMouseDown={dragDesktop ? handleDragStart : undefined}
          onTouchStart={dragMobile ? handleDragStart : undefined}
        >
          {Children.map(children, (child, index) => (
            <SingleSlide
              key={index}
              slideIndex={index}
              sliderId={usableId}
              className={slideClassName}
              dimension={stableSlideDimension}
              orientation={orientation}
              setActiveIndex={setSlideOnClick ? setActiveIndex : undefined}
            >
              {child}
            </SingleSlide>
          ))}
        </div>
        {!arrowsOutside &&
          slideCount > 1 &&
          renderPrevArrow?.(
            handleBack,
            activeIndex,
            slideCount,
            actualSlidesPerView
          )}
        {!arrowsOutside &&
          slideCount > 1 &&
          renderNextArrow?.(
            handleForward,
            activeIndex,
            slideCount,
            actualSlidesPerView
          )}
        {!dotsOutside &&
          renderDots?.(
            setActiveIndex,
            activeIndex,
            slideCount,
            actualSlidesPerView
          )}
      </div>
      {arrowsOutside &&
        slideCount > 1 &&
        renderPrevArrow?.(
          handleBack,
          activeIndex,
          slideCount,
          actualSlidesPerView
        )}
      {arrowsOutside &&
        slideCount > 1 &&
        renderNextArrow?.(
          handleForward,
          activeIndex,
          slideCount,
          actualSlidesPerView
        )}
      {dotsOutside &&
        renderDots?.(
          setActiveIndex,
          activeIndex,
          slideCount,
          actualSlidesPerView
        )}
    </>
  );
};

export default Slider;
