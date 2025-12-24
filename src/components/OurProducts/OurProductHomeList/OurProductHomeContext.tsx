"use client";

import { Category } from "@/types/category";
import { ProductNew } from "@/types/product";
import { ClientProductHomeFilter } from "@/types/product_filters";
import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { SWRConfig } from "swr";

interface OurProductHomeContextProps {
  homeFilter: ClientProductHomeFilter;
  setHomeFilter: Dispatch<SetStateAction<ClientProductHomeFilter>>;
}

export const OurProductHomeContext = createContext<OurProductHomeContextProps>({
  homeFilter: "all",
  setHomeFilter: () => "",
});

interface OurProductHomeProviderProps {
  children: ReactNode;
  homePeptides: ProductNew[];
  allProducts: ProductNew[];
  categories: Category[];
}

export const OurProductHomeProvider: FC<OurProductHomeProviderProps> = ({
  children,
  homePeptides,
  allProducts,
  categories,
}) => {
  const [homeFilter, setHomeFilter] = useState<ClientProductHomeFilter>("all");

  return (
    <OurProductHomeContext.Provider value={{ homeFilter, setHomeFilter }}>
      <SWRConfig
        value={{
          fallback: {
            "/api/products/all?home_filter=all": homePeptides,
            "/api/products/all?category=peptides,peptide-blends,cosmetic-peptides,merch,peptide-supplies":
              allProducts,
            "/api/products/categories": categories,
          },
        }}
      >
        {children}
      </SWRConfig>
    </OurProductHomeContext.Provider>
  );
};

export const useOurProductHomeContext = () => useContext(OurProductHomeContext);
