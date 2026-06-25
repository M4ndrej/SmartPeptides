import classNames from "classnames";
import { FC, SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

const FilterIcon: FC<IconProps> = ({
  width = 22,
  height = 22,
  className,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
      className={classNames(className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 3.38461H5.16667"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M11.8333 3.38461L20.9999 3.38461"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M20.1667 11L21.0001 11"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M1 11H13.5"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M8.5 18.6153L21 18.6153"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M1 18.6153H1.83333"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M8.49963 0.700195C9.94395 0.700195 11.1334 1.89198 11.1334 3.38477C11.1333 4.87749 9.9439 6.06934 8.49963 6.06934C7.05552 6.06916 5.8669 4.87738 5.86682 3.38477C5.86682 1.89209 7.05547 0.700374 8.49963 0.700195Z"
        fill="#9A9A9F"
        stroke="white"
        strokeWidth="1.4"
      />
      <path
        d="M5.16626 15.931C6.61057 15.931 7.80005 17.1227 7.80005 18.6155C7.79997 20.1083 6.61052 21.3001 5.16626 21.3001C3.72214 21.2999 2.53352 20.1082 2.53345 18.6155C2.53345 17.1229 3.7221 15.9311 5.16626 15.931Z"
        fill="#9A9A9F"
        stroke="white"
        strokeWidth="1.4"
      />
      <path
        d="M16.833 8.31558C18.2773 8.31558 19.4668 9.50736 19.4668 11.0002C19.4667 12.4929 18.2773 13.6847 16.833 13.6847C15.3889 13.6845 14.2003 12.4928 14.2002 11.0002C14.2002 9.50747 15.3888 8.31576 16.833 8.31558Z"
        fill="#9A9A9F"
        stroke="white"
        strokeWidth="1.4"
      />
    </svg>
  );
};

export default FilterIcon;
