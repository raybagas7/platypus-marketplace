export const formatIDR = (balance: string | number) => {
  const format = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  if (typeof balance === "string") {
    const parsedBalance = parseInt(balance);
    const formatted = format.format(parsedBalance);
    return formatted;
  }

  return format.format(balance);
};
