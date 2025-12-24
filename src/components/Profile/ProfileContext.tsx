"use client";

import { AffiliateInfo } from "@/types/affiliates";
import { PaginationType } from "@/types/global";
import { OrdersList } from "@/types/orders";
import { IUserInfo } from "@/types/user";
import {
  FC,
  ReactNode,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { SWRConfig } from "swr";
import AffiliateModal from "../ProfileAffiliate/AffiliateModal";
import useIsClientRender from "@/hooks/useIsClientRender";

interface ProfileContextProps {
  userData: IUserInfo;
  orderData?: {
    orders: OrdersList;
    pagination: PaginationType;
  };
  isAffiliateModalOpen?: boolean;
  setIsAffiliateModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const ProfileContext = createContext<ProfileContextProps>({
  userData: {} as IUserInfo,
  orderData: undefined,
  isAffiliateModalOpen: false,
  setIsAffiliateModalOpen: () => {},
});

interface ProviderProps {
  children: ReactNode;
  userData: IUserInfo;
  orderData?: {
    orders: OrdersList;
    pagination: PaginationType;
  };
}

export const ProfileContextProvider: FC<ProviderProps> = ({
  children,
  userData,
  orderData,
}) => {
  const isClient = useIsClientRender();
  const [isAffiliateModalOpen, setIsAffiliateModalOpen] = useState(false);

  let orderUrl = `/api/user/profile/orders?user_id=${userData.id}&per_page=10&page=1`;
  return (
    <>
      <ProfileContext.Provider
        value={{
          userData,
          orderData,
          isAffiliateModalOpen,
          setIsAffiliateModalOpen,
        }}
      >
        <SWRConfig
          value={{
            fallback: {
              "/api/user/profile": userData,
              [orderUrl]: orderData,
            },
          }}
        >
          {children}
        </SWRConfig>
      </ProfileContext.Provider>
      <AffiliateModal
        isOpen={isAffiliateModalOpen}
        setIsOpen={setIsAffiliateModalOpen}
      />
    </>
  );
};

export const useProfileContext = () => useContext(ProfileContext);
