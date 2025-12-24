import OurProductHomeList from "./OurProductHomeList/OurProductHomeList";
import { generateFilterParamString } from "@/helpers/shop_filters";
import {
  // isSpecificProductsUser,
  fetchCategories,
  fetchProducts,
} from "@/server/services";

const OurProductsServerSide = async () => {
  // All Peptides for home page
  const homePeptideParams = generateFilterParamString({ home_filter: "all" });
  const homePeptidesP = fetchProducts(homePeptideParams);

  // All products
  const allProductsParams = generateFilterParamString({
    category:
      "peptides,peptide-blends,cosmetic-peptides,merch,peptide-supplies",
  });
  const allProductsP = fetchProducts(allProductsParams);
  // Categories
  const categoriesP = fetchCategories();

  // Parallel fetch
  let [homePeptides, allProducts, categories] = await Promise.all([
    homePeptidesP,
    allProductsP,
    categoriesP,
  ]);

  // Filter out the products that depend on the user.
  // Static optimization hack.
  allProducts = allProducts.filter((p) => p.id !== 56914 && p.id !== 11557);
  homePeptides = homePeptides.filter((p) => p.id !== 56914 && p.id !== 11557);

  return (
    <OurProductHomeList
      allProducts={allProducts}
      homePeptides={homePeptides}
      categories={categories}
    />
  );
};

export default OurProductsServerSide;
