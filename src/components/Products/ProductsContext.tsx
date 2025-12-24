"use client";

import { Category } from "@/types/category";
import { ProductList } from "@/types/product";
import { TagsList } from "@/types/tags";
import { FC, ReactNode } from "react";
import { SWRConfig } from "swr";

interface ProductsContextProps {
  children: ReactNode;
  products: ProductList;
  categories: Category[];
  tags: TagsList;
  categorySlug: string;
}

const ProductsContext: FC<ProductsContextProps> = ({
  children,
  products,
  categories,
  tags,
  categorySlug,
}) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/products/categories/": categories,
          [`/api/products/all/?category=${categorySlug}`]: products,
          [`/api/tags/?category=${categorySlug}`]: tags,
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default ProductsContext;
