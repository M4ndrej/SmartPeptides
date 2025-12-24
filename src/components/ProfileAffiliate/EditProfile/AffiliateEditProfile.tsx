"use client";

import { FC, useMemo, useState } from "react";
import AffiliateForm from "../Widgets/AffiliateForm";
import { Height } from "react-animate-height";
import { AffiliateFormData } from "@/types/affiliates";
import { useAffiliateContext } from "../AffiliateContext";
import { useRouter } from "next/navigation";
import { prepopulateAffiliateForm } from "@/helpers/affiliate_helpers";

const AffiliateEditProfile: FC = () => {
  const { affiliateInfo } = useAffiliateContext();
  const router = useRouter();

  const [conHeight, setConHeight] = useState<Height>(492);

  const affiliateData: AffiliateFormData | undefined = useMemo(
    () => prepopulateAffiliateForm(affiliateInfo?.affiliate),
    [affiliateInfo]
  );

  return (
    <div className="m-[auto] w-[100%] max-w-[1264px] sm:max-w-[100vw] md:max-w-[100vw]">
      <AffiliateForm
        initialData={affiliateData}
        containerHeight={conHeight}
        setContainerHeight={setConHeight}
        onSuccess={() => {
          router.push("/profile/affiliate");
          router.refresh();
        }}
      />
    </div>
  );
};

export default AffiliateEditProfile;
