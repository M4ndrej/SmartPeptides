import { ProductNew } from "./product";

export type PopoverPosition = "left" | "right" | "top" | "bottom";

export type PopoverType =
  | "navigation"
  | "wishlist"
  | "cart"
  | "quickview"
  | "search"
  | "recentlyviewed";

export type OpenRegularArgs = {
  type: Exclude<PopoverType, "quickview">;
};

export type OpenQuickViewArgs = {
  type: "quickview";
  product: ProductNew;
};

export type OpenPopoverArgs = OpenRegularArgs | OpenQuickViewArgs;
