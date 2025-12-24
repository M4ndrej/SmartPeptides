"use client";

import { FC } from "react";

interface OurProductsEmptyStateProps {
  title?: string;
}

const OurProductsEmptyState: FC<OurProductsEmptyStateProps> = ({ title }) => {
  return (
    <div className="text-center">
      <div className="font-D24px-M18px">{title}</div>
    </div>
  );
};

export default OurProductsEmptyState;
