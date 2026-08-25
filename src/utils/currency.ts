export const formatCurrency = (
  amount: number,
  currency = "BDT"
) => {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
};