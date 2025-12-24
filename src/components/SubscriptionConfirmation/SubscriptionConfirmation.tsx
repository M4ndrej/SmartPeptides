"use client";
import { FC } from "react";
import { useSearchParams } from "next/navigation";
import SubscribeConfirmationModal from "./SubscribeConfirmationModal";

type SubscriptionConfirmationType = {};

const SubscriptionConfirmation: FC<SubscriptionConfirmationType> = () => {
  const searchParams = useSearchParams();
  const mailpoet_verify = searchParams.get("mailpoet_verify");

  return mailpoet_verify && <SubscribeConfirmationModal />;
};

export default SubscriptionConfirmation;
