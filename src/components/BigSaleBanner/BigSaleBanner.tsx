"use client";

import { FC, useEffect, useState } from "react";
import useIsClientRender from "@/hooks/useIsClientRender";
import { createPortal } from "react-dom";
import { BigSaleBannerModal } from "./BigSaleBannerModal";
import useCameFromMeta from "@/hooks/useCameFromMeta";

export const BigSaleBanner: FC = () => {
  const isClient = useIsClientRender();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cameFromMeta = useCameFromMeta();

  useEffect(() => {
    if (cameFromMeta) {
      setIsModalOpen(true);
    }
  }, [cameFromMeta]);

  if (!isClient || !cameFromMeta) return null;

  return (
    <>
      {isClient &&
        createPortal(
          <BigSaleBannerModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
          />,
          document.body
        )}
    </>
  );
};
