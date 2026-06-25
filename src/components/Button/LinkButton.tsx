import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import { FC, ReactNode, Ref } from "react";
import RightIcon from "../Icons/RightIcon";

type LinkButtonProps = {
  children: ReactNode;
  linkRef?: Ref<HTMLAnchorElement>;
  className?: string;
  iconClassName?: string;
} & LinkProps;

const LinkButton: FC<LinkButtonProps> = ({
  className,
  linkRef,
  children,
  iconClassName,
  ...restProps
}) => {
  return (
    <Link
      ref={linkRef}
      className={classNames(
        `font-D16px-M13px group/linkBtn relative flex cursor-pointer select-none items-center justify-center gap-1 rounded-[5px] border-none px-4 py-1.5 text-darkgray outline-none transition-all duration-300 
        hover:bg-[#f0f0f0] hover:text-gray focus-visible:bg-[#f0f0f0] focus-visible:text-darkgray dark:hover:bg-transparent dark:focus-visible:bg-transparent`,
        className
      )}
      {...restProps}
    >
      {children}
      <RightIcon className={classNames("stroke-[#9A9A9F]", iconClassName)} />
    </Link>
  );
};

export default LinkButton;
