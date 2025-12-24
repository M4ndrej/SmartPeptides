import { Filter, Filters } from "@/types/filters";

export const FILTERS: Filter[] = [
  {
    id: 2,
    name: "Weight",
    options: [
      { id: 1, name: "5mg", paramValue: "5mg" },
      { id: 2, name: "10mg", paramValue: "10mg" },
      { id: 3, name: "20mg", paramValue: "20mg" },
      { id: 4, name: "50mg", paramValue: "50mg" },
    ],
    type: "checkbox",
    valueName: "weight",
    show: "left",
  },
  {
    id: 3,
    name: "Price",
    options: [],
    type: "range",
    valueName: "price",
    show: "left",
  },
  {
    id: 4,
    name: "Status",
    options: [
      { id: 1, name: "On Sale", paramValue: "on_sale" },
      { id: 2, name: "Featured", paramValue: "featured" },
      { id: 3, name: "In Stock", paramValue: "in_stock" },
      { id: 4, name: "On Backorders", paramValue: "onbackorders" },
    ],
    type: "checkbox",
    valueName: "status",
    show: "left",
  },
  {
    id: 5,
    name: "Tags",
    options: [],
    type: "buttons",
    valueName: "tags",
    show: "left",
    hidden: true,
  },
  {
    id: 6,
    name: "Sort By",
    options: [
      { id: 1, name: "Popularity", paramValue: "popularity" },
      { id: 2, name: "Average Rating", paramValue: "rating" },
      { id: 3, name: "Latest", paramValue: "date" },
      { id: 4, name: "Price: Ascending", paramValue: "price" },
      { id: 5, name: "Price: Descending", paramValue: "price-desc" },
    ],
    type: "dropdown",
    valueName: "orderby",
    show: "right",
  },
];

export const EMPTY_ACTIVE_FILTERS: Filters = {
  weight: { name: "Weight", value: [] },
  price: { name: "Price", value: [], priceValue: "" },
  status: { name: "Status", value: [] },
  tags: { name: "Tags", value: [] },
  orderby: { name: "Order By", value: [] },
};

export const INITIAL_ACTIVE_FILTERS: Filters = {
  weight: { name: "Weight", value: [] },
  price: { name: "Price", value: [], priceValue: "" },
  status: { name: "Status", value: [] },
  tags: { name: "Tags", value: [] },
  orderby: { name: "Order By", value: [] },
};

export const ACTIVE_FILTERS_TRUE_VALUES = {
  "5mg": "5mg",
  "10mg": "10mg",
  "20mg": "20mg",
  "50mg": "50mg",
  on_sale: "On Sale",
  featured: "Featured",
  in_stock: "In Stock",
  onbackorders: "On Backorders",
  date: "Date",
  price: "Price Asc",
  orderby: "Order By",
  "price-desc": "Price Desc",
  rating: "Avg. Rating",
};

export const ACTIVE_FILTERS_TRUE_PARAMS = {
  "5mg": "5mg",
  "10mg": "10mg",
  "20mg": "20mg",
  "50mg": "50mg",
  "On Sale": "on_sale",
  Featured: "featured",
  "In Stock": "in_stock",
  "On Backorders": "onbackorders",
  "Order By": "orderby",
};
