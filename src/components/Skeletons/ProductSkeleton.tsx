import ProductSkeletonSVG from "../Icons/ProductSkeletonSVG";

const ProductSkeleton = () => {
  return (
    <div className="pointer-events-none animate-pulse">
      <div className="h-full w-full select-none">
        <ProductSkeletonSVG />
      </div>
    </div>
  );
};

export default ProductSkeleton;
