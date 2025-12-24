import { ProfileContextProvider } from "@/components/Profile/ProfileContext";
import ProfilePictureBox from "@/components/Profile/ProfilePictureBox";
import ProfileTabs from "@/components/Profile/ProfileTabs";
import ProfileWelcomeMessage from "@/components/Profile/ProfileWelcomeMessage";
// import VicStatus from "@/components/Profile/VicStatus";
import WelcomeMessage from "@/components/Profile/WelcomeMessage";
import {
  fetchUserData,
  fetchUserOrders,
  // fetchUserVICData,
} from "@/server/services";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const userData = await fetchUserData();
  if (!userData) {
    return redirect("/sign-in");
  }

  const orderDataP = fetchUserOrders(1, 10);
  // const vicDataP = fetchUserVICData();
  const [orderData] = await Promise.all([orderDataP]);
  // const [orderData, vicData] = await Promise.all([orderDataP, vicDataP]);

  return (
    <ProfileContextProvider userData={userData.user} orderData={orderData}>
      <div className="container-margin-bottom-D96px-M64px mt-12 w-full">
        <div className="container-padding-inline m-auto w-full max-w-[1264px]">
          {/* Top Welcome Message */}
          <ProfileWelcomeMessage username={userData.user.displayname} />
          <div className="flex w-full flex-col justify-between gap-8 xl:flex-row">
            {/* Left */}
            <div className="flex w-full shrink-0 flex-col xl:w-[272px]">
              <div className="flex w-full flex-col gap-4 from834:flex-row xl:gap-0">
                <ProfilePictureBox className="w-full from834:!basis-1/3 xl:!basis-full" />
                {/* <VicStatus vicData={vicData} className="basis-2/3 xl:!hidden" /> */}
              </div>
              <ProfileTabs className="mt-4" />
            </div>
            {/* Right */}
            <div className="w-full xl:max-w-[898px]">
              <div className="mb-8 flex flex-col gap-8">
                <WelcomeMessage />
                {/* <VicStatus vicData={vicData} className="!hidden xl:!flex" /> */}
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </ProfileContextProvider>
  );
}
