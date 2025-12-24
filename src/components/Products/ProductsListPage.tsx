import { FC } from "react";
// import HeaderBreadcrumbContainer from "../Header/HeaderBreadcrumb/HeaderBreadcrumbContainer";
import PeptidesList from "../PeptidesList/PeptidesList";
import ProductsList from "./Products";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import { generateFilterParamString } from "@/helpers/shop_filters";
import { fetchCategories, fetchProducts, fetchTags } from "@/server/services";
import { shopPagePaths } from "@/data/product_data";
import ProductsContext from "./ProductsContext";
import ProductsListHeader from "./ProductsListHeader";

interface ProductsListPageProps {
  slug: string;
}

const ProductsListPage: FC<ProductsListPageProps> = async ({ slug }) => {
  const activeConfig = shopPagePaths.find((p) => p.path === `/${slug}/`);
  const category = activeConfig?.category ?? slug;

  const paramString = generateFilterParamString({
    category: category,
  });
  const serverProductsP = fetchProducts(paramString);
  const serverCategoriesP = fetchCategories();
  const serverTagsP = fetchTags(category);
  let [serverProducts, serverCategories, serverTags] = await Promise.all([
    serverProductsP,
    serverCategoriesP,
    serverTagsP,
  ]);

  // Filter out the products that depend on the user.
  // Static optimization hack.
  serverProducts = serverProducts.filter(
    (p) => p.id !== 56914 && p.id !== 11557
  );

  return (
    <div className="container-margin-bottom-D96px-M64px mx-[auto] max-w-[1264px] px-0 pt-[48px] sm:w-[100%] sm:max-w-[100vw] sm:pt-[40px] xl:px-[32px]">
      <ProductsListHeader
        category={category}
        header={activeConfig?.header ?? "Peptides"}
      />
      <div className="products-peptdes-list fixed left-0 top-[320px] z-[2] sm:top-[341px] md:top-[335px]">
        {/*  <PeptidesList /> */}
      </div>
      <div>
        {/* <Suspense fallback={<ProductsLoading viewMode="5x5" />}> */}
        <ProductsContext
          products={serverProducts}
          categories={serverCategories}
          tags={serverTags}
          categorySlug={category}
        >
          <ProductsList category={category} serverProducts={serverProducts} />
        </ProductsContext>
        {/* </Suspense> */}

        {/*    {slug !== "peptide-supplies" && slug !== "merch" && (
          <div className="m-auto mt-[80px] max-w-[1264px]">
            <div className="font-D32px-M24px mb-[40px] flex flex-col items-center justify-center gap-[16px] font-bold">
              Peptide Supplies
              <div className="h-[2px] w-[48px] bg-[#E7461E]"></div>
            </div>
            <FeaturedProducts />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ProductsListPage;
