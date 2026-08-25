export const formatNumber = (
  value: number,
  maximumFractionDigits = 2
) => {
  return new Intl.NumberFormat("en-BD", {
    maximumFractionDigits,
  }).format(value);
};