import "./globals.css";

import { getThemeInitScript } from "@/utils/getThemeInitScript";
import classNames from "classnames";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";
import CookieConfigs from "./cookie-configs";
import Providers from "./providers";
import MainScroll from "@/components/Scroll/MainScroll";
import { LiveChatWidget } from "@/components/LiveChatWidget/LiveChatWidget";

const monts = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://smartpeptides.com"),
  title: {
    default: "SMART PEPTIDES",
    template: "%s | SMART PEPTIDES",
  },
  description:
    "SMART PEPTIDES presents high quality research peptides for sale! Read about our peptides, research studies and buy them. Bulk orders for larger labs also available.",
  icons: {
    icon: ["/favicon.ico?v=5"],
    apple: ["/favicon/apple-touch-icon.png?v=5"],
    shortcut: ["/favicon/apple-touch-icon.png"],
  },
  manifest: "/favicon/site.webmanifest",
  robots: {
    index: false,
    follow: false,
  },
  // verification: {
  //   google: "-cwuHX53L1IOayxXHpV9MbF7kx5rRwfATjzuXiuc27w",
  //   other: {
  //     "facebook-domain-verification": "7ag0gr02nexilbsbmhbrnhfp5u42e2",
  //   },
  // },
  openGraph: {
    title: "SMART PEPTIDES",
    description:
      "If you are looking to buy high-quality research peptides, stop by SMART PEPTIDES! We offer highly purified, safe, and effective peptides you can buy online today!",
    url: "https://smartpeptides.com",
    images: [
      {
        url: "https://smartpeptides.com/images/ogImage.png",
        width: 1300,
        height: 1080,
        alt: "Peptide Vials",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          httpEquiv="Delegate-CH"
          content="sec-ch-ua https://ads.trafficjunky.net; sec-ch-ua-arch https://ads.trafficjunky.net; sec-ch-ua-full-version-list https://ads.trafficjunky.net; sec-ch-ua-mobile https://ads.trafficjunky.net; sec-ch-ua-model https://ads.trafficjunky.net; sec-ch-ua-platform https://ads.trafficjunky.net; sec-ch-ua-platform-version https://ads.trafficjunky.net;"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: getThemeInitScript(),
          }}
        />
      </head>
      <body
        className={classNames({
          [monts.className]: true,
          "elementor-kit-12": true,
        })}
      >
        <Providers>
          <NextTopLoader color="#333333" height={2} showSpinner={false} />
          <CookieConfigs />
          <MainScroll>{children}</MainScroll>
          {/* </MainScroll> */}
          {/* <PreLanderContent /> */}
          {/* <BigSaleBanner /> */}
        </Providers>
        <LiveChatWidget />
      </body>
    </html>
  );
}
