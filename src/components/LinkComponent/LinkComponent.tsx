import classNames from "classnames";
import Link from "next/link";
import { FC, ReactElement } from "react";
interface LinkComponentProps {
  linkTitle?: string;
  goTo: string;
  closeSidebar?: () => void;
  children?: ReactElement;
  usefulLink?: boolean;
  customClass?: string;
  inFooter?: boolean;
}
const LinkComponent: FC<LinkComponentProps> = ({
  linkTitle,
  goTo,
  closeSidebar,
  children,
  usefulLink,
  customClass,
  inFooter,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    closeSidebar !== undefined && closeSidebar();
  };

  return (
    <Link href={goTo} className={`${customClass}`}>
      <div
        onClick={handleClick}
        className={classNames({
          "transition duration-300": true,
          "font-D16px-M13px cursor-pointer transition duration-300 hover:text-gray":
            usefulLink,
          "!text-textWhite": !inFooter,
          "font-D16px-M13px": inFooter,
        })}
      >
        {linkTitle}
      </div>
      {children}
    </Link>
  );
};

export default LinkComponent;
