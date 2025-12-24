"use client";
import { FC, ReactNode, useState } from "react";
import PlusIcon from "../Icons/PlusIcon";
import MinusIcon from "../Icons/MinusIcon";
import AnimateHeight from "react-animate-height";

interface DetailsAccordionProps {
  title: string;
  children: ReactNode;
  initialOpen?: boolean;
}

const DetailsAccordion: FC<DetailsAccordionProps> = ({
  title,
  children,
  initialOpen,
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  return (
    <div className="rounded-[5px] border border-borderColor">
      <div
        className="flex cursor-pointer items-center justify-between p-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-D16px-M15px font-bold">{title}</div>
        {isOpen ? <MinusIcon /> : <PlusIcon />}
      </div>
      <AnimateHeight duration={300} height={isOpen ? "auto" : 0}>
        <div className="p-4 !pt-0">{children}</div>
      </AnimateHeight>
    </div>
  );
};

export default DetailsAccordion;
