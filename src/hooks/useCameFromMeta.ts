"use client";

import { useEffect, useState } from "react";

export default function useCameFromMeta() {
  const [isFromMeta, setIsFromMeta] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get("utm_source");
    if (utmSource === "facebook" || utmSource === "instagram") {
      setIsFromMeta(true);
    }
  }, []);

  return isFromMeta;
}
