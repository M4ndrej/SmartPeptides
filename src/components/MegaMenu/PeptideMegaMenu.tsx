import { FC, useState, useContext, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/helpers/fetchers";
import { MegaMenuProductList } from "@/types/product";
import MegaMenuContent from "./MegaMenuContent";
import MegaMenuNavLink from "./MegaMenuNavLink";
import { ThemeContext } from "@/context/theme-provider";
import MegaMenuPeptidesSkeleton from "./MegaMenuPeptidesSkeleton";

interface MegaMenuProps {
  closePopover?: () => void;
}

const PeptideMegaMenu: FC<MegaMenuProps> = ({ closePopover }) => {
  const appContext: any = useContext(ThemeContext);
  const [activeCat, setActiveCat] = useState("Peptides");

  const { data: products, isLoading } = useSWR<MegaMenuProductList>(
    `/api/products/megamenu`,
    fetcher
  );

  const peptidesCategory = appContext.state.peptidesCat;

  useEffect(() => {
    setActiveCat(peptidesCategory);
  }, [peptidesCategory]);

  return (
    <>
      <div className="relative bg-white md:top-0 md:pt-[24px] lg:top-0 lg:pt-[24px] xl:top-0 xl:w-[100vw] xl:pt-0">
        <div className="xl:container-padding-inline flex min-w-[100%] lg:mr-auto lg:min-w-[637px] lg:max-w-[637px] xl:mx-auto xl:max-w-[1264px]">
          <div className="categories bg-[#f0f0f0]-clear relative pr-[24px] pt-[32px] before:absolute before:left-[-400%] before:top-0 before:h-full before:min-w-[400%] before:content-[''] md:hidden lg:hidden xl:block dark:bg-transparent dark:before:bg-transparent">
            {/* {menuType === "Buy Peptides" ? ( */}
            <div className="font-16px-ALL flex min-w-[201px] max-w-[201px] flex-col gap-[24px]">
              <MegaMenuNavLink
                onHoverFn={() => setActiveCat("Peptides")}
                activeLink={activeCat}
                title="Peptides"
              />
              <MegaMenuNavLink
                onHoverFn={() => setActiveCat("Peptide Blends")}
                activeLink={activeCat}
                title="Peptide Blends"
              />
              <MegaMenuNavLink
                onHoverFn={() => setActiveCat("Cosmetic Peptides")}
                activeLink={activeCat}
                title="Cosmetic Peptides"
              />
              {/*  <MegaMenuNavLink
                onHoverFn={() => setActiveCat("Peptide Supplies")}
                activeLink={activeCat}
                title="Peptide Supplies"
              /> */}
            </div>
            {/* ) : null} */}
          </div>

          {/* content */}
          {isLoading ? (
            <MegaMenuPeptidesSkeleton />
          ) : (
            <div className="products">
              {activeCat === "Peptides" && (
                <MegaMenuContent
                  products={products?.peptides}
                  type="products"
                  closeSidebar={closePopover}
                  activeCategory={activeCat}
                />
              )}
              {activeCat === "Peptide Blends" && (
                <MegaMenuContent
                  products={products?.blends}
                  type="products"
                  closeSidebar={closePopover}
                  activeCategory={activeCat}
                />
              )}
              {activeCat === "Cosmetic Peptides" && (
                <MegaMenuContent
                  products={products?.cosmetics}
                  type="products"
                  closeSidebar={closePopover}
                  activeCategory={activeCat}
                />
              )}
              {activeCat === "Peptide Supplies" && (
                <MegaMenuContent
                  products={products?.supplies}
                  type="products"
                  closeSidebar={closePopover}
                  activeCategory={activeCat}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PeptideMegaMenu;
