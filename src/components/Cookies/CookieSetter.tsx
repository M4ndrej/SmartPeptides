"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import useSWR from "swr";
import { fetcher } from "@/helpers/fetchers";
import { isUTMMedium, isUTMSource } from "@/types/utm_campaigns";
import { getGAClientId } from "@/helpers/ga_client_id";

const getValidWpamId = (id: string | null) => {
  if (!id) return null;
  const parsedId = parseInt(id, 10);
  if (Number.isNaN(parsedId)) return null;
  return parsedId;
};

const CookieSetter = () => {
  const searchParams = useSearchParams();

  const wpamId = searchParams.get("wpam_id");
  const validId = getValidWpamId(wpamId);
  useSWR(validId ? `/api/auth?wpamId=${validId}` : null, fetcher);

  const utmSource = searchParams.get("utm_source");
  const utmMedium = searchParams.get("utm_medium");
  const utmCampaign = searchParams.get("utm_campaign");
  const zoneId = searchParams.get("zone_id");
  const visitorId = searchParams.get("visitor_id");

  useEffect(() => {
    if (isUTMSource(utmSource) && isUTMMedium(utmMedium)) {
      const utmInfo = `${utmSource}|${utmMedium}|${utmCampaign || ""}`;
      Cookies.set("utm_info", utmInfo, { expires: 30 });
    }
  }, [utmSource, utmMedium, utmCampaign]);

  useEffect(() => {
    const clientId = getGAClientId();
    if (clientId && utmSource && utmMedium && utmCampaign) {
      const ga4Data = {
        client_id: clientId,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        zone_id: zoneId || null,
      };

      Cookies.set("ga4_data", JSON.stringify(ga4Data), { expires: 1 });
    }
  }, [utmSource, utmMedium, utmCampaign, zoneId]);

  useEffect(() => {
    if (visitorId && utmSource && utmMedium && utmCampaign) {
      const propellerData = {
        visitor_id: visitorId,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
      };

      Cookies.set("propeller_data", JSON.stringify(propellerData), {
        expires: 1,
      });
    }
  }, [utmSource, utmMedium, utmCampaign, visitorId]);

  return null;
};

export default CookieSetter;
