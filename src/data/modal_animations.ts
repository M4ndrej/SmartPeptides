import { ModalType } from "@/types/modal_types";

export const enterAnimations: Record<ModalType, string> = {
  Initial: "animate-slide-in-down",
  ResetSuccess: "animate-slide-in-down",
  LostPassword: "animate-slide-in-up",
  ChangePass: "animate-slide-in-right",
  InitialNonExisting: "animate-slide-in-right",
  LoginNonExisting: "animate-slide-in-right",
  Login: "animate-slide-in-right",
  LoginNewUser: "animate-slide-in-right",
  LoginSuccess: "animate-slide-in-right",
  Discount: "animate-slide-in-down",
};

export const exitAnimations: Record<ModalType, string> = {
  Initial: "animate-slide-out-up",
  InitialNonExisting: "animate-slide-out-up",
  LoginNonExisting: "animate-slide-out-up",
  Login: "animate-slide-out-left",
  LostPassword: "animate-slide-out-down",
  LoginNewUser: "animate-slide-out-left",
  ChangePass: "animate-slide-out-up",
  LoginSuccess: "animate-slide-out-left",
  ResetSuccess: "animate-slide-out-left",
  Discount: "animate-slide-out-up",
};

export const transitionAnimations: Record<ModalType, string> = {
  Initial: "animate-slide-out-left",
  ResetSuccess: "animate-slide-out-up",
  LostPassword: "animate-slide-out-down",
  ChangePass: "animate-slide-out-up",
  InitialNonExisting: "animate-slide-out-left",
  LoginNonExisting: "animate-slide-out-left",
  Login: "animate-slide-out-up",
  LoginNewUser: "animate-slide-out-left",
  LoginSuccess: "animate-slide-out-left",
  Discount: "animate-slide-out-left",
};
