import { CartItemType } from "@/types/cart_types";
import { formatCurrency } from "./curency_format";

export const analyticsPlaceOrderEvent = (
  orderId: number,
  price: number,
  items?: CartItemType[]
) => {
  const totalValue = formatCurrency(price, false, true);
  const windowObj = window as any;

  if (windowObj?.idsync) {
    windowObj.idsync?.send_event({
      name: "revenue",
      type: "Revenue",
      value: totalValue,
    });
  }

  if (windowObj?.gtag) {
    windowObj.gtag("event", "purchase", {
      transaction_id: orderId,
      value: totalValue,
      currency: "USD",
      items: items,
    });
  }

  if (windowObj?.fbq) {
    windowObj.fbq("track", "Purchase", {
      value: totalValue,
      currency: "USD",
      items: items,
    });
  }
};

export const analyticsAddToCartEvent = (
  price: number,
  items?: CartItemType[]
) => {
  const totalValue = formatCurrency(price, false, true);
  const windowObj = window as any;

  if (windowObj?.idsync) {
    windowObj.idsync?.send_event({
      name: "revenue",
      type: "Revenue",
      value: totalValue,
    });
  }

  if (windowObj?.gtag) {
    windowObj.gtag("event", "add_to_cart", {
      value: totalValue,
      currency: "USD",
      items: items,
    });
  }

  if (windowObj?.fbq) {
    windowObj.fbq("track", "AddToCart", {
      value: totalValue,
      currency: "USD",
      items: items,
    });
  }
};
