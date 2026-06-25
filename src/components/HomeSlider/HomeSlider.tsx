"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HomeSlide from "./HomeSlide";
import { useEffect, useState } from "react";

const HomeSlider = () => {
  const [p1Text, setP1Text] = useState("");

  useEffect(() => {
    const currentOrigin = window.location.origin;
    const text =
      currentOrigin === "https://smartpeptides.bio/"
        ? `Buy Highly Purified CJC-1295, Ipamorelin, GHRP-2, Hexarelin, GHRP-6, TB-500 and many more!`
        : ``;
    setP1Text(text);
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <div className="absolute inset-0 -z-10 bg-[url('/images/smart-peptides-hero-bg-light.svg')] bg-cover bg-center dark:bg-[url('/images/smart-peptides-hero-bg-dark.svg')]" />
      <div className="container-padding-inline relative m-auto flex h-auto max-w-[1590px] pb-[24px] pt-[32px] xl:pt-[10px] ">
        <HomeSlide
          title="Premium Research Peptides"
          p1={
            "Our catalog includes only high-quality peptides and peptide blends chosen by experts across the research field."
          }
          imageSrc="/images/smart-peptides-hero-image.svg"
          mobileImg="/images/smart-peptides-hero-image.svg"
          customParagraphWidth="max-w-[490px]"
          customClass=" 2xl:max-w-[746px] relative flex aspect-[746/559] max-h-full flex-1 items-center  xs:!max-w-[240px] sm:max-w-[400px] md:max-w-[400px] lg:max-w-[370px] xl:max-w-[550px]"
          customTextSideClass="lg:min-w-[579px]"
          customClassMobImg="max-w-[287px] mx-auto h-[282px]"
          customParentClass="sm:!gap-[32px] sm:mb-[64px]"
          btnLink="/shop"
          btnTitle="SHOP NOW"
          isH1={true}
        />
      </div>
    </div>
  );
};

export default HomeSlider;
