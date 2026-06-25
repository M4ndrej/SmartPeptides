import { headers } from "next/headers";

export const dynamicShareLink = (link?: string) => {
  if (!link) return "";
  let url = new URL(link);

  const headerData = headers();
  const protocol = headerData.get("x-forwarded-proto");
  const hostname = headerData.get("x-forwarded-host");

  url.protocol = protocol ?? "https";
  url.host = hostname ?? "smartpeptides.bio/";
  return url.toString();
};
