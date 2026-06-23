import Link from "next/link";
import CheckIcon from "../Icons/CheckIcon";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";

const CheckoutRecoveryPaid = () => {
  return (
    <div className="w-full">
      <div className="flex min-h-screen w-full justify-center">
        <div className="container-padding-inline w-full max-w-[677px] overflow-hidden bg-white py-[30px]">
          {/* Logo */}
          <div className="mb-10 flex w-full items-center justify-center">
            <Logo customClass="headerLogo" />
          </div>
          <div className="flex flex-col items-center gap-4">
            <CheckIcon
              withCircle={true}
              width={60}
              height={60}
              strokeWidth={1.2}
              className="!stroke-[#333333]"
            />

            <h1 className="font-D32px-M24px flex flex-col items-center justify-center gap-4 text-center font-bold">
              You have already paid.
              <div className="h-[2px] w-[48px] bg-[#333333]" />
            </h1>

            <p className="text-center">
              Thank you for your payment; we’re pleased to confirm that your
              order for peptides has been successfully processed.
            </p>
          </div>
          <div className="mt-8 flex w-full items-center justify-center">
            <Link href="/">
              <Button text="BACK HOME" highlighted customClass="w-[184px]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutRecoveryPaid;
