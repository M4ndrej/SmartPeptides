import BannerWrapper from "@/components/BannerWrapper/BannerWrapper";
import { useThemeContext } from "@/context/theme-provider";

const DiscountInfo = () => {
  const { state } = useThemeContext();
  const isDark = state?.darkMode ?? false;
  return (
    <BannerWrapper
      title="UP TO DISCOUNTS!"
      bgColor={!isDark ? "#F4FAFF" : "#222222"}
      borderColor={!isDark ? "#E7461E" : "#2A2A2A"}
      className="mt-8"
    >
      <div className="mb-1">
        In order to qualify for the{" "}
        <span className="font-bold">maximum discount</span>
      </div>
      <ul className="grid list-disc gap-1 [&_li]:ml-[16px]">
        {/* <li className="[&::marker]:text-[#E7461E]">
          Buy <span className="font-bold">10 of the same item for 8%</span>
        </li>
        <li className="[&::marker]:text-[#E7461E]">
          Choose{" "}
          <span className="font-bold">zelle, crypto or bank transfer</span>
        </li> */}
        {/* <li className="[&::marker]:text-[#E7461E]">
          Redeem your coupon for store credit towards your next order to{" "}
          <span className="font-bold">double your discount</span>
        </li> */}
      </ul>
    </BannerWrapper>
  );
};

export default DiscountInfo;
