import { ProductNew } from "@/types/product";
import { FC } from "react";
import Link from "next/link";
import classNames from "classnames";
import SyringeIcon from "../Icons/SyringeIcon";
import CremeIcon from "../Icons/CremeIcon";
interface ProductFormDisclaimerProps {
  mainProduct: ProductNew;
  isMobile?: boolean;
}

const ProductFormDisclaimer: FC<ProductFormDisclaimerProps> = ({
  mainProduct,
  isMobile,
}) => {
  const isPowderForm = mainProduct?.categories?.find(
    (c) => c.slug === "peptides" || c.slug === "blends"
  );

  const isSupply = mainProduct?.categories?.find(
    (c) => c.slug === "peptide-supplies"
  );

  if (isSupply && mainProduct.id !== 20888) return null;

  return (
    <div
      className={classNames(
        "flex items-start gap-x-[16px] sm:pb-6",
        isMobile ? "hidden sm:flex" : "pt-[24px] sm:hidden sm:pb-[8px]"
      )}
    >
      {isPowderForm ? <SyringeIcon /> : <CremeIcon />}
      <div className="font-D16px-M13px text-red sm:leading-[16px]">
        {isPowderForm
          ? "Product is sold in powder form, needs reconstitution before use. Please read more on our"
          : "Product is topical, in powder form, needs reconstitution before use. Please read more on our"}{" "}
        <Link href="/faq" className="text-[#333333] underline">
          FAQ page
        </Link>
        .
      </div>
    </div>
  );
};

export default ProductFormDisclaimer;
