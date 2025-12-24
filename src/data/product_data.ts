import { ClientProductHomeFilter } from "@/types/product_filters";

export const productFilter: {
  name: string;
  key: ClientProductHomeFilter;
}[] = [
  {
    name: "ALL",
    key: "all",
  },
  {
    name: "NEW ARRIVALS",
    key: "new_arrivals",
  },
  {
    name: "BEST SELLER",
    key: "best_seller",
  },
  // {
  //   name: "ON SALE",
  // },
];

export const productCategories = [
  {
    name: "All Peptides",
    products: ["Semaglutide", "Tirzepatide", "BPC-157", "CJC-1295"],
  },
  {
    name: "Weight Loss",
    products: ["Semaglutide", "Tirzepatide", "BPC-157", "CJC-1295"],
  },
];

export const shopPagePaths = [
  {
    path: "/shop/",
    category: "peptides,peptide-blends,cosmetic-peptides",
    dropdown: "All Products",
    header: "Research Peptides",
    seoHeading: "Research Peptides Supplier",
    seoTitle: "Research Peptides Supplier",
    seoDescription:
      "Buy research peptides online! PeptideShop is one of the leading online suppliers of high quality, highly purified, peptides for research purposes.",
  },
  {
    path: "/peptides/",
    category: "peptides",
    dropdown: "Peptides",
    header: "Research Peptides",
    seoHeading: "Research Peptides",
    seoTitle: "Peptides For Sale",
    seoDescription:
      "Value Peptide is your number one source of, 99% pure peptides for sale. Shop by our shop today and secure your discounted order!",
  },
  {
    path: "/cosmetic-peptides/",
    category: "cosmetic-peptides",
    dropdown: "Cosmetic Peptides",
    header: "Cosmetic Peptides",
    seoHeading: "Cosmetic Peptides",
    seoTitle: "Buy Cosmetic Peptides Online",
    seoDescription:
      "Looking to buy cosmetic peptides with 99% purity? Value Peptide is the best place to do so and score an awesome discount!",
  },
  {
    path: "/peptide-blends/",
    category: "peptide-blends",
    dropdown: "Peptide Blends",
    header: "Research Peptide Blends",
    seoHeading: "Research Peptide Blends",
    seoTitle: "Buy Research Peptide Blends",
    seoDescription:
      "Looking to buy research peptide blands for your lab testing and experimenting? Check out Value Peptide's inventory.",
  },
  {
    path: "/peptide-supplies/",
    category: "peptide-supplies",
    dropdown: "Peptide Supplies",
    header: "Research Peptide Supplies",
    seoHeading: "Research Peptide Supplies",
    seoTitle: "Buy Research Peptide Supplies",
    seoDescription:
      "Buy peptide supplies and equipment from a trusted peptide supplier.",
  },
  {
    path: "/merch/",
    category: "merch",
    dropdown: "Merch",
    header: "Buy Merch",
    seoHeading: "Buy Merch",
    seoTitle: "Buy Value Peptide Merch",
    seoDescription: "Buy merch from Value Peptide.",
  },
];

export const categoriesReduced = [
  "peptide-blends",
  "cosmetic-peptides",
  "peptide-supplies",
];

export const categoriesWeight = ["peptide-blends", "peptide-supplies"];
