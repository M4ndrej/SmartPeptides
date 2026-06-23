"use client";

import Button from "@/components/Button/Button";
import Link from "next/link";
import { FC } from "react";
import { useProfileContext } from "../ProfileContext";

const StoreCredits: FC = () => {
  const { userData } = useProfileContext();

  return (
    <div className="w-[449px] sm:w-[100%] md:w-[100%]">
      <div className="font-D24px-M18px font-bold">Store credit</div>
      <p className="font-D16px-M13px mt-[16px]">Balance</p>
      <h4 className="font-D32px-M24px font-bold text-[#333333]">
        ${userData?.credit_store?.toFixed(2)}
      </h4>
      <p className="font-D16px-M13px mt-[16px]">
        Store credit can be used to purchase items on this store.
      </p>
      <Link href="/shop">
        <Button
          text="CONTINUE SHOPPING"
          highlighted
          customClass="mt-[32px]"
          onPress={async () => {}}
        />
      </Link>
    </div>
  );
};

export default StoreCredits;
