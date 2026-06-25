import { useThemeContext } from "@/context/theme-provider";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button/Button";

const ShopMerchBanner = ({ className }: { className?: string }) => {
  const { state } = useThemeContext();
  const isDark = state?.darkMode ?? false;
  return (
    <div
      className={classNames(
        "relative flex h-[304px] items-center justify-between overflow-hidden bg-lightgray",
        className
      )}
    >
      <div className="flex min-w-[330px] max-w-[740px] flex-col items-start p-10 sm:pl-6">
        <h2 className="font-D32px-M24px mb-4 pb-[16px] text-center font-bold text-darkgray">
          Merchandise
        </h2>
        <p className="mb-8">
          We offer the best t-shirt quality on the market. In collaboration with{" "}
          <Image
            src={
              isDark
                ? "/images/voiceartLogoDark.svg"
                : "/images/voiceartLogo.svg"
            }
            width={96}
            height={25}
            alt={"Voiceart Logo"}
            className={`inline`}
          />{" "}
          you can find
          <span className="sm:hidden ">
            {" "}
            graphics of Smart Peptides and a lot of different categories, from
            art, music, politics and 35 more.
          </span>
          <span className="hidden sm:inline">...</span>
        </p>
        <Link
          href="https://voice.art/"
          rel="noopener noreferrer nofollow"
          target="_blank"
        >
          <Button text="VISIT VOICEART" highlighted={true} />
        </Link>
      </div>
      <div className="relative z-[1] h-[304px] w-[250px] shrink-0 lg:w-[400px] xl:w-[400px]">
        <Image
          src="/images/voiceartShirt4.png"
          width={235}
          height={227}
          alt="Merch Shirt"
          className="absolute right-0 top-[35px] h-[227px] w-[235px] sm:right-[180px] sm:top-[55px] sm:h-[150px] sm:w-[140px]"
        />
        <Image
          src="/images/voiceartShirt3.png"
          width={252}
          height={243}
          alt="Merch Shirt"
          className="absolute right-[120px] top-[35px] hidden h-[243px] w-[252px] lg:block xl:block"
        />
      </div>
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

export default ShopMerchBanner;
