"use client";

import Button from "../Button/Button";
import Image from "next/image";
import Link from "next/link";

const DosageCalculatorBanner = () => {
  return (
    <div className="relative flex h-[304px] items-center justify-between gap-[23px] overflow-hidden bg-lightgray pb-[33px] pl-[40px] pt-[33px] sm:h-[222px] sm:flex-row sm:gap-[16px] sm:px-0 sm:pb-[24px] sm:pl-0 sm:pt-[24px] md:pb-[24px] md:pt-[24px] xl:max-w-[592px]">
      {/* Text & button */}
      <div className="lg sm:w-full sm:min-w-[250px] sm:max-w-[330px] sm:pl-[16px] md:min-w-[310px] md:max-w-[505px] lg:min-w-[303px] xl:min-w-[340px] ">
        <Link href="/calculator">
          <h3
            className="font-D32px-T24px-M18px w-fit cursor-pointer font-bold text-[#E7461E] transition duration-300 hover:text-[#E7461E]"
            onClick={() => {}}
          >
            Peptide Dosage Calculator
          </h3>
        </Link>
        <p className="font-D16px-M12px mb-[24px] mt-[16px] sm:mb-[16px] sm:mt-[10px] md:max-w-[447px] from834:max-w-[505px] xl:max-w-[340px]">
          Calculate your peptide dosage easy and without any problems.
        </p>

        <Link href="/calculator">
          <Button
            text="CALCULATE NOW"
            highlighted
            onPress={async () => {}}
            customClass="!w-fit relative sm:z-[1]"
          />
        </Link>
      </div>
      {/* Image container */}
      <Image
        src="/images/dosageCalcImgBig.svg"
        width={100}
        height={100}
        alt="dosage calculator"
        className="w-[130px] select-none object-contain  sm:h-[192px] md:mr-[19px] md:h-[283px] md:w-fit md:object-contain lg:ml-[15px] lg:h-[278px] lg:translate-x-[-17px] lg:object-contain xl:ml-[0] xl:mr-[15px] xl:translate-x-0 xl:object-contain xl:lg:h-[255px]"
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

export default DosageCalculatorBanner;
