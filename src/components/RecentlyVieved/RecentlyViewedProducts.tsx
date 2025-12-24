import { useRecentlyViewedProducts } from "@/context/RecentlyViewedProductsContext";
import { getComProductSlug } from "@/helpers/product_helper";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { FC } from "react";
import InsideScroll from "../Scroll/InsideScroll";
import SidebarMobileHeader from "../SidebarMobileHeader/SidebarMobileHeader";
import RecentlyViewedEmptyState from "./RecentlyViewedEmptyState";
import RecentlyViewedProduct from "./RecentlyViewedProduct";
interface RecentlyViewedProductsProps {
  closePopover: any;
}

const RecentlyViewedProducts: FC<RecentlyViewedProductsProps> = ({
  closePopover,
}) => {
  const { recentlyViewedProducts } = useRecentlyViewedProducts();
  const router = useRouter();

  const handleOpenProductPage = () => {
    router.push("/shop/");
    closePopover();
  };

  return (
    <div
      className={classNames({
        "webkit-available-fill w-[534px] sm:!w-full ": true,
      })}
    >
      <InsideScroll className="h-[100dvh]">
        <SidebarMobileHeader
          title="Recently Viewed"
          additionalParentClass="sm:pr-[16px]"
          closeBtnAction={() => closePopover()}
        />
        <div className="flex flex-col gap-[24px] pr-[32px] pt-[40px] sm:gap-[16px] sm:pb-[24px] sm:pr-[10px] sm:pt-0">
          {recentlyViewedProducts?.length > 0 ? (
            recentlyViewedProducts.map((product) => {
              return (
                <RecentlyViewedProduct
                  key={`product-${product.id}`}
                  name={product.name}
                  images={product.images}
                  price={product.price}
                  slug={getComProductSlug(product)}
                  closeSidebar={closePopover}
                />
              );
            })
          ) : (
            <RecentlyViewedEmptyState navigate={handleOpenProductPage} />
          )}
        </div>
      </InsideScroll>
    </div>
  );
};

export default RecentlyViewedProducts;
