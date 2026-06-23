"use client";

import { formatCurrency } from "@/helpers/curency_format";
import { fetcher } from "@/helpers/fetchers";
import useIsClientRender from "@/hooks/useIsClientRender";
import { ProductNew } from "@/types/product";
import { SpecificUser } from "@/types/user";
import classNames from "classnames";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Button from "../Button/Button";
import XMarkIcon from "../Icons/XMarkIcon";
import AuthorizedImage from "../Image/Image";
import SuspendRender from "../SuspendRender/SuspendRender";

const TirzNotification = () => {
  const isClient = useIsClientRender();
  const [hasClosed, setHasClosed] = useState(false);

  const { data } = useSWR<SpecificUser>("/api/user/specific_user", fetcher);

  const { data: product } = useSWR<ProductNew>(`/api/products/6856`, fetcher);

  const onClose = () => {
    Cookies.set("closedProduct", "1", { expires: 7 });
    setHasClosed(true);
  };

  useEffect(() => {
    const cookieVal = Cookies.get("closedProduct");
    setHasClosed(!!cookieVal);
  }, [Cookies, isClient]);

  const isRendered =
    !!data?.is_tirz_user && !!product && isClient && !hasClosed;

  if (!product) return null;
  return (
    <SuspendRender isRendered={isRendered}>
      {(isVisible) => (
        <div
          className={classNames(
            "ease-[cubic-bezier(0.11, 0, 0.5, 0)] fixed left-1/2 z-[99999999999999] w-full max-w-[min(1290px,calc(100%-32px))] -translate-x-1/2 overflow-hidden transition-all duration-300",
            isVisible ? "bottom-4 lg:bottom-8" : "bottom-[-200px]"
          )}
        >
          <div className="flex h-full min-h-[168px] w-full items-center justify-between gap-6 rounded-[5px] border-[2px] border-[#333333] bg-white p-8 sm:flex-col sm:gap-4 lg:gap-16">
            <div className="flex w-auto grow flex-col gap-2 sm:w-full">
              <p className="text-base font-bold lg:text-2xl">
                Extra product - TIRZEPATIDE
              </p>
              <p className="text-sm lg:text-base">
                Take advantage of this limited time opportunity to purchase{" "}
                <b>Tirzepatide</b>.
              </p>
            </div>
            <div className="flex w-auto shrink-0 grow items-center justify-between gap-6 sm:w-full lg:gap-16">
              <div className="flex items-center justify-start gap-2">
                <AuthorizedImage
                  src={product?.images[0].src}
                  width={90}
                  height={104}
                  draggable={false}
                  alt="Product image"
                  className="h-[80px] w-[70px] select-none bg-lightgray xs:h-[52px] xs:w-[45px] lg:h-[104px] lg:w-[90px]"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-base xs:text-sm">{product.name}</p>
                  <p className="text-sm text-[#333333] xs:text-xs md:text-base">
                    <span>
                      {formatCurrency(+product.variations[0].price, true)}
                    </span>
                    {" - "}
                    <span>
                      {formatCurrency(
                        +product.variations[product.variations.length - 1]
                          .price,
                        true
                      )}
                    </span>
                  </p>
                </div>
              </div>

              <Link
                href={`/${product.slug}`}
                onClick={onClose}
                className="shrink-0"
              >
                <Button
                  text="SHOP NOW"
                  highlighted={true}
                  reverseColors={true}
                  customClass="sm:!px-[22px] sm:!py-2"
                />
              </Link>
            </div>
          </div>

          <button
            type="button"
            className="group/closeBtn absolute right-4 top-4 z-10 flex h-6 w-6 items-center justify-center"
            onClick={onClose}
          >
            <XMarkIcon
              width={24}
              height={24}
              className="!stroke-gray2 transition-colors duration-300 group-hover/closeBtn:!stroke-[#333333]"
            />
          </button>
        </div>
      )}
    </SuspendRender>
  );
};

export default TirzNotification;
