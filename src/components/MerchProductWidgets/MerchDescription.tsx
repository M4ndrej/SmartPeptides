"use client";

import { replaceLinks } from "@/helpers/replace_links_helper";
import DetailsAccordion from "../DetailsAccordion/DetailsAccordion";
import { FC } from "react";
import useIsClientRender from "@/hooks/useIsClientRender";

interface MerchDescriptionProps {
  description: string;
}

const MerchDescription: FC<MerchDescriptionProps> = ({ description }) => {
  const isClient = useIsClientRender();
  return (
    <DetailsAccordion title="Artwork">
      <div
        className="font-D16px-M15px"
        dangerouslySetInnerHTML={{
          __html: isClient ? replaceLinks(description) : "",
        }}
      />
    </DetailsAccordion>
  );
};

export default MerchDescription;
