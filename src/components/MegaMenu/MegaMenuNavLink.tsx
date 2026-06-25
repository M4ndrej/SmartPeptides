import classNames from "classnames";
import { FC } from "react";

interface DropdownNavLinkProps {
  onHoverFn: () => void;
  activeLink: string;
  title: string;
}
const DropdownNavLink: FC<DropdownNavLinkProps> = ({
  onHoverFn,
  activeLink,
  title,
}) => {
  const megaMenuNavLinkHandler = (event: any) => {
    event.stopPropagation();
    onHoverFn();
  };

  return (
    <div
      onMouseEnter={() => onHoverFn()}
      onClick={(e) => megaMenuNavLinkHandler(e)}
      className={classNames({
        "hover:animate-font-weight-once flex cursor-pointer select-none items-center justify-between whitespace-nowrap [&_svg]:hover:opacity-100":
          true,
        "animate-font-weight-once font-bold text-darkgray":
          activeLink === title,
      })}
    >
      <span>{title}</span>
      <svg
        width="7"
        height="12"
        viewBox="0 0 7 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={classNames({
          "opacity-0 transition duration-200": true,
          "opacity-100": activeLink === title,
        })}
      >
        <path
          d="M1.5 1.5L6 6L1.5 10.5"
          stroke="#9A9A9F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default DropdownNavLink;
