import { FC, useContext, useState } from "react";
import { Product } from "@/types/product";
import { formatCurrency } from "@/helpers/curency_format";
import { mutate } from "swr";
import classNames from "classnames";
import {
  GET_WISHLIST_ITEMS,
  UPDATE_WISHLIST_ITEM_LOADING,
  UPDATE_QUICKVIEW_ITEM,
  TOGGLE_CART_MODAL,
} from "@/context/constants";
import { ThemeContext } from "@/context/theme-provider";
import AuthorizedImage from "../Image/Image";

type WishlistItemProps = {
  product: Product;
  handleItemOpen: (item: Product) => void;
};

const WishlistItem: FC<WishlistItemProps> = ({ product, handleItemOpen }) => {
  const [updating, setUpdating] = useState(false);
  const appContext: any = useContext(ThemeContext);

  const { wishlistItemLoading } = appContext.state;

  const handleRemoveFromWishlist = async () => {
    appContext.dispatch({ type: UPDATE_WISHLIST_ITEM_LOADING, payload: true });
    setUpdating(true);
    await fetch(`/api/wishlist/remove/?product_id=${product.id}`);
    appContext.dispatch({ type: GET_WISHLIST_ITEMS });
    await mutate("/api/wishlist");
    setUpdating(false);
    appContext.dispatch({ type: UPDATE_WISHLIST_ITEM_LOADING, payload: false });
  };

  const selectOptionsHandler = (item: Product) => {
    handleItemOpen(item);
    appContext.dispatch({
      type: TOGGLE_CART_MODAL,
      payload: { showWishlistModal: true, itemOpenedInWishlist: true },
    });

    appContext.dispatch({ type: UPDATE_QUICKVIEW_ITEM, payload: item });
  };

  return (
    <>
      <div
        className={classNames({
          "flex w-full": true,
          "pointer-events-none opacity-20": updating,
        })}
      >
        <div className="flex flex-1">
          <div className="mr-[16px] flex h-[138px] w-[112px] items-center justify-center bg-lightgray sm:h-[110px] sm:w-[90px]">
            <AuthorizedImage
              src={product!.images![0].src}
              height={100}
              width={100}
              alt="Motsc"
              className="select-none"
            />
          </div>
          <div className="flex flex-col justify-center gap-[8px]">
            <div className="font-D16px-M13px font-bold">{product.name}</div>
            <div className="font-D16px-M13px font-bold text-[#E7461E]">
              {formatCurrency(+product.price!, true)}
            </div>
            <div
              className="font-D16px-M13px cursor-pointer select-none text-gray2 transition duration-300 hover:text-[#E7461E]"
              onClick={() => {
                selectOptionsHandler(product);
              }}
            >
              SELECT OPTIONS
            </div>
          </div>
        </div>
        <div
          className={`group h-[16px] w-[16px] select-none ${
            wishlistItemLoading
              ? "cursor-wait"
              : "cursor-pointer [&_circle]:transition [&_circle]:duration-300 [&_circle]:hover:fill-[#E7461E]"
          }`}
          onClick={() =>
            !wishlistItemLoading ? handleRemoveFromWishlist() : {}
          }
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.70568 8.00094L15.9995 0.707107L15.2924 0L7.99857 7.29383L0.707107 0.00236523L0 0.709472L7.29146 8.00094L0 15.2924L0.707107 15.9995L7.99857 8.70805L15.2924 16.0019L15.9995 15.2948L8.70568 8.00094Z"
              fill="#999999"
              className="transition duration-200 group-hover:fill-[#E7461E]"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default WishlistItem;
