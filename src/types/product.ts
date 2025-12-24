export interface Product {
  id: number;
  name: string;
  slug: string;
  parent: number;
  type: string;
  variation: string;
  permalink: string;
  sku: string;
  short_description: string;
  description: string;
  on_sale: boolean;
  prices: Prices;
  price_html: string;
  average_rating: string;
  review_count: number;
  images?: ImagesEntity[] | null;
  categories?: (CategoriesEntityOrTagsEntity | null)[] | null;
  tags?: (CategoriesEntityOrTagsEntity1 | null)[] | null;
  attributes?: (AttributesEntity | null)[] | null;
  variations?: (VariationsEntity | null)[] | null;
  has_options: boolean;
  is_purchasable: boolean;
  is_in_stock: boolean;
  is_on_backorder: boolean;
  low_stock_remaining?: null;
  sold_individually: boolean;
  add_to_cart: AddToCart;
  extensions: Extensions;
  price?: string;
}
export interface Prices {
  price: string;
  regular_price: string;
  sale_price: string;
  price_range?: PriceRange | null;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}
export interface PriceRange {
  min_amount: string;
  max_amount: string;
}
export interface ImagesEntity {
  id: number;
  src: string;
  thumbnail: string;
  srcset: string;
  sizes: string;
  name: string;
  alt: string;
}
export interface CategoriesEntityOrTagsEntity {
  id: number;
  name: string;
  slug: string;
  link: string;
}
export interface CategoriesEntityOrTagsEntity1 {
  id: number;
  name: string;
  slug: string;
  link: string;
}
export interface AttributesEntity {
  id: number;
  name: string;
  taxonomy: string;
  has_variations: boolean;
  terms?: TermsEntity[] | null;
}
export interface TermsEntity {
  id: number;
  name: string;
  slug: string;
  default?: boolean | null;
}
export interface VariationsEntity {
  id: number;
  attributes?: AttributesEntity1[] | null;
}
export interface AttributesEntity1 {
  name: string;
  value: string;
}
export interface AddToCart {
  text: string;
  description: string;
  url: string;
  minimum: number;
  maximum: number;
  multiple_of: number;
}
export interface Extensions {}

export type ProductList = ProductNew[];

export interface ProductNew {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_modified: string;
  type: string;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from: string;
  date_on_sale_to: string;
  price_html: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  downloads: any[];
  download_limit: number;
  download_expiry: number;
  download_type: string;
  external_url: string;
  button_text: string;
  tax_status: string;
  tax_class: string;
  manage_stock: boolean;
  stock_quantity: any;
  in_stock: boolean;
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  sold_individually: boolean;
  weight: string;
  dimensions: Dimensions;
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  related_ids: number[];
  upsell_ids: any[];
  cross_sell_ids: number[];
  parent_id: number;
  purchase_note: string;
  categories: Category[];
  tags: any[];
  images: Image[];
  attributes: Attribute[];
  default_attributes: any[];
  variations: Variation[];
  grouped_products: any[];
  menu_order: number;
  _links: Links;
  additional_category_mine: string;
}

export interface Dimensions {
  length: string;
  width: string;
  height: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Image {
  id: number;
  date_created: string;
  date_modified: string;
  src: string;
  name: string;
  alt: string;
  position: number;
}

export interface Attribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

export interface Variation {
  id: number;
  date_created: string;
  date_modified: string;
  permalink: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from: string;
  date_on_sale_to: string;
  on_sale: boolean;
  purchasable: boolean;
  visible: boolean;
  virtual: boolean;
  downloadable: boolean;
  downloads: any[];
  download_limit: number;
  download_expiry: number;
  tax_status: string;
  tax_class: string;
  manage_stock: boolean;
  stock_quantity: any;
  in_stock: boolean;
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  weight: string;
  dimensions: Dimensions2;
  shipping_class: string;
  shipping_class_id: number;
  image: Image2[];
  attributes: Attribute2[];
}

export interface Dimensions2 {
  length: string;
  width: string;
  height: string;
}

export interface Image2 {
  id: number;
  date_created: string;
  date_modified: string;
  src: string;
  name: string;
  alt: string;
  position: number;
}

export interface Attribute2 {
  id: number;
  name: string;
  option: string;
}

export interface Links {
  self: Self[];
  collection: Collection[];
}

export interface Self {
  href: string;
}

export interface Collection {
  href: string;
}

export type MegaMenuProductList = {
  peptides: ProductList;
  supplies: ProductList;
  blends: ProductList;
  cosmetics: ProductList;
};

export type ValidMerchAttribute = "Version" | "Size" | "Color" | "Style";
export type ValidPeptideAttribute = "Weight";
export type SelectedAttributes = Attribute2[];
