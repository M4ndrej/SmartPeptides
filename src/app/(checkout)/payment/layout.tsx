import CheckoutProvider from "@/context/CheckoutContext/CheckoutContext";

export const metadata = {
  title: "Checkout",
};

export default function PaymentLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className=" w-full">
        <div className="relative m-auto justify-between sm:flex sm:flex-col-reverse sm:px-[10px]">
          <CheckoutProvider>{children}</CheckoutProvider>
        </div>
      </div>
    </>
  );
}
