import classNames from "classnames";
import BuyOneGetOneLabel from "./BuyOneGetOneLabel";

const BuyOneGetOnePage = () => {
  return (
    <BuyOneGetOneLabel
      className={classNames(
        `absolute z-[2] 
        sm:left-[23%] sm:top-[95px] sm:h-[120px] sm:w-[120px]
        md:left-[20%] md:top-[172px] md:h-[190px] md:w-[190px] 
        from834:left-10 from834:top-[132px] from834:h-[135px] from834:w-[135px] 
        lg:left-16 lg:top-[132px] lg:h-[150px] lg:w-[150px] 
        xl:left-8 xl:top-[172px] xl:h-[190px] xl:w-[190px]`
      )}
    />
  );
};

export default BuyOneGetOnePage;
