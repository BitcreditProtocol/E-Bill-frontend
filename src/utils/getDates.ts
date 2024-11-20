export const getDates = (dateRange: number) => {
  const today = new Date();
  const futureDate = new Date();

  // Ensure dateRange is a number
  const numericDateRange = Number(dateRange);

  // Add the range in days
  futureDate.setDate(today.getDate() + numericDateRange);

  const formatDate = (date: Date) =>
    `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;

  const formattedToday = formatDate(today);
  const formattedFutureDate = formatDate(futureDate);

  return { formattedToday, formattedFutureDate };
};
