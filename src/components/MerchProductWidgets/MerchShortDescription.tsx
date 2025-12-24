"use client";

import useIsClientRender from "@/hooks/useIsClientRender";
import React, { FC } from "react";

interface MerchShortDescriptionProps {
  description: string;
}

const MerchShortDescription: FC<MerchShortDescriptionProps> = ({
  description,
}) => {
  const isClient = useIsClientRender();
  return (
    <div className="font-D13px-M11px italic">
      {`" `}
      <div
        className="inline [&>p]:inline"
        dangerouslySetInnerHTML={{
          __html: isClient ? description : "",
        }}
      />
      {` "`}
    </div>
  );
};

export default MerchShortDescription;
