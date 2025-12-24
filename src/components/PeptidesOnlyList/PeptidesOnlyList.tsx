import { ProductList } from "@/types/product";
import { FC } from "react";
import PeptidesCategoriesAccoridon from "../PeptidesCategories/PeptidesCategoriesAccordion";

type PeptidesOnlyListProps = {
  products: ProductList;
};

const PeptidesOnlyList: FC<PeptidesOnlyListProps> = ({ products }) => {
  return (
    <div className="flex flex-col gap-[16px] overflow-auto">
      <PeptidesCategoriesAccoridon
        title="Purchase Peptides"
        content={products}
        homePage
        textElipsis
        firstAccOpen
      />
    </div>
  );
};

export default PeptidesOnlyList;
