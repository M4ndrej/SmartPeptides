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

      <Suspense fallback={null}>
        <MetaPixel pixelIds={["655698189788473", "722913893882386","1382197523120022","852106210603645","871774755547955S"]} />
      </Suspense>

      {children}
    </>
  );
};

export default AnalyticsProvider;
