"use client";

import { TOGGLE_CART_MODAL } from "@/context/constants";
import { ThemeContext } from "@/context/theme-provider";
import classNames from "classnames";
import Image from "next/image";
import {
  FC,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type SidePopoverMain = {
  type?: string;
  popoverOpened?: boolean;
  fromTop?: boolean;
  fromLeft?: boolean;
  showClosingArrow?: boolean;
  customClass?: string;
  hideArrow?: boolean;
  count?: number;
  children?: ReactElement;
  onClose: () => void;
};

const SidePopoverMain: FC<SidePopoverMain> = ({
  type,
  popoverOpened,
  fromTop,
  fromLeft,
  showClosingArrow,
  customClass,
  hideArrow,
  count,
  children,
  onClose,
}) => {
  const appContext: any = useContext(ThemeContext);
  const [shownContent, setShownContent] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (popoverOpened) {
      openPopover();
    } else {
      closePopover();
    }
  }, [popoverOpened]);

  const openPopover = useCallback(() => {
    setIsOpen(true);
    const scrollBar = document.querySelector("#scrollbar") as HTMLElement;
    scrollBar.style.display = "none";
    document.body.style.overflow = "hidden";
    document.body.classList.add("popover-open");
    setTimeout(() => {
      setShownContent(true);
    }, 50);
  }, []);

  const closePopover = () => {
    setShownContent(false);
    document.body.style.overflow = "auto";
    const scrollBar = document.querySelector("#scrollbar") as HTMLElement;
    scrollBar.style.display = "block";
    setTimeout(() => {
      document.body.classList.remove("popover-open");
    }, 400);

    appContext.dispatch({
      type: TOGGLE_CART_MODAL,
      payload: { showCartModal: false },
    });

    setTimeout(() => {
      setIsOpen(false);
    }, 400);
  };

  return (
    <div>
      <div
        onClick={onClose}
        className={`transition-backdrop-blur transition-bg fixed ${
          isOpen ? "inset-0 z-[25]" : ""
        }  ease-[cubic-bezier(0.11, 0, 0.5, 0)] cursor-pointer bg-backdrop opacity-0 backdrop-blur-[4px] duration-300 sm:delay-200 ${
          popoverOpened ? "opacity-100 " : ""
        } `}
      ></div>
      {isOpen && (
        <div className="fixed z-[999999999999] overflow-hidden">
          <div
            id="popovernew"
            className={`fixed inset-y-0 right-0 w-full transform bg-white  ${customClass}  
              } ${fromTop || fromLeft ? "left-0 top-0" : "right-0"}  ${
                shownContent &&
                !fromTop &&
                !showClosingArrow &&
                type !== "blogssidebar"
                  ? "!w-max translate-x-0 sm:!w-full"
                  : shownContent &&
                      !fromTop &&
                      showClosingArrow &&
                      type === "peptidescategories"
                    ? "!max-w-fit translate-x-0 sm:!max-w-[calc(100vw-70px)]"
                    : shownContent && fromTop
                      ? "h-fit min-h-fit w-full translate-y-0"
                      : !shownContent && fromTop
                        ? "h-min translate-y-[-100%]"
                        : !shownContent && !fromTop && fromLeft
                          ? "w-min !translate-x-[-150%]"
                          : "w-min translate-x-[100%]"
              }
              ${
                type === "productfilters"
                  ? "!pt-0 sm:!p-0 sm:!px-0 sm:!py-0 md:!p-0"
                  : ""
              }
                ${
                  type === "navigation"
                    ? "!pl- !w-[496px] !bg-transparent !p-0 !pb-0 !pr-0 !pt-0 sm:min-w-[78%] sm:max-w-[78%] sm:!pb-0 sm:!pl-[24px] sm:!pr-0 sm:!pt-0 "
                    : ""
                }
              ${
                type === "cart" ||
                type === "whishlist" ||
                type === "recentlyViewed" ||
                type === "quickview" ||
                type === "search" ||
                type === "peptidescategories"
                  ? "!pb-0 !pr-0 !pt-0 sm:!pb-0 sm:!pr-0 sm:!pt-0"
                  : ""
              }

              ${
                type === "blogsidebar"
                  ? "!px-0 !pb-0 !pr-0 !pt-0 sm:!pb-0 sm:!pr-0 sm:!pt-0"
                  : ""
              }
  
              ${
                type === "cart" ||
                type === "whishlist" ||
                type === "recentlyViewed" ||
                type == "peptidescategories" ||
                type === "quickview"
                  ? "sm:!min-w-[100%]"
                  : ""
              }

                            ${
                              type === "blogssidebar"
                                ? "!w-full max-w-[352px] !translate-x-0 sm:max-w-full"
                                : ""
                            }
  
              ${type === "search" ? "!p-0 !pl-0 sm:!pl-0 md:!pl-0" : ""}
              
              ${type === "peptidescategories" ? "pl-[16px] sm:pl-0" : ""}
              
              ${
                type === "productslist" &&
                shownContent &&
                fromLeft &&
                "!translate-x-0 sm:!w-full"
              }
              ease-[cubic-bezier(0.11, 0, 0.5, 0)] transition-transform duration-300`}
          >
            <div
              className={`relative h-full w-full ${
                type === "navigation" ? "flex justify-end" : ""
              }`}
            >
              {!hideArrow && (
                <div
                  onClick={onClose}
                  className={classNames({
                    "group/closePopover": true,
                    "!hidden": fromTop,
                    "absolute top-[316px] flex cursor-pointer select-none items-center overflow-hidden rounded-bl-[5px] rounded-tl-[5px] bg-[#E7461E] pl-[10px] transition duration-300 sm:hidden":
                      type === "cart" ||
                      type === "whishlist" ||
                      type === "quickview",
                    "!left-0 opacity-0": !shownContent,
                    "top-[357px]": type === "whishlist",
                    "relative top-[41px]": type === "recentlyViewed",
                    "!left-[-177px] top-[358px] w-full max-w-[145px]":
                      type === "cart",
                    "!left-[-204px] min-w-[172px] max-w-[172px]":
                      type === "whishlist",
                    "!left-[-204px]": (type === "whishlist" && count) || 0 > 9,
                    "!left-[-175px]": type === "quickview",
                    "left-auto right-[-76px] !block rotate-180 sm:left-[calc(100%+16px)] sm:right-[-76px]":
                      fromLeft,
                  })}
                >
                  {type === "cart" && (
                    <div className="font-16px-ALL m-0 translate-x-[10px] whitespace-nowrap font-medium text-white">
                      My Cart (<span>{count}</span>)
                    </div>
                  )}
                  {type === "whishlist" && (
                    <div className="font-16px-ALL m-0 translate-x-[10px] whitespace-nowrap font-medium text-white">
                      My Wishlist (<span>{count}</span>)
                    </div>
                  )}
                  {type === "quickview" && (
                    <div className="font-16px-ALL m-0 translate-x-[10px] font-medium text-white">
                      Quick view
                    </div>
                  )}
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={onClose}
                    className={classNames({
                      "  h-[44px] w-[44px] min-w-[44px] cursor-pointer select-none sm:hidden ":
                        true,
                      "!hidden": fromTop,
                      "absolute left-[-76px] top-[316px]":
                        type !== "cart" &&
                        type !== "whishlist" &&
                        type !== "quickview",
                      "left-auto right-[-76px] !block rotate-180 sm:left-[calc(100%+16px)] sm:right-[-76px]":
                        fromLeft,
                      "!left-[-44px] !top-[356px] z-[1] sm:!block":
                        type === "navigation",
                    })}
                  >
                    <path
                      d="M60 0H5C2.23857 0 0 2.23858 0 5V55C0 57.7614 2.23857 60 5 60H60V0Z"
                      className="transition duration-300"
                      fill="#E7461E"
                    />
                    <path
                      d="M27 38L34 30.5L27 23"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}

              {type !== "whishlist" &&
                type !== "cart" &&
                type !== "quickview" &&
                type !== "recentlyViewed" &&
                type !== "search" &&
                type !== "productfilters" && (
                  <div
                    className={classNames({
                      "group/btnX absolute left-[352px] top-[356px] flex flex-row-reverse sm:!relative sm:left-[calc(100%-25px)] sm:top-0  sm:!z-[3] sm:mr-[10px] sm:mt-[40px] sm:flex":
                        true,
                      "relative top-[-8px] !flex sm:!mt-[0px]":
                        fromTop && !fromLeft,
                      "!hidden": showClosingArrow || type === "navigation",
                      "sm:!right-[16px]": type === "whishlist",
                      "!sm:top-[20px] md:!top-[-35px]": fromTop && !fromLeft,
                      "absolute !right-[-132px] !top-[356px] !flex sm:!right-[32px] sm:!top-[3px] sm:!mt-0":
                        type === "peptidescategories",
                      "absolute left-[300px] !flex": type === "blogsidebar",
                    })}
                  >
                    {/* {type === "peptidescategories" && ( */}
                    <div>
                      <div
                        onClick={onClose}
                        className={classNames({
                          "font-16px-ALL hover:bg-dark-[#E7461E] flex h-[44px] cursor-pointer items-center justify-center gap-[10px] rounded-br-[5px] rounded-tr-[5px] bg-[#E7461E] text-white transition duration-300 sm:hidden":
                            true,
                          "pl-[19px] pr-[24px]": type === "peptidescategories",
                          "px-[18.5px]": type !== "peptidescategories",
                        })}
                      >
                        <svg
                          width="7"
                          height="13"
                          viewBox="0 0 7 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 12L1 6.5L6 1"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {type === "peptidescategories" ? "Products" : ""}
                      </div>
                    </div>
                    {/* )} */}
                    {
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={classNames({
                          "left-0 hidden cursor-pointer select-none sm:absolute sm:flex":
                            true,
                          hidden: type === "peptidescategories",
                        })}
                        onClick={onClose}
                      >
                        <path
                          d="M1 1.00098L13 13.001"
                          stroke="#999999"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          className="transition duration-200 group-hover/btnX:stroke-[#E7461E]"
                        />
                        <path
                          d="M1 13L13 0.999999"
                          stroke="#999999"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          className="transition duration-200 group-hover/btnX:stroke-[#E7461E]"
                        />
                      </svg>
                    }
                  </div>
                )}

              {/* Close button for Purchase peptides sidebar */}
              {type === "productslist" && (
                <div className="group/leftSidebarX: absolute right-[-60px] top-[356px] z-[2] sm:right-[15px] sm:top-[28px]">
                  <Image
                    src="/images/hide_popover.svg"
                    className={classNames({
                      "  h-[44px] w-[44px] min-w-[44px] rotate-[-180deg] cursor-pointer select-none sm:hidden":
                        true,
                    })}
                    width={60}
                    height={60}
                    onClick={onClose}
                    alt="Hide"
                  />
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="hidden cursor-pointer select-none sm:block"
                    onClick={onClose}
                  >
                    <path
                      d="M1 1.00098L13 13.001"
                      stroke="#999999"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      className="transition duration-200 group-hover/leftSidebarX:stroke-[#E7461E]"
                    />
                    <path
                      d="M1 13L13 0.999999"
                      stroke="#999999"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      className="transition duration-200 group-hover/leftSidebarX:stroke-[#E7461E]"
                    />
                  </svg>
                </div>
              )}

              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidePopoverMain;
