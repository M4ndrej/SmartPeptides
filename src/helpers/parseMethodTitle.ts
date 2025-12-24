export const parseMethodTitle = (methodTitle: string) => {
  let shippingMethod = methodTitle.replace("working", "").trim();
  let freeShippingNote = "";

  if (shippingMethod.includes("[Free Shipping]")) {
    const parts = shippingMethod.split("[Free Shipping]");
    shippingMethod = parts[0].trim();
    freeShippingNote = "[Free Shipping]";
  }

  return { shippingMethod, freeShippingNote };
};
