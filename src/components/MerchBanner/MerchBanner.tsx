"use client";

import { useThemeContext } from "@/context/theme-provider";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button/Button";

const MerchBanner = () => {
  const { state } = useThemeContext();
  const isDark = state?.darkMode ?? false;
  return (
    <div className="md:pb-[24px]sm:pl-0 relative z-0 flex h-[304px] items-center justify-between gap-[23px] overflow-hidden bg-lightgray pb-[33px]  pl-[40px] pt-[33px] sm:h-[222px] sm:flex-row sm:gap-[16px] sm:px-0 sm:pb-[24px] sm:pt-[24px] md:pb-[24px] md:pt-[24px] lg:gap-0">
      {/* Text & button */}
      <div className="sm:w-full sm:min-w-[230px] sm:max-w-[70%] sm:pl-[16px] md:min-w-[430px]  md:max-w-[430px] from834:min-w-[520px]  from834:max-w-[520px] lg:min-w-[259px] lg:max-w-[341px] xl:min-w-[340px] xl:max-w-[341px] ">
        <a href="https://voice.art/" target="_blank">
          <h3 className="font-D32px-M18px w-fit cursor-pointer font-bold text-[#333333] transition duration-300 hover:text-[#333333]">
            Merchandise
          </h3>
        </a>

        <p className="font-D16px-M12px mb-[24px] mt-[16px] line-clamp-3 sm:mb-[16px] sm:mt-[10px]  lg:pr-[15px]">
          <span className="flex items-center gap-[4px] whitespace-nowrap">
            In collaboration with{" "}
            <Image
              src={
                isDark
                  ? "/images/voiceartLogoDark.svg"
                  : "/images/voiceartLogo.svg"
              }
              width={91}
              height={23}
              alt="voiceart"
              className="select-none sm:h-[20px] sm:w-[75px]"
            />{" "}
            {/* for 834 to 1024 */}
            <span className="hidden from834:block lg:hidden">
              we offer the best t-shirt quality
            </span>
            <span className="hidden md:block from834:hidden lg:hidden">
              we offer the best
            </span>
          </span>
          <span className="!line-clamp-2 hidden sm:!hidden md:block from834:!hidden lg:hidden">
            t-shirt quality on the market. You can find graphics of VALUE
            PEPTIDE and a lot of different categories, from art, music, politics
            and 35 more.
          </span>
          {/* for 834 to 1024 */}
          <span className="hidden from834:block lg:hidden">
            on the market. You can find graphics of SMART PEPTIDES and a lot of
            different categories, from art, music, politics and 35 more.
          </span>
          <span className="md:hidden from834:hidden lg:block">
            we offer the best t-shirt quality on the market.
          </span>
        </p>

        <Link
          href="https://voice.art/"
          rel="noopener noreferrer nofollow"
          target="_blank"
        >
          <Button
            text="DISCOVER NOW"
            customClass="!w-fit relative z-[1]"
            highlighted
          />
        </Link>
      </div>
      {/* Image container */}
      <Image
        src="/images/voiceartShirt.png"
        width={244}
        height={243}
        alt="discount"
        className="z-[1] w-full select-none sm:h-[161px] sm:w-[129px] sm:object-cover md:h-[239px] md:w-[226px] xl:max-h-[243px] xl:max-w-[244px] xl:translate-x-[-30px]"
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

export default MerchBanner;
