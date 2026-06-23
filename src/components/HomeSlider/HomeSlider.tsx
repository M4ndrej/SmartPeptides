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
      currentOrigin === "https://smartpeptides.com/"
        ? `Buy Highly Purified CJC-1295, Ipamorelin, GHRP-2, Hexarelin, GHRP-6, TB-500 and many more!`
        : ``;
    setP1Text(text);
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <div className="absolute inset-0 -z-10 bg-[url('/images/home-banner-visual.svg')] bg-cover bg-center" />
      <div className="container-padding-inline relative m-auto flex h-auto max-w-[1590px] pb-[24px] pt-[32px] xl:pt-[10px] ">
        <HomeSlide
          title="Premium Research Peptides"
          p1={
            "Our catalog includes only high-quality peptides and peptide blends chosen by experts across the research field."
          }
          imageSrc="/images/smart-peptides-hero.svg"
          mobileImg="/images/smart-peptides-hero.svg"
          customParagraphWidth="max-w-[490px]"
          customClass="object-contain xl:max-h-[300px] lg:max-h-[222px] from834:max-h-[405px] md:max-h-[324px] sm:max-h-[238px]  w-full xl:ml-auto xl:mr-0 lg:relative lg:top-[45px] sm:max-h-none sm:w-[87%] sm:mx-auto lg:translate-y-[-30px]"
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
