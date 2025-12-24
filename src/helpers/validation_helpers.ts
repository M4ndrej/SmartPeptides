import { ShippingAddress } from "@/types/cart_types";

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const customerShippmentAddressValidateFileds = {
  address_1: true,
  city: true,
  country: true,
  first_name: true,
  last_name: true,
  phone: true,
  postcode: true,
};

export type ErrorResponseProps = { [key: string]: boolean };

export const validateUpdateCustomerShippingAddresss = (
  address: ShippingAddress
): { elength: number; errors: ErrorResponseProps } => {
  if (!address) return { elength: 0, errors: {} };
  let errors: ErrorResponseProps = {};
  Object.keys(address).map((field) => {
    if (
      field in customerShippmentAddressValidateFileds &&
      !address[field as keyof typeof address]
    ) {
      errors[field] = true;
    }
  });

  return { elength: Object.keys(errors).length, errors };
};
