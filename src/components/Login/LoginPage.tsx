"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import LostPassword from "../LostPassword/LostPassword";
import { RegisteredUser } from "@/types/user";
import ResetSuccess from "../ResetSuccess/ResetSuccess";
import LoginInitial from "../LoginInitial/LoginInitial";
import Login from "./Login";
import LoginInitialNonExisting from "../LoginInitial/LoginInitialNonExisting";
import ChangePassword from "../ChangePassword/ChangePassword";
import LoginSuccess from "../LoginSuccess/LoginSuccess";
import { AuthModalProps, ModalType } from "@/types/modal_types";
import Discount from "../Discount/Discount";
import useHeaderModalAnimations from "@/hooks/useHeaderModalAnimations";
import classNames from "classnames";

interface LoginPageProps {
  registeredUser?: RegisteredUser;
}

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

const LoginPage: FC<LoginPageProps> = ({ registeredUser }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [currentModal, setCurrentModal] = useState<ModalType | null>("Initial");

  const [displayedModal, animationClass] =
    useHeaderModalAnimations(currentModal);

  const Component = modalComponents[displayedModal ?? "Initial"];

  const openModal = (type: ModalType) => {
    setCurrentModal(type);
  };

  return (
    <div className="mb-[96px] mt-[30px] w-[100%]">
      <div className="mt-[54px] flex flex-col items-center justify-center sm:mt-[5px]">
        <h1 className="font-D32px-M24px pb-[16px] text-center font-bold">
          Sign in
        </h1>
        <div className="mx-auto mb-2 h-[2px] w-[48px] bg-[#333333]" />
      </div>
      <div className="m-auto w-[592px] overflow-hidden sm:w-[calc(100vw-20px)] sm:overflow-hidden">
        <div className={classNames("modal-animation", animationClass)}>
          <Component
            email={email}
            setEmail={setEmail}
            setModalType={openModal}
            isNewUser={isNewUser}
            setIsNewUser={setIsNewUser}
            onClose={() => router.push("/")}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
