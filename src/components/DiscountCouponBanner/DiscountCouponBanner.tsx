"use client";
import Image from "next/image";
import Button from "../Button/Button";
import classNames from "classnames";

const DiscountCouponBanner = ({ className }: { className?: string }) => {
  const handleScrollToSubscribe = async () => {
    const subscribeSection = document.getElementById("subscribe-content");

    if (subscribeSection) {
      subscribeSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div
      className={classNames(
        "relative mt-[48px] flex h-[304px] items-center justify-between overflow-hidden bg-lightgray sm:h-[222px]",
        className
      )}
    >
      <div className="m-10 flex min-w-[227px] max-w-[740px] flex-col items-start sm:ml-[16px] sm:mr-[19px] md:ml-6 md:mr-7 from834:ml-10 from834:mr-[68px] lg:mr-[38px] xl:mr-[175px]">
        <h2 className="font-D32px-M18px mb-4 text-center font-bold text-darkgray">
          Coupon discounts
        </h2>
        <p className="font-D16px-M13px mb-8 sm:mb-4">
          Subscribe to our newsletter to receive exclusive coupon discounts and
          stay updated on our latest deals!
        </p>
        <Button
          text="SUBSCRIBE"
          highlighted={true}
          customClass="sm:w-[170px]"
          onPress={handleScrollToSubscribe}
        />
      </div>
      <Image
        src="/images/discountPage_banner.png"
        width={263}
        height={256}
        alt="discount"
        className="z-[1] w-full select-none sm:mr-[16px] sm:h-[148px] sm:w-[152px] sm:object-cover md:mr-7 md:h-[239px] md:w-[228px] from834:mr-10 from834:h-[222px] lg:h-[256px] lg:max-w-[263px] xl:mr-[64px] xl:h-[256px] xl:max-w-[263px] xl:translate-x-[-30px]"
      />
      <Image
        src={"/images/banner_background.svg"}
        width={193}
        height={304}
        alt={"Banner Molecule"}
        className={`absolute bottom-0 right-0 top-0 z-0 select-none`}
      />
    </div>
  );
};

export default DiscountCouponBanner;
