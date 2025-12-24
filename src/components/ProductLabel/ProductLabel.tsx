import { FC } from "react";
import Image from "next/image";

interface ProductLabelProps {
  type: string;

  width?: number;
  height?: number;
}

const ProductLabel: FC<ProductLabelProps> = ({ type, width, height }) => {
  return (
    <Image
      src={`/images/label-${type}.svg`}
      width={width ? width : 109}
      height={height ? height : 40}
      alt={type}
      className="select-none"
    />
  );
};

export default ProductLabel;
