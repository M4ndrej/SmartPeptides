import { Metadata } from "next";

export const NOT_FOUND_METADATA: Metadata = {
  title: "Page Not Found",
  description: "Sorry, the page you're looking for doesn't exist.",
  alternates: {
    canonical: undefined,
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Page Not Found | SMART PEPTIDES",
    description: "Sorry, the page you're looking for doesn't exist.",
    type: "website",
    siteName: "SMART PEPTIDES",
  },
};
