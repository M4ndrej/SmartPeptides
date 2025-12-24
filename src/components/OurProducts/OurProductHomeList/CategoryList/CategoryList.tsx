"use client";

import PeptidesCategoriesAccoridon from "@/components/PeptidesCategories/PeptidesCategoriesAccordion";
import { fetcher } from "@/helpers/fetchers";
import { Category } from "@/types/category";
import { ProductNew } from "@/types/product";
import { FC, useMemo } from "react";
import useSWR from "swr";

interface CategoryListProps {
  products: ProductNew[];
  categories: Category[];
}

const CategoryList: FC<CategoryListProps> = ({ products, categories }) => {
  const { data: categoryList } = useSWR<Category[]>(
    "/api/products/categories",
    fetcher
  );

  const categoriesToShow = useMemo(() => {
    const categoriesToUse = categories || categoryList;
    return categoriesToUse?.filter(
      (category) => !category.parent && category.slug !== "peptides"
    );
  }, [categoryList]);

  const filterByCategory = (slug: string) => {
    return products.filter((product) => product.categories[0].slug === slug);
  };

  return (
    <>
      {categoriesToShow?.map((category: Category, index: number) => (
        <div key={`category-${index}`}>
          <PeptidesCategoriesAccoridon
            textElipsis
            content={filterByCategory(category.slug)}
            category={category}
            title={category.name}
            homePage
          />
        </div>
      ))}
    </>
  );
};

export default CategoryList;
