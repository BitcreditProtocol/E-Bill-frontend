import { differenceInCalendarDays } from "date-fns";

export const daysBetween = (startDate: Date, endDate: Date): number => {
  return differenceInCalendarDays(endDate, startDate);
};

export const formatDate = (date: Date, locale: string): string => {
  const year = new Intl.DateTimeFormat(locale, { year: "2-digit" }).format(
    date
  );
  const month = new Intl.DateTimeFormat(locale, { month: "short" }).format(
    date
  );
  const day = new Intl.DateTimeFormat(locale, { day: "2-digit" }).format(date);
  return `${day}-${month}-${year}`;
};

export const formatDateShort = (date: Date, locale: string) => {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

export const formatDateLong = (date: Date, locale: string) => {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const formatMonthLong = (date: Date, locale: string) => {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
  }).format(date);
};

export const formatMonthYear = (date: Date, locale: string) => {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(date);
};

export const formatYearNumeric = (date: Date, locale: string) => {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
  }).format(date);
};
