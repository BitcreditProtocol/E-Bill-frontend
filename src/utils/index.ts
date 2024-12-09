export const copyToClipboard = (value: string) =>
  navigator.clipboard.writeText(value);

export const isPWA = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  "standalone" in window.navigator ||
  document.referrer.includes("android-app://");

export const detectBrowserLanguage = () => {
  return navigator.language;
};

export const formatFileSize = (size: number) => {
  if (size < 1024) return `${String(size)} B`;

  if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;

  return `${(size / 1048576).toFixed(2)} MB`;
};

export const truncateFileName = (name: string) => {
  const maxNameLength = 20;
  const extensionIndex = name.lastIndexOf(".");

  if (extensionIndex === -1)
    return name.length > maxNameLength
      ? `${name.slice(0, 5)}...${name.slice(-3)}`
      : name;

  const extension = name.slice(extensionIndex);
  const baseName = name.slice(0, extensionIndex);

  return baseName.length > maxNameLength
    ? `${baseName.slice(0, 5)}...${baseName.slice(-3)}${extension}`
    : name;
};

const formatDMY = (date: Date, locale: string): string => {
  const year = new Intl.DateTimeFormat(locale, { year: "2-digit" }).format(date);
  const month = new Intl.DateTimeFormat(locale, { month: "short" }).format(date);
  const day = new Intl.DateTimeFormat(locale, { day: "2-digit" }).format(date);
  return `${day}-${month}-${year}`;
};

export const formatDate = (date: Date, locale: string): string => {
  return formatDMY(date, locale);
};
