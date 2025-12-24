export const replaceLinks = (text: string) => {
  let newText = text;
  if (!newText) return "";

  newText = newText.replaceAll(
    `${process.env.NEXT_PUBLIC_APP_MAIN}`,
    "https://peptide.shop"
  );
  newText = newText.replaceAll(
    "https://peptide.shop/wp-content/uploads",
    `${process.env.NEXT_PUBLIC_CDN_MAIN}/wp-content/uploads`
  );
  return newText;
};
