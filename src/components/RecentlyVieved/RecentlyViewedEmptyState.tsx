import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FC } from "react";

interface WishlistEmptyStatetProps {
  navigate?: any;
}

const RecentlyViewedEmptyState: FC<WishlistEmptyStatetProps> = ({
  navigate,
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center gap-[32px]">
      <Image
        src="/images/cartIconBig.svg"
        width={80}
        height={80}
        alt="Cart Bag"
        className="h-[129px] w-[129px] select-none sm:h-[81px] sm:w-[77px]"
      />
      <div className="font-D24px-M18px text-center sm:mx-auto sm:max-w-[300px]">
        No products were viewed.
      </div>
      <div
        className="flex w-full justify-center sm:w-[228px]"
        onClick={navigate}
      >
        <Button
          text={"RETURN TO SHOP"}
          onPress={async () => router.push("/shop/")}
          highlighted
        />
      </div>
    </div>
  );
};

export default RecentlyViewedEmptyState;
