import SemaglutideName from "@/components/Icons/SemaglutideName";
import TirzName from "@/components/Icons/TirzName";
import { categoriesReduced, categoriesWeight } from "@/data/product_data";
import { getComProductSlug } from "@/helpers/product_helper";
import { getHighlightedText } from "@/helpers/text_helpers";
import { ProductNew } from "@/types/product";
import classNames from "classnames";
import Link from "next/link";
import { FC, MouseEvent, useMemo } from "react";

interface ProductCardNameProps {
  mainProduct: ProductNew;
  searchTerm?: string;
  section?: string;
  onNavigate: (slug: string) => void;
  isMegaMenuMobile?: boolean;
}

const ProductCardName: FC<ProductCardNameProps> = ({
  mainProduct,
  searchTerm,
  section,
  onNavigate,
  isMegaMenuMobile,
}) => {
  const splitName = mainProduct.name.split(" ");

  const label = useMemo(() => {
    switch (true) {
      case !!searchTerm:
        return getHighlightedText(mainProduct.name, searchTerm!);
      case mainProduct.id === 114189:
        return splitName.slice(0, -3).join(" ");
      case mainProduct.id === 11557:
        return splitName.slice(0, -1).join(" ").replaceAll(",", "");
      case categoriesReduced.includes(mainProduct.categories[0].slug):
        return splitName.slice(0, -1).join(" ");
      case mainProduct.id === 56798:
        return (
          <SemaglutideName
            fontSize={section === "mega-menu" ? 14 : 16}
            fillOpacity={0.8}
            isMegaMenuMobile={isMegaMenuMobile}
          />
        );
      case mainProduct.id === 56914:
        return (
          <TirzName
            fontSize={section === "mega-menu" ? 14 : 16}
            fillOpacity={0.75}
          />
        );
      default:
        return mainProduct.name;
    }
  }, [mainProduct, searchTerm, splitName]);

  const labelSuffix = useMemo(() => {
    switch (true) {
      case mainProduct.id === 114189:
        return splitName.slice(-3).join(" ");
      case categoriesWeight.includes(mainProduct.categories[0].slug):
        return splitName[splitName.length - 1];
      default:
        return "";
    }
  }, [mainProduct, splitName]);

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate(`/${getComProductSlug(mainProduct)}`);
  };

  return (
    <h2>
      <Link
        href={`/${getComProductSlug(mainProduct)}`}
        className={classNames(
          "font-D16px-M12px blue-color-hover block w-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap",
          section === "mega-menu" && "font-D14px-T12px-M12px",
          isMegaMenuMobile && "text-textWhite"
        )}
        onClick={onClick}
      >
        {label} {labelSuffix}
      </Link>
    </h2>
  );
};

export default ProductCardName;
