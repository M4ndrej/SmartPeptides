"use client";
import {
  FC,
  ReactNode,
  useRef,
  MouseEvent as ReactMouseEvent,
  useState,
  useEffect,
} from "react";
import classNames from "classnames";
import useHover from "@/hooks/useHover";
import { useScrollContext } from "@/context/ScrollContext";
import useIsClientRender from "@/hooks/useIsClientRender";
import useResizeObserver from "@/hooks/useResizeObserver";
import { ResizeCB, ScrollContentClasses, ScrollUpdateCB } from "./Scroll";

interface AppScrollProps {
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

const AppScroll: FC<AppScrollProps> = ({
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
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const [isScrollVisible, setIsScrollVisible] = useState(false);
  const isScrollHovering = useHover(scrollbarRef);
  const [isDragging, setIsDragging] = useState(false);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const [thumbHeight, setThumbHeight] = useState(20);
  const contentRef = useRef<HTMLBodyElement | null>(null);
  const [scrollStartPosition, setScrollStartPosition] = useState<number>(0);
  const [initialContentScrollTop, setInitialContentScrollTop] =
    useState<number>(0);
  const prevScrollTop = useRef<number>(0);

  const isClient = useIsClientRender();

  const { direction, scrollTop } = useScrollContext(["direction", "scrollTop"]);

  const mainUpdateCB = (prev: number, next: number, heightFromTop: number) => {
    direction.set(prev < next ? "down" : "up");
    scrollTop.set(heightFromTop);
  };

  const scrollBarClassNames = (isHovering: boolean, isDragging: boolean) => {
    return classNames(
      "transition-w duration-200",
      isHovering || isDragging ? "w-3 sm:w-2" : "w-2 sm:w-1.5"
    );
  };

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
      window.scrollTo(0, scrollAmount);
    }
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

  function handleThumbPosition() {
    if (
      !contentRef.current ||
      !scrollTrackRef.current ||
      !scrollThumbRef.current
    ) {
      return;
    }

    const contentTop = contentRef.current.scrollTop;
    const contentHeight = contentRef.current.scrollHeight;
    const trackHeight = scrollTrackRef.current.clientHeight;

    let newTop = (contentTop / contentHeight) * trackHeight;
    newTop = Math.min(newTop, trackHeight - thumbHeight);

    mainUpdateCB?.(prevScrollTop.current, newTop, contentTop);
    prevScrollTop.current = newTop;

    requestAnimationFrame(() => {
      scrollThumbRef!.current!.style.top = `${newTop}px`;
    });
  }

  // Disable browser scroll restoration and force top on hard reloads
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const onBeforeUnload = () => {
      // make sure we start at top after a full reload
      window.scrollTo(0, 0);
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, []);

  useEffect(() => {
    contentRef.current = document.documentElement as HTMLBodyElement;
  }, []);

  useResizeObserver(contentRef, handleResize);

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

  function emitCustomScroll() {
    const scrollEvent = new Event("scroll", {
      bubbles: true,
      cancelable: true,
    });
    window.dispatchEvent(scrollEvent);
  }

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
    window.addEventListener("scroll", handleThumbPosition);
    return () => {
      window.removeEventListener("scroll", handleThumbPosition);
    };
  }, [handleThumbPosition]);

  function handleThumbMouseup(e: MouseEvent) {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousemove", handleThumbMousemove);
    document.addEventListener("mouseup", handleThumbMouseup);
    return () => {
      document.removeEventListener("mousemove", handleThumbMousemove);
      document.removeEventListener("mouseup", handleThumbMouseup);
    };
  }, [handleThumbMousemove, handleThumbMouseup]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    handleResize();
  }, [isClient]);

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
      //resizeCB?.(contentTotalHeight > contentVisible);
    }
  }

  return (
    <>
      <div
        id="scrollbar"
        role="scrollbar"
        aria-controls={contentId}
        aria-valuenow={0}
        ref={scrollbarRef}
        className={classNames(
          "pointer-events-none fixed bottom-0 right-0 top-0 z-[9999] flex h-full min-w-1 lg:pointer-events-auto",
          isScrollVisible ? "block" : "hidden",
          scrollBarClassNames &&
            (typeof scrollBarClassNames == "string"
              ? scrollBarClassNames
              : scrollBarClassNames(isScrollHovering, isDragging))
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
      {children}
    </>
  );
};

export default AppScroll;
