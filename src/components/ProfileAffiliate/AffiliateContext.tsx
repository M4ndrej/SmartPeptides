"use client";

import { AffiliateInfo } from "@/types/affiliates";
import { ReactNode, createContext, useContext } from "react";
import { SWRConfig } from "swr";

interface AffiliateContextProps {
  affiliateInfo?: AffiliateInfo;
}

export const AffiliateContext = createContext<AffiliateContextProps>({
  affiliateInfo: undefined,
});

interface ProviderProps {
  affiliateInfo?: AffiliateInfo;
  children: ReactNode;
}

export const AffiliateContextProvider = ({
  children,
  affiliateInfo,
}: ProviderProps) => {
  return (
    <AffiliateContext.Provider
      value={{
        affiliateInfo,
      }}
    >
      <SWRConfig
        value={{
          fallback: {
            "/api/affiliate": affiliateInfo,
          },
        }}
      >
        {children}
      </SWRConfig>
    </AffiliateContext.Provider>
  );
};

export const useAffiliateContext = () => useContext(AffiliateContext);
