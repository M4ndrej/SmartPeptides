import { FC } from "react";
import Button from "../Button/Button";
import HeartIcon from "../Icons/HeartIcon";

interface WishlistEmptyStatetProps {
  navigate?: any;
}

const WishlistEmptyState: FC<WishlistEmptyStatetProps> = ({ navigate }) => {
  return (
    <div className="mx-auto mb-[286px] flex w-full max-w-[515px] flex-col items-center gap-[32px] text-center sm:mb-[64px] sm:max-w-[410px] sm:px-0">
      <HeartIcon
        width={99}
        height={105}
        className="select-none fill-[#9A9A9F] sm:h-[81px] sm:w-[77px]"
      />
      <div>
        <div className="font-D24px-M18px sm:mx-auto  ">
          No products in the wishlist.
        </div>
      </div>
      <div
        className="flex w-full justify-center sm:w-[228px]"
        onClick={navigate}
      >
        <Button text={"RETURN TO SHOP"} highlighted />
      </div>
    </div>
  );
};

export default WishlistEmptyState;
