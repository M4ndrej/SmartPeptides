"use client";

import { FC, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface MetaPixelProps {
  pixelId: string;
}

export const MetaPixel: FC<MetaPixelProps> = ({ pixelId }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(pixelId);
        ReactPixel.pageView();
      });
  }, [pathname, searchParams]);

  return null;
};
