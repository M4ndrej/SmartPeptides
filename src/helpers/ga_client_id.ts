/**
 * Get Client ID from Google Analytics cookie or return empty string
 * @returns string - Client ID from cookie or empty string
 */
export const getGAClientId = (): string => {
  if (typeof window !== "undefined") {
    // Get from _ga_X4SF95HL0F cookie (specific to our GA property)
    const cookies = document.cookie.split(";");
    const gaCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("_ga_X4SF95HL0F=")
    );

    if (gaCookie) {
      // Format: _ga_X4SF95HL0F=GS2.1.s1758177864$o2$g1$t1758178142$j60$l0$h0
      const cookieValue = gaCookie.split("=")[1];
      const parts = cookieValue?.split(".");

      if (parts && parts.length >= 3) {
        // Client ID is the third part (index 2)
        const clientId = parts[2];
        return clientId;
      }
    }
  }

  return "";
};
