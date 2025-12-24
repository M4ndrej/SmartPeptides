"use client";

import useHover from "@/hooks/useHover";
import useIsClientRender from "@/hooks/useIsClientRender";
import useResizeObserver from "@/hooks/useResizeObserver";
import classNames from "classnames";
import {
  FC,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import "./scroll.css";

export type ScrollContentClasses =
  | string
  | ((isHovering: boolean, isDragging: boolean) => string);

export type ScrollUpdateCB = (
  prevScrollTop: number,
  newScrollTop: number,
  contentTop: number,
  fromBottom: number
) => void;

export type ResizeCB = (isVisible: boolean) => void;

interface ScrollProps {
  children: ReactNode;
  holderClassNames?: ScrollContentClasses;
  scrollbarClassNames?: ScrollContentClasses;
  trackClassNames?: ScrollContentClasses;
  thumbClassNames?: ScrollContentClasses;
  contentClassNames?: ScrollContentClasses;
  scrollBehavior?: ScrollBehavior;
  scrollUpdateCB?: ScrollUpdateCB;
  resizeCB?: ResizeCB;
  contentId?: string;
}

const Scroll: FC<ScrollProps> = ({
  children,
  holderClassNames,
  scrollbarClassNames,
  trackClassNames,
  thumbClassNames,
  contentClassNames,
  scrollBehavior = "smooth",
  scrollUpdateCB,
  resizeCB,
  contentId,
}) => {
  const isClient = useIsClientRender();

  const contentRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  const prevScrollTop = useRef<number>(0);

  const [isScrollVisible, setIsScrollVisible] = useState(false);
  const [thumbHeight, setThumbHeight] = useState(20);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollStartPosition, setScrollStartPosition] = useState<number>(0);
  const [initialContentScrollTop, setInitialContentScrollTop] =
    useState<number>(0);

  const isScrollHovering = useHover(scrollbarRef);

  function emitCustomScroll() {
    const scrollEvent = new Event("scroll", {
      bubbles: true,
      cancelable: true,
    });
    window.dispatchEvent(scrollEvent);
  }

  function handleThumbPosition() {
    if (
      !contentRef.current ||
      !scrollTrackRef.current ||
      !scrollThumbRef.current
    ) {
      return;
    }

    const contentTop = contentRef.current.scrollTop;
    const contentVisible = contentRef.current.clientHeight;
    const contentHeight = contentRef.current.scrollHeight;
    const trackHeight = scrollTrackRef.current.clientHeight;

    let newTop = (contentTop / contentHeight) * trackHeight;
    newTop = Math.min(newTop, trackHeight - thumbHeight);

    const fromBottom = contentHeight - contentVisible - contentTop;

    scrollUpdateCB?.(prevScrollTop.current, newTop, contentTop, fromBottom);
    prevScrollTop.current = newTop;

    requestAnimationFrame(() => {
      scrollThumbRef!.current!.style.top = `${newTop}px`;
    });
  }

  function handleThumbMousedown(e: ReactMouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setScrollStartPosition(e.clientY);
    if (contentRef.current) {
      setInitialContentScrollTop(contentRef.current.scrollTop);
    }
    setIsDragging(true);
  }

  function handleThumbMouseup(e: MouseEvent) {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    }
  }

  function handleThumbMousemove(e: MouseEvent) {
    if (contentRef.current && isDragging) {
      e.preventDefault();
      e.stopPropagation();
      const contentScrollHeight = contentRef.current.scrollHeight;
      const contentClientHeight = contentRef.current.clientHeight;

      const deltaY =
        (e.clientY - scrollStartPosition) * (contentClientHeight / thumbHeight);

      const newScrollTop = Math.min(
        initialContentScrollTop + deltaY,
        contentScrollHeight - contentClientHeight
      );

      contentRef.current.scrollTop = newScrollTop;
    }
  }

  function handleTrackClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (scrollTrackRef.current && contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      const clientHeight = contentRef.current.clientHeight;

      const rect = (e.target as HTMLDivElement).getBoundingClientRect();
      const thumbOffset = -(thumbHeight / 2);

      const clickRatio = (e.clientY - rect.top + thumbOffset) / clientHeight;
      const scrollAmount = Math.floor(clickRatio * scrollHeight);

      contentRef.current.scrollTo({
        top: scrollAmount,
        behavior: scrollBehavior,
      });
    }
  }

  function handleTrackWheel(e: WheelEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      const clientHeight = contentRef.current.clientHeight;
      const delta = e.deltaY;

      const scrollAmount = (delta / clientHeight) * scrollHeight;
      contentRef.current.scrollBy({
        top: scrollAmount,
        behavior: scrollBehavior,
      });
    }
  }

  function handleResize() {
    if (scrollTrackRef.current && contentRef.current) {
      const trackSize =
        scrollTrackRef.current.clientHeight || window.innerHeight;
      const contentVisible = contentRef.current.clientHeight;
      const contentTotalHeight = contentRef.current.scrollHeight;
      const newHeight = Math.max(
        (contentVisible / contentTotalHeight) * trackSize,
        20
      );
      setThumbHeight(newHeight);
      setIsScrollVisible(contentTotalHeight > contentVisible);
      resizeCB?.(contentTotalHeight > contentVisible);
    }
  }

  useResizeObserver(resizeRef, handleResize);

  useEffect(() => {
    if (scrollbarRef.current) {
      const scrollbar = scrollbarRef.current;
      scrollbar.addEventListener("wheel", handleTrackWheel, {
        passive: true,
      });
      return () => {
        scrollbar.removeEventListener("wheel", handleTrackWheel);
      };
    }
  }, [handleTrackWheel]);

  useEffect(() => {
    if (contentRef.current) {
      const content = contentRef.current;
      content.addEventListener("scroll", handleThumbPosition);
      return () => {
        content.removeEventListener("scroll", handleThumbPosition);
      };
    }
  }, [handleThumbPosition]);

  useEffect(() => {
    if (contentRef.current) {
      const content = contentRef.current;
      content.addEventListener("scroll", emitCustomScroll);
      return () => {
        content.removeEventListener("scroll", emitCustomScroll);
      };
    }
  }, [emitCustomScroll]);

  useEffect(() => {
    document.addEventListener("mousemove", handleThumbMousemove);
    document.addEventListener("mouseup", handleThumbMouseup);
    return () => {
      document.removeEventListener("mousemove", handleThumbMousemove);
      document.removeEventListener("mouseup", handleThumbMouseup);
    };
  }, [handleThumbMousemove, handleThumbMouseup]);

  useEffect(() => {
    handleResize();
  }, [isClient]);

  return (
    <div
      id="scroll-container"
      className={classNames(
        "hide-default-scroll overflow-auto",
        holderClassNames &&
          (typeof holderClassNames == "string"
            ? holderClassNames
            : holderClassNames(isScrollHovering, isDragging))
      )}
    >
      <div
        id="scrollbar"
        role="scrollbar"
        aria-controls={contentId}
        aria-valuenow={0}
        ref={scrollbarRef}
        className={classNames(
          "pointer-events-none absolute bottom-0 right-0 top-0 z-[9999] h-full min-w-1 lg:pointer-events-auto",
          isScrollVisible ? "block" : "hidden",
          scrollbarClassNames &&
            (typeof scrollbarClassNames == "string"
              ? scrollbarClassNames
              : scrollbarClassNames(isScrollHovering, isDragging))
        )}
      >
        {/* Scroll Track */}
        <div
          ref={scrollTrackRef}
          onClick={handleTrackClick}
          className={classNames(
            "absolute inset-0 h-full",
            trackClassNames &&
              (typeof trackClassNames == "string"
                ? trackClassNames
                : trackClassNames(isScrollHovering, isDragging))
          )}
        />
        {/* Scroll Thumb */}
        <div
          ref={scrollThumbRef}
          onMouseDown={handleThumbMousedown}
          style={{
            height: `${thumbHeight}px`,
          }}
          className={classNames(
            "absolute right-0 w-full",
            thumbClassNames &&
              (typeof thumbClassNames == "string"
                ? thumbClassNames
                : thumbClassNames(isScrollHovering, isDragging))
          )}
        />
      </div>

      <div
        id={contentId}
        ref={contentRef}
        className={classNames(
          "hide-default-scroll relative overflow-auto",
          contentClassNames &&
            (typeof contentClassNames == "string"
              ? contentClassNames
              : contentClassNames(isScrollHovering, isDragging))
        )}
      >
        <div ref={resizeRef}>{children}</div>
      </div>
    </div>
  );
};

export default Scroll;
