import { fetcher } from "@/helpers/fetchers";
import useSWRInfinite from "swr/infinite";

export const useSearchProduct = () => {
  const { data, error, size: searchTerm, setSize } = useSWRInfinite(
    (index) => `${process.env.API_URL}/wc/store/products`,
    fetcher
  );

  return { data, error, searchTerm, setSize };
};