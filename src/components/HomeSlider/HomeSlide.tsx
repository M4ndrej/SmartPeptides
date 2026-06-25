"use client";

import { SwiperSlide } from "swiper/react";
import Button from "../Button/Button";
import Image from "next/image";
import { FC } from "react";
import Link from "next/link";
interface HomeSlide {
  title?: string;
  subtitle?: string;
  p1?: string;
  p2first?: string;
  p2mid?: string;
  p2second?: string;
  p3first?: string;
  p3mid?: string;
  p3second?: string;
  p4?: string;
  buttonText?: string;
  imageSrc?: string;
  customClass?: string;
  customTextSideClass?: string;
  customParagraphWidth?: string;
  customParentClass?: string;
  btnLink: string;
  btnTitle: string;
  customSwiperSlideClass?: string;
  customClassMobImg?: string;
  mobileImg?: string;
  bgImage?: string;
  couponCode?: string;
  isH1?: boolean;
}

const HomeSlide: FC<HomeSlide> = ({
  title,
  subtitle,
  p1,
  p2first,
  p2second,
  p2mid,
  p3first,
  p3second,
  p3mid,
  p4,
  customClass,
  imageSrc,
  customTextSideClass,
  customParagraphWidth,
  customParentClass,
  btnLink,
  btnTitle,
  customSwiperSlideClass,
  customClassMobImg,
  mobileImg,
  bgImage,
  couponCode,
  isH1,
}) => {
  return (
    <SwiperSlide className={`${customSwiperSlideClass}`}>
      <div
        className={`sm:items mx-auto flex max-w-[1200px] justify-between  gap-[13px] sm:flex-col  md:flex-col lg:h-[490px] lg:items-center ${customParentClass}`}
      >
        {/* left side */}
        <div
          className={`lg:min-w-[475px] ${customTextSideClass} lg:pl-[62px] xl:pl-0`}
        >
          {title && isH1 ? (
            <h1
              className={`${couponCode && "lg:text-[35px] xl:text-[43px]"} font-H1 text-black sm:!text-center`}
            >
              {title}
            </h1>
          ) : (
            <h2
              className={`${couponCode && "lg:text-[35px] xl:text-[43px]"} font-H1 text-black sm:!text-center`}
            >
              {title}
            </h2>
          )}
          {subtitle && !couponCode && (
            <h3 className="font-D32px-M24px mt-[16px] sm:mt-[8px] sm:!text-center md:mt-[8px] lg:mt-[12px] xl:mt-[16px]">
              {subtitle}
            </h3>
          )}
          {subtitle && couponCode && (
            <h3 className="mt-[16px] font-bold text-darkgray sm:mt-[8px] sm:!text-center sm:text-[14px] md:mt-[8px] md:text-[24px] lg:mt-[12px] lg:text-[18px] xl:mt-[16px] xl:text-[24px]">
              {subtitle}
            </h3>
          )}

          {couponCode && (
            <Image
              className={`mt-[16px] select-none object-cover sm:!mx-auto sm:mt-[8px] sm:h-[56px] sm:w-[245px] md:h-[72px] md:w-[315px] lg:h-[62px] lg:w-[272px] xl:h-[82px] xl:w-[359px]`}
              width={359}
              height={82}
              src={couponCode!}
              alt="home slide "
            />
          )}

          <div
            className={`flex ${customParagraphWidth} flex-col gap-[8px]  sm:mt-[8px] sm:max-w-[100%] sm:gap-[8px] sm:!text-center md:mt-[8px] md:max-w-[100%] lg:mt-[8px] xl:mt-[24px] xl:gap-[16px] ${
              !p2first && "xl:!mt-[16px]"
            } `}
          >
            {p1 && <p className="font-D16px-M14px">{p1}</p>}
            {p2first && (
              <p className="font-D16px-M14px font-bold">
                {p2first} <span className="text-red">{p2mid} </span> {p2second}
              </p>
            )}
            {p3first && (
              <p className="font-D16px-M14px">
                {p3first} <span className="text-red">{p3mid} </span> {p3second}
              </p>
            )}
            {p4 && <p className="font-D16px-M14px">{p4}</p>}
          </div>
          <div
            className={`mt-[32px] sm:mt-[24px] sm:flex sm:justify-center ${couponCode && "!mt-[16px]"} `}
          >
            <Link href={btnLink}>
              <Button
                text={btnTitle}
                highlighted
                smallerButton
                customClass="sm:!w-fit !bg-black text-white !border-black dark:hover:text-[#000000]"
                onPress={async () => {}}
              />
            </Link>
          </div>
        </div>
        {/* right side */}
        <div
          className={`from w-full flex justify-center max-w-[701px] sm:mx-auto sm:max-h-[238px]  md:mx-auto md:max-h-[373px] from834:max-h-[405px] lg:max-h-[222px] lg:pr-[62px] xl:max-h-[361px] xl:pr-0`}
        >
          {bgImage && (
            <Image
              className={`select-none sm:hidden md:hidden lg:absolute lg:left-[-100px] lg:top-[-40px]  lg:max-w-[220px] xl:static xl:max-w-[271px]  `}
              width={271}
              height={354}
              src={bgImage!}
              alt="home slide "
              priority
            />
          )}
          <Image
            className={`h-full w-full select-none ${customClass} ${mobileImg ? "sm:hidden" : ""}  `}
            width={600}
            height={600}
            src={imageSrc!}
            alt="home slide "
            priority
          />
          {mobileImg && (
            <Image
              className={`hidden  select-none ${customClassMobImg} ${mobileImg ? "sm:!flex" : ""}`}
              width={600}
              height={600}
              src={mobileImg ? mobileImg : ""}
              alt="home slide mobile"
              priority
            />
          )}
        </div>
      </div>
    </SwiperSlide>
  );
};

export default HomeSlide;
