import { fetcher } from "@/helpers/fetchers";
import { ICheckout } from "@/types/payment";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Cookies from "js-cookie";

export const useCheckoutData = () => {
  const [checkoutData, setCheckoutData] = useState<ICheckout>();
  const { data, isLoading } = useSWR<ICheckout>("/api/checkout", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: true,
  });

  useEffect(() => {
    const verifiedEmail = Cookies.get("verifiedEmail");
    if (data) {
      const checkoutData: ICheckout = {
        ...data,
        billing_address: {
          ...data.billing_address,
          email: verifiedEmail || data.billing_address?.email,
        },
        isVerifiedEmail: !!verifiedEmail,
      };

      setCheckoutData(checkoutData);
    }
  }, [data]);

  return {
    isLoading,
    checkoutData,
  };
};
