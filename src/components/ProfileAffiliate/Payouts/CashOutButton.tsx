"use client";

import Button from "@/components/Button/Button";
import { FC, useState } from "react";
import CashOutModal from "./CashOutModal";
import classNames from "classnames";
import { AffiliatePaymentMethod } from "@/types/affiliates";

interface CashOutButtonProps {
  isAvailable: boolean;
  paymentMethod: AffiliatePaymentMethod | undefined;
}

const CashOutButton: FC<CashOutButtonProps> = ({
  isAvailable,
  paymentMethod,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCashOut = async () => {
    return setIsModalOpen(true);
  };

  return (
    <>
      <div>
        <Button
          reverseColors={true}
          highlighted={true}
          disabled={!isAvailable}
          text="REQUEST PAYMENT"
          onPress={onCashOut}
          customClass={classNames(
            `font-D16px-M15px`,
            !isAvailable && "!bg-lightgray !text-gray2 !border-none"
          )}
        />
      </div>
      {isAvailable && (
        <CashOutModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          paymentMethod={paymentMethod}
        />
      )}
    </>
  );
};

export default CashOutButton;
