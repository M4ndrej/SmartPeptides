"use client";
import { formatCurrency } from "@/helpers/curency_format";
import { ProductNew } from "@/types/product";
import classNames from "classnames";
import Link from "next/link";
import { FC, useState } from "react";
import AuthorizedImage from "../Image/Image";
import ArrowLeftIcon from "../Icons/ArrowLeftIcon";
import ArrowRightIcon from "../Icons/ArrowRightIcon";
import { getComProductSlug } from "@/helpers/product_helper";

interface SingleProductSwitchButtonsProps {
  mainProduct: ProductNew;
  previousProduct?: ProductNew;
  nextProduct?: ProductNew;
  hideMobileSwitch?: boolean;
  hideDesktopSwitch?: boolean;
}

const SingleProductSwitchButtons: FC<SingleProductSwitchButtonsProps> = ({
  mainProduct,
  previousProduct,
  nextProduct,
  hideMobileSwitch,
  hideDesktopSwitch,
}) => {
  const [hoverNextProduct, setHoverNextProduct] = useState<ProductNew>();

  return (
    <>
      {!hideDesktopSwitch && (
        <div className="desk-btns relative flex gap-x-[16px] sm:hidden md:hidden from834:flex">
          <Link
            href={
              previousProduct ? `/${getComProductSlug(previousProduct)}` : ""
            }
          >
            <div
              className={classNames({
                "flex h-[40px] min-h-[40px] w-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-[5px] from834:h-[32px] from834:min-h-[32px] from834:w-[32px] from834:min-w-[32px] lg:h-[40px] lg:min-h-[40px] lg:w-[40px] lg:min-w-[40px] ":
                  true,
                "cursor-default hover:!border-light-gray-v2 [&_path]:hover:!stroke-light-gray-v2":
                  !previousProduct,
              })}
              onMouseEnter={() =>
                nextProduct ? setHoverNextProduct(previousProduct) : {}
              }
              onMouseLeave={() => setHoverNextProduct(undefined)}
            >
              <div className="flex h-full w-full items-center justify-center">
                <ArrowLeftIcon type="switch-prod" />
              </div>
            </div>
          </Link>
          <Link href={nextProduct ? `/${getComProductSlug(nextProduct)}` : ""}>
            <div
              className={classNames({
                "flex h-[40px] min-h-[40px] w-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-[5px] p-0 from834:h-[32px] from834:min-h-[32px] from834:w-[32px] from834:min-w-[32px] lg:h-[40px] lg:min-h-[40px] lg:w-[40px] lg:min-w-[40px] ":
                  true,
                "cursor-default hover:!border-light-gray-v2 [&_path]:hover:!stroke-light-gray-v2":
                  !nextProduct,
              })}
              onMouseEnter={() =>
                nextProduct ? setHoverNextProduct(nextProduct) : {}
              }
              onMouseLeave={() => setHoverNextProduct(undefined)}
            >
              <div className="flex h-full w-full items-center justify-center">
                <ArrowRightIcon type="switch-prod" />
              </div>
            </div>
          </Link>

          {hoverNextProduct && (
            <div
              className={classNames({
                "absolute right-0 top-[48px] w-[240px] select-none border border-borderColor bg-white p-[12px] shadow-globalShadow":
                  true,
              })}
            >
              <div className="flex items-center gap-x-[8px]">
                <div className="flex h-[44px] w-[33px] items-center justify-center bg-lightgray">
                  <AuthorizedImage
                    src={hoverNextProduct?.images[0].src}
                    alt={hoverNextProduct?.images[0].alt}
                    width={33}
                    height={44}
                  />
                </div>

                <div>
                  <div className="font-13px-ALL mb-[4px]">
                    {hoverNextProduct?.name}
                  </div>
                  <div className="font-13px-ALL text-[#333333]">
                    {formatCurrency(+hoverNextProduct?.price, true)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {/* ///////////////////////////// */}
      {/* Mobile switch buttons */}
      {!hideMobileSwitch && (
        <div className="mobile-switch-btns relative mb-[16px] hidden w-full max-w-[100%] items-center justify-between  sm:flex md:mb-[-16px] md:flex md:px-0 from834:hidden">
          <div className="flex max-w-[45%] items-center gap-x-[8px]">
            <Link
              href={
                previousProduct ? `/${getComProductSlug(previousProduct)}` : ""
              }
            >
              <div
                className={classNames({
                  "flex h-[40x] min-h-[40px] w-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-[5px] p-0":
                    true,
                })}
              >
                <div className="flex h-full w-full items-center justify-center">
                  <ArrowLeftIcon type="switch-prod" />
                </div>
              </div>
            </Link>
            {previousProduct && (
              <div className="max-w-[70%]">
                <div className="font-12px-ALL mb-[4px] text-ellipsis sm:max-w-full sm:overflow-hidden sm:whitespace-nowrap  md:overflow-hidden  md:whitespace-nowrap">
                  {previousProduct?.name}
                </div>
                <div className="font-12px-ALL text-[#333333]">
                  {formatCurrency(+previousProduct?.price, true)}
                </div>
              </div>
            )}
          </div>
          <div className="flex max-w-[45%] items-center gap-x-[8px]">
            {nextProduct && (
              <div className="max-w-[70%] text-right">
                <div className="font-12px-ALL mb-[4px] text-ellipsis sm:max-w-full sm:overflow-hidden sm:whitespace-nowrap md:overflow-hidden  md:whitespace-nowrap">
                  {nextProduct?.name}
                </div>
                <div className="font-12px-ALL text-[#333333]">
                  {formatCurrency(+nextProduct?.price, true)}
                </div>
              </div>
            )}
            <Link
              href={nextProduct ? `/${getComProductSlug(nextProduct)}` : ""}
            >
              <div
                className={classNames({
                  "flex h-[40x] min-h-[40px] w-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-[5px] p-0":
                    true,
                })}
              >
                <div className="flex h-full w-full items-center justify-center">
                  <ArrowRightIcon type="switch-prod" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProductSwitchButtons;
