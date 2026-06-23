"use client";
import { FC, useState } from "react";
import unsubscribeSubscriber from "@/app/actions/subscriber/unsubscribe/actions";
import classNames from "classnames";

interface UnsubscribeProps {
  email: string;
  code: string;
}

const SubscribeUnsubscribe: FC<UnsubscribeProps> = ({ email, code }) => {
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUnsubscribe = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("code", code);
    const update = await unsubscribeSubscriber(formData);
    setIsLoading(false);
    setError("");
    if (!update?.error) {
      setIsUnsubscribed(true);
    } else {
      setError(update.error);
    }
  };

  return (
    <div className="m-auto mb-[96px] mt-[48px] px-[60px] sm:px-[16px] md:px-[32px]">
      <div className="flex flex-col items-center justify-center">
        <div className="font-D32px-M24px text-center font-bold">
          Confirm you want to unsubscribe
        </div>
        <div className="mx-auto my-4 h-[2px] w-[48px] bg-[#333333] sm:mb-[24px]"></div>
        <div className="font-D16px-M14px text-center">
          Simply click on this link to stop receiving emails from us.
        </div>
        {error && (
          <div className="font-D16px-M14px mt-[24px] flex w-[592px] items-center gap-[8px] rounded-[5px] bg-warningRed p-[16px]">
            {error}
          </div>
        )}
        <div className="mt-[32px]">
          <button
            onClick={
              !isUnsubscribed && !isLoading ? handleUnsubscribe : undefined
            }
            type="button"
            disabled={isUnsubscribed || isLoading}
            className={classNames(
              "font-D16px-M13px text-[#333333] transition duration-300 hover:text-[#333333]",
              !isUnsubscribed && !isLoading
                ? "cursor-pointer hover:underline"
                : "cursor-default opacity-50"
            )}
          >
            {isLoading
              ? "Unsubscribing..."
              : isUnsubscribed
                ? "You have been unsubscribed."
                : "Yes, unsubscribe me."}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeUnsubscribe;
