import { FC } from "react";
import RangeInput from "../Range/Range";
import LinkButton from "../Button/LinkButton";
import classNames from "classnames";

type RangeSliderProps = {
  price?: string;
  linkTo: string;
  isDisabled?: boolean;
  value?: number;
  showHintText?: boolean;
  type?: string;
  shppingExpressPriority?: string;
  page?: string;
};

const RangeSlider: FC<RangeSliderProps> = ({
  price,
  linkTo,
  isDisabled,
  value,
  showHintText,
  type,
  shppingExpressPriority,
  page,
}) => {
  return (
    <div>
      <div>
        {/* Range track */}
        <RangeInput isDisabled={isDisabled} value={value} />
      </div>
      {/* Range text */}
      <div
        className={classNames(
          "mt-[20px] flex w-full items-center justify-between sm:mt-[10px] sm:flex-col sm:items-start sm:justify-start sm:gap-[10px] xl:flex-row",
          page == "Cart" &&
            "md:flex-col md:items-start md:gap-[16px] lg:flex-col lg:items-start lg:gap-[12px] xl:items-center"
        )}
      >
        {showHintText ? (
          <p className="font-D16px-M13px sm:leading-[16px]">
            Spend{" "}
            <strong className="text-[#333333] sm:font-normal">{price}</strong>{" "}
            more for{" "}
            <strong className="uppercase">
              FREE{" "}
              {shppingExpressPriority !== "gift"
                ? `${shppingExpressPriority} shipping`
                : shppingExpressPriority}
            </strong>
          </p>
        ) : (
          <>
            <p className="font-D16px-M13px overflow-hidden text-ellipsis whitespace-nowrap sm:leading-[16px] md:w-[400px] from834:w-auto">
              Congratulations! You’ve got{" "}
              <span className="font-bold uppercase">
                {value === 100 && shppingExpressPriority !== "gift"
                  ? `FREE ${shppingExpressPriority} shipping`
                  : `FREE ${shppingExpressPriority}`}
              </span>
            </p>
          </>
        )}
        <LinkButton className="pl-0" href={linkTo}>
          Continue shopping
        </LinkButton>
      </div>
    </div>
  );
};

export default RangeSlider;
