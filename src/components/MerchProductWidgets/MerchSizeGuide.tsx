"use client";

import {
  menData,
  sizeTabs,
  womenLooseData,
  womenRegularData,
  womenSizeTabs,
} from "@/data/merch_size_chart_data";
import useScreenSize from "@/hooks/useScreenSize";
import useStandaloneModalAnimation from "@/hooks/useStandaloneModalAnimation";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useMemo, useState } from "react";
import CustomModal from "../CustomModal/CustomModal";
import InsideScroll from "../Scroll/InsideScroll";
import Tabs from "../Tabs/Tabs";
import MerchSizeTable from "./MerchSizeTable";

interface MerchSizeGuideProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const MerchSizeGuide: FC<MerchSizeGuideProps> = ({ isOpen, setIsOpen }) => {
  const { width } = useScreenSize();
  const isMobile = useMemo(() => width < 768, [width]);
  const { showModal, animationClass } = useStandaloneModalAnimation({
    isOpen,
    animationDuration: 250,
    enterAnimationClass: "animate-slide-in-down",
    exitAnimationClass: "animate-slide-out-up",
  });

  const handleClose = () => {
    setIsOpen(false);
  };

  const [activeTab, setActiveTab] = useState("men");
  const [activeWomenTab, setActiveWomenTab] = useState("loose");

  return (
    <CustomModal
      isOpen={showModal}
      onClose={handleClose}
      animationClass={animationClass}
      hideLogo={true}
      modalType="MerchSizeGuide"
    >
      <InsideScroll className="h-[900px] max-h-[calc(100vh-195px)] w-[1200px] max-w-[calc(100vw-20px)] sm:!w-[calc(100vw-20px)]">
        <div className="m-auto flex w-full items-center justify-between gap-10 p-8 sm:flex-col sm:gap-4 md:flex-col">
          <div className="flex shrink flex-col items-center justify-center gap-4">
            <div className="relative sm:max-w-[208px] md:max-w-[318px] xl:max-w-[549px]">
              <Image
                src="/images/size-guide.webp"
                alt="Size Guide"
                width={549}
                height={563}
                className="object-contain"
              />
            </div>
            {isMobile && (
              <Tabs
                tabs={sizeTabs}
                onChange={(val) => setActiveTab(val.id.toString())}
                activeTab={activeTab}
                className="sm:w-[300px]"
              />
            )}
          </div>
          <div className="hidden w-full sm:block"></div>
          <div className="w-full">
            {(!isMobile || activeTab === "men") && (
              <div className="mb-8 flex flex-col gap-8">
                <h2 className="font-D32px-M24px sm:text-center md:text-center">
                  <span className="font-bold">MEN’S</span> ROUND NECK{" "}
                  <span className="font-bold">SIZE</span> GUIDE
                </h2>
                <MerchSizeTable
                  tableData={menData}
                  sideText="Staple"
                  isMobile={isMobile}
                />
              </div>
            )}
            {(!isMobile || activeTab === "women") && (
              <div className="flex flex-col gap-8 sm:items-center">
                <h2 className="font-D32px-M24px sm:text-center md:text-center">
                  <span className="font-bold">WOMEN’S</span> ROUND NECK{" "}
                  <span className="font-bold">SIZE</span> GUIDE
                </h2>
                {isMobile && (
                  <Tabs
                    tabs={womenSizeTabs}
                    onChange={(val) => setActiveWomenTab(val.id.toString())}
                    activeTab={activeWomenTab}
                    className="sm:w-[300px]"
                  />
                )}
                {(!isMobile || activeWomenTab === "loose") && (
                  <MerchSizeTable
                    tableData={womenLooseData}
                    sideText="Loose"
                    isMobile={isMobile}
                  />
                )}
                {(!isMobile || activeWomenTab === "regular") && (
                  <MerchSizeTable
                    tableData={womenRegularData}
                    sideText="Regular"
                    isMobile={isMobile}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </InsideScroll>
    </CustomModal>
  );
};

export default MerchSizeGuide;
