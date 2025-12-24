export const getCookieByName = (name: string) => {
  if (typeof document !== "undefined") {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts && parts.length === 2) {
      let cookie = parts!.pop()!.split(";").shift();
      if (cookie) {
        let decodedCookies = decodeURIComponent(cookie!);
        if (decodedCookies) return JSON.parse(decodedCookies);
        else return [];
      } else return [];
    } else return [];
  } else return [];
};
