import { TOGGLE_CART_MODAL } from "@/context/constants";
import { ThemeContext } from "@/context/theme-provider";
import { Blog } from "@/types/blog";
import { BlogCategoryList } from "@/types/blog-categories";
import { Product, ProductNew } from "@/types/product";
import classNames from "classnames";
import Image from "next/image";
import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import AllProductsList from "../AllProductsList/AllProductsList";
import Cart from "../Cart/Cart";
import NavigationAndMegaMenu from "../NavigationMegaMenu/NavigationMegaMenu";
import PeptidesCategories from "../PeptidesCategories/PeptidesCategories";
import QuickView from "../QuickView/QuickView";
import RecentlyViewedProducts from "../RecentlyVieved/RecentlyViewedProducts";
import InsideScroll from "../Scroll/InsideScroll";
import Search from "../Search/Search";
import Sidebar, { archiveMonth } from "../Sidebar/Sidebar";
import Wishlist from "../Wishlist/Wishlist";

interface PopoverProps {
  type?: string;
  popoverOpened?: boolean;
  fromTop?: boolean;
  fromLeft?: boolean;
  showClosingArrow?: boolean;
  activeProduct?: Product;
  productList?: any;
  handlePopoverAction?: (
    open: boolean,
    type: string,
    fromTop: boolean,
    product?: ProductNew
  ) => void;
  customClass?: string;
  hideArrow?: boolean;
  blogSidebarProps?: {
    blogs: Blog[] | undefined;
    blogCategories: BlogCategoryList | undefined;
    activeSearch?: string;
    activeCat?: number;
    activeArchive?: archiveMonth;
    handleSearch: (search: string) => void;
    handleCategory: (category: number) => void;
    handleArchive: (month: any) => void;
  };
  filterData?: any;
  onClose?: () => void;
}

type CartItem = {
  id: number;
  key: string;
  quantity: number;
};

