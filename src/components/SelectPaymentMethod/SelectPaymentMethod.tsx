import { FC } from "react";

import { createPortal } from "react-dom";

import { SelectPaymentMethodModal } from "./SelectPaymentMethodModal";

import useIsClientRender from "@/hooks/useIsClientRender";

interface SelectPaymentMethodProps {
  isOpen: boolean;

  setIsOpen: (isOpen: boolean) => void;
}

const SelectPaymentMethod: FC<SelectPaymentMethodProps> = ({
  isOpen,

  setIsOpen,
}) => {
  const isClient = useIsClientRender();

  if (!isClient) return null;

  return (
    <>
      {isClient &&
        createPortal(
          <SelectPaymentMethodModal isOpen={isOpen} setIsOpen={setIsOpen} />,

          document.body
        )}
    </>
  );
};

export default SelectPaymentMethod;
