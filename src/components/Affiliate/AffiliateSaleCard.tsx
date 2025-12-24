"use client";

import { FC, ReactNode, useState } from "react";
import CheckIcon from "../Icons/CheckIcon";
import AnimateHeight from "react-animate-height";
import useScreenSize from "@/hooks/useScreenSize";
import DropdownIcon from "../Icons/DropdownIcon";
import classNames from "classnames";
import useIsClientRender from "@/hooks/useIsClientRender";

interface AffiliateSaleCardProps {
  icon: ReactNode;
  title: string;
  color: string;
  percentage: number;
  description: ReactNode;
  hasRequirements?: boolean;
  defaultOpen?: boolean;
}

const AffiliateSaleCard: FC<AffiliateSaleCardProps> = ({
  icon,
  title,
  color,
  percentage,
  description,
  hasRequirements = false,
  defaultOpen = false,
}) => {
  const isClientRender = useIsClientRender();
  const { width } = useScreenSize();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const items = [
    "on every purchase made by your referral (your referral for life)",
    "Access to affiliate team",
    "Brand creative to help promote your journey",
  ];

  return (
    <div>
      <div className="rounded-lg border border-gray p-6 sm:p-4">
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col gap-2">
            {icon}
            <span
              className="font-D32px-M24px block font-bold"
              style={{ color: color }}
            >
              {title}
            </span>
          </div>
          {width <= 768 && isClientRender && (
            <button
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FFE9E3] dark:bg-transparent"
              onClick={() => setIsOpen(!isOpen)}
            >
              <DropdownIcon
                className={classNames(
                  "!stroke-[#E7461E] transition-transform duration-200",
                  !isOpen && "rotate-180"
                )}
                width={28}
                height={14}
              />
            </button>
          )}
        </div>
        <AnimateHeight
          height={isOpen || width > 768 || !isClientRender ? "auto" : 0}
          duration={300}
        >
          <ul className="my-8 flex flex-col gap-4">
            {items.map((item, i) => (
              <li key={i} className="flex items-start justify-start">
                <CheckIcon
                  width={24}
                  height={24}
                  strokeWidth={1.5}
                  className="shrink-0"
                  style={{ stroke: color }}
                />
                <p>
                  {i === 0 && <span className="font-bold">{percentage}% </span>}
                  {item}
                </p>
              </li>
            ))}
          </ul>
          {hasRequirements && (
            <p className="mb-2 block font-bold">REQUIREMENTS:</p>
          )}
          <div className="flex items-start justify-start">
            {hasRequirements && (
              <CheckIcon
                width={24}
                height={24}
                strokeWidth={1.5}
                className="shrink-0"
                style={{ stroke: color }}
              />
            )}
            {description}
          </div>
        </AnimateHeight>
      </div>
    </div>
  );
};

export default AffiliateSaleCard;
