export const validateRedirectUrl = (target: string, baseUrl: string): void => {
  const allowedHostname = new URL(baseUrl).hostname;
  const targetHostname = new URL(target).hostname;

  if (targetHostname !== allowedHostname) {
    throw new Error("Invalid redirect URL");
  }
};
