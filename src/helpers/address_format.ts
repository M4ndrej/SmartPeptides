import { ShippingAddress } from "@/types/cart_types";

export const formatAddress = (address: ShippingAddress) => {
  let addressStr = "";

  if (address?.address_1?.length) addressStr += address.address_1;
  if (address?.address_2?.length) addressStr += ", " + address.address_2;
  if (address?.city?.length) addressStr += ", " + address.city;
  if (address?.state?.length) addressStr += ", " + address.state;
  if (address?.postcode?.length) addressStr += " " + address.postcode;
  if (address?.country?.length) addressStr += ", " + address.country;

  return addressStr;
};
