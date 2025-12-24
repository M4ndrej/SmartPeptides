import { ShippingAddress } from "@/types/cart_types";

export const addressFormat = (address: ShippingAddress) => {
  const { address_1, address_2, city, state, postcode, country } =
    address || {};

  const line1 = [address_1, address_2].filter(Boolean).join(", ");

  const line2 =
    [city, state, postcode].filter(Boolean).join(", ") +
    (country ? ` ${country}` : "");

  const multilineString = [line1, line2].filter(Boolean).join("\n");

  return multilineString;
};
