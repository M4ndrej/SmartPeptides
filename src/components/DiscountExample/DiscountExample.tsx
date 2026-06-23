import Image from "next/image";

const DiscountExample = () => {
  return (
    <div className="mt-[64px] md:mx-2">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="font-D24px-M18px mx-auto text-center font-bold">
          EXAMPLE
        </div>
        <div className="mt-[16px] h-[2px] w-[48px] rounded-[2px] bg-[#333333]"></div>
        {/* <p className="font-D16px-M13px mt-[24px] text-center font-bold sm:mt-[16px]">
          First discount order:
        </p> */}
      </div>
      {/* <div className="grid gap-4">
        <div className="font-16px-ALL mt-4 flex items-center justify-center gap-4 font-bold">
          <Image
            alt="discount"
            width={33}
            height={43}
            src="/images/discount_example.svg"
            className="select-none object-contain"
          />
          +
          <Image
            alt="discount"
            width={36}
            height={43}
            src="/images/discount_example_2.svg"
            className="select-none object-contain"
          />
          +
          <Image
            alt="discount"
            width={47}
            height={43}
            src="/images/discount_example_3.svg"
            className="select-none object-contain"
          />
        </div>
        <div className="font-16px-ALL text-center">
          First order (15%) + Quantity (5%-8%) + Payment method (3%-5%)
        </div>
      </div> */}
      {/* <div className="grid w-full gap-4 xl:mx-auto xl:w-[931px]">
        <div className="font-16px-ALL grid gap-2">
          <p className="font-bold">Quantity discount:</p>
          <p>
            If you buy <strong>5+ of each</strong> you can{" "}
            <strong>have 5% discount</strong>, If you buy{" "}
            <strong>10+ of each</strong> you can{" "}
            <strong>have 8% discount</strong>.
          </p>
        </div>
        <div className="font-16px-ALL grid gap-2">
          <p className="font-bold">Payment method discount:</p>
          <div>
            We offer several payment methods, but if you choose to pay via{" "}
            <Image
              alt="bank"
              width={24}
              height={24}
              src="/images/bacsIcon.svg"
              className="inline-block select-none object-contain"
            />{" "}
            <strong>Bank transfer</strong>,{" "}
            <Image
              alt="zelle"
              width={24}
              height={24}
              src="/images/zelle.svg"
              className="inline-block select-none object-contain"
            />{" "}
            <strong>Zelle</strong> or{" "}
            <Image
              alt="crypto"
              width={24}
              height={24}
              src="/images/crypto.svg"
              className="inline-block select-none object-contain"
            />{" "}
            <strong>Cryptocurrency</strong> you can{" "}
            <strong>have an additional 5% discount</strong>, and if you choose
            to pay via{" "}
            <Image
              alt="zelle"
              width={24}
              height={24}
              src="/images/cashapp.svg"
              className="inline-block select-none object-contain"
            />{" "}
            <strong>Cash App</strong> or{" "}
            <Image
              alt="venmo"
              width={24}
              height={24}
              src="/images/venmo.png"
              className="inline-block select-none object-contain"
            />{" "}
            <strong>Venmo</strong> you can{" "}
            <strong>have an additional 3% discount</strong>.
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default DiscountExample;
