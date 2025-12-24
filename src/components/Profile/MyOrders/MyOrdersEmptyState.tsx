import Image from "next/image";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";

const MyOrdersEmptyState = () => {
  const router = useRouter();

  return (
    <div>
      <div className="mx-auto mb-[286px] flex w-full flex-col items-center gap-[32px] px-[32px] pt-[48px] text-center sm:mb-[64px] sm:max-w-[410px] sm:px-[16px] sm:pt-[39px]">
        <Image
          src="/images/cartIconBig.svg"
          width={80}
          height={80}
          alt="Cart Bag"
          className="h-[105px] w-[99px] select-none sm:h-[81px] sm:w-[77px]"
        />
        <div>
          <div className="font-D24px-M16px sm:mx-auto sm:max-w-[320px] sm:font-medium ">
            You have no orders on your profile.
          </div>
        </div>
        <div className="flex w-full justify-center sm:w-[228px]">
          <Button
            text={"RETURN TO SHOP"}
            onPress={async () => router.push("/shop/")}
            highlighted
          />
        </div>
      </div>
    </div>
  );
};

export default MyOrdersEmptyState;
