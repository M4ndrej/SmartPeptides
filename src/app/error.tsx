"use client"; // Error components must be Client Components

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import NotFound from "./(peptide)/not-found";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />
      <NotFound />
      <Footer />
    </>
  );
}
