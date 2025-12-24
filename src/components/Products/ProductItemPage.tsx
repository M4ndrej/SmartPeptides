import { FC } from "react";
import { Product, WithContext } from "schema-dts";
// import HeaderBreadcrumbContainer from "../Header/HeaderBreadcrumb/HeaderBreadcrumbContainer";
import ProductPage from "./ProductItem";
import { notFound, redirect } from "next/navigation";
import {
  fetchProductById,
  fetchProductBySlug,
  fetchProducts,
  isSpecificProductsUser,
} from "@/server/services";
import { getComProductSlug } from "@/helpers/product_helper";
import { fetchProductNavigation } from "@/app/actions/navigation/fetchProductNavigation";
import { generateFilterParamString } from "@/helpers/shop_filters";

type ProductItemPageProps = {
  slug: string;
};

const ProductItemPage: FC<ProductItemPageProps> = async ({ slug }) => {
  const product = await fetchProductBySlug(slug);
  if (!product) {
    return notFound();
  }
  const specProdUser = await isSpecificProductsUser();

  if (product.id === 56914 || product.id === 11557) {
    if (
      (product.id === 56914 && !specProdUser?.is_tirz_user) ||
      (product.id === 11557 && !specProdUser?.is_syringe_user)
    ) {
      return redirect("/404");
    }
  }

  const jsonLd: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images[0].src,
    description: product.short_description,
    offers: {
      "@type": "AggregateOffer",
      url: `https://valuepeptide.com//${getComProductSlug(product)}`,
      lowPrice: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    brand: {
      "@type": "Brand",
      name: "VALUE PEPTIDE",
    },
    sku: product.sku,
  };

  let relatedIds = product.related_ids;

  if (!relatedIds || relatedIds.length === 0) {
    const completeProduct = await fetchProductById(product.id);
    relatedIds = completeProduct?.related_ids || [];
  }

  relatedIds = relatedIds.filter((id) => {
    if (id === 56914 && (!specProdUser || !specProdUser?.is_tirz_user)) {
      return false;
    }
    if (id === 11557 && (!specProdUser || !specProdUser?.is_syringe_user)) {
      return false;
    }
    return true;
  });

  const paramString = generateFilterParamString({
    include: relatedIds.join(","),
    exclude: `${product.id},11557,56914`,
    category: "value-peptide",
    per_page: 12,
  });

  const relatedProducts = await fetchProducts(paramString);

  const navigationData = await fetchProductNavigation(product.id);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductPage
        relatedProducts={relatedProducts}
        mainProduct={product}
        navigationData={navigationData}
      />
    </>
  );
};

export default ProductItemPage;
