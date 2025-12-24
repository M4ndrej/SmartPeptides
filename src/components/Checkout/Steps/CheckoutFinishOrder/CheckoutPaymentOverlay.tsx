import XMarkIcon from "@/components/Icons/XMarkIcon";
import { useState } from "react";

const CheckoutPaymentOverlay = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);

  if (!isOverlayOpen) return null;
  return (
    <div className="absolute inset-0 z-10 bg-backdrop p-6 font-bold backdrop-blur-[4px]">
      <span className="font-D24px-M18px text-textWhite">
        We heavily incentivize alternative payment methods, please review and
        consider the best option for you.
      </span>
      <button
        type="button"
        className="absolute right-[14px] top-[14px]"
        onClick={() => setIsOverlayOpen(false)}
      >
        <XMarkIcon width={24} height={24} />
      </button>
    </div>
  );
};

export default CheckoutPaymentOverlay;
