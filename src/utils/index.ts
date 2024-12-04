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

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
};
