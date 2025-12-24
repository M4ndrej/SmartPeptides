import { generateFilterParamString } from "@/helpers/shop_filters";
import { fetchProducts } from "@/server/services";
import BestsellerSlider from "./BestsellerSlider";

const BestsellerServer = async () => {
  const params = generateFilterParamString({
    category: "peptides",
    orderby: "total-sales",
    per_page: 13,
  });

  let products = await fetchProducts(params);
  products = products.slice(0, 12);

  return <BestsellerSlider products={products} />;
};

export default BestsellerServer;
