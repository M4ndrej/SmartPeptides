import { FC } from "react";
import HeaderBreadcrumb from "./HeaderBreadcrumb";
import HeaderBreadcrumbContent from "./HeaderBreadcrumbContent";
import { IPagesProps } from "@/data/pages_data";

type HeaderBreadCrumbProps = {
  type: "header";
  popoverOpened: boolean;
  popoverType: string;
  handlePopover: (close: boolean) => void;
  scrollPosition?: number;
  scrollDirection?: string;
};

type HeaderBreadcrumbContainerProps =
  | HeaderBreadCrumbProps
  | {
      type: "main";
      currentRoute?: IPagesProps;
      previousRoute?: IPagesProps;
      scrollPosition?: number;
      scrollDirection?: string;
    };

const HeaderBreadcrumbContainer: FC<HeaderBreadcrumbContainerProps> = ({
  type,
  ...props
}) => {
  if (type === "header")
    return <HeaderBreadcrumb {...(props as HeaderBreadCrumbProps)} />;

  return <HeaderBreadcrumbContent location="" {...props} />;
};

export default HeaderBreadcrumbContainer;
