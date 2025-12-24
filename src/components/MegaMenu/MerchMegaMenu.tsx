import { FC } from "react";
import useSWR from "swr";
import { fetcher } from "@/helpers/fetchers";
import MegaMenuContent from "./MegaMenuContent";
import MegaMenuPeptidesSkeleton from "./MegaMenuPeptidesSkeleton";

interface MerchMegaMenuProps {
  closePopover?: () => void;
  setIsMearchModalOpen?: (value: boolean) => void;
}

const MerchMegaMenu: FC<MerchMegaMenuProps> = ({
  closePopover,
  setIsMearchModalOpen,
}) => {
  const { data: merchData, isLoading } = useSWR(
    `/api/products/all?category=merch`,
    fetcher
  );

  return (
    <>
      <div className="relative bg-white md:top-[24px] lg:top-[24px] xl:top-0 xl:w-[100vw]">
        <div className="xl:container-padding-inline flex min-w-[100%] lg:mr-auto lg:min-w-[637px] lg:max-w-[637px] xl:mx-auto xl:max-w-[1264px]">
          {/* content */}
          {isLoading ? (
            <MegaMenuPeptidesSkeleton />
          ) : (
            <div className="products">
              <MegaMenuContent
                products={merchData}
                type="products"
                closeSidebar={closePopover}
                activeCategory="Merch"
                setIsMearchModalOpen={setIsMearchModalOpen}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MerchMegaMenu;
