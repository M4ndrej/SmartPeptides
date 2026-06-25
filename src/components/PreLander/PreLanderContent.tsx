"use client";

import useIsClientRender from "@/hooks/useIsClientRender";
import Cookies from "js-cookie";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";

const PreLanderContent: FC = () => {
  const isClient = useIsClientRender();
  const [isQualified, setIsQualified] = useState(false);
  const [hasUnderstood, setHasUnderstood] = useState(false);

  const checkUnderstand = async () => {
    Cookies.set("isQualified", "1", { expires: 7 });
    setHasUnderstood(true);
  };

  useEffect(() => {
    const cookieVal = Cookies.get("isQualified");
    setIsQualified(!!cookieVal);
  }, [Cookies, isClient]);

  if (hasUnderstood || isQualified || !isClient) {
    return null;
  }

  return (
    <div
      id="pre-lander"
      className="height-full fixed inset-0 z-[9999999999999] flex w-full items-center justify-center bg-white"
    >
      <Image
        fill={true}
        src="/images/preLanderBg1.svg"
        alt="Pre Lander"
        priority={true}
        className="object-cover object-center"
      />
      <div className="relative flex max-w-[1015px] flex-col items-center justify-center sm:px-[10px]">
        <Logo width={428} height={55} className="mb-6" />
        <p className="font-D32px-M24px mb-4 text-center font-bold">
          Products offered on smartpeptides.bio/ are for research purposes only &
          not for human use.
        </p>
        <p className="mb-8 text-center">
          I am a qualified professional and 21+ years of age.
        </p>
        <Button
          highlighted={true}
          reverseColors={true}
          text="I UNDERSTAND"
          customClass="mb-8 !w-max"
          onPress={checkUnderstand}
        />
        <p className="font-12px-ALL max-w-[592px] text-center">
          By proceeding, you affirm that you are at least 21 years old and
          possess the qualifications of a trained professional.
        </p>
      </div>
    </div>
  );
};

export default PreLanderContent;