const SidePopover: FC<PopoverProps> = ({
  popoverOpened,
  type,
  fromTop,
  fromLeft,
  showClosingArrow,
  onClose,
  activeProduct,
  productList,
  customClass,
  blogSidebarProps,
  filterData,
  hideArrow,
  handlePopoverAction,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shownContent, setShownContent] = useState(false);
  const appContext: any = useContext(ThemeContext);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const cartItemsCount = appContext.state.cartItems
    ?.map((item: CartItem) => item.quantity)
    .reduce((acc: number, val: number) => +acc + +val, 0);

  const wishlistItemsCount = appContext.state.wishlistItemIds.length;

  useEffect(() => {
    if (popoverOpened) {
      openPopover();
    } else {
      closePopover();
    }
  }, [popoverOpened]);

  const openPopover = useCallback(() => {
    setIsOpen(true);
    // const scrollBar = document.querySelector("#scrollbar") as HTMLElement;
    // scrollBar.style.display = "none";
    document.body.classList.add("popover-open");
    setTimeout(() => {
      setShownContent(true);
    }, 50);
  }, []);

  const closePopover = () => {
    const peptidesList = document.querySelector(
      ".products-peptdes-list"
    ) as HTMLElement;
    // const scrollBar = document.querySelector("#scrollbar") as HTMLElement;
    // scrollBar.style.display = "block";
    setShownContent(false);
    setTimeout(() => {
      document.body.classList.remove("popover-open");
      peptidesList?.classList.remove("z-index-3");
    }, 400);

    appContext.dispatch({
      type: TOGGLE_CART_MODAL,
      payload: {
        showCartModal: false,
        showWishlistModal: false,
        itemOpenedInWishlist: false,
      },
    });

    setTimeout(() => {
      setIsOpen(false);
    }, 400);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const megaMenuOpenState = appContext.state.megaMenuShown;
  const menuType = appContext.state.megaMenuType;

  useEffect(() => {
    setMegaMenuOpen(appContext.state.megaMenuShown);
  }, [megaMenuOpenState]);

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        className={`transition-backdrop-blur transition-bg fixed ${
          isOpen ? "inset-0 z-[999999999]" : ""
        }  ease-[cubic-bezier(0.11, 0, 0.5, 0)] cursor-pointer bg-backdrop opacity-0 backdrop-blur-[4px] duration-300 sm:px-[10px] sm:delay-200 ${
          popoverOpened ? "opacity-100 " : ""
        } `}
      ></div>

      {isOpen && (
        <div className="fixed z-[999999999999] overflow-hidden">
          {/* POPOVER */}
          <div
            id="popover"
            className={`fixed inset-y-0 right-0 z-[999999999] w-full transform bg-white px-[32px] py-[40px] sm:px-[10px] sm:py-[24px] ${customClass}
            } ${fromTop || fromLeft ? "left-0 top-0" : "right-0"}  ${
              shownContent && !fromTop && !showClosingArrow
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
                type === "navigation"
                  ? "!pl- !w-[496px] !bg-transparent !p-0 !pb-0 !pr-0 !pt-0 sm:min-w-[100%] sm:max-w-[100%] sm:!pb-0 sm:!pr-0 sm:!pt-0 "
                  : ""
              }
            ${
              type === "cart" ||
              type === "whishlist" ||
              type === "recentlyViewed" ||
              type === "quickview" ||
              type === "search" ||
              type === "peptidescategories" ||
              type === "productslist"
                ? "!pb-0 !pr-0 !pt-0 sm:!pb-0 sm:!pr-0 sm:!pt-0"
                : ""
            }

            ${type === "productslist" ? "!min-w-none !w-[452px] sm:!w-full sm:!px-0" : ""}

            ${type === "cart" ? "!px-0" : ""}

            ${
              type === "cart" ||
              type === "whishlist" ||
              type === "recentlyViewed" ||
              type == "peptidescategories" ||
              type === "quickview"
                ? "sm:!min-w-[100%]"
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

            ${
              type === "productfilters"
                ? "!px-0 !pl-0 !pt-0 sm:!p-0 sm:!px-0 sm:!py-0 md:!p-0"
                : ""
            }
            ease-[cubic-bezier(0.11, 0, 0.5, 0)] transition-transform duration-300`}
          >
            <div
              className={classNames({
                "absolute right-[330px] top-[-24px] z-[1] h-[calc(100%+48px)] w-[1px] bg-[#FFE9E3] sm:hidden md:right-[330px] dark:bg-transparent":
                  megaMenuOpen,
                hidden: type === "navigation",
              })}
            ></div>
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
                    "!left-[-145px] top-[358px] w-full max-w-[145px]":
                      type === "cart",
                    "!left-[-204px] min-w-[172px] max-w-[172px]":
                      type === "whishlist",
                    "!left-[-204px]":
                      type === "whishlist" && wishlistItemsCount > 9,
                    "!left-[-175px]": type === "quickview",
                    "left-auto right-[-76px] !block rotate-180 sm:left-[calc(100%+16px)] sm:right-[-76px]":
                      fromLeft,
                  })}
                >
                  {type === "cart" && (
                    <div className="font-16px-ALL m-0 translate-x-[10px] whitespace-nowrap font-medium text-textWhite">
                      My Cart (<span>{cartItemsCount}</span>)
                    </div>
                  )}
                  {type === "whishlist" && (
                    <div className="font-16px-ALL m-0 translate-x-[10px] whitespace-nowrap font-medium text-textWhite">
                      My Wishlist (<span>{wishlistItemsCount}</span>)
                    </div>
                  )}
                  {type === "quickview" && (
                    <div className="font-16px-ALL m-0 translate-x-[10px] font-medium text-textWhite">
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
                      "!left-[-44px] !top-[356px] z-[1] ":
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
                      "group/btnX hidden flex-row-reverse sm:!relative sm:!z-[3] sm:mt-[24px] sm:flex":
                        true,
                      "relative top-[-8px] !flex sm:!mt-[0px]":
                        fromTop && !fromLeft,
                      "!hidden": showClosingArrow || type === "navigation",
                      "sm:right-[16px]": type === "whishlist",
                      "!sm:top-[20px] md:!top-[-35px]":
                        fromTop && !fromLeft && scrollPosition > 200,
                      "absolute !right-[-132px] !top-[356px] !flex sm:!right-[32px] sm:!top-[3px] sm:!mt-0":
                        type === "peptidescategories",
                    })}
                  >
                    {type === "peptidescategories" && (
                      <div>
                        <div
                          onClick={onClose}
                          className="font-16px-ALL flex h-[44px] cursor-pointer select-none items-center justify-center gap-[10px] rounded-br-[5px] rounded-tr-[5px] bg-[#E7461E] pl-[19px] pr-[24px] text-textWhite transition duration-300 sm:hidden"
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
                          Products
                        </div>
                      </div>
                    )}
                    {
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`cursor-pointer select-none ${
                          type === "peptidescategories" ? "hidden" : ""
                        }`}
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
              {(type === "productslist" || type === "navigation") && (
                <div className="group/leftSidebarX: absolute right-[-44px] top-[356px] z-[2] sm:right-[15px] sm:top-[28px] sm:hidden">
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
                  {/* <Image
                    className="hidden cursor-pointer select-none sm:block"
                    src="/images/popover_close.svg"
                    height={16}
                    width={16}
                    alt="Close"
                    onClick={onClose}
                  /> */}
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

              {type == "whishlist" ? (
                <div>
                  <Wishlist
                    closePopover={onClose}
                    itemsCount={wishlistItemsCount}
                  />
                </div>
              ) : type == "cart" ? (
                <div className="h-full">
                  <Cart closePopover={onClose} itemsCount={cartItemsCount} />
                </div>
              ) : type == "navigation" ? (
                <NavigationAndMegaMenu
                  megaMenuOpen={megaMenuOpen}
                  menuType={menuType}
                  onClose={onClose}
                  handlePopoverAction={handlePopoverAction}
                />
              ) : type == "recentlyViewed" ? (
                <div>
                  <RecentlyViewedProducts closePopover={onClose} />
                </div>
              ) : type == "search" ? (
                <div>
                  <Search closePopover={onClose} />
                </div>
              ) : type == "quickview" ? (
                <div>
                  <QuickView
                    closePopover={onClose}
                    productId={activeProduct?.id}
                  />
                </div>
              ) : type == "productslist" ? (
                <div>
                  <AllProductsList closePopover={onClose} />
                </div>
              ) : type == "peptidescategories" ? (
                <div>
                  <PeptidesCategories closePopover={onClose} />
                </div>
              ) : type == "blogsidebar" ? (
                <InsideScroll className="h-[100dvh]">
                  <Sidebar {...blogSidebarProps!} />
                </InsideScroll>
              ) : type == "productfilters" ? (
                React.Children.toArray(filterData)[0]
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SidePopover;
