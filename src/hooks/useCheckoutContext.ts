import { useCheckoutMainContext } from "@/context/CheckoutContext/CheckoutContext";
import { PaymentMethods } from "@/types/payment";

export const useCheckoutContext = () => {
  const {
    dispatch,
    state: {
      isCartUpdating,
      customer_note,
      mailSubscribe: isMailSubscribe,
      acceptedTerms,
      privacyAccepted: isPrivacyAccepted,
      sameAsShippingAddress: isSameAsShippingAddress,
      selectedPaymentMethod,
      isUpdateShipping,
    },
  } = useCheckoutMainContext();

  return {
    isCartUpdating,
    customer_note,
    isMailSubscribe,
    acceptedTerms,
    isPrivacyAccepted,
    isSameAsShippingAddress,
    selectedPaymentMethod,
    isUpdateShipping,
    updateCartUpdateStatus: (status: boolean) =>
      dispatch({ type: "UPDATE_CART_UPDATE", payload: status }),
    updateCustomerNote: (text: string) =>
      dispatch({ type: "UPDATE_CHECKOUT_CUSTOMER_NOTE", payload: text }),
    handleUpdateMailSubscribtion: () =>
      dispatch({ type: "UPDATE_MAIL_SUBSCRIBE" }),
    handleUpdateTerms: () => dispatch({ type: "UPDATE_ACCEPT_TERMS" }),
    handleUpdatePrivacy: () => dispatch({ type: "UPDATE_ACCEPT_PRIVACY" }),
    handleUpdateSameAsShippingAdderss: () =>
      dispatch({ type: "UPDATE_SAME_AS_SHIPPING_ADDRESS" }),
    handleUpdatePaymentMethod: (payment: PaymentMethods) =>
      dispatch({ type: "SET_SELECTED_PAYMENT_OPTION", payload: payment }),
    handleUpdateShippingUpdate: (checked: boolean) =>
      dispatch({ type: "UPDATE_SHIPPING_UPDATE", payload: checked }),
  };
};
