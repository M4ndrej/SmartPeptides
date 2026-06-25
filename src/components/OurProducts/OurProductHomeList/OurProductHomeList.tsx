import { FC } from "react";
import ProductFilter from "./Filter/ProductFilter";
import OpenPopoverList from "./MobileElements/OpenPopoverList/OpenPopoverList";
import CategoryList from "./CategoryList/CategoryList";
import PeptidesOnlyList from "@/components/PeptidesOnlyList/PeptidesOnlyList";
import { ProductList } from "@/types/product";
import OurProductsList from "../OurProductsList";
import { OurProductHomeProvider } from "./OurProductHomeContext";
import { Category } from "@/types/category";

type OurProductHomeListProps = {
  homePeptides: ProductList;
  allProducts: ProductList;
  categories: Category[];
};

const OurProductHomeList: FC<OurProductHomeListProps> = ({
  homePeptides,
  allProducts,
  categories,
}) => {
  return (
    <OurProductHomeProvider
      homePeptides={homePeptides}
      allProducts={allProducts}
      categories={categories}
    >
      <div className="flex w-full flex-col items-center">
        <h3 className="font-D32px-M24px font-bold">Our Products</h3>
        <div className="mt-[16px] h-[2px] w-[48px] bg-[#9A9A9F]"></div>
      </div>
      <ProductFilter />
      <div className="relative flex justify-center">
        <div className="purchase-peptides-sidebar-list hidden w-[198px] flex-col gap-[40px] xl:flex">
          <PeptidesOnlyList products={homePeptides} />
          <CategoryList products={allProducts} categories={categories} />
        </div>
        <OpenPopoverList />
        <div className="w-full xl:ml-[32px]">
          <OurProductsList />
        </div>
      </div>
    </OurProductHomeProvider>
  );
};

export default OurProductHomeList;
