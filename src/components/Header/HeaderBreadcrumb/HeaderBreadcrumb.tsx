"use client";

import {
  UPDATE_CURRENT_ROUTE,
  UPDATE_MOBILE_FILTER,
  UPDATE_PREVIOUS_ROUTE,
} from "@/context/constants";
import { ThemeContext } from "@/context/theme-provider";
import { pages } from "@/data/pages_data";
import { usePathname } from "next/navigation";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import HeaderBreadcrumbContent from "./HeaderBreadcrumbContent";

type HeaderBreadcrumbProps = {
  popoverOpened?: boolean;
  popoverType?: string;
  handlePopover?: (close: boolean) => void;
};

const HeaderBreadcrumb: FC<HeaderBreadcrumbProps> = ({
  popoverOpened,
  popoverType,
  handlePopover,
}) => {
  const appContext: any = useContext(ThemeContext);
  const { currentRoute, previousRoute } = appContext.state;
  const activePath = usePathname();
  const activePage = "/" + activePath.split("/")[1];
  const location = currentRoute?.link;

  const hasPage = useMemo(
    () => pages.find((page) => page.link == activePage),
    [activePath]
  );

  const [linkChanges, setLinkChanges] = useState(0);

  useEffect(() => {
    const currentPage = pages.find((page) => page.link == activePage);
    const homePage = pages.find((page) => page.link == "/");
    const linkChanged = currentRoute?.link != currentPage?.link;
    const noSubRoute = activePath.split("/")[2] == "";

    if (!previousRoute.link) {
      appContext.dispatch({
        type: UPDATE_PREVIOUS_ROUTE,
        payload: homePage,
      });
    }

    if (!currentRoute?.link || linkChanged) {
      appContext.dispatch({ type: UPDATE_CURRENT_ROUTE, payload: currentPage });
      appContext.dispatch({ type: UPDATE_MOBILE_FILTER, payload: false });
    } else if (currentRoute.subRoute?.link && noSubRoute) {
      appContext.dispatch({
        type: UPDATE_CURRENT_ROUTE,
        payload: { ...currentRoute, subRoute: {} },
      });
    }

    if (popoverType == "search" && popoverOpened) {
      handlePopover?.(false);
    }

    setLinkChanges(linkChanges + 1);
  }, [activePath]);

  return (
    <>
      <HeaderBreadcrumbContent
        location={location}
        currentRoute={currentRoute}
        previousRoute={previousRoute}
        hideBreadcrumb={
          currentRoute?.subRoute?.link && activePath !== "/"
            ? false
            : activePath === "/"
              ? true
              : !hasPage
        }
      />
    </>
  );
};

export default HeaderBreadcrumb;
