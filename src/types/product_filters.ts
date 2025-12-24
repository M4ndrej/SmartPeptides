export type ProductContext = "view" | "edit";
export type ProductOrderDir = "asc" | "desc";
export type ProductOrderBy =
  | "date"
  | "id"
  | "include"
  | "title"
  | "slug"
  | "modified";
export type ProductStatus =
  | "any"
  | "future"
  | "draft"
  | "pending"
  | "private"
  | "publish";
export type ProductType = "simple" | "grouped" | "external" | "variable";

export type ProductListParams = {
  context?: ProductContext;
  page?: number;
  per_page?: number;
  search?: string;
  after?: string;
  before?: string;
  exclude?: number[];
  include?: number[];
  offset?: number;
  order?: ProductOrderDir;
  orderby?: ProductOrderBy;
  filter?: Record<string, any>;
  slug?: string;
  status?: ProductStatus;
  type?: ProductType;
  category?: string;
  tag?: string;
  shipping_class?: string;
  attribute?: string;
  attribute_term?: string;
  sku?: string;
};

export type ClientProductHomeFilter = "all" | "new_arrivals" | "best_seller";
