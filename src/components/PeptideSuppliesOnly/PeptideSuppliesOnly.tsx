"use client";

import useSWR from "swr";
import { fetcher } from "@/helpers/fetchers";
import { ProductNew } from "@/types/product";
import PeptidesCategoriesAccoridon from "../PeptidesCategories/PeptidesCategoriesAccordion";
import { FC } from "react";

interface PeptideSuppliesOnlyProps {
  isHomePage?: boolean;
  textElispis?: boolean;
}

const PeptideSuppliesOnly: FC<PeptideSuppliesOnlyProps> = ({
  isHomePage,
  textElispis,
}) => {
  const { data } = useSWR<ProductNew[]>("/api/products/suppliers", fetcher);

  return (
    <div className="flex flex-col gap-[16px] overflow-auto">
      <PeptidesCategoriesAccoridon
        title="Peptide Supplies"
        content={data}
        homePage={isHomePage}
        textElipsis={textElispis}
        productSection
        hasCount
      />
    </div>
  );
};

export default PeptideSuppliesOnly;
