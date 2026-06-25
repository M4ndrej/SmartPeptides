import Link from "next/link";
import LightBulbIcon from "../Icons/LightBulbIcon";
import RocketIcon from "../Icons/RocketIcon";
import StarIcon from "../Icons/StarIcon";
import AffiliatePiggyBanner from "./AffiliatePiggyBanner";
import { fetchUserData } from "@/server/services";
import AffiliateSmallCard from "./AffiliateSmallCard";

export default async function Affiliate() {
  const userData = await fetchUserData();
  const isLogged = !!userData?.user;

  return (
    <>
      <div className="container-padding-inline m-[auto] mt-[48px] w-[100%] max-w-[1264px] sm:max-w-[100vw] md:max-w-[100vw]">
        <h1 className="font-D32px-M24px pb-[16px] text-center font-bold">
          Welcome to our Affiliate family!
        </h1>
        <div className="mx-auto mb-[50px] h-[2px] w-[48px] bg-[#9A9A9F]"></div>

        <div className="container-margin-bottom-D96px-M64px">
          {(userData?.user?.has_affiliate === false || !isLogged) && (
            <AffiliatePiggyBanner isLogged={isLogged} />
          )}

          <div className="font-D20px-M18px mb-2 mt-[40px] text-darkgray">
            About affiliate
          </div>

          <div className="font-D16px-M13px mb-4">
            Our affiliate family boasts 5,000 members, all loyal customers and
            users of our peptides.
            <br />
            Yes, our family is big. <br />
            The reason for this is our premium peptides, as well as the
            incentives and rewards we provide to all members of our extensive
            affiliate family.
          </div>

          <div className="font-D16-M13px mb-4 font-bold">
            Your commission will be 10% at the start of each month by default,
            which is the basic plan, but you can earn a bonus for each month if
            you have more referrals.
          </div>

          <ul className="mb-6 flex list-none flex-col gap-4">
            <AffiliateSmallCard
              icon={<LightBulbIcon width={40} height={40} />}
              title="BASIC"
              color="#8EC5F2"
              description="10% commission for less than 30 sales per month"
            />
            <AffiliateSmallCard
              icon={<RocketIcon width={40} height={40} />}
              title="PRO"
              color="#9A9A9F"
              description="15% commission for 30 or more sales (5% extra bonus)"
            />
            <AffiliateSmallCard
              icon={<StarIcon width={40} height={40} />}
              title="MASTER PRO"
              color="#257FCA"
              description="20% commission for 60 or more sales (10% extra bonus)"
            />
          </ul>

          <div className="font-D16px-M13px mb-6">
            <p className="mb-2">
              Bonuses are calculated at the end of each calendar month. You will
              be switched to a higher plan.
            </p>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center justify-start gap-[10px]">
                <div className="h-2 w-2 rounded-full bg-[#9A9A9F]" />
                You can only cash out previous months.
              </li>
              <li className="flex items-center justify-start gap-[10px]">
                <div className="h-2 w-2 rounded-full bg-[#9A9A9F]" />
                You gain referrals for life, commission is earned from every
                purchase they make.
              </li>
            </ul>
          </div>

          {/* <div className="font-D16px-M13px mb-10">
            <p className="mb-4">
              Smart Peptides Affiliate family offers the following benefits:
            </p>
            <ul className="mb-10 ml-4 flex flex-col gap-4">
              <li>
                <div className="flex-start mb-2 flex items-start gap-2">
                  <div className="mt-3 h-[2px] w-[10px] shrink-0 rounded-full bg-[#9A9A9F]" />
                  <p className="font-bold">
                    You can get 20% extra in store credit
                  </p>
                </div>
                <div className="flex-start ml-8 flex items-start gap-2">
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#9A9A9F]" />
                  <p>
                    For example, if you made $500 USD, you can receive 20% of
                    that sum, totaling $600 USD.
                  </p>
                </div>
              </li>
              <li>
                <div className="flex-start mb-2 flex items-start gap-2">
                  <div className="mt-3 h-[2px] w-[10px] shrink-0 rounded-full bg-[#9A9A9F]" />
                  <p className="font-bold">
                    Affiliates are able to redeem DOUBLE their earnings for
                    store credit. Or split payouts for partial credit can be
                    redeemed
                  </p>
                </div>
                <div className="flex-start ml-8 flex items-start gap-2">
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#9A9A9F]" />
                  <p>
                    For instance, if you accrued $500 USD, you can exchange this
                    for a $600 USD store credit. The total value would then be
                    $600 USD. Requests for payouts can be made after the
                    completion of a full month period.
                  </p>
                </div>
              </li>
            </ul>
          </div> */}

          {!isLogged && (
            <>
              <div className="mb-4">
                This is the affiliates section of this store. If you are an
                existing affiliate, please{" "}
                <Link
                  className="inline-block cursor-pointer text-darkgray underline decoration-blue"
                  href="/sign-in"
                >
                  log in
                </Link>{" "}
                to access your control panel.
              </div>
              <div className="mb-4">
                If you are not an affiliate, but wish to become one, you will
                need to apply. To apply, you must be a registered user. If you
                have an existing account, please{" "}
                <Link
                  className="inline-block cursor-pointer text-darkgray underline decoration-blue"
                  href="/sign-in"
                >
                  log in
                </Link>
                . If not, please{" "}
                <Link
                  className="inline-block cursor-pointer text-darkgray underline decoration-blue"
                  href="/sign-in"
                >
                  register
                </Link>
                .
              </div>
            </>
          )}
        </div>
      </div>
      {/* <AffiliateWelcomeModal /> */}
    </>
  );
}
