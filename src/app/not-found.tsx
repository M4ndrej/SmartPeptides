import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import NotFound from "./(peptide)/not-found";
import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "Sorry, the page you're looking for doesn't exist.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: undefined,
  },
};

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <NotFound />
      <Footer />
    </>
  );
}
