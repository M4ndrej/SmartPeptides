"use client";

import { PaymentMethods } from "@/types/payment";
import { createContext, useContext, useReducer } from "react";

type CartStateProps = {
  isCartUpdating: boolean;
  customer_note: string;
  mailSubscribe?: boolean;
  acceptedTerms?: boolean;
  privacyAccepted?: boolean;
  sameAsShippingAddress: boolean;
  isUpdateShipping?: boolean;
  selectedPaymentMethod: PaymentMethods | null;
};

export type CheckoutAction =
  | { type: "UPDATE_CART_UPDATE"; payload: boolean }
  | { type: "UPDATE_SHIPPING_UPDATE"; payload: boolean }
  | { type: "UPDATE_MAIL_SUBSCRIBE" }
  | { type: "UPDATE_ACCEPT_TERMS" }
  | { type: "UPDATE_ACCEPT_PRIVACY" }
  | { type: "UPDATE_SAME_AS_SHIPPING_ADDRESS" }
  | { type: "UPDATE_CHECKOUT_CUSTOMER_NOTE"; payload: string }
  | { type: "SET_SELECTED_PAYMENT_OPTION"; payload: PaymentMethods };

const initialState: CartStateProps = {
  isCartUpdating: false,
  customer_note: "",
  mailSubscribe: false,
  acceptedTerms: false,
  privacyAccepted: false,
  sameAsShippingAddress: true,
  selectedPaymentMethod: null,
  isUpdateShipping: false,
};

const reducer = (state: CartStateProps, action: CheckoutAction) => {
  switch (action.type) {
    case "SET_SELECTED_PAYMENT_OPTION":
      return { ...state, selectedPaymentMethod: action.payload };
    case "UPDATE_SHIPPING_UPDATE":
      return { ...state, isUpdateShipping: action.payload };
    case "UPDATE_CART_UPDATE":
      return { ...state, isCartUpdating: action.payload };
    case "UPDATE_CHECKOUT_CUSTOMER_NOTE":
      return { ...state, customer_note: action.payload };
    case "UPDATE_MAIL_SUBSCRIBE":
      return { ...state, mailSubscribe: !state.mailSubscribe };
    case "UPDATE_ACCEPT_TERMS":
      return { ...state, acceptedTerms: !state.acceptedTerms };
    case "UPDATE_ACCEPT_PRIVACY":
      return { ...state, privacyAccepted: !state.privacyAccepted };
    case "UPDATE_SAME_AS_SHIPPING_ADDRESS":
      return { ...state, sameAsShippingAddress: !state.sameAsShippingAddress };

    default:
      return state;
  }
};

export const CheckoutContext = createContext<{
  state: CartStateProps;
  dispatch: React.Dispatch<CheckoutAction>;
} | null>(null);

export default function CheckoutProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CheckoutContext.Provider value={{ state, dispatch }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckoutMainContext = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("CheckoutContext Loading Error!!!");
  }
  return context;
};
