"use client";

import Link from "next/link";
import Button from "../Button/Button";
import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";

const SubscribeVerifying: FC<{ redirectTo?: string }> = ({ redirectTo }) => {
  const router = useRouter();

  useEffect(() => {
    if (redirectTo) {
      setTimeout(() => {
        router.push("/" + redirectTo);
      }, 3000);
    }
  }, []);

  return (
    <div className="m-auto mb-[96px] mt-[48px] px-[60px] sm:px-[16px] md:px-[32px]">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4">
          <img
            src="/images/check-rounded.svg"
            alt="Check icon"
            className="h-[60px] w-[60px]"
          />
        </div>
        <div className="font-D32px-M24px text-center font-bold">
          Thank you for verifying!
        </div>
        <div className="mx-auto my-4 h-[2px] w-[48px] bg-[#9A9A9F] sm:mb-[24px]"></div>
        <div className="font-D16px-M14px text-center">
          Your email has been successfully verified.
          <br /> You can now use our Smart Peptides website in the best way.
        </div>
        <div className="mt-[32px]">
          <Link href="/shop">
            <Button text="BUY PEPTIDES" highlighted customClass="w-[184px]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubscribeVerifying;
