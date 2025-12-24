export type UTMSource =
  | "facebook"
  | "instagram"
  | "twitter"
  | "google"
  | "tiktok"
  | "youtube";
export type UTMMedium = "us" | "global" | "test";

export const isUTMSource = (source: string | null): source is UTMSource => {
  if (!source) return false;
  return [
    "facebook",
    "instagram",
    "twitter",
    "google",
    "tiktok",
    "youtube",
  ].includes(source);
};

export const isUTMMedium = (medium: string | null): medium is UTMMedium => {
  if (!medium) return false;
  return ["us", "global", "test"].includes(medium);
};
