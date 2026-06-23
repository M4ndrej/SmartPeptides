import { FC, useEffect, useState } from "react";
import Image from "next/image";

interface ReviewProps {
  avgRating: string;
  reviewCount: number;
  reviews?: any[];
}

const ProductReviews: FC<ReviewProps> = ({
  avgRating,
  reviewCount,
  reviews,
}) => {
  const [oneStarRatings, setOneStarRatings] = useState(0);
  const [twoStarRatings, setTwoStarRatings] = useState(0);
  const [threeStarRatings, setThreeStarRatings] = useState(0);
  const [fourStarRatings, setFourStarRatings] = useState(0);
  const [fiveStarRatings, setFiveStarRatings] = useState(0);
  const [oneStarPercent, setOneStarPercent] = useState(0);
  const [twoStarPercent, setTwoStarPercent] = useState(0);
  const [threeStarPercent, setThreeStarPercent] = useState(0);
  const [fourStarPercent, setFourStarPercent] = useState(0);
  const [fiveStarPercent, setFiveStarPercent] = useState(0);
  const [averageRating, setAverageRating] = useState(
    parseFloat(avgRating).toFixed(2)
  );

  const [productReviews, setProductReviews] = useState(reviews);

  const calculatePercentage = (partialValue: number, totalValue: number) => {
    return Math.round((100 * partialValue) / totalValue);
  };

  const calculateAverage = (numbers: number[]) => {
    let sum = numbers.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    let avg = sum / numbers.length;
    return avg.toFixed(2);
  };

  useEffect(() => {
    const setRatings = () => {
      let oneStar = 0;
      let twoStars = 0;
      let threeStars = 0;
      let fourStars = 0;
      let fiveStars = 0;
      let allRatings: number[] = [];

      if (productReviews) {
        productReviews.map((review) => {
          if (review.rating == 1) oneStar++;
          else if (review.rating == 2) twoStars++;
          else if (review.rating == 3) threeStars++;
          else if (review.rating == 4) fourStars++;
          else if (review.rating == 5) fiveStars++;

          allRatings.push(review.rating);
        });

        setOneStarRatings(oneStar);
        setTwoStarRatings(twoStars);
        setThreeStarRatings(threeStars);
        setFourStarRatings(fourStars);
        setFiveStarRatings(fiveStars);

        const average = calculateAverage(allRatings);

        setAverageRating(average);

        const oneStarPerc = calculatePercentage(oneStar, productReviews.length);
        const twoStarsPerc = calculatePercentage(
          twoStars,
          productReviews.length
        );
        const threeStarsPerc = calculatePercentage(
          threeStars,
          productReviews.length
        );
        const fourStarsPerc = calculatePercentage(
          fourStars,
          productReviews.length
        );
        const fiveStarsPerc = calculatePercentage(
          fiveStars,
          productReviews.length
        );

        setOneStarPercent(oneStarPerc);
        setTwoStarPercent(twoStarsPerc);
        setThreeStarPercent(threeStarsPerc);
        setFourStarPercent(fourStarsPerc);
        setFiveStarPercent(fiveStarsPerc);
      }
    };

    setRatings();
  }, [productReviews]);

  return (
    <div className="w-[100%] max-w-[100%]">
      <div className="font-D16px-M14px">Based On {reviewCount} Reviews</div>
      <div className="mt-[16px]">
        <span className="mr-[8px] text-[32px] leading-[39px] text-[#333333]">
          {averageRating}
        </span>
        <span className="text-[13px] leading-[16px] text-gray2">Overall</span>
      </div>
      <div className="mt-[16px]">
        <div className="flex h-[24px] items-center justify-between">
          <Image
            src="/images/rating-5stars.svg"
            width={96}
            height={16}
            alt="5 Stars"
            className="select-none"
          />
          <div className="relative ml-[22px] h-[10px] flex-1 rounded-[5px] bg-lightgray">
            <div
              className={`absolute left-0 top-0 h-[10px] rounded-[5px] bg-yellow w-[${fiveStarPercent}%]`}
            ></div>
          </div>
          <div className="w-[40px] text-right text-gray2">
            {fiveStarPercent}%
          </div>
        </div>
        <div className="mt-[8px] flex h-[24px] items-center justify-between">
          <Image
            src="/images/rating-4stars.svg"
            width={96}
            height={16}
            alt="4 Stars"
            className="select-none"
          />
          <div className="relative ml-[22px] h-[10px] flex-1 rounded-[5px] bg-lightgray">
            <div
              className={`absolute left-0 top-0 h-[10px] rounded-[5px] bg-yellow w-[${fourStarPercent}%]`}
            ></div>
          </div>
          <div className="w-[40px] text-right text-gray2">
            {fourStarPercent}%
          </div>
        </div>
        <div className="mt-[8px] flex h-[24px] items-center justify-between">
          <Image
            src="/images/rating-3stars.svg"
            width={96}
            height={16}
            alt="3 Stars"
            className="select-none"
          />
          <div className="relative ml-[22px] h-[10px] flex-1 rounded-[5px] bg-lightgray">
            <div
              className={`absolute left-0 top-0 h-[10px] rounded-[5px] bg-yellow w-[${threeStarPercent}%]`}
            ></div>
          </div>
          <div className="w-[40px] text-right text-gray2">
            {threeStarPercent}%
          </div>
        </div>
        <div className="mt-[8px] flex h-[24px] items-center justify-between">
          <Image
            src="/images/rating-2stars.svg"
            width={96}
            height={16}
            alt="2 Stars"
            className="select-none"
          />
          <div className="relative ml-[22px] h-[10px] flex-1 rounded-[5px] bg-lightgray">
            <div
              className={`absolute left-0 top-0 h-[10px] rounded-[5px] bg-yellow w-[${twoStarPercent}%]`}
            ></div>
          </div>
          <div className="w-[40px] text-right text-gray2">
            {twoStarPercent}%
          </div>
        </div>
        <div className="mt-[8px] flex h-[24px] items-center justify-between">
          <Image
            src="/images/rating-1star.svg"
            width={96}
            height={16}
            alt="1 Star"
            className="select-none"
          />
          <div className="relative ml-[22px] h-[10px] flex-1 rounded-[5px] bg-lightgray">
            <div
              className={`absolute left-0 top-0 h-[10px] rounded-[5px] bg-yellow w-[${oneStarPercent}%]`}
            ></div>
          </div>
          <div className="w-[40px] text-right text-gray2">
            {oneStarPercent}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
