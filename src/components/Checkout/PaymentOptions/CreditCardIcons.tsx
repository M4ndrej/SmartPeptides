import { CreditCardProcessor } from "@/types/payment";
import Image from "next/image";
import { FC } from "react";

interface CreditCardIconsProps {
  includedProcessors?: CreditCardProcessor[];
}

const CreditCardIcons: FC<CreditCardIconsProps> = ({
  includedProcessors = ["mastercard", "visa"],
}) => {
  return (
    <div className="flex w-full flex-grow items-center gap-[16px] sm:gap-[8px]">
      {includedProcessors.includes("mastercard") && (
        <Image
          src="/images/mastercard.svg"
          width={40}
          height={40}
          alt="Mastercard"
          className="h-[25px] w-[32px] select-none sm:h-[14px] sm:w-[18px] md:h-[14px] md:w-[18px]"
        />
      )}
      {includedProcessors.includes("visa") && (
        <Image
          src="/images/visa.svg"
          width={40}
          height={40}
          alt="Visa"
          className="h-[25px] w-[40px] select-none sm:h-[8px] sm:w-[23px] md:h-[8px] md:w-[23px]"
        />
      )}
      {includedProcessors.includes("americanExpress") && (
        <Image
          src="/images/americanExpress.svg"
          width={40}
          height={40}
          alt="American express"
          className="h-[12px] w-[49px] select-none sm:h-[6px] sm:w-[28px] md:h-[6px] md:w-[28px]"
        />
      )}
      {includedProcessors.includes("discover") && (
        <Image
          src="/images/discoverLogo.svg"
          width={50}
          height={40}
          alt="Discover"
          className="h-[12px] w-[74px] select-none sm:h-[7px] sm:w-[41px] md:h-[7px] md:w-[41px]"
        />
      )}
      {includedProcessors.includes("dinnersClub") && (
        <Image
          src="/images/dinnersClubIcon.svg"
          width={58}
          height={15}
          alt="Dinners Club"
          className="h-[15px] w-[58px] select-none sm:h-[8px] sm:w-[34px] md:h-[8px] md:w-[34px]"
        />
      )}
      {includedProcessors.includes("jcb") && (
        <Image
          src="/images/jcbIcon.svg"
          width={22}
          height={17}
          alt="Jcb"
          className="h-[23px] w-[29px] select-none sm:h-[13px] sm:w-[16px] md:h-[13px] md:w-[16px]"
        />
      )}
    </div>
  );
};

export default CreditCardIcons;
