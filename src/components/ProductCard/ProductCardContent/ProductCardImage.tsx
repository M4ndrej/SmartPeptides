import AuthorizedImage from "@/components/Image/Image";
import { getComProductSlug } from "@/helpers/product_helper";
import { ProductNew, Variation } from "@/types/product";
import classNames from "classnames";
import Link from "next/link";
import { FC, MouseEvent, useMemo } from "react";

interface ProductCardImageProps {
  mainProduct: ProductNew;
  selectedVariation?: Variation;
  section?: string;
  viewMode?: string;
  isMerch?: boolean;
  activeCategory?: string;
  onNavigate: (slug: string) => void;
}

const ProductCardImage: FC<ProductCardImageProps> = ({
  mainProduct,
  selectedVariation,
  viewMode,
  section,
  activeCategory,
  onNavigate,
  isMerch,
}) => {
  const mainProductImages = useMemo(() => {
    if (selectedVariation && selectedVariation.image) {
      return selectedVariation.image;
    }
    return mainProduct.images;
  }, [selectedVariation, mainProduct]);

  const isSpecialProduct = [11557, 114189].includes(mainProduct.id);
  const onClick = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    onNavigate(`/${getComProductSlug(mainProduct)}`);
  };
  console.log("Image:",mainProductImages?.[0]?.src)

  if (isSpecialProduct) {
    return (
      <Link
        href={`/${getComProductSlug(mainProduct)}`}
        className="relative transition-none"
      >
        {/* <BuyOneGetOneCard viewMode={viewMode} section={section} /> */}
        <div
          className={classNames(
            "!relative flex h-full w-full cursor-pointer select-none overflow-hidden bg-lightgray transition duration-200 hover:scale-[1.05] sm:min-h-[197px]",
            isMerch ? "object-contain" : "object-cover",
            (viewMode !== "rows" || section === "mega-menu") &&
              "w-full sm:max-h-[240px] md:max-h-[277px] from834:max-h-[309px]",
            viewMode === "5x5" && "lg:min-h-[284px] xl:min-h-[255px]",
            viewMode === "4x4" && "lg:min-h-[284px] xl:min-h-[333px]",
            viewMode === "3x3" && "lg:min-h-[425px]",
            viewMode === "rows" &&
              section !== "mega-menu" &&
              "md:!min-h-[342px]  lg:min-h-[342px] lg:!min-w-[288px] xl:min-h-[384px]",
            (section === "ourProducts" ||
              section === "slider" ||
              section === "slider-dots") &&
              "sm:max-h-[197px] md:min-h-[277px] from834:min-h-[309px] lg:min-h-[284px] xl:min-h-[333px]",
            section === "mega-menu" &&
              "md:max-h-[210px] md:min-h-[210px] from834:max-h-[250px] from834:min-h-[250px] lg:!max-h-[338px] lg:!min-h-[338px] xl:!max-h-[202px] xl:!min-h-[202px]",
            activeCategory === "Cosmetic Peptides" &&
              section === "mega-menu" &&
              "scale-[1.15] hover:scale-[1.20]",
            activeCategory === "Peptide Supplies" &&
              section === "mega-menu" &&
              "!object-contain"
          )}
        >
          <AuthorizedImage
            onClick={onClick}
            src={mainProductImages?.[0]?.src}
            alt={mainProductImages?.[0]?.alt}
            width={300}
            height={300}
            className={classNames(
              section !== "mega-menu" && isSpecialProduct && "!scale-90",
              section === "mega-menu" && isSpecialProduct && "!scale-75"
            )}
          />
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/${getComProductSlug(mainProduct)}`}
      className="relative transition-none"
    >
      {/* <BuyOneGetOneCard viewMode={viewMode} section={section} /> */}
      {section === "ourProducts" ? (
        <div
          className={classNames(
            "relative flex h-full w-full items-center justify-center overflow-visible bg-lightgray sm:min-h-[197px]",
            viewMode !== "rows" &&
              "w-full sm:max-h-[240px] md:max-h-[277px] from834:max-h-[309px]",
            viewMode === "5x5" && "lg:min-h-[284px] xl:min-h-[255px]",
            viewMode === "4x4" && "lg:min-h-[284px] xl:min-h-[333px]",
            viewMode === "3x3" && "lg:min-h-[425px]",
            viewMode === "rows" &&
              "md:!min-h-[342px]  lg:min-h-[342px] lg:!min-w-[288px] xl:min-h-[384px]",
            "sm:max-h-[197px] md:min-h-[277px] from834:min-h-[309px] lg:min-h-[284px] xl:min-h-[343px]"
          )}
        >
          <AuthorizedImage
            onClick={onClick}
            src={mainProductImages?.[0]?.src}
            alt={mainProductImages?.[0]?.alt}
            width={300}
            height={384}
            className={classNames(
              "h-[95%] w-auto max-w-full cursor-pointer select-none transition-all duration-200 hover:h-full hover:scale-[1.15] hover:object-cover",
              isMerch ? "object-contain" : "object-cover"
            )}
          />
        </div>
      ) : (
        <AuthorizedImage
          onClick={onClick}
          src={mainProductImages?.[0]?.src}
          alt={mainProductImages?.[0]?.alt}
          width={300}
          height={384}
          className={classNames(
            "!relative flex h-full cursor-pointer select-none flex-col items-stretch overflow-hidden bg-lightgray transition duration-200 hover:scale-[1.05] sm:min-h-[197px] sm:object-contain sm:hover:scale-[1]",
            isMerch ? "object-contain" : "object-cover",
            (viewMode !== "rows" || section === "mega-menu") &&
              "w-full sm:max-h-[240px] md:max-h-[277px] from834:max-h-[309px]",
            viewMode === "5x5" && "lg:min-h-[284px] xl:min-h-[255px]",
            viewMode === "4x4" && "lg:min-h-[284px] xl:min-h-[333px]",
            viewMode === "3x3" && "lg:min-h-[425px]",
            viewMode === "rows" &&
              section !== "mega-menu" &&
              "md:!min-h-[342px]  lg:min-h-[342px] lg:!min-w-[288px] xl:min-h-[384px]",
            (section === "slider" || section === "slider-dots") &&
              "sm:max-h-[197px] md:min-h-[277px] from834:min-h-[309px] lg:min-h-[284px] xl:min-h-[333px]",
            section === "mega-menu" &&
              "md:max-h-[210px] md:min-h-[210px] from834:max-h-[250px] from834:min-h-[250px] lg:!max-h-[338px] lg:!min-h-[338px] xl:!max-h-[202px] xl:!min-h-[202px]",
            activeCategory === "Cosmetic Peptides" &&
              section === "mega-menu" &&
              "scale-[1.15] hover:scale-[1.20]",
            activeCategory === "Peptide Supplies" &&
              section === "mega-menu" &&
              "!object-contain"
          )}
        />
      )}
    </Link>
  );
};

export default ProductCardImage;
