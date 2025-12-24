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
        `font-D16px-M13px group/linkBtn relative flex cursor-pointer select-none items-center justify-center gap-1 rounded-[5px] border-none px-4 py-1.5 text-[#E7461E] outline-none transition-all duration-300 
        hover:bg-[#FFE9E3] hover:text-[#E7461E] focus-visible:bg-[#FFE9E3] focus-visible:text-[#E7461E] dark:hover:bg-transparent dark:focus-visible:bg-transparent`,
        className
      )}
      {...restProps}
    >
      {children}
      <RightIcon className={classNames("stroke-[#E7461E]", iconClassName)} />
    </Link>
  );
};

export default LinkButton;
