import Script from "next/script";
import { FC, ReactNode, Suspense } from "react";
import { MetaPixel } from "./MetaPixel";
import GoogleProvider from "./GoogleProvider";

interface AnalyticsProviderProps {
  children: ReactNode;
}

const AnalyticsProvider: FC<AnalyticsProviderProps> = ({ children }) => {
  return (
    <>
      {/* <Script
        src="https://hw-cdn2.adtng.com/delivery/idsync/idsync.min.js"
        defer
      />
      <Script async id="infinity-data-layer" defer>
        {`setTimeout(() => { window.idsync.config(34258).fp_get().sync();}, 3000);`}
      </Script> */}

      <GoogleProvider />

      {/* <Suspense fallback={null}>
        <MetaPixel pixelId="655698189788473" />
      </Suspense> */}

      {children}
    </>
  );
};

export default AnalyticsProvider;
