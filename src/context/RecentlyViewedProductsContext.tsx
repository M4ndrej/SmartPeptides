"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";

export default interface Product {
  id: number;
  name: string;
  price: string;
  images: Array<any>;
  slug: string;
}

interface RecentlyViewedProductsContextProps {
  recentlyViewedProducts: Product[];
  addToRecentlyViewed: (product: Product) => void;
}

const RecentlyViewedProductsContext = createContext<
  RecentlyViewedProductsContextProps | undefined
>(undefined);

interface RecentlyViewedProductsProviderProps {
  children: ReactNode;
}

export const RecentlyViewedProductsProvider: FC<
  RecentlyViewedProductsProviderProps
> = ({ children }) => {
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState<
    Product[]
  >(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("recentlyViewedProducts");
      return storedData ? JSON.parse(storedData) : [];
    }
    return [];
  });

  const addToRecentlyViewed = (product: Product) => {
    if (!recentlyViewedProducts.some((p) => p.id === product.id)) {
      const updatedArray = [product, ...recentlyViewedProducts.slice(0, 4)];
      setRecentlyViewedProducts(updatedArray);
    }
  };

  // Update localStorage whenever recentlyViewedProducts changes
  useEffect(() => {
    // Check if localStorage is available before accessing it
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "recentlyViewedProducts",
        JSON.stringify(recentlyViewedProducts)
      );
    }
  }, [recentlyViewedProducts]);

  return (
    <RecentlyViewedProductsContext.Provider
      value={{ recentlyViewedProducts, addToRecentlyViewed }}
    >
      {children}
    </RecentlyViewedProductsContext.Provider>
  );
};

export const useRecentlyViewedProducts = () => {
  const context = useContext(RecentlyViewedProductsContext);
  if (!context) {
    throw new Error(
      "useRecentlyViewedProducts must be used within a RecentlyViewedProductsProvider"
    );
  }
  return context;
};
