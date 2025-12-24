import { ModalContextProvider } from "@/context/ModalContext";
import { ScrollContextProvider } from "@/context/ScrollContext";
import { SidePopoverContextProvider } from "@/context/SidePopoverContext";
import { FC, ReactNode } from "react";
import { RecentlyViewedProductsProvider } from "../context/RecentlyViewedProductsContext";
import ThemeProvider from "../context/theme-provider";
import AnalyticsProvider from "@/components/AnalyticsProvider/AnalyticsProvider";

type ProvidersProps = {
  children: ReactNode;
};

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <AnalyticsProvider>
        <ThemeProvider>
          <ScrollContextProvider>
            <RecentlyViewedProductsProvider>
              <SidePopoverContextProvider>
                <ModalContextProvider>{children}</ModalContextProvider>
              </SidePopoverContextProvider>
            </RecentlyViewedProductsProvider>
          </ScrollContextProvider>
        </ThemeProvider>
      </AnalyticsProvider>
    </>
  );
};

export default Providers;
