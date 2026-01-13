"use client";

import { FC, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface MetaPixelProps {
  pixelIds: string[];
}

export const MetaPixel: FC<MetaPixelProps> = ({ pixelIds }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialized = useRef(false);

  useEffect(() => {
    if (!pixelIds.length) return;

    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        if (!initialized.current) {
          pixelIds.forEach((id) => {
            ReactPixel.init(id);
          });
          initialized.current = true;
        }
        ReactPixel.pageView();
      });
  }, [pathname, searchParams, pixelIds]);

  return null;
};
