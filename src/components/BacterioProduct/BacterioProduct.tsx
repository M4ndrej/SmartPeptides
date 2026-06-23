import classNames from "classnames";
import Spinner from "../SvgComponents/Spinner";
import { Dispatch, FC, SetStateAction } from "react";
import { ProductNew } from "@/types/product";
import AuthorizedImage from "../Image/Image";

interface BacterioProductProps {
  product: ProductNew;
  showSpinner: boolean;
  customImgClasses?: string;
  addToCart: any;
  closePopover?: any;
  setSelected: Dispatch<SetStateAction<"water" | "nacl">>;
  hasBacterioWater?: boolean;
  hasBacterioNaCl?: boolean;
}

const BacterioProduct: FC<BacterioProductProps> = ({
  product,
  showSpinner,
  customImgClasses,
  addToCart,
  closePopover,
  setSelected,
  hasBacterioWater,
  hasBacterioNaCl,
}) => {
  return (
    <div
      className={classNames({
        "col-span-2 flex h-[67px] w-full items-center bg-[#f0f0f0] py-[9px] pl-[6px] pr-[16px] dark:bg-transparent":
          true,
        "": product.id === 114187,
        "top-[-32px]": product.id === 114191,
      })}
    >
      <div
        onClick={() => closePopover()}
        className="mr-[8px] h-[40px] w-[40px]"
      >
        <AuthorizedImage
          src={product?.images?.[0].src}
          width={40}
          height={40}
          alt="Insuline"
          className={classNames({
            "scale-[1.3] cursor-pointer select-none object-cover transition duration-200 hover:scale-[1.4]":
              true,
            customImgClasses,
          })}
        />
      </div>
      <div className="flex flex-1 flex-col gap-[4px]">
        {/* add condition here */}
        <div onClick={() => closePopover()}>
          <div className="font-D16px-M12px w-fit cursor-pointer font-bold transition-[color] duration-300 ease-in-out hover:text-[#333333]">
            {product.name}
          </div>
        </div>
        <div className="flex gap-x-[8px]">
          {!hasBacterioWater && (
            <div
              onClick={() => setSelected("water")}
              className={classNames(
                "BA-btn flex max-h-[21px] cursor-pointer select-none items-center justify-center rounded-[2px] border-[1px] px-[8px] py-[4px] text-[11px] transition duration-200",
                product.id === 114187 &&
                  "border-[#333333] bg-[#333333] text-white",
                product.id !== 114187 &&
                  "border-gray2 text-gray2 hover:border-[#333333] hover:text-[#333333]"
              )}
            >
              BA
            </div>
          )}
          {!hasBacterioNaCl && (
            <div
              onClick={() => setSelected("nacl")}
              className={classNames(
                "NaCl-btn flex max-h-[21px] cursor-pointer select-none items-center justify-center rounded-[2px] border-[1px] px-[8px] py-[4px] text-[11px] transition duration-200",
                product.id === 114191 &&
                  "border-[#333333] bg-[#333333] text-white",
                product.id !== 114191 &&
                  "border-gray2 text-gray2 hover:border-[#333333] hover:text-[#333333]"
              )}
            >
              NACL
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-[10px]">
        <p className="font-D16px-M14px">${product.price} USD</p>
        {showSpinner ? (
          <div className="mr-[16px] flex h-[25px] w-[25px] items-center justify-center sm:mr-[8px] sm:h-[33px] sm:w-[33px]">
            <Spinner widthHeight="h-[20px] w-[20px]" />
          </div>
        ) : (
          <>
            <div
              className="group flex h-[41px] w-[41px] cursor-pointer select-none items-center justify-center rounded-[7px] bg-[#f0f0f0] transition duration-300 hover:bg-[#333333] dark:bg-transparent"
              onClick={() => addToCart(product)}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.4979 7.99609C11.4979 6.0631 13.0649 4.49609 14.9979 4.49609H16.9541C18.8871 4.49609 20.4541 6.0631 20.4541 7.99609V10.4963H11.4979V7.99609ZM10.4979 11.4963V11.6833C10.2324 11.8633 10.0575 12.1707 10.0575 12.5197C10.0575 13.0743 10.4991 13.5239 11.0439 13.5239C11.5886 13.5239 12.0303 13.0743 12.0303 12.5197C12.0303 12.1318 11.8142 11.7953 11.4979 11.6281V11.4963H20.4541V11.6286C20.1383 11.796 19.9227 12.1322 19.9227 12.5197C19.9227 13.0743 20.3643 13.5239 20.9091 13.5239C21.4539 13.5239 21.8955 13.0743 21.8955 12.5197C21.8955 12.1703 21.7201 11.8625 21.4541 11.6827V11.4963H23.0547C23.7801 11.4963 24.4016 12.0155 24.5307 12.7294L26.8952 25.8048C27.0617 26.7252 26.3545 27.5718 25.4192 27.5718H6.53392C5.59864 27.5718 4.89143 26.7252 5.05786 25.8048L7.42236 12.7294C7.55146 12.0155 8.17295 11.4963 8.89842 11.4963H10.4979ZM10.4979 10.4963V7.99609C10.4979 5.51081 12.5126 3.49609 14.9979 3.49609H16.9541C19.4394 3.49609 21.4541 5.51081 21.4541 7.99609V10.4963H23.0547C24.2638 10.4963 25.2996 11.3616 25.5148 12.5515L27.8793 25.6269C28.1567 27.1608 26.978 28.5718 25.4192 28.5718H6.53392C4.97513 28.5718 3.79643 27.1608 4.07382 25.6269L6.43832 12.5515C6.65348 11.3616 7.68931 10.4963 8.89842 10.4963H10.4979Z"
                  fill="#333333"
                  className="transition duration-300 group-hover:fill-gray4"
                />
              </svg>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BacterioProduct;
