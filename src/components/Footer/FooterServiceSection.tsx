import Image from "next/image";
import Link from "next/link";

const FooterServiceSection = () => {
  return (
    <div className="lg:min-w-auto sm:flex-col sm:gap-[40px] md:w-[100px] md:min-w-[325px] md:flex-col md:gap-[40px] lg:max-w-full lg:flex-none lg:flex-row lg:justify-start lg:gap-0">
      {/* Working hours */}
      <div className="w-full sm:pb-[40px] md:flex md:flex-col md:pb-[40px] lg:hidden lg:max-w-[340px] xl:max-w-[460px]">
        <div className="font-18px-ALL pb-[16px] font-bold sm:pb-[16px]">
          Working hours
        </div>
        <div className="font-D16px-M13px flex flex-col gap-y-[8px] sm:w-full lg:max-w-[341px] xl:max-w-[460px]">
          <div className="flex justify-between">
            <div>Monday – Friday</div>
            <div>9 am – 9 pm (CST)</div>
          </div>
          <div className="flex justify-between ">
            <div>Saturday – Sunday</div>
            <div>Closed</div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-between sm:flex-col sm:gap-[40px] md:flex-col md:gap-[40px]">
        {/* Dedicated service and icons */}
        <div className="lg:max-w-[356px] xl:max-w-[465px]">
          <div className="font-D16px-M13px flex items-start gap-x-[9px]">
            Our team is always ready to help and committed to your satisfaction.
          </div>
        </div>
        <div>
          <div className="flex w-full max-w-[410px] flex-wrap gap-x-[10px] gap-y-[16px] sm:!max-w-full sm:gap-y-[10px] md:max-w-[265px]">
            <Image
              src="/images/mastercard.svg"
              width={33}
              height={25}
              alt="Mastercard"
              // className="select-none sm:h-[35px] sm:w-[43px]"
            />
            <Image
              src="/images/visa.svg"
              width={53}
              height={18}
              alt="Visa"
              // className="select-none sm:h-[28px] sm:w-[63px]"
            />
            {/* <Image
              src="/images/americanExpress.svg"
              width={73}
              height={15}
              alt="American Express"
              // className="select-none sm:h-[25px] sm:w-[83px]"
            />
            <Image
              src="/images/discoverLogo.svg"
              width={72}
              height={11}
              alt="Dicsover"
              // className="select-none sm:h-[21px] sm:w-[82px]"
            />
            <Image
              src="/images/dinnersClubIcon.svg"
              width={60}
              height={17}
              alt="Dinners Club"
              // className="select-none sm:h-[27px] sm:w-[70px]"
            />
            <Image
              src="/images/jcbIcon.svg"
              width={30}
              height={23}
              alt="Jcb"
              // className="select-none sm:h-[33px] sm:w-[40px]"
            /> */}
            <Image
              src="/images/zelle.svg"
              width={24}
              height={24}
              alt="Zelle"
              // className="select-none sm:h-[34px] sm:w-[34px]"
            />
            {/*  <Image
              src="/images/cashapp.svg"
              width={24}
              height={24}
              alt="CashApp"
              // className="select-none sm:h-[34px] sm:w-[34px]"
            /> */}
            <Image
              src="/images/crypto.svg"
              width={24}
              height={24}
              alt="Dicsover"
              // className="select-none sm:h-[34px] sm:w-[34px]"
            />
            {/*   <Image
              src="/images/v-logo.svg"
              width={24}
              height={24}
              alt="Venmo"
              // className="select-none sm:h-[34px] sm:w-[34px]"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterServiceSection;
