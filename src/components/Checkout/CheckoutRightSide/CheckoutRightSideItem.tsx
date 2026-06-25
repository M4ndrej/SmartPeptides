import { FC } from "react";
import { formatCurrency } from "@/helpers/curency_format";
import AuthorizedImage from "../../Image/Image";
import { CartItemType } from "@/types/cart_types";
import classNames from "classnames";

interface CheckoutRightSideItemProps {
  item: CartItemType;
}
const separateNameAndVariation = (input: string): string => {
  const regex = /(.+?)\s([\d]+[a-zA-Z]+)/;
  const match = input.match(regex);

  if (match) {
    const variation = match[2].trim();
    return variation;
  }

  return "";
};
const CheckoutRightSideItem: FC<CheckoutRightSideItemProps> = ({ item }) => {
  const isMerch = item.categories.some((c) => c.slug === "merch");
  const productPrice =
    +item.price > 0 ? formatCurrency(+item.price) : "FREE GIFT";
  const productSubtotal =
    +item.price > 0 ? formatCurrency(+item.subtotal) : "FREE GIFT";

  const variationValue =
    item.variation[0] !== undefined
      ? item.variation[0].value.replaceAll("-", ".")
      : separateNameAndVariation(item.name);

  return (
    <div className="flex items-center gap-[13px] pt-[24px] ">
      {/* Image div */}
      <div className=" relative h-[95px] min-w-[77px] max-w-[77px] border-[1px] border-borderColor">
        <AuthorizedImage
          src={item.image.src}
          alt={item.image.alt}
          width={100}
          height={100}
          className="h-full w-full select-none object-contain"
        />
        <span className="font-13px-ALL absolute right-[-10px] top-[-10px] flex h-[24px] w-[24px] select-none items-center justify-center rounded-[24px] bg-[#9A9A9F] text-textWhite">
          {item.quantity}{" "}
        </span>
      </div>
      {/* Name, price and variation */}
      <div className="flex w-full flex-col gap-[5px] sm:gap-[4px]">
        <div className="flex justify-between">
          <p className="font-D16px-M13px overflow-hidden text-ellipsis whitespace-nowrap sm:max-w-[140px] md:max-w-[210px]">
            {item.name}
          </p>{" "}
          <p className="font-D16px-M13px hidden text-darkgray sm:block xl:block">
            {productSubtotal}{" "}
          </p>
        </div>
        <div className="w-fit select-none text-[14px] font-normal leading-[22px] text-[#999999]">
          Rate {productPrice}
        </div>

        {variationValue && (
          <div className="flex items-center justify-start gap-2">
            {isMerch ? (
              item.variation
                ?.filter((v) => ["Color", "Size"].includes(v.attribute))
                ?.map((v) => (
                  <div
                    key={v.attribute}
                    className={classNames(
                      "relative flex h-[27px] w-[27px] items-center justify-center rounded-[5px] border-2",
                      v.attribute === "Color"
                        ? "border-lightgray"
                        : "border-[#9A9A9F]",
                      v.attribute === "Color" &&
                        v.value === "white" &&
                        "bg-white",
                      v.attribute === "Color" &&
                        v.value == "black" &&
                        "bg-black"
                    )}
                  >
                    {v.attribute === "Size" && (
                      <span className="text-sm font-bold capitalize text-darkgray">
                        {v.value}
                      </span>
                    )}
                  </div>
                ))
            ) : (
              <span className="w-fit select-none rounded-[2px] border border-[#9A9A9F] bg-[#9A9A9F] px-[8px] py-[1.5px] text-[11px] text-textWhite">
                {variationValue}
              </span>
            )}
          </div>
        )}
        <div className="sm:hidden xl:hidden">
          <p className="font-D16px-M13px text-darkgray">{productSubtotal}</p>
        </div>

        {/* <div className=" lg:hidden">
        <p className="font-D16px-M14px text-darkgray">{productPrice} </p>
        </div> */}
      </div>
    </div>
  );
};

export default CheckoutRightSideItem;
