"use client";

import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import useSWR from "swr";
import { LoggedUserData } from "@/types/user";
import { fetcher } from "@/helpers/fetchers";
import { AuthModalProps, ModalType } from "@/types/modal_types";
import useHeaderModalAnimations from "@/hooks/useHeaderModalAnimations";
import LoginInitial from "@/components/LoginInitial/LoginInitial";
import LoginInitialNonExisting from "@/components/LoginInitial/LoginInitialNonExisting";
import Login from "@/components/Login/Login";
import LostPassword from "@/components/LostPassword/LostPassword";
import ChangePassword from "@/components/ChangePassword/ChangePassword";
import LoginSuccess from "@/components/LoginSuccess/LoginSuccess";
import Discount from "@/components/Discount/Discount";
import ResetSuccess from "@/components/ResetSuccess/ResetSuccess";
import CustomModal from "@/components/CustomModal/CustomModal";
import { createPortal } from "react-dom";
import useCameFromMeta from "@/hooks/useCameFromMeta";

const modalComponents: Record<ModalType, FC<AuthModalProps>> = {
  Initial: LoginInitial,
  InitialNonExisting: LoginInitialNonExisting,
  LoginNonExisting: LoginInitialNonExisting,
  Login: Login,
  LostPassword: LostPassword,
  LoginNewUser: Login,
  ChangePass: ChangePassword,
  LoginSuccess: LoginSuccess,
  Discount: Discount,
  ResetSuccess: ResetSuccess,
};

interface ModalContextProps {
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  currentModal: ModalType | null;
  email?: string;
  setEmail?: Dispatch<SetStateAction<string>>;
  isNewUser?: boolean;
  setIsNewUser?: Dispatch<SetStateAction<boolean>>;
}

export const ModalContext = createContext<ModalContextProps>({
  openModal: () => {},
  closeModal: () => {},
  currentModal: null,
  email: "",
  setEmail: () => {},
  isNewUser: false,
  setIsNewUser: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

export const ModalContextProvider = ({ children }: ProviderProps) => {
  const [currentModal, setCurrentModal] = useState<ModalType | null>(null);
  const [email, setEmail] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const cameFromMeta = useCameFromMeta();

  const { data: userData } = useSWR<LoggedUserData>("/api/user/", fetcher);

  const [displayedModal, animationClass] =
    useHeaderModalAnimations(currentModal);

  const Component = displayedModal ? modalComponents[displayedModal] : null;

  const openModal = (type: ModalType) => {
    setCurrentModal(type);
  };

  const closeModal = () => {
    setCurrentModal(null);
    setEmail("");
    setIsNewUser(false);
  };

  useEffect(() => {
    if (userData?.user?.is_default_password) {
      openModal("ChangePass");
    }
  }, [userData]);

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     const showedToUserOnce = localStorage.getItem("discountToUser");
  //     if (!showedToUserOnce && !cameFromMeta) {
  //       openModal("Discount");
  //       localStorage.setItem("discountToUser", "shown");
  //     }
  //     if (cameFromMeta) {
  //       setCurrentModal(null);
  //       localStorage.setItem("discountToUser", "shown");
  //     }
  //   }, 15000);
  //   return () => clearTimeout(timeoutId);
  // }, [cameFromMeta]);

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        currentModal,
        email,
        setEmail,
        isNewUser,
        setIsNewUser,
      }}
    >
      {children}
      {Component &&
        createPortal(
          <CustomModal
            isOpen={!!displayedModal}
            onClose={closeModal}
            animationClass={animationClass}
            modalType={displayedModal || undefined}
          >
            <Component
              email={email}
              setEmail={setEmail}
              setModalType={openModal}
              isNewUser={isNewUser}
              setIsNewUser={setIsNewUser}
              onClose={closeModal}
            />
          </CustomModal>,
          document.body
        )}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
