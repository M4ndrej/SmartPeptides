import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import StickyButtons from "@/components/Stickybuttons/StickyButtons";
import { getComProductSlug } from "@/helpers/product_helper";
import { fetchStaticParams } from "@/server/staticService";
import { ReactNode } from "react";

export default async function PeptideLayout({
  children,
  breadcrumb,
}: {
  children: ReactNode;
  breadcrumb: ReactNode;
}) {
  const staticData = await fetchStaticParams();
  const productSlugs = staticData.products.map((product) =>
    getComProductSlug(product)
  );
  return (
    <>
      <Header />
      {breadcrumb}
      {children}
      {/* <TirzNotification /> */}
      {/* <Notification productSlugs={productSlugs} /> */}
      <StickyButtons productSlugs={productSlugs} />
      <Footer />
    </>
  );
}
