import { DiscountItemType } from "@/data/discount_data";
import classNames from "classnames";
import Image from "next/image";

type DiscountCardProps = {
  discount: DiscountItemType;
  headline: string;
};

export const DiscountCard = ({ discount, headline }: DiscountCardProps) => {
  return (
    <div
      key={discount.id}
      className={classNames(
        `flex flex-col items-center text-center sm:max-w-[173px] md:w-[346px] from834:w-[244px] lg:w-[320px] xl:w-[288px]`
        // {
        //   "col-span-full justify-self-center": headline === "FIRST ORDER",
        // }
      )}
    >
      <div className="mx-auto">
        <Image
          alt="discount"
          width={172}
          height={172}
          src={discount.image}
          className="select-none object-contain"
        />
      </div>
      <div className="mt-[16px] sm:mt-[8px] ">
        <h3 className="font-D18px-M16px font-bold sm:mx-auto ">
          {discount.title}
        </h3>
        <p className="font-D16px-M13px mt-[8px] sm:mt-[4px]">
          {discount.description}
        </p>
      </div>
      {discount.reommended && (
        <div className="mt-[8px] sm:mt-[4px]">
          <Image
            alt="recommended"
            width={114}
            height={79}
            src={discount.reommended}
            className="mx-auto h-[52px] w-[80px] select-none object-contain from834:h-[59px] from834:w-[85px] lg:h-[79px] lg:w-[114px]"
          />
        </div>
      )}
    </div>
  );
};
