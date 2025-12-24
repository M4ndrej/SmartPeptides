"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "../Button/Button";
import Link from "next/link";
import AffiliateModal from "../ProfileAffiliate/AffiliateModal";

type PiggyBannerProps = {
  isLogged: boolean;
};

const AffiliatePiggyBanner = ({ isLogged }: PiggyBannerProps) => {
  const [isEnrolledModalOpened, setIsEnrolledModalOpened] = useState(false);

  const openEnrollModal = async () => setIsEnrolledModalOpened(true);

  return (
    <>
      <AffiliateModal
        isOpen={isEnrolledModalOpened}
        setIsOpen={setIsEnrolledModalOpened}
        redirect={false}
      />
      <div className="relative flex h-[304px] items-center justify-between overflow-hidden bg-lightgray sm:h-[427px] sm:flex-col">
        <div className="flex min-w-[330px] max-w-[740px] flex-col items-start p-10 sm:px-4 sm:pb-4">
          {!isLogged ? (
            <>
              <p className="mb-8">
                Login or register your affiliate and enroll to earn from 10% up
                to 20% extra in store credit. We offer you the best affiliate
                tiers at the market so click on the button below and start
                earning.
              </p>

              <div className="flex items-center justify-start gap-5 sm:w-full sm:max-w-full sm:justify-between sm:gap-[10px]">
                <Link href="/sign-in" className="sm:w-full">
                  <Button
                    text="LOGIN NOW"
                    highlighted={true}
                    customClass="sm:h-[38px] w-full sm:px-[16px]"
                  />
                </Link>
                <Link href="/sign-in" className="sm:w-full">
                  <Button
                    text="REGISTER NOW"
                    customClass="sm:h-[38px] w-full sm:px-[16px]"
                  />
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="mb-8">
                You are successfully logged in. Please enroll so you can start
                earning from 10% up to 20% extra in store credit for your
                affiliate.
              </p>

              <Button
                text="ENROLL"
                highlighted={true}
                customClass="sm:h-[38px] w-full sm:px-[16px] sm:w-full"
                onPress={openEnrollModal}
              />
            </>
          )}
        </div>
        <div className="relative z-[1] h-[304px] w-[340px] shrink-0 sm:w-[300px] md:w-[260px] lg:w-[400px] xl:w-[400px]">
          <Image
            src="/images/pig.png"
            width={296}
            height={272}
            alt="Piggy Bank"
            className="sm:right-[calc(50% + 90px)] absolute right-[40px] top-[15px] h-[272px] w-[296px] sm:h-[166px] sm:w-[180px] md:right-[16px] md:top-[30px] md:h-[243px] md:w-[264px]"
          />
        </div>
        <Image
          src={"/images/banner_background.svg"}
          width={230}
          height={480}
          alt={"Banner Molecule"}
          className={`absolute bottom-0 right-0 top-0 z-0 h-full w-auto`}
        />
      </div>
    </>
  );
};

export default AffiliatePiggyBanner;
