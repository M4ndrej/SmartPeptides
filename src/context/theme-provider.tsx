"use client";

import { getCookieByName } from "@/helpers/client_cookie_helpers";
import {
  applyThemeToDocument,
  syncThemeStateToHtml,
} from "@/helpers/theme-helper";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
} from "react";
import {
  GET_WISHLIST_ITEMS,
  SET_THEME_MODE,
  TOGGLE_CART_MODAL,
  TOGGLE_DARK_MODE,
  UPDATE_BLOG_VEIW_MODE,
  UPDATE_CART_ITEMS,
  UPDATE_CURRENT_ROUTE,
  UPDATE_MEGA_MENU,
  UPDATE_MOBILE_FILTER,
  UPDATE_PREVIEW_ORDER_ID,
  UPDATE_PREVIOUS_ROUTE,
  UPDATE_PRODUCT_LIST_LOADING,
  UPDATE_QUICKVIEW_ITEM,
  UPDATE_SORT,
  UPDATE_VIEW_MODE,
  UPDATE_WISHLIST_ITEM_LOADING,
} from "./constants";

const initialState = {
  viewMode: "5x5",
  orderBy: "Popularity",
  showCartModal: false,
  wishlistItemIds: [],
  previousRoute: {},
  currentRoute: {},
  mobilFilterOpened: false,
  productListLoading: false,
  wishlistItemLoading: false,
  cartItems: [],
  blogViewMode: "image",
  showWishlistModal: false,
  quicklistItem: {},
  itemOpenedInWishlist: false,
  peptidesCat: "Peptides",
  megaMenuShown: false,
  megaMenuType: "",
  productAddedToCart: false,
  orderPreviewId: 0,
  darkMode: null,
  themeMode: "system",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case UPDATE_VIEW_MODE:
      return { ...state, viewMode: action.payload };
    case UPDATE_SORT:
      return { ...state, orderBy: action.payload };
    case UPDATE_QUICKVIEW_ITEM:
      return { ...state, quicklistItem: action.payload };
    case GET_WISHLIST_ITEMS:
      const wishlist = getCookieByName("Wishlist");
      return { ...state, wishlistItemIds: wishlist };
    case UPDATE_PREVIOUS_ROUTE:
      return { ...state, previousRoute: action.payload };
    case UPDATE_CURRENT_ROUTE:
      return { ...state, currentRoute: action.payload };
    case UPDATE_MOBILE_FILTER:
      return { ...state, mobileFilterOpened: action.payload };
    case UPDATE_PRODUCT_LIST_LOADING:
      return { ...state, productListLoading: action.payload };
    case UPDATE_WISHLIST_ITEM_LOADING:
      return { ...state, wishlistItemLoading: action.payload };
    case UPDATE_MEGA_MENU:
      return { ...state, ...action.payload };
    case UPDATE_CART_ITEMS:
      return { ...state, cartItems: action.payload };
    case UPDATE_BLOG_VEIW_MODE:
      return { ...state, blogViewMode: action.payload };
    case UPDATE_PREVIEW_ORDER_ID:
      return { ...state, orderPreviewId: action.payload };
    case TOGGLE_CART_MODAL:
      return {
        ...state,
        ...action.payload,
      };
    case TOGGLE_DARK_MODE:
      return { ...state, darkMode: action.payload };
    case SET_THEME_MODE:
      return { ...state, themeMode: action.payload };
    default:
      return state;
  }
};

export const ThemeContext = createContext({});

export default function ThemeProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useLayoutEffect(() => {
    applyThemeToDocument(dispatch);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const themePref = localStorage.getItem("theme") || "system";
      if (themePref === "system") {
        applyThemeToDocument(dispatch);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (state.darkMode === null) return;
    syncThemeStateToHtml(state.darkMode, state.themeMode);
  }, [state.darkMode, state.themeMode]);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = (): any => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useRecentlyViewedProducts must be used within a RecentlyViewedProductsProvider"
    );
  }
  return context;
};
