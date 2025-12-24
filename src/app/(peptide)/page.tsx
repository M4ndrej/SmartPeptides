// import Image from "next/image";
//import AboutUs from "@/components/AboutUs/AboutUs";
import OurServices from "@/components/HomeComponents/OurServices/OurServices";
import HomeSlider from "@/components/HomeSlider/HomeSlider";
import OurProductsServerSide from "@/components/OurProducts/OurProductsServerSide";
//import Shipping from "@/components/Shipping/Shipping";
//import Slider from "@/components/Slider/Slider";
import { Metadata } from "next";
import { HomeLdJson } from "../ldjsons/home/json";
//import BestsellerServer from "@/components/ProductSlider/BestsellerServer";

export const metadata: Metadata = {
  title: {
    default: "Reseach Peptides For Sale",
    template: "",
  },
};

export default async function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HomeLdJson) }}
      />

      <div className="relative overflow-x-hidden bg-gradient-to-r sm:h-auto md:h-auto">
        <div className="m-auto w-full sm:max-w-none md:max-w-none">
          <HomeSlider />
        </div>
      </div>
      <div className="relative">
        <div>
          <div className="container-padding-inline mx-auto sm:py-[32px]">
            <div className="m-auto grid max-w-[1200px] gap-[16px] py-[32px] sm:grid-cols-1 sm:flex-col sm:p-0 sm:px-0 md:grid-cols-3 lg:grid-cols-3  xl:py-[24px]	">
              <OurServices />
            </div>
          </div>
          {/* <div className="container-margin-top-D96px-M64px items-center">
            <BestsellerServer />
          </div> */}
          {/* <div className="container-margin-top-D96px-M64px container-padding-inline mx-auto max-w-[1264px]">
            <Shipping />
          </div> */}
          <div className="container-margin-top-D96px-M64px relative mx-auto max-w-[1264px] px-0 xl:px-[32px]">
            <OurProductsServerSide />
          </div>
          {/* <div className="container-padding-inline container-margin-top-D96px-M64px mx-auto max-w-[1264px]">
            <FeaturedProducts cartView={false} />
          </div> */}
          <div className="container-padding-inline container-margin-bottom-D96px-M64px container-margin-top-D96px-M64px mx-auto max-w-[1264px]">
            {/* <AboutUs /> */}
            {/* <Instagram /> */}
          </div>
        </div>
      </div>
    </>
  );
}
