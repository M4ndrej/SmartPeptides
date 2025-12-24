export function parseShippingMethodTitle(methodTitle = "") {
  const match = methodTitle.match(/^([^()]+)\s*\((.*)\)\s*$/);

  if (match) {
    const mainText = match[1]; // e.g. "UPS® Ground"
    const parenthetical = match[2]; // e.g. "3 working days"

    return (
      <>
        {mainText}
        <span className="hidden h-[1px] sm:block lg:block">
          <br />
        </span>
        ({parenthetical})
      </>
    );
  }
  // If it doesn't match the pattern, just return the whole string
  return <>{methodTitle}</>;
}

export function parseFreeShippingMethodTitle(methodTitle = "") {
  const match = methodTitle.match(/^([^[]+)\s*\[(.*)\]\s*$/);

  if (match) {
    const mainText = match[1]; // e.g. "UPS® Ground (4 days)"
    const bracketedText = match[2]; // e.g. "Free Shipping"

    return (
      <>
        {mainText}
        <span className="hidden h-[1px] sm:block md:block xl:block">
          <br />
        </span>
        [{bracketedText}]
      </>
    );
  }

  return <>{methodTitle}</>;
}
