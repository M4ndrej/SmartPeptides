"use client";

import { formatCurrency } from "@/helpers/curency_format";
import { getComProductSlug } from "@/helpers/product_helper";
import { ProductNew } from "@/types/product";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import Button from "../Button/Button";
import AuthorizedImage from "../Image/Image";
interface ProductBannerProps {
  title: string;
  productName?: string;
  price?: string;
  customTextHolderClass?: string;
  customImageClass?: string;
  text?: string;
  attributes?: any;
  variations?: any;
  image: string;
  buttonText: string;
  mainProduct?: ProductNew;
  toggleWaters?: boolean;
  buttonAction?: () => Promise<void>;
  variationChange?: (e: string) => void;
  bacterioWaterEnv?: number | null;
  bacterioNaClEnv?: number | null;
  sterileEmptyVialsEnv?: number | null;
  serumBaseEnv?: number | null;
  insulinSyringeEnv?: number | null;
}

const ProductBanner: FC<ProductBannerProps> = ({
  title,
  productName,
  price,
  text,
  attributes,
  variations,
  image,
  buttonText,
  customTextHolderClass,
  customImageClass,
  buttonAction,
  variationChange,
  mainProduct,
  toggleWaters,
  bacterioWaterEnv,
  bacterioNaClEnv,
  sterileEmptyVialsEnv,
  serumBaseEnv,
  insulinSyringeEnv,
}) => {
  const [variation, setVariation] = useState<string | undefined>(
    mainProduct?.id === bacterioWaterEnv || mainProduct?.id === bacterioNaClEnv
      ? mainProduct?.attributes?.[0]?.options?.[0]
      : undefined
  );
  const [productVariation, setProductVariation] = useState(
    mainProduct?.id === bacterioWaterEnv || mainProduct?.id === bacterioNaClEnv
      ? mainProduct!.variations.findIndex(
          (item) => item.attributes[0].option === variation
        )
      : null
  );
  const [showSelectWeightMsg, setShowSelectWeightMsg] = useState(false);
  const handleVariationChange = (index: number, option: string) => {
    const productIndex = variations.findIndex(
      (item: any) => item.attributes[0].option === option
    );

    setVariation(attributes?.[0].options[index]);
    variationChange && variationChange(attributes?.[0].options[index]);
    setProductVariation(productIndex!);
    setShowSelectWeightMsg(false);
  };
  const product = mainProduct?.variations[productVariation!];

  const watersBox = document.getElementById("waters");

  const hideNaCl = () => {
    watersBox?.classList.add("hide-NaCl");
  };

  const showNaCl = () => {
    watersBox?.classList.remove("hide-NaCl");
  };
  const handleButtonClick = async () => {
    if (!variation && !(Array.isArray(variations) && variations.length === 0)) {
      setShowSelectWeightMsg(true);
      return;
    }
    if (buttonAction) {
      await buttonAction();
    }
  };
  return (
    <div className="relative m-auto flex h-[304px] w-full max-w-[1200px] overflow-hidden bg-lightgray  pl-[40px] pt-[33px] sm:h-[222px] sm:w-full sm:max-w-none sm:p-0 sm:pb-[24px] sm:pl-[16px] sm:pr-[16px] sm:pt-[24px] md:w-full md:py-[24px] md:pb-[24px] md:pr-[40px] md:pt-[24px] lg:pb-[33px] lg:pr-[40px] xl:pb-[33px] xl:pr-[20px]">
      <div className="flex w-full items-center justify-between">
        <div
          className={`${customTextHolderClass} flex-1 sm:mr-[24px] sm:w-auto`}
        >
          <Link href={`/${getComProductSlug(mainProduct)}`}>
            <div
              className={`font-D32px-T24px-M18px cursor-pointer font-bold text-darkgray transition duration-300 hover:text-gray ${title === "Sterile Empty Vials 10ml (3 pcs)" ? "md:max-w-[430px]" : ""}`}
              dangerouslySetInnerHTML={{ __html: title }}
            ></div>
          </Link>
          <div
            className={classNames({
              "mt-[10px] leading-[22px]": true,
              "!mt-0": mainProduct?.id == sterileEmptyVialsEnv,
            })}
          >
            {productName && (
              <div className="mb-[10px] text-[18px] font-bold ">
                {productName}
              </div>
            )}
            {toggleWaters && (
              <div className="flex items-center gap-[8px]">
                <span
                  className={classNames({
                    "banner-option": true,
                    "banner-option--active":
                      mainProduct?.id === bacterioWaterEnv,
                  })}
                  onClick={() => hideNaCl()}
                >
                  BA
                </span>{" "}
                <span
                  className={classNames({
                    "banner-option": true,
                    "banner-option--active":
                      mainProduct?.id === bacterioNaClEnv,
                  })}
                  onClick={() => showNaCl()}
                >
                  NACL
                </span>
              </div>
            )}
            {text && (
              <div
                className={classNames({
                  "font-D16px-M12px line-clamp-2 sm:w-full": true,
                  "max-w-[279px] sm:max-w-[250px]":
                    mainProduct?.id == serumBaseEnv,
                  hidden:
                    mainProduct?.id === bacterioWaterEnv ||
                    mainProduct?.id === bacterioNaClEnv ||
                    mainProduct?.id == sterileEmptyVialsEnv,
                })}
              >
                {text}
              </div>
            )}

            <div
              className={classNames({
                "flex items-center gap-x-[8px]": true,
                hidden: !attributes,
              })}
            >
              <div
                className={classNames({
                  "border-[2px] border-red transition duration-200":
                    showSelectWeightMsg,
                  "flex items-center gap-x-[8px] p-2": true,
                })}
              >
                {attributes &&
                  attributes &&
                  attributes[0]?.options.length > 1 &&
                  attributes[0].options.map((option: any, index: number) => (
                    <div
                      key={index}
                      className={classNames({
                        "flex cursor-pointer select-none items-center justify-center rounded-[4px] border-[1px] px-[8px] py-[4px] text-[14px] leading-[22px] transition duration-200 ":
                          true,
                        "border-[#9A9A9F] bg-[#9A9A9F] text-white":
                          option == variation,
                        "border-gray2 text-gray2 hover:border-[#9A9A9F] hover:text-gray":
                          option != variation,
                      })}
                      onClick={() => handleVariationChange(index, option)}
                    >
                      {option}
                    </div>
                  ))}
              </div>
              <div
                className={classNames({
                  "pointer-events-none text-[12px] font-bold leading-[12.19px] text-red opacity-0 transition duration-200":
                    true,
                  "pointer-events-auto !opacity-100": showSelectWeightMsg,
                })}
              >
                Select weight
              </div>
            </div>
            <div className="pt-[10px]">
              <div className="text-darkgray">
                {!variation && mainProduct!.variations.length > 1 ? (
                  <>
                    {+mainProduct!.variations[0].price ===
                    +mainProduct!.variations[mainProduct!.variations.length - 1]
                      .price ? (
                      formatCurrency(+mainProduct!.variations[0].price, true)
                    ) : (
                      <>
                        {formatCurrency(
                          +mainProduct!.variations[0].price,
                          true
                        )}{" "}
                        -{" "}
                        {formatCurrency(
                          +mainProduct!.variations[
                            mainProduct!.variations.length - 1
                          ].price,
                          true
                        )}
                      </>
                    )}
                  </>
                ) : mainProduct!.variations.length ? (
                  formatCurrency(+product?.price!, true)
                ) : (
                  formatCurrency(+mainProduct!.price, true)
                )}
              </div>
            </div>
          </div>
          <div className="mt-[24px] sm:mt-[16px]">
            <Button
              reverseColors={true}
              text={buttonText}
              highlighted
              onPress={handleButtonClick}
              showSpiner
              customClass="sm:!w-fit z-[1] relative"
            />
          </div>
        </div>
        <Image
          src={"/images/banner_background.svg"}
          width={193}
          height={304}
          alt={"Banner Molecule"}
          className={`absolute right-0 top-0 select-none`}
        />
        <AuthorizedImage
          src={mainProduct?.id === 114195 ? "/images/serumBase.png" : image}
          width={171}
          height={256}
          alt={title}
          className={classNames({
            "relative right-0 z-[1] h-[238px] w-[111px] select-none object-cover sm:h-[212px] sm:w-[97px] md:top-0 lg:top-0 ":
              true,
            "object-cover sm:scale-[.95]":
              mainProduct?.id === insulinSyringeEnv,
            "relative z-[1] h-[150px] !w-full select-none object-cover sm:h-[99px] sm:max-w-[130px] sm:scale-y-[1.12] md:top-0 md:max-h-[170px] md:max-w-[200px] lg:right-[5px] lg:top-0 lg:h-[150px] lg:max-w-[165px] xl:right-[-5px] xl:top-[-7px] xl:h-[183px] xl:max-w-[225px]":
              mainProduct?.id === serumBaseEnv,
            "sm:mr-[10px] sm:!w-[80px] sm:scale-[1.1] md:scale-[1.35] lg:scale-[1.25]":
              mainProduct?.id === bacterioNaClEnv ||
              mainProduct?.id == bacterioWaterEnv,
            "sm:!w-[70px] md:scale-[1.2] lg:scale-[1.1] xl:scale-[.9]":
              mainProduct?.id == insulinSyringeEnv,
            "sm:!h-[198px] md:scale-[1.25] lg:scale-[1.15]":
              mainProduct?.id == sterileEmptyVialsEnv,
          })}
        />
      </div>
    </div>
  );
};

export default ProductBanner;
