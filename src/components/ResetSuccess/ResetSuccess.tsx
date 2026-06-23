import { FC } from "react";
import CheckIcon from "../Icons/CheckIcon";

const ResetSuccess: FC = () => {
  return (
    <div className="relative">
      <div className="mx-[40px] mt-6 flex flex-col items-center justify-center gap-[16px]">
        <CheckIcon
          withCircle={true}
          width={60}
          height={60}
          strokeWidth={1.2}
          className="!stroke-[#333333]"
        />
        <div className="font-D20px-M18px text-center sm:font-medium">
          A reset link has been sent to your email.
        </div>
      </div>
      <div className="font-D16px-M13px mx-[40px] flex flex-col pt-[16px] sm:pt-[10px]">
        {`We've sent the link to reset your password to your email. Please check
          your inbox and follow the instructions to reset your password.`}
      </div>
    </div>
  );
};

export default ResetSuccess;
