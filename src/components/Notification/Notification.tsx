"use client";
import { fetcher } from "@/helpers/fetchers";
import { createRandomNotification } from "@/helpers/notification_helper";
import { NotificationData } from "@/types/notifications";
import { ProductList } from "@/types/product";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import useSWR from "swr";
import AuthorizedImage from "../Image/Image";

interface NotificationProps {
  productSlugs: string[];
}

const Notification: FC<NotificationProps> = ({ productSlugs }) => {
  const activePath = usePathname();
  const isProductPage = useMemo(
    () => productSlugs.includes(activePath.slice(1, -1)),
    [activePath, productSlugs]
  );

  const { data: notificationProducts } = useSWR<ProductList>(
    `/api/products/notifications`,
    fetcher
  );

  const [showNotification, setShowNotification] = useState(false);
  const [activeNotification, setActiveNotification] =
    useState<NotificationData>();
  const [nextNotification, setNextNotification] = useState<NotificationData>();

  const showNotificationTimeout = useRef<NodeJS.Timeout>();
  const hideNotificationTimeout = useRef<NodeJS.Timeout>();

  const hideNotification = () => {
    setShowNotification(false);
    clearTimeout(hideNotificationTimeout.current);
  };

  useEffect(() => {
    if (!nextNotification) return;

    hideNotification();
    clearTimeout(showNotificationTimeout.current);
    clearTimeout(hideNotificationTimeout.current);

    showNotificationTimeout.current = setTimeout(() => {
      setActiveNotification(nextNotification);
      setShowNotification(true);

      hideNotificationTimeout.current = setTimeout(() => {
        hideNotification();
      }, 10000);
    }, 3000);
  }, [nextNotification]);

  useEffect(() => {
    if (notificationProducts) {
      const notification = createRandomNotification(notificationProducts);
      setNextNotification(notification);
    }
  }, [activePath, notificationProducts]);

  return (
    <div
      className={classNames({
        "ease-[cubic-bezier(0.11, 0, 0.5, 0)] fixed left-[20px] z-[99999999999] transition-all duration-500 sm:left-[10px]":
          true,
        "bottom-[-150px]": !showNotification,
        "bottom-[20px]": showNotification,
        "sm:hidden": isProductPage,
      })}
    >
      {activeNotification && (
        <div className="relative h-[136px] w-full min-w-[468px] rounded-[8px] bg-darkgray p-[16px] pr-[40px] sm:h-auto sm:!min-w-[96.5%] sm:max-w-[calc(100%-10px)]">
          <div className="flex items-center gap-x-[16px]">
            <Link
              href={activeNotification.productLink}
              onClick={hideNotification}
            >
              <div className="flex h-[104px] w-[98px] items-center justify-center overflow-hidden rounded-[5px] bg-[#424242]">
                {[56798, 56914].includes(activeNotification.productId) ? (
                  <div className="flex items-center justify-center">
                    {activeNotification.productImages?.[1] && (
                      <AuthorizedImage
                        src={activeNotification.productImages[1]}
                        width={49}
                        height={104}
                        alt="Product"
                        className="select-none object-contain object-right"
                      />
                    )}
                    {activeNotification?.productImages?.[2] && (
                      <AuthorizedImage
                        src={activeNotification.productImages[2]}
                        width={49}
                        height={104}
                        alt="Product"
                        className="select-none object-contain object-right"
                      />
                    )}
                  </div>
                ) : (
                  <AuthorizedImage
                    src={activeNotification.productImages[0]}
                    width={98}
                    height={104}
                    alt="Product"
                    className="select-none"
                  />
                )}
              </div>
            </Link>
            <div className="flex flex-col gap-y-[16px]">
              {activeNotification.topMessage ? (
                <div className="font-13px-ALL text-textWhite">
                  {activeNotification.topMessage}
                </div>
              ) : (
                ""
              )}

              <Link
                href={activeNotification.productLink}
                onClick={hideNotification}
              >
                <div className="font-14px-ALL font-bold text-textWhite hover:underline">
                  {activeNotification.productName}
                </div>
              </Link>

              {activeNotification.bottomMessage ? (
                <div className="font-12px-ALL text-textWhite">
                  {activeNotification.bottomMessage}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div
            className="absolute right-[16px] top-[16px] cursor-pointer [&_path]:hover:stroke-[#9A9A9F]"
            onClick={hideNotification}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M1 1.00317L16.9989 17.0021"
                stroke="#999999"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="transition-all"
              />
              <path
                d="M1 16.999L16.9989 1.00013"
                stroke="#999999"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="transition-all"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
