
export const formatDate = (date: Date, locale: string): string => {
  const year = new Intl.DateTimeFormat(locale, { year: "2-digit" }).format(date);
  const month = new Intl.DateTimeFormat(locale, { month: "short" }).format(date);
  const day = new Intl.DateTimeFormat(locale, { day: "2-digit" }).format(date);
  return `${day}-${month}-${year}`;
};
