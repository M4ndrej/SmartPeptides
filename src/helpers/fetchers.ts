export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const hfetch = (
  url: string | URL,
  requestInit?: RequestInit,
  dontAddKeys?: boolean
) => {
  const myHeaders = new Headers(requestInit?.headers);
  myHeaders?.append(
    "Authorization",
    `Basic ${btoa(`${process.env.DEV_USERNAME}:${process.env.DEV_PASS}`)}`
  );

  myHeaders?.append(
    "Referer",
    process.env.API_REFERER ?? "https://smartpeptides.com/"
  );

  let requestInitFetcher = requestInit;
  if (requestInitFetcher) {
    requestInitFetcher.headers = myHeaders;
  } else {
    requestInitFetcher = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
  }

  const newUrl = new URL(url);
  newUrl.searchParams.append("api_key", process.env.API_KEY!);

  if (!dontAddKeys) {
    newUrl.searchParams.append("consumer_key", process.env.CONSUMER_KEY!);
    newUrl.searchParams.append("consumer_secret", process.env.CONSUMER_SECRET!);
  }

  return fetch(newUrl, requestInitFetcher);
};
