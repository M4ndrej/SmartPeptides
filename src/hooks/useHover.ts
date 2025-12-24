import { useEffect, RefObject, useState } from "react";

const useHover = (ref: RefObject<HTMLElement>) => {
  const [isHovering, setIsHovering] = useState(false);

  const initHover = () => setIsHovering(true);
  const endHover = () => setIsHovering(false);

  useEffect(() => {
    const node = ref.current;

    if (node) {
      node.addEventListener("mouseover", initHover);
      node.addEventListener("mouseleave", endHover);
      node.addEventListener("touchstart", initHover);

      return () => {
        node.removeEventListener("mouseover", initHover);
        node.removeEventListener("mouseleave", endHover);
        node.removeEventListener("touchstart", initHover);
      };
    }
  }, [ref]);

  return isHovering;
};

export default useHover;
