"use client";

import { FC, useEffect, useState } from "react";
import classNames from "classnames";

interface ProductRatingProps {
  productId: number;
  productRating?: string;
  biggerStars?: boolean;
  //onRating: (productId: number, rating: number) => void;
}

const ProductRating: FC<ProductRatingProps> = ({
  productId,
  productRating,
  biggerStars,
  //onRating,
}) => {
  const [rating, setRating] = useState(productRating);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    setRating(productRating);
  }, [productRating]);

  return (
    <div className="flex items-center">
      {[...Array(5)].map((e, i) => (
        <div
          key={i}
          className={classNames({
            "cursor-pointer": true,
            "w-[20px]": i < 4 && !biggerStars,
            "w-[28px] sm:w-[18px] md:w-[20px]": i < 4 && biggerStars,
          })}
          //onClick={() => onRating(productId, i + 1)}
          onMouseEnter={() => setHoverRating(i + 1)}
          onMouseLeave={() => setHoverRating(0)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={classNames({
              "h-[16px] w-[16px]": !biggerStars,
              "h-[24px] w-[24px] sm:h-[16px] sm:w-[16px] md:h-[16px] md:w-[16px]":
                biggerStars,
            })}
          >
            <path
              d="M9 2L11.116 7.08754L16.6085 7.52786L12.4238 11.1125L13.7023 16.4721L9 13.6L4.29772 16.4721L5.5762 11.1125L1.39155 7.52786L6.88397 7.08754L9 2Z"
              stroke={
                (rating && +rating > i) || (hoverRating && hoverRating > i)
                  ? "#9A9A9F"
                  : "#999999"
              }
              fill={
                (rating && +rating > i) || (hoverRating && hoverRating > i)
                  ? "#9A9A9F"
                  : ""
              }
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default ProductRating;
