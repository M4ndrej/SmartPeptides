export const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export const USDollarRounded = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

export const formatCurrency = (
  value: number,
  justRound: boolean = false,
  roundPrice: boolean = true,
  withUSD: boolean = true
) => {
  value = +(value / (justRound ? 1 : 100)).toFixed(2);

  let formattedValue: string;
  if (roundPrice) {
    // Truncate to 2 decimal places to avoid rounding
    const truncated = Math.floor(value * 100) / 100;
    formattedValue = USDollarRounded.format(truncated);
  } else {
    formattedValue = USDollar.format(value);
  }

  // Remove '.00' if it exists
  if (formattedValue.endsWith(".00")) {
    formattedValue = formattedValue.slice(0, -3);
  }

  // Append 'USD' at the end
  if (withUSD) {
    formattedValue += " USD";
  }

  return formattedValue;
};
