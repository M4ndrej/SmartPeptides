"use client";

import { IPagesProps, pages } from "@/data/pages_data";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import HeaderMegaMenu from "./HeaderMegaMenu";

const megaMenuTypes: Record<string, string> = {
  "/merch": "Merch",
  "/shop": "Peptides",
};

interface SingleNavItemProps {
  page: IPagesProps;
  isActive?: boolean;
  isSticky?: boolean;
  handleHoveredPath: (path: string) => void;
}

const SingleNavItem: FC<SingleNavItemProps> = ({
  page,
  isActive,
  isSticky,
  handleHoveredPath,
}) => {
  return (
    <li className="group/item relative flex items-center justify-center">
      <Link
        href={page.link}
        className={classNames(
          "underlineNew transition-all duration-300 group-hover/item:text-gray",
          isActive && "!font-bold !text-gray after:!scale-100",
          isSticky ? "px-2 py-[28px]" : "px-4 py-2"
        )}
        onMouseEnter={() => handleHoveredPath(page.link)}
        onMouseLeave={() => handleHoveredPath("")}
      >
        {page.title}
      </Link>
    </li>
  );
};

const usePreviousRoute = () => {
  const pathname = usePathname();
  const prevPathRef = useRef<string | null>(null);
  const [prevRoute, setPrevRoute] = useState<string | null>(null);

  useEffect(() => {
    setPrevRoute(prevPathRef.current);
    prevPathRef.current = pathname;
  }, [pathname]);

  return prevRoute;
};

const isPageActive = (
  page: IPagesProps,
  activePath: string,
  prevRoute: string | null
) => {
  let pagesArray = pages.map((page) => page.link);
  let dynamicRoute = !pagesArray.includes(activePath);
  let isMerch = prevRoute === "/merch" || prevRoute === "/merch/";
  let isShop = prevRoute === "/shop" || prevRoute === "/shop/";

  if (
    dynamicRoute &&
    ((!page.subRoute && isMerch && page.stayActive) ||
      (page.subRoute && !page.stayActive && (!isMerch || isShop)))
  ) {
    return true;
  }

  return activePath === page.link || page.subRoute?.links?.includes(activePath);
};

interface HeaderNavigationProps {
  isSticky?: boolean;
  isTransitioning?: boolean;
}

const HeaderNavigation: FC<HeaderNavigationProps> = ({
  isSticky,
  isTransitioning,
}) => {
  const navPages = pages.filter((page) => page.showInNav);

  const pathname = usePathname();
  const activePath = "/" + pathname.split("/")[1];

  const prevRoute = usePreviousRoute();

  const [megaMenuType, setMegaMenuType] = useState("");
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const handleHoveredPath = (path: string) => {
    const type = megaMenuTypes[path] ?? "";
    if (type) {
      setMegaMenuType(type);
    }
    setIsMegaMenuOpen(!!type);
  };

  return (
    <>
      <ul
        className={classNames(
          "flex transform items-center justify-start gap-3 transition-all duration-150",
          isSticky && "!hidden gap-2 !delay-0 xl:!flex",
          isTransitioning ? "pointer-events-none opacity-0" : "opacity-100",
          !isSticky && isTransitioning
            ? "translate-x-6 delay-0"
            : "translate-x-0 delay-100",
          isSticky && isTransitioning ? " translate-y-6" : " translate-y-0"
        )}
      >
        {navPages.map((page) => (
          <SingleNavItem
            key={page.link}
            page={page}
            isActive={isPageActive(page, activePath, prevRoute)}
            isSticky={isSticky}
            handleHoveredPath={handleHoveredPath}
          />
        ))}
      </ul>

      {!isSticky && (
        <HeaderMegaMenu
          isOpen={isMegaMenuOpen}
          setIsOpen={setIsMegaMenuOpen}
          menuType={megaMenuType}
        />
      )}
    </>
  );
};

export default HeaderNavigation;
