import {
  FC,
  useEffect,
  useState,
  KeyboardEvent,
  ChangeEvent,
  useRef,
  useCallback,
} from "react";
import classNames from "classnames";
import Spinner from "../SvgComponents/Spinner";
import useSearchProducts from "@/hooks/useSearchProducts";
import CloseButton from "./CloseButton";
import SearchInput from "./SearchInput";
import SearchMessages from "./SearchMessages";
import ClearInputButton from "./ClearInputButton";
import SearchResults from "./SearchResults";

type SearchProps = {
  closePopover: any;
};

const Search: FC<SearchProps> = ({ closePopover }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const mainInputRef = useRef<HTMLInputElement>(null);
  const { products, modifiedSuggestion, loading, error } =
    useSearchProducts(searchTerm);

  useEffect(() => {
    const focusInput = setTimeout(() => {
      mainInputRef.current?.focus();
    }, 300);

    return () => clearTimeout(focusInput);
  }, []);

  const handleTabPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Tab" && searchTerm.length !== 0) {
        e.preventDefault();
        setSearchTerm(modifiedSuggestion);
      }
    },
    [searchTerm, modifiedSuggestion]
  );

  const handleChangeSearchTerm = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  const handleClearInputSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  return (
    <div
      className={classNames({
        "bg-white pt-[40px] sm:pt-[32px] md:pt-[48px]": true,
        // "xl:h-screen": (products?.length ?? 0) > 5 && !loading,
        // "lg:h-screen": (products?.length ?? 0) > 5 && !loading,
        // "md:h-screen": (products?.length ?? 0) > 2 && !loading,
        // "sm:h-screen": (products?.length ?? 0) > 2 && !loading,
      })}
    >
      <div
        className={classNames({
          " bg- w-full sm:px-0 md:mx-auto": true,
        })}
      >
        <CloseButton closePopover={closePopover} />
        <div className="container-padding-inline relative top-[-12px] m-auto w-full sm:top-0 sm:mt-[24px]  md:mt-[8px] md:max-w-[570px] md:px-0 lg:max-w-[716px] xl:max-w-[1264px]">
          <SearchInput
            searchTerm={searchTerm}
            modifiedSuggestion={modifiedSuggestion}
            handleChangeSearchTerm={handleChangeSearchTerm}
            handleTabPress={handleTabPress}
            mainInputRef={mainInputRef}
          />
          <SearchMessages
            products={products}
            loading={loading}
            error={error}
            searchTerm={searchTerm}
          />
          <ClearInputButton
            searchTermLength={searchTerm.length}
            handleClearInputSearch={handleClearInputSearch}
          />
        </div>
        <div className="mx-auto mt-[40px] max-w-[1264px] px-[32px] sm:px-[1px]">
          {loading ? (
            <div className="my-[40px] flex justify-center">
              <Spinner widthHeight="h-8 w-8 mr-3" />
            </div>
          ) : products && products.length > 0 ? (
            <SearchResults
              products={products}
              searchTerm={searchTerm}
              closePopover={closePopover}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Search;
