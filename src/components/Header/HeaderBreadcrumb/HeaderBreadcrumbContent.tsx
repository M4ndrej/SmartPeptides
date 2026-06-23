import { IPagesProps } from "@/data/pages_data";
import Link from "next/link";
import { FC } from "react";
import { pages } from "@/data/pages_data";
import classNames from "classnames";

type HeaderBreadcrumbContentProps = {
  location: string;
  currentRoute?: IPagesProps;
  previousRoute?: IPagesProps;
  hideBreadcrumb?: boolean;
};

const HeaderBreadcrumbContent: FC<HeaderBreadcrumbContentProps> = ({
  location,
  currentRoute,
  previousRoute,
  hideBreadcrumb,
}) => {
  const pageFromPagesData = pages.find((page) => page.link === location);
  if (location === "/cart" || location === "/thank-you" || hideBreadcrumb)
    return;

  return (
    <>
      {(currentRoute?.link != previousRoute?.link ||
        currentRoute?.subRoute?.link) && (
        <div
          className={classNames({
            "w-[100%] border-b-[1px] border-light-blue2 bg-[#FCFCFC]": true,
            hidden: !pageFromPagesData,
          })}
        >
          <div className="font-D14px-M13px container-padding-inline m-[auto] flex max-h-[38px] w-[100%] max-w-[1264px] items-center py-[7px] sm:max-h-[32px] sm:leading-[16px]">
            <div className="flex items-center">
              {previousRoute && (
                <>
                  <Link
                    href={previousRoute?.link ? previousRoute.link : ""}
                    className="group relative transition duration-300 hover:text-[#333333]"
                  >
                    {previousRoute?.headerTitle}
                  </Link>
                  <div className="flex h-[24px] min-w-[24px] select-none items-center justify-center">
                    &nbsp; &gt; &nbsp;
                  </div>
                  {previousRoute.subRoute?.name && (
                    <>
                      <Link
                        href={
                          previousRoute.subRoute?.link
                            ? previousRoute.subRoute.link
                            : ""
                        }
                        className="group relative transition duration-300 hover:text-[#333333]"
                      >
                        {previousRoute.subRoute?.name}
                      </Link>
                      <div className="flex h-[24px] min-w-[24px] select-none items-center justify-center">
                        &nbsp; &gt; &nbsp;
                      </div>
                    </>
                  )}
                </>
              )}

              {currentRoute?.subRoute?.link ? (
                <div className="flex items-center">
                  {currentRoute?.link != previousRoute?.link && (
                    <>
                      <Link
                        href={currentRoute?.link ? currentRoute.link : ""}
                        className="group/secondLink relative whitespace-nowrap transition duration-300 hover:text-[#333333]"
                      >
                        {currentRoute?.headerTitle}
                      </Link>
                      <div className="flex h-[24px] min-w-[24px] select-none items-center justify-center">
                        &nbsp; &gt; &nbsp;
                      </div>
                    </>
                  )}

                  <div className="line-clamp-1 cursor-default">
                    {currentRoute?.subRoute.name}
                  </div>
                </div>
              ) : (
                <div className="cursor-default">
                  {currentRoute?.headerTitle}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* <div
        className={classNames({
          "flex h-[40px] w-[100%] items-center justify-center gap-[8px] border-b-[1px] border-t-[1px]  border-light-blue2  bg-white sm:h-auto sm:px-[10px] sm:py-[10px] xl:border-t-0":
            true,
          hidden: !pageFromPagesData,
        })}
      >
        <div className="h-[8px] w-[8px] select-none rounded-full bg-[#333333] sm:hidden sm:min-w-[8px] "></div>
        <div className="font-D16px-M12px font-bold text-[#333333] sm:text-center">
          New customer bonus: Get 15% off when you register
        </div>
        <div className="h-[8px] w-[8px] select-none rounded-full bg-[#333333] sm:hidden sm:min-w-[8px] "></div>
      </div> */}
    </>
  );
};

export default HeaderBreadcrumbContent;
