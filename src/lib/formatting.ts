export const formatPrice = (number: number): string => {
  if (isNaN(number)) {
    return "Invalid Number";
  }
  const formattedNumber = number.toFixed(0);
  const parts = formattedNumber.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const price = `${parts.join(".")} VND`;
  return price;
};
