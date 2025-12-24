"use client";

import { fetcher } from "@/helpers/fetchers";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import useSWR from "swr";
import Logo from "../Logo/Logo";
import NavigationUsefulLinks from "../Navigation/NavigationUsefulLinks";
import Subscribe from "../Subscribe/Subscribe";
import MailIcon from "../Icons/MailIcon";
import FooterDisclaimer from "./FooterDisclaimer";
import FooterNavigation from "./FooterNavigation/FooterNavigation";
import FooterServiceSection from "./FooterServiceSection";

const NewFooter: FC = () => {
  const { data: userData } = useSWR("/api/user/", fetcher);
  const { user } = userData || { user: {} };

  const year = new Date().getFullYear();

  return (
    <div className="relative w-[100%]">
      <div className="absolute left-[50%] top-0 w-full max-w-[988px] translate-x-[-50%] sm:w-[100%] sm:px-[10px] md:w-full md:px-[16px] lg:px-[0px] xl:px-[32px]">
        <Subscribe />
      </div>
      <div className="h-[114px] w-[100%] bg-transparent"></div>
      <div className="w-[100%] bg-lightgray pb-[16px] ">
        <div className="container-padding-inline lg: mx-auto flex max-w-[1264px] flex-col justify-between gap-[40px] pb-[40px] pt-[157px] sm:pb-[40px] sm:pt-[180px]">
          <div className="w-full">
            <div className="flex w-full justify-between sm:flex-col md:flex-col md:gap-[40px]">
              <div className="w-full md:col-span-2 lg:max-w-[319px] xl:max-w-[460px]">
                <div className="select-none">
                  <Logo width={228} height={29} />
                </div>
                <div className="font-D16px-M13px sm min-w-fit max-w-[319px] pt-[16px] sm:max-w-[100%] md:max-w-[100%]">
                  Welcome to Value Peptide. We offer premium-quality peptides
                  and peptide blends that undergo strict quality control, and we
                  also provide custom peptide solutions available for online
                  purchase.
                </div>
                <div className="pt-[16px] sm:pb-[40px] sm:pt-[16px]">
                  <div className="md:flex md:max-w-[677px] md:justify-between">
                    <div>
                      {/* <div className="flex items-center pb-[16px]">
                        <Image
                          src="/images/building.svg"
                          width={32}
                          height={32}
                          alt="Building"
                          className="mr-[16px] select-none sm:mr-[8px] sm:h-[24px] sm:w-[24px]"
                        />
                        <div className="font-D16px-M13px">
                          VALUE PEPTIDE, INC.
                        </div>
                      </div> */}
                      {/*  <div className="flex items-center pb-[16px]">
                        <Image
                          src="/images/addresse.svg"
                          width={32}
                          height={32}
                          alt="Mail"
                          className="mr-[16px] select-none sm:mr-[8px] sm:h-[24px] sm:w-[24px]"
                        />
                        <div className="font-D16px-M13px">
                          Bolingbrook, IL 60440, US
                        </div>
                      </div> */}
                      <div className="hidden items-center md:flex lg:pb-[16px]">
                        <MailIcon
                          width={32}
                          height={32}
                          className="mr-[16px] select-none sm:mr-[8px] sm:h-[24px] sm:w-[24px]"
                        />
                        <Link
                          href="mailto:support@valuepeptide.com"
                          className="font-D16px-M13px transition duration-300 hover:text-[#E7461E]"
                        >
                          support@valuepeptide.com
                        </Link>
                      </div>
                    </div>
                    <div className="md:min-w-[309px]">
                      <div className="flex items-center pb-[16px] sm:pb-0 md:hidden xl:pb-0">
                        <MailIcon
                          width={32}
                          height={32}
                          className="mr-[16px] select-none sm:mr-[8px] sm:h-[24px] sm:w-[24px]"
                        />
                        <Link
                          href="mailto:support@valuepeptide.com"
                          className="font-D16px-M13px transition duration-300 hover:text-[#E7461E]"
                        >
                          support@valuepeptide.com
                        </Link>
                      </div>
                      {/* Working hours */}
                      <div className="w-full pt-[40px] sm:hidden md:hidden lg:block lg:max-w-[340px] xl:max-w-[460px]">
                        <div className="font-18px-ALL pb-[16px] font-bold sm:pb-[16px]">
                          Working hours
                        </div>
                        <div className="font-D16px-M13px flex flex-col gap-y-[8px] sm:w-full lg:max-w-[341px] xl:max-w-[460px]">
                          <div className="flex justify-between">
                            <div>Monday – Friday</div>
                            <div>9 am – 9 pm (CST)</div>
                          </div>
                          <div className="flex justify-between ">
                            <div>Saturday – Sunday</div>
                            <div>Closed</div>
                          </div>
                        </div>
                      </div>
                      {/*                       <div className="flex items-center">
                        <Image
                          src="/images/phone.svg"
                          width={32}
                          height={32}
                          alt="Phone"
                          className="mr-[16px] select-none sm:mr-[8px] sm:h-[24px] sm:w-[24px]"
                        />
                        <a
                          href="tel:+18662027786"
                          className="font-D16px-M13px transition duration-300 hover:text-[#E7461E]"
                        >
                          +1 (866) 202-7786
                        </a>
                      </div>
                      <div className="flex items-center pt-[16px] ">
                        <Image
                          src="/images/whatsapp.svg"
                          width={32}
                          height={32}
                          alt="Mail"
                          className="mr-[16px] select-none sm:mr-[8px] sm:h-[24px] sm:w-[24px]"
                        />
                        <a
                          href="https://wa.me/18662027786"
                          target="_blank"
                          className="font-D16px-M13px transition duration-300 hover:text-[#E7461E]"
                        >
                          +1 (866) 202-7786 - WhatsApp
                        </a>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full justify-between sm:flex-col lg:max-w-[482px] lg:justify-between xl:max-w-[516px] xl:justify-between">
                <div className="sm:pb-[40px]">
                  <FooterNavigation />
                </div>

                <div className="flex flex-col gap-[8px] sm:pb-[40px]">
                  <NavigationUsefulLinks username={user?.username} inFooter />
                </div>
                <div className="lg:hidden">
                  <FooterServiceSection />
                </div>
              </div>
            </div>
          </div>
          <div className="sm:hidden md:hidden">
            <FooterServiceSection />
          </div>
          <div className="w-full">
            <FooterDisclaimer />
          </div>
        </div>
        <div className="m-[auto] h-[1px] w-full max-w-[1200px] bg-gray2 px-[32px] opacity-[0.2] sm:w-[calc(100%+20px)] sm:translate-x-[-10px] md:w-full "></div>
        <div className="font-13px-ALL sm:font-12px-ALL flex items-center justify-center pt-[16px] text-gray2">
          © {year} VALUE PEPTIDE – All Right reserved!
        </div>
      </div>
    </div>
  );
};

export default NewFooter;
