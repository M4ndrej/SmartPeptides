import { ThemeContext } from "@/context/theme-provider";
import { fetcher } from "@/helpers/fetchers";
import { Product } from "@/types/product";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { FC, Fragment, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import InsideScroll from "../Scroll/InsideScroll";
import SidebarMobileHeader from "../SidebarMobileHeader/SidebarMobileHeader";
import Spinner from "../SvgComponents/Spinner";
import WishlistEmptyState from "../WishlistEmptyState/WishlistEmptyState";
import WishlistItem from "./WishlistItem";

interface WishlistProps {
  closePopover?: any;
  itemsCount?: number;
}

const Wishlist: FC<WishlistProps> = ({ closePopover, itemsCount }) => {
  const { data: wishlistData, isLoading } = useSWR("/api/wishlist", fetcher);
  const [itemOpened, handleItemOpen] = useState<Product>();
  const router = useRouter();
  const { products } = wishlistData || [];
  const appContext: any = useContext(ThemeContext);

  const handleOpenProductPage = () => {
    router.push("/shop/");
    closePopover();
  };

  useEffect(() => {
    if (appContext.state.showWishlistModal === true) {
      closePopover();
    }
  }, [appContext.state.showWishlistModal]);

  return (
    <div
      className={classNames({
        "w-[534px] overflow-auto pr-[32px] sm:mb-0 sm:mr-0 sm:!w-full sm:pr-[10px]":
          true,
        "w-[550px] sm:!pr-0": itemOpened,
        "overflow-hidden": products?.length === 0 && !isLoading,
      })}
    >
      <InsideScroll className="h-[100dvh]">
        <>
          {isLoading && (
            <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
              <Spinner
                widthHeight="h-10 w-10 text-darkgray"
                customClass="!mr-0"
              />
            </div>
          )}
          {!isLoading && (
            <div className="flex w-full flex-col justify-center py-[40px] pr-[32px] sm:pb-[24px] sm:pr-[10px] sm:pt-0">
              <SidebarMobileHeader
                title="Wishlist"
                closeBtnAction={() => closePopover()}
                count={itemsCount}
              />
              <div className="flex flex-col gap-[16px] ">
                {products?.length > 0 ? (
                  products?.map((product: Product, indx: number) => (
                    <Fragment key={indx}>
                      <WishlistItem
                        product={product}
                        handleItemOpen={handleItemOpen}
                      />
                    </Fragment>
                  ))
                ) : (
                  <>
                    <WishlistEmptyState navigate={handleOpenProductPage} />
                  </>
                )}
              </div>
            </div>
          )}
        </>
      </InsideScroll>
    </div>
  );
};

export default Wishlist;
