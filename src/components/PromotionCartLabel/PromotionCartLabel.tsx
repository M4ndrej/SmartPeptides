import { FC } from "react";

interface PromotionCartLabelProps {
  textNormal?: string;
  textBold: string;
}

const PromotionCartLabel: FC<PromotionCartLabelProps> = ({
  textNormal,
  textBold,
}) => {
  return (
    <div className="font-D15px-M10px flex w-full items-center justify-center gap-[8px] border-[1px] border-dashed border-[#9A9A9F] px-[5px] py-[10px]  sm:py-[9px]">
      <div className="flex items-center justify-center gap-[8px]">
        <div className="flex flex-wrap items-center gap-[4px]">
          <p className="m-0 flex items-center justify-between gap-[8px]">
            <span className="block h-[8px] w-[8px] rounded-[8px] bg-[#9A9A9F]"></span>{" "}
            {textNormal}
          </p>
          <p className="w-fit font-bold">{textBold} </p>
        </div>
      </div>
    </div>
  );
};

export default PromotionCartLabel;
