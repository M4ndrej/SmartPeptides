import { Dispatch, SetStateAction } from "react";

export type ModalType =
  | "Initial"
  | "InitialNonExisting"
  | "LoginNonExisting"
  | "Login"
  | "LostPassword"
  | "LoginNewUser"
  | "ChangePass"
  | "LoginSuccess"
  | "Discount"
  | "ResetSuccess";

export type AuthModalProps = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setModalType: (value: ModalType) => void;
  goToSuccess?: () => void;
  onClose?: () => void;
  goToChangePassword?: () => void;
  redirectToProfile?: boolean;
  isNewUser?: boolean;
  setIsNewUser: Dispatch<SetStateAction<boolean>>;
  hideCreateAcc?: boolean;
};
