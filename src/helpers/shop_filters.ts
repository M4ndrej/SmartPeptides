import {
  ClientProductHomeFilter,
  ProductListParams,
} from "@/types/product_filters";
import qs from "qs";

type InitialProductListParams = Required<
  Pick<ProductListParams, "exclude" | "order" | "orderby" | "filter">
> &
  ProductListParams;

const mainCategory = "peptides";

export const generateFilterParamString = (clientFilters: {
  home_filter?: ClientProductHomeFilter;
  slug?: string;
  search?: string;
  category?: string;
  orderby?: string;
  tags?: string;
  weight?: string;
  status?: string;
  price?: string;
  exclude?: string;
  include?: string;
  per_page?: number;
}): string => {
  let taxQuery: any[] = [];
  if (mainCategory === clientFilters?.category) {
    taxQuery.push({
      taxonomy: "product_cat",
      field: "slug",
      terms: clientFilters?.category,
      operator: "IN",
    });
  } else if (clientFilters?.category) {
    (taxQuery as any).relation = "AND";
    taxQuery.push({
      taxonomy: "product_cat",
      field: "slug",
      terms: mainCategory,
      operator: "IN",
    });
    taxQuery.push({
      taxonomy: "product_cat",
      field: "slug",
      terms: clientFilters?.category.split(","),
      operator: "IN",
    });
  }

  let query: InitialProductListParams = {
    exclude: [],
    order: "desc",
    orderby: "date",
    per_page: 100,
    status: "publish",
    filter: {
      tax_query: taxQuery,
      meta_query: [],
    },
  };

  if (!taxQuery.length) {
    query.filter.product_cat = mainCategory;
  }

  if (clientFilters?.per_page) {
    query.per_page = clientFilters.per_page;
  }
  if (clientFilters?.slug) {
    query.slug = clientFilters.slug;
    query.exclude = [];
  }
  if (clientFilters?.search) {
    query.search = clientFilters.search;
  }
  if (clientFilters?.home_filter) {
    handleHomeFilters(clientFilters.home_filter, query);
  }

  if (clientFilters?.weight) {
    handleWeight(clientFilters.weight, query);
  }
  if (clientFilters?.tags) {
    handleTags(clientFilters.tags, query);
  }
  if (clientFilters?.status) {
    handleStatuses(clientFilters.status, query);
  }
  if (clientFilters?.price) {
    handlePrice(clientFilters.price, query);
  }
  if (!clientFilters?.home_filter) {
    handleOrderBy(clientFilters.orderby ?? "", query);
  }
  if (clientFilters?.include) {
    query.exclude = [];
    handleInclude(clientFilters.include, query);
  }
  if (clientFilters?.exclude) {
    handleExclude(clientFilters.exclude, query);
  }
  return qs.stringify(query, { encode: false });
};

const handleHomeFilters = (
  homeFilters: ClientProductHomeFilter,
  query: InitialProductListParams
): void => {
  let taxQuery: any[] = [];
  (taxQuery as any).relation = "AND";
  taxQuery.push({
    taxonomy: "product_cat",
    field: "slug",
    terms: mainCategory,
    operator: "IN",
  });
  taxQuery.push({
    taxonomy: "product_cat",
    field: "slug",
    terms: ["peptides", "peptide-blends", "cosmetic-peptides"],
    operator: "IN",
  });
  query.filter.tax_query = taxQuery;

  switch (homeFilters) {
    case "all":
      query.order = "desc";
      query.filter.meta_key = "total_sales";
      query.filter.orderby = "meta_value_num";
      break;
    case "new_arrivals":
      // const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
      // query.after = sixtyDaysAgo.toISOString();
      query.order = "desc";
      query.orderby = "date";
      query.per_page = 6;
      break;
    case "best_seller":
      query.order = "desc";
      query.filter.meta_key = "total_sales";
      query.filter.orderby = "meta_value_num";
      query.filter?.meta_query?.push({
        key: "total_sales",
        value: 500,
        compare: ">=",
        type: "NUMERIC",
      });
      break;
  }
};

const handleOrderBy = (
  orderBy: string,
  query: InitialProductListParams
): void => {
  switch (orderBy) {
    case "rating":
      query.order = "asc";
      query.filter.meta_key = "_wc_average_rating";
      query.filter.orderby = "meta_value_num";
      break;
    case "date":
      query.order = "desc";
      query.orderby = "date";
      break;
    case "date-asc":
      query.order = "asc";
      query.orderby = "date";
      break;
    case "price":
      query.order = "asc";
      query.filter.meta_key = "_price";
      query.filter.orderby = "meta_value_num";
      break;
    case "price-desc":
      query.order = "desc";
      query.filter.meta_key = "_price";
      query.filter.orderby = "meta_value_num";
      break;
    default:
      query.order = "desc";
      query.filter.meta_key = "total_sales";
      query.filter.orderby = "meta_value_num";
      break;
  }
};

const handleWeight = (
  weight: string,
  query: InitialProductListParams
): void => {
  const weightList = weight.split("|");
  query.filter?.tax_query?.push({
    taxonomy: "pa_weight",
    field: "slug",
    operator: "IN",
    terms: weightList,
  });
};

const handleTags = (tags: string, query: InitialProductListParams): void => {
  const tagList = tags.split("|");
  query.filter.product_tag = tagList.join(",");
};

const handleStatus = (
  status: string,
  query: InitialProductListParams
): void => {
  switch (status) {
    case "in_stock":
      query.filter?.meta_query?.push({
        key: "_stock_status",
        value: "instock",
      });
      break;
    case "onbackorders":
      query.filter?.meta_query?.push({
        key: "_backorders",
        value: "yes",
      });
      break;
    case "on_sale":
      query.filter?.meta_query?.push({
        key: "_sale_price",
        value: 0,
        compare: ">",
        type: "numeric",
      });
      break;
    case "featured":
      query.filter?.meta_query?.push({
        key: "_featured",
        value: "yes",
      });
      break;
  }
};

const handleStatuses = (
  statusString: string,
  query: InitialProductListParams
): void => {
  const statuses = statusString.split("|");
  statuses.forEach((status) => handleStatus(status, query));
};

const handlePrice = (price: string, query: InitialProductListParams): void => {
  const priceList = price.split("|");
  query.filter?.meta_query?.push({
    key: "_price",
    compare: "BETWEEN",
    type: "numeric",
    value: priceList,
  });
};

const handleExclude = (
  exlude: string,
  query: InitialProductListParams
): void => {
  const excludeArr = exlude.split(",").map((id) => parseInt(id));
  query.exclude = [...query.exclude, ...excludeArr];
};

const handleInclude = (
  exlude: string,
  query: InitialProductListParams
): void => {
  const includeArr = exlude.split(",").map((id) => parseInt(id));
  query.include = [...(query?.include ?? []), ...includeArr];
};
