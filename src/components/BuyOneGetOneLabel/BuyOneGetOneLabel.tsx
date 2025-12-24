import Image from "next/image";
import { FC } from "react";

interface BuyOneGetOneLabelProps {
  className?: string;
}

const BuyOneGetOneLabel: FC<BuyOneGetOneLabelProps> = ({ className }) => {
  return (
    <Image
      src="/images/buyOneGetOneFree.svg"
      alt="Buy One Get One Free"
      width={190}
      height={190}
      className={className}
    />
  );
};

export default BuyOneGetOneLabel;
