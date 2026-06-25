"use client";

import { ProductNew, Variation } from "@/types/product";
import { FC, useEffect, useRef } from "react";
import Image from "next/image";
import classNames from "classnames";
import AuthorizedImage from "../Image/Image";

interface SingleMerchVariationProps {
  index: number;
  variation: Variation;
  mainProduct?: ProductNew;
  selectedVariation?: Variation;
}

const SingleMerchVariation: FC<SingleMerchVariationProps> = ({
  index,
  variation,
  mainProduct,
  selectedVariation,
}) => {
  return (
    <div className="relative flex flex-col items-center gap-2">
      <div
        className={classNames(
          "relative h-16 w-16 rounded-[5px] border-2",
          selectedVariation?.id === variation.id
            ? "border-[#9A9A9F]"
            : "border-lightgray"
        )}
      >
        {!!variation?.image?.[0] && (
          <AuthorizedImage
            src={variation?.image[0].src}
            width={64}
            height={64}
            alt={variation?.image[0].alt}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
};

interface MerchVariationsProps {
  mainProduct: ProductNew;
  selectedVariation?: Variation;
  handleChangeVariation: (variation: Variation) => void;
}

const MerchVariations: FC<MerchVariationsProps> = ({
  mainProduct,
  selectedVariation,
  handleChangeVariation,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (container && selectedVariation) {
      const containerWidth = container.scrollWidth;
      const containerVisibleWidth = container.clientWidth;
      const children = Array.from(container.children);
      const nOfItems = children.length;
      const index = children.findIndex(
        (item) => item.id == `${mainProduct.id}-${selectedVariation.id}`
      );
      if (index > -1) {
        const scrollTo =
          (index / nOfItems) * containerWidth - containerVisibleWidth / 2 + 40;
        container.scrollTo({
          left: scrollTo,
          behavior: "smooth",
        });
      }
    }
  }, [selectedVariation]);

  const numberOfVariations = mainProduct.variations.length;

  if (!numberOfVariations) return null;

  return (
    <div className="mb-2 flex flex-col gap-2">
      <div className="flex gap-1">
        <span className="font-bold">{`ALL VARIATIONS (${numberOfVariations})`}</span>
      </div>
      <div
        className="scrollbar flex w-full max-w-[464px] items-center justify-start gap-4 overflow-x-auto pb-2 sm:max-w-full md:max-w-[400px]"
        ref={containerRef}
      >
        {mainProduct.variations.map((variation, i) => (
          <div
            id={`${mainProduct.id}-${variation.id}`}
            key={variation.id}
            onClick={() => handleChangeVariation(variation)}
            className="cursor-pointer"
          >
            <SingleMerchVariation
              index={i + 1}
              variation={variation}
              mainProduct={mainProduct}
              selectedVariation={selectedVariation}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MerchVariations;
