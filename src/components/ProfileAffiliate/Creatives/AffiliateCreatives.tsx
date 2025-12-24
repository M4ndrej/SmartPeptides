"use client";

import { FC, useState } from "react";
import { AffiliateCreative, Sort } from "@/types/affiliates";
import CreativesTable from "./CreativesTable";

interface AffiliateCreativesProps {
  creatives?: AffiliateCreative[];
}

const AffiliateCreatives: FC<AffiliateCreativesProps> = ({ creatives }) => {
  const [sort, setSort] = useState<Sort>();

  return (
    <div className="m-[auto] w-[100%] max-w-[1264px] sm:max-w-[100vw] md:max-w-[100vw]">
      {/* <ReferralUrlForm /> */}
      <CreativesTable
        creatives={creatives}
        isLoading={false}
        sort={sort}
        setSort={setSort}
      />
    </div>
  );
};

export default AffiliateCreatives;
