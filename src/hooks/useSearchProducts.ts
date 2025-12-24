import { useEffect, useState } from "react";
import useSWR from "swr";
import useDebounce from "./useDebounce";
import { ProductNew } from "@/types/product";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useSearchProducts = (searchTerm: string) => {
  const [modifiedSuggestion, setModifiedSuggestion] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const apiUrl =
    debouncedSearchTerm.length > 2
      ? `/api/products/search?searchTerm=${encodeURIComponent(
          debouncedSearchTerm
        )}`
      : null;

  const {
    data: products,
    error,
    isValidating,
  } = useSWR<ProductNew[]>(apiUrl, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  useEffect(() => {
    if (products && products.length > 0) {
      const prodWithSameName = products.find((item) =>
        item.name.toLowerCase().startsWith(debouncedSearchTerm.toLowerCase())
      );

      if (prodWithSameName) {
        let suggestion =
          debouncedSearchTerm +
          prodWithSameName.name.slice(debouncedSearchTerm.length);
        // If the user typed everything in uppercase, transform the entire suggestion.
        if (debouncedSearchTerm === debouncedSearchTerm.toUpperCase()) {
          suggestion = suggestion.toUpperCase();
        }
        setModifiedSuggestion(suggestion);
      } else {
        setModifiedSuggestion("");
      }
    } else {
      setModifiedSuggestion("");
    }
  }, [products, debouncedSearchTerm]);

  return {
    products,
    modifiedSuggestion,
    loading: isValidating,
    error,
  };
};

export default useSearchProducts;
