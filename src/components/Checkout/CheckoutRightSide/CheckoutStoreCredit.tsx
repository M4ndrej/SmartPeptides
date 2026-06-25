"use client";
import applyStoreCredit from "@/app/actions/cart/apply_store_credit/actions";
import StoreCreditIcon from "@/components/Icons/StoreCreditIcon";
import MyInput from "@/components/Input/MyInput";
import { formatCurrency } from "@/helpers/curency_format";
import { fetcher } from "@/helpers/fetchers";
import { LoggedUserData } from "@/types/user";
import classNames from "classnames";
import { Dispatch, FC, SetStateAction, useState } from "react";
import AnimateHeight from "react-animate-height";
import useSWR, { mutate } from "swr";
import Button from "../../Button/Button";
import DropdownIcon from "../../Icons/DropdownIcon";

interface CheckoutStoreCreditProps {
  setCartUpdate: Dispatch<SetStateAction<boolean>>;
  isMobile: boolean;
}

const CheckoutStoreCredit: FC<CheckoutStoreCreditProps> = ({
  setCartUpdate,
  isMobile,
}) => {
  const { data: userData, isLoading: userDataLoading } = useSWR<LoggedUserData>(
    "/api/user/",
    fetcher
  );

  const [isOpen, setIsOpen] = useState(!isMobile);
  const [creditErrors, setCreditErrors] = useState<string[] | undefined>();
  const [creditAmount, setCreditAmount] = useState<string>("");

  const applyCartStoreCredit = async () => {
    setCartUpdate(true);
    const formData = new FormData();
    formData.append("amount", creditAmount);
    const apply = await applyStoreCredit(formData);

    setCartUpdate(false);
    if (apply.errors) {
      setCreditAmount("");
      return setCreditErrors(apply.errors?.amount);
    }
    if (apply.error) {
      setCreditAmount("");
      return setCreditErrors([apply.error]);
    }
    await mutate("/api/cart/get_cart");
    await mutate("/api/user/");
    setCreditAmount("");
  };

  const inputCredit = (val: string) => {
    setCreditErrors(undefined);
    setCreditAmount(val);
  };

  if ((userData?.user?.credit_store ?? 0) === 0) return null;

  return (
    <div
      className={classNames(
        "mt-[24px] rounded-[5px] border-[2px] border-dashed border-borderColor bg-gray5 px-[16px] transition duration-300",
        isMobile && !isOpen && " border-[2px] border-solid border-borderColor"
      )}
    >
      <div
        className={classNames(
          "group mt-[24px] flex items-center sm:mt-0 sm:py-[14px] ",
          isMobile && "cursor-pointer"
        )}
        onClick={isMobile ? () => setIsOpen(!isOpen) : undefined}
      >
        <div className="group flex w-full items-center justify-between">
          <div className="flex items-center gap-[8px]">
            <StoreCreditIcon
              customClass={`transition duration-300  ${isMobile && "group-hover:fill-[#9A9A9F]"}`}
            />
            <p
              className={classNames(
                "font-D16px-M13px transition duration-300 ",
                isMobile && "group-hover:text-gray"
              )}
            >
              Apply store credit discount?
            </p>
          </div>

          {isMobile && (
            <DropdownIcon
              className={classNames(
                "transition duration-200 group-hover:!stroke-[#9A9A9F]",
                !isOpen && "rotate-[180deg]"
              )}
            />
          )}
        </div>
      </div>

      <AnimateHeight height={isOpen ? "auto" : 0} duration={300}>
        <div className="mt-[16px] flex flex-col sm:mt-0 ">
          <p className="font-D14px-M13px leading-[22px]">
            <span className="font-bold">
              {formatCurrency(+userData?.user?.credit_store!, true)}
            </span>{" "}
            available store credits.
          </p>
          <p className="font-D14px-M13px mb-[16px] leading-[22px] text-[#999999]">
            Enter amount of store credits you want to apply as discount for this
            order.
          </p>
          <div className="flex flex-col gap-[16px] pb-[24px] xl:flex-row">
            <MyInput
              label="Enter amount"
              required={false}
              name="coupon_code"
              value={creditAmount}
              onChange={async (e) => inputCredit(e.target.value)}
              containerClassName="w-full"
              isError={!!creditErrors}
              errorMessage={creditErrors?.[0] || ""}
            />
            <Button
              onPress={applyCartStoreCredit}
              showSpiner
              disabled={!creditAmount}
              text={"APPLY"}
              customClass="!px-[25px] min-w-[173px]"
            />
          </div>
        </div>
      </AnimateHeight>
    </div>
  );
};

export default CheckoutStoreCredit;
