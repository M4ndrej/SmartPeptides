"use client";

import useStandaloneModalAnimation from "@/hooks/useStandaloneModalAnimation";
import CustomModal from "../CustomModal/CustomModal";
import { FC } from "react";
import Button from "../Button/Button";
import Image from "next/image";
import { BigSaleBannerVector } from "../Icons/BigSaleBannerVector";
import { BigSaleBannerVector2 } from "../Icons/BigSaleBannerVector2";
import Link from "next/link";
import { BigSaleCouponCode } from "./BigSaleCouponCode";
import bannerSrc from "../../../public/images/bigSaleBanner.png";

interface BigSaleBannerModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const BigSaleBannerModal: FC<BigSaleBannerModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const { showModal, animationClass } = useStandaloneModalAnimation({
    isOpen,
    animationDuration: 250,
    enterAnimationClass: "animate-slide-in-down",
    exitAnimationClass: "animate-slide-out-up",
  });

  const handleClose = async () => {
    setIsOpen(false);
  };

  return (
    <CustomModal
      isOpen={showModal}
      onClose={handleClose}
      animationClass={animationClass}
      hideLogo
      modalType="BigSaleBannerModal"
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-lg from834:flex-row">
        <div
          className="overflow-vissible relative z-[1] h-full bg-[linear-gradient(to_bottom,_#EBF6FF_50%,_white_100%)] after:absolute after:left-[730px] after:top-[253px] after:z-[2] after:h-[779px] after:w-[409px] after:origin-top-left
                        after:rotate-[82deg]
                        after:transform
                        after:bg-white
                        after:content-['']
                        xs:after:top-[218px]
                        md:after:top-[315px]
                        from834:absolute
                        from834:right-[-137px] 
                        from834:top-0
                        from834:order-2
                        from834:w-[546px]
                        from834:after:hidden
                        lg:right-0 
                        dark:bg-[linear-gradient(to_bottom,_#212121_40%,_#212121_100%)]
                        after:dark:bg-[#191919]
                                            
        "
        >
          <BigSaleCouponCode className="from834:w-330px from834:h-99px absolute left-[40px] top-[43px] z-10 h-[84px] w-[341px] xs:h-[74px] xs:w-[294px] md:left-[80px] md:top-[40px] md:h-[93px] md:w-[400px] from834:left-[30px] from834:top-[46px] from834:scale-[0.8] lg:left-[90px] lg:top-[40px]  lg:h-[99px] lg:w-[427px] lg:scale-100" />
          <Image
            src={bannerSrc}
            alt="Big Sale Banner"
            width={559}
            height={311}
            priority={true}
            draggable={false}
            className="z-0 mx-auto mt-[128px] xs:mt-[113px] xs:h-[218px] md:h-[311px] from834:absolute from834:right-[50px] from834:top-[95px] from834:mx-0 from834:mt-0 from834:h-auto from834:scale-[0.8] lg:right-[-12px] lg:top-[110px] lg:scale-[0.89]"
          />
        </div>
        <BigSaleBannerVector2 className="absolute left-[61px] top-[250px] z-20 rotate-[64deg] xs:left-[8px] xs:top-[223px] md:left-[61px] md:top-[312px] from834:left-[315px] from834:top-[240px] from834:rotate-0 lg:left-[354px]" />
        <BigSaleBannerVector className="absolute right-[24px] top-[235px] z-20 rotate-[64deg] xs:right-[28px] xs:top-[212px] md:right-[40px] md:top-[282px] from834:left-[400px] from834:top-0 from834:rotate-0 lg:left-1/2 lg:-translate-x-1/2" />

        <div className="contents from834:z-10 from834:block from834:w-[440px] from834:bg-white from834:py-6 from834:[clip-path:polygon(0_0,100%_0,76%_100%,0_100%)] lg:w-[487px] dark:bg-[#191919]">
          <div className="z-[3] mx-auto w-[367px] text-center xs:w-[324px] xs:pt-2 md:w-[480px] from834:order-1 from834:ml-11 from834:mr-0 from834:w-[295px] from834:text-left lg:ml-12">
            <p className="font-33px-ALL font-bold from834:pl-[11px]">
              SPECIAL OFFER
            </p>
            <p className="text-[76px] font-bold leading-[100%] text-darkBlue xs:text-[66px] md:text-[98px] from834:hidden dark:text-[#333333]">
              BIG SALE
            </p>
            <p className="hidden text-[158px] font-bold leading-[100%] text-darkBlue from834:block dark:text-[#333333]">
              BIG
            </p>
            <p className="hidden pl-[10px] text-[105px] font-bold leading-[60%] text-darkBlue from834:block dark:text-[#333333]">
              SALE
            </p>
            <p className="text-[59px] font-bold leading-[100%] text-red xs:text-[49px] from834:pl-[11px] from834:pt-2 from834:text-[49px] from834:leading-[160%]">
              UP TO 25%
            </p>
            <div className="my-4 flex justify-center md:my-6 from834:my-0">
              <Link href={"/shop"}>
                <Button
                  highlighted
                  reverseColors
                  text="SHOP NOW"
                  customClass="!w-max"
                  onPress={handleClose}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};
