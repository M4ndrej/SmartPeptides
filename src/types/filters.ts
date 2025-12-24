import { TagsList } from "./tags";

interface FilterOption {
  name: string;
  value: string[];
  textValue?: string;
  priceValue?: string;
}

export interface Filters {
  weight: FilterOption;
  price: FilterOption;
  status: FilterOption;
  tags: FilterOption;
  orderby: FilterOption;
}

export type FilterOptions = {
  id: number;
  name: string;
  active?: boolean;
  paramValue?: string;
};

export type Filter = {
  id: number;
  name: string;
  options: FilterOptions[];
  type: string;
  valueName: string;
  hidden?: boolean;
  show?: "left" | "right"
};
