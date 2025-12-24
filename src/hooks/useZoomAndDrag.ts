import { useState, useEffect } from "react";

export const useZoomAndDrag = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [isDragging, setIsDragging] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [isMdScreen, setIsMdScreen] = useState(false);

  const clamp = (val: number, min: number, max: number) =>
    Math.max(min, Math.min(max, val));

  useEffect(() => {
    const handleResize = () => {
      // setIsMobileScreen(window.innerWidth < 1280);
      const width = window.innerWidth;
      setIsMobileScreen(width < 768);
      setIsMdScreen(width >= 768 && width < 1200);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDragging) return;
    setIsZoomed((prev) => !prev);
    setTranslate({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isZoomed) return;
    setDragStart({ x: e.clientX, y: e.clientY });
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isZoomed || !dragStart) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
      setIsDragging(true);
    }

    setTranslate((prev) => ({
      x: isMdScreen || isMdScreen ? clamp(prev.x + deltaX, -200, 200) : prev.x,
      y: clamp(prev.y + deltaY, -150, 150),
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setDragStart(null);
    setTimeout(() => setIsDragging(false), 0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isZoomed) return;
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isZoomed || !dragStart) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStart.x;
    const deltaY = touch.clientY - dragStart.y;

    setTranslate((prev) => ({
      x:
        isMdScreen || isMobileScreen
          ? clamp(prev.x + deltaX, -100, 100)
          : prev.x,
      y: isMdScreen
        ? clamp(prev.y + deltaY, -150, 150)
        : isMobileScreen
          ? clamp(prev.y + deltaY, -70, 70)
          : prev.y,
    }));

    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    setDragStart(null);
  };

  const getCursor = () => {
    if (!isZoomed) return "cursor-zoom-in";
    if (dragStart) return "cursor-grabbing";
    return "cursor-grab";
  };

  const resetZoom = () => {
    setIsZoomed(false);
    setTranslate({ x: 0, y: 0 });
  };

  return {
    isZoomed,
    toggleZoom,
    translate,
    dragStart,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    getCursor,
    resetZoom,
  };
};
