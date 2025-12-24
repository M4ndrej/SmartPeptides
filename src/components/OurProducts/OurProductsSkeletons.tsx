import { Fragment } from "react";
import ProductSkeleton from "../Skeletons/ProductSkeleton";

const OurProductsSkeletons = () => {
    return (
        <>
            {new Array(10).fill(0).map((_, ind) => (
                <Fragment key={ind}>
                    <ProductSkeleton />
                </Fragment>
            ))}
        </>
    );
};

export default OurProductsSkeletons;
