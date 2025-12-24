"use client";

import { pages } from "@/data/pages_data";
import { sendGAEvent } from "@next/third-parties/google";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const GooglePageView = () => {
  const path = usePathname();

  useEffect(() => {
    const modifiedPath =
      path === "/" ? "/" : path.substring(0, path.length - 1);
    const pageName = pages.find((page) => page.link === modifiedPath)?.title;

    sendGAEvent({
      event: "page_view",
      page_path: modifiedPath,
      page_title: pageName,
    });
  }, [path]);

  return null;
};

export default GooglePageView;
