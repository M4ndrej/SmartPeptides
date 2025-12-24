import { FC, Fragment } from "react";
import GridView from "../GridView/GridView";
import ProductListSkeleton from "../Skeletons/ProductListSkeleton/ProductListSkeleton";
import ProductSkeleton from "../Skeletons/ProductSkeleton";

interface ProductsLoadingProps {
  viewMode: string;
}

const ProductsLoading: FC<ProductsLoadingProps> = ({ viewMode }) => {
  return (
    <GridView>
      {Array.from({ length: 10 }, (_, i) => i).map((i) => (
        <Fragment key={i}>
          {viewMode === "rows" ? <ProductListSkeleton /> : <ProductSkeleton />}
        </Fragment>
      ))}
    </GridView>
  );
};

export default ProductsLoading;
