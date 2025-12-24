"use client";

import { ProductNew } from "@/types/product";
import GridView from "../GridView/GridView";
import { FC, useMemo, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/helpers/fetchers";
import OurProductsSkeletons from "./OurProductsSkeletons";
import Overlay from "../Overlay/Overlay";
import { useOurProductHomeContext } from "./OurProductHomeList/OurProductHomeContext";
import ProductCard from "../ProductCard/ProductCard";

const OurProductsList: FC = () => {
  const { homeFilter } = useOurProductHomeContext();
  const [hasOverlay, setHasOverlay] = useState(false);
  const { data: products, isLoading } = useSWR<ProductNew[]>(
    `/api/products/all?home_filter=${homeFilter}`,
    fetcher
  );

  const productCard = useMemo(() => {
    return products?.map((product, i: number) => (
      <ProductCard
        key={i}
        mainProduct={product}
        overlayOpened={hasOverlay}
        toggleOverlay={() => setHasOverlay(!hasOverlay)}
        section="ourProducts"
        fixedGridMode="5x5"
      />
    ));
  }, [products, hasOverlay]);

  return (
    <div className="our-products-width">
      <Overlay onClose={() => setHasOverlay(false)} isOpen={hasOverlay} />
      <GridView ourProductsGrid>
        {productCard}

        {isLoading && <OurProductsSkeletons />}
      </GridView>
    </div>
  );
};

export default OurProductsList;
