"use client";

import { UPDATE_VIEW_MODE } from "@/context/constants";
import { useThemeContext } from "@/context/theme-provider";
import { shopPagePaths } from "@/data/product_data";
import { fetcher } from "@/helpers/fetchers";
import { ProductList } from "@/types/product";
import { usePathname, useSearchParams } from "next/navigation";
import { FC, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import GridView from "../GridView/GridView";
import Overlay from "../Overlay/Overlay";
import ProductCard from "../ProductCard/ProductCard";
import ProductCategories from "../ProductCategories/ProductCategories";
import ProductFilters from "../ProductFilters/ProductFilters";
import ProductFilterSidepopover from "../ProductFilters/ProductFiltersSidepopover";
import ProductsLoading from "./ProductsLoading";
import ShopMerchBanner from "./ShopMerchBanner";
import useIsClientRender from "@/hooks/useIsClientRender";
import ProductsFilterButton from "../ProductFilters/ProductsFilterButton";

interface ProductsProps {
  category: string;
  serverProducts: ProductList;
}

const ProductsList: FC<ProductsProps> = ({ category, serverProducts }) => {
  const isClient = useIsClientRender();
  const activePath = usePathname();
  const searchParams = useSearchParams();
  const stringParams = searchParams.toString();

  const activeConfig = useMemo(
    () => shopPagePaths.find((p) => p.path === activePath),
    [activePath]
  );

  const appContext: any = useThemeContext();
  const viewMode = appContext.state.viewMode;
  const hasFilters = stringParams.length > 0;

  const {
    data: productsClient,
    error: productsDataError,
    isLoading: productsDataLoading,
  } = useSWR<ProductList>(
    isClient && hasFilters
      ? `/api/products/all/?${stringParams}&category=${activeConfig?.category ?? category}`
      : null,
    fetcher,
    { revalidateOnMount: true }
  );

  // Use server products by default, only use client products when filters are applied
  const productsData =
    isClient && hasFilters && productsClient ? productsClient : serverProducts;

  useEffect(() => {
    if (category === "merch" && viewMode !== "5x5") {
      appContext.dispatch({ type: UPDATE_VIEW_MODE, payload: "5x5" });
    }
  }, [category, viewMode, appContext]);

  const [hasOverlay, setHasOverlay] = useState(false);
  const toggleOverlayHandler = () => {
    setHasOverlay((prevState) => !prevState);
  };

  return (
    <>
      <Overlay onClose={() => setHasOverlay(false)} isOpen={hasOverlay} />
      <ProductCategories
        activePath={activePath}
        dropdownLabel={activeConfig?.dropdown ?? ""}
      />

      {category === "merch" ? (
        <ShopMerchBanner className="mb-8 mt-8" />
      ) : (
        <>
          <ProductFilters products={productsData} category={category} />
          <ProductsFilterButton products={productsData} category={category} />
        </>
      )}

      {hasFilters && productsDataLoading ? (
        <ProductsLoading viewMode={viewMode} />
      ) : !productsData?.length ? (
        <div className="flex items-center justify-center">
          <p>NO PRODUCTS</p>
        </div>
      ) : (
        <GridView>
          {productsData.map((product) => (
            <div key={product.id}>
              <ProductCard
                overlayOpened={hasOverlay}
                showLabel={true}
                mainProduct={product}
                toggleOverlay={toggleOverlayHandler}
              />
            </div>
          ))}
        </GridView>
      )}
    </>
  );
};
export default ProductsList;
