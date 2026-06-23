import { DiscountCard } from "@/components/DiscountCard/DiscountCard";
import DiscountCouponBanner from "@/components/DiscountCouponBanner/DiscountCouponBanner";
import DiscountExample from "@/components/DiscountExample/DiscountExample";
import { discount_data } from "@/data/discount_data";
import { getMonthYearForDiscountPage } from "@/helpers/date_format";
import classNames from "classnames";
import React from "react";
import { WithContext } from "schema-dts";

export const metadata = {
  title: "Exclusive Discounts and Coupon Codes",
  description: `Discover active Smart Peptides coupon codes for ${getMonthYearForDiscountPage()}! Save big on your peptides purchase with our exclusive discounts and coupon codes.`,
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/discount/`,
    },
  }),
};

export default async function Discounts() {
  const jsonLd: WithContext<any> = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://smartpeptides.com//#organization",
        name: "SMART PEPTIDES",
      },
      {
        "@type": "WebSite",
        "@id": "https://smartpeptides.com//#website",
        url: "https://smartpeptides.com/",
        name: "SMART PEPTIDES",
        publisher: { "@id": "https://smartpeptides.com//#organization" },
        inLanguage: "en-US",
      },
      {
        "@type": "ImageObject",
        "@id": "/images/discount15.svg",
        url: "/images/discount15.svg",
        width: "288",
        height: "288",
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": "https://smartpeptides.com//discount/#webpage",
        url: "https://smartpeptides.com//discount",
        name: "Discounts - SMART PEPTIDES",
        datePublished: "2023-07-25T11:41:52-05:00",
        dateModified: "2024-01-08T07:35:43-06:00",
        about: { "@id": "https://smartpeptides.com//#organization" },
        isPartOf: { "@id": "https://smartpeptides.com//#website" },
        primaryImageOfPage: {
          "@id": "/images/discount15.svg",
        },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-padding-inline m-auto mt-[48px] flex flex-col sm:mb-[64px] md:mb-[64px] md:!px-[8px] lg:mb-[64px] lg:max-w-[1264px] xl:mb-[94px]">
        <div className="flex w-full flex-col items-center justify-center">
          <h1 className="font-D32px-M24px pb-[16px] font-bold">Discounts</h1>
          <div className="h-[2px] w-[48px] rounded-[2px] bg-[#333333]"></div>
          <p className="font-D16px-M13px mt-[24px] text-center sm:mt-[16px]">
            Discover our amazing discounts!
          </p>
        </div>

        <DiscountCouponBanner />

        {discount_data.map((section, index) => (
          <React.Fragment key={section.headline}>
            <div
              className={classNames("my-[64px]", true, {
                "mb-0": index === 4,
                "sm:mt-[32px] md:mt-[48px] lg:mt-[40px] xl:mt-[64px]":
                  index === 0,
              })}
            >
              <div className="font-D24px-M18px mx-auto text-center font-bold">
                {section.headline}
                <div
                  className={`${section.customClass ? section.customClass : "bg-[#5CB531]"} mx-auto mt-[16px] h-[2px] w-[48px] rounded-[2px]`}
                ></div>
              </div>
              <div className="mt-[48px] flex flex-wrap justify-center sm:mt-[24px] sm:gap-x-[8px] sm:gap-y-[38px] md:mx-auto md:mt-[64px] md:gap-x-[43px] md:gap-y-[48px] from834:gap-x-[35px] from834:gap-y-[50px] lg:mx-auto lg:max-w-[1000px] lg:gap-x-[16px] lg:gap-y-[72px] xl:gap-x-[64px] xl:gap-y-[48px]">
                {section.discounts.map((discount) => (
                  <DiscountCard
                    key={discount.id}
                    discount={discount}
                    headline={section.headline}
                  />
                ))}
              </div>
            </div>
            <div
              className={`mx-auto h-[2px] w-full bg-borderColor xl:w-[1098px] ${index === 4 ? "hidden" : ""}`}
            ></div>
          </React.Fragment>
        ))}
        <DiscountExample />
      </div>
    </>
  );
}
