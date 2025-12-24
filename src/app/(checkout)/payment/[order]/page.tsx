import CheckoutRecovery from "@/components/CheckoutRecovery/CheckoutRecovery";
import CheckoutRecoveryPaid from "@/components/CheckoutRecovery/CheckoutRecoveryPaid";
import { getUserDataFromCookie } from "@/helpers/cookies_helper";
import { fetchAvailablePayments, fetchNewOrderData } from "@/server/services";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { FC } from "react";

interface ParamProps {
  params: {
    order: string;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ParamProps): Promise<Metadata> {
  return {
    title: `Checkout for Order #${params.order} | VALUE PEPTIDE`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

const OrderPaymentPage: FC<ParamProps> = async ({ params }) => {
  const userData = getUserDataFromCookie();
  if (!userData) {
    return redirect(`/sign-in`);
  }

  const order = await fetchNewOrderData(+params.order);
  if (!order || order.customer_id !== userData.user.id) {
    return notFound();
  }

  if (order.needs_payment === false) {
    return <CheckoutRecoveryPaid />;
  }

  const availablePayments = await fetchAvailablePayments();

  return (
    <CheckoutRecovery
      userData={userData}
      order={order}
      orderId={+params.order}
      availablePayments={availablePayments}
    />
  );
};

export default OrderPaymentPage;
