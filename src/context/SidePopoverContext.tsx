"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useThemeContext } from "@/context/theme-provider";
import SidePopover from "@/components/SidePopover/SidePopover";

interface SidePopoverContextProps {
  isPopoverOpen?: boolean;
  handlePopoverAction: (open: boolean, type: string) => void;
}

export const SidePopoverContext = createContext<SidePopoverContextProps>({
  isPopoverOpen: false,
  handlePopoverAction: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

export const SidePopoverContextProvider = ({ children }: ProviderProps) => {
  const appContext = useThemeContext();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [popoverType, setPopoverType] = useState("");

  const handlePopoverAction = (open: boolean, type: string) => {
    setIsPopoverOpen(open);
    setPopoverType(type);
    document.body.classList.add("popover-open");
  };

  useEffect(() => {
    if (appContext?.state?.itemOpenedInWishlist === true) {
      setTimeout(() => {
        handlePopoverAction(true, "quickview");
      }, 500);
    }
  }, [appContext.state.showWishlistModal]);

  useEffect(() => {
    if (appContext?.state?.showCartModal) {
      setTimeout(() => {
        handlePopoverAction(true, "cart");
      }, 500);
    }
  }, [appContext.state.showCartModal]);

  return (
    <SidePopoverContext.Provider
      value={{
        isPopoverOpen,
        handlePopoverAction,
      }}
    >
      {children}
      <SidePopover
        popoverOpened={isPopoverOpen}
        handlePopoverAction={handlePopoverAction}
        type={popoverType}
        fromTop={popoverType === "search"}
        fromLeft={popoverType === "navigation"}
        activeProduct={
          popoverType === "quickview" ? appContext.state.quicklistItem : null
        }
        onClose={() => setIsPopoverOpen(false)}
      />
    </SidePopoverContext.Provider>
  );
};

export const useSidePopoverContext = () => useContext(SidePopoverContext);
