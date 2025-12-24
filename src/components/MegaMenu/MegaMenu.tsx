import { FC } from "react";
import PeptideMegaMenu from "./PeptideMegaMenu";
import MerchMegaMenu from "./MerchMegaMenu";

interface MegaMenuProps {
  menuType: string;
  closePopover?: () => void;
  setIsMearchModalOpen?: (value: boolean) => void;
}

const MegaMenu: FC<MegaMenuProps> = ({
  menuType,
  closePopover,
  setIsMearchModalOpen,
}) => {
  if (menuType === "Merch") {
    return (
      <MerchMegaMenu
        closePopover={closePopover}
        setIsMearchModalOpen={setIsMearchModalOpen}
      />
    );
  }
  return <PeptideMegaMenu closePopover={closePopover} />;
};

export default MegaMenu;
