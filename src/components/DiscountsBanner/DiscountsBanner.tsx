"use client";

import Button from "../Button/Button";
import Image from "next/image";
import Link from "next/link";

const DiscountsBanner = () => {
  return (
    <div className="md:pb-[24px]sm:pl-0 relative flex h-[304px] items-center justify-between gap-[23px] overflow-hidden bg-lightgray pb-[33px]  pl-[40px] pt-[33px] sm:h-[222px] sm:flex-row sm:gap-[16px] sm:px-0 sm:pb-[24px] sm:pt-[24px] md:pb-[24px] md:pt-[24px] lg:gap-0">
      {/* Text & button */}
      <div className="sm:w-full sm:min-w-[230px] sm:max-w-[230px] sm:pl-[16px] md:min-w-[448px]   lg:min-w-[259px] lg:max-w-[341px] xl:min-w-[340px] xl:max-w-[341px] ">
        <Link href="/discount">
          <h3 className="font-D32px-M18px w-fit cursor-pointer font-bold text-[#E7461E] transition duration-300 hover:text-[#E7461E]">
            Discounts
          </h3>
        </Link>

        <p className="font-D16px-M12px mb-[24px] mt-[16px] sm:mb-[16px] sm:mt-[10px] lg:pr-[15px]">
          Make sure to subscribe,
          <br className="md:hidden" /> we run regular promotions.{" "}
        </p>

        <Link href="/discount">
          <Button
            text="DISCOVER NOW"
            highlighted
            onPress={async () => {}}
            customClass="!w-fit relative z-[1]"
          />
        </Link>
      </div>
      {/* Image container */}
      <Image
        src="/images/discountBannerImg.svg"
        width={100}
        height={100}
        alt="discount"
        className="z-[1] w-full select-none sm:h-[227px] sm:w-[156px] sm:translate-x-[-15px] md:mr-[40px] md:h-[262px] md:w-[207px] md:object-contain  lg:mr-[40px] xl:mr-[20px] xl:h-[200px] xl:w-[197px]"
      />
      <Image
        src={"/images/banner_background.svg"}
        width={193}
        height={304}
        alt={"Banner Molecule"}
        className={`absolute right-0 top-0 select-none`}
      />
    </div>
  );
};

export default DiscountsBanner;
