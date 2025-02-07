export const truncateString = (str: string, maxLength: number): string =>
  str.length <= maxLength
    ? str
    : str.slice(0, Math.floor((maxLength - 3) / 2)) +
      "…" +
      str.slice(-Math.floor((maxLength - 3) / 2));

export const truncateAvatarName = (name: string): string => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
};
