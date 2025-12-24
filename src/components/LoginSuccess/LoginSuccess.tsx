import { FC } from "react";
import CheckIcon from "../Icons/CheckIcon";
import InsideScroll from "../Scroll/InsideScroll";

const LoginSuccess: FC = () => {
  return (
    <InsideScroll className="h-[193px] sm:!h-[183px]">
      <div className="flex flex-col items-center justify-center gap-[16px] pt-[24px]">
        <CheckIcon
          withCircle={true}
          width={60}
          height={60}
          strokeWidth={1.2}
          className="!stroke-[#E7461E]"
        />
        <div className="font-D24px-M18px text-center sm:font-medium">
          Logging in successful!
        </div>
      </div>
      <div className="font-D16px-M13px mb-[24px] flex flex-col pt-[16px] text-center sm:pt-[10px]">
        Thank you for log in on VALUE PEPTIDE website.
      </div>
    </InsideScroll>
  );
};

export default LoginSuccess;
