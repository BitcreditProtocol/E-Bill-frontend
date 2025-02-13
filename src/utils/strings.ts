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

export const formatAddress = (props: {
  address: string | null,
  zip: string | null,
  city: string | null,
  country: string | null,
}, delimiter = ', ') : string => {
  return [props.address, props.zip, props.city, props.country]
  .filter((it) => !!it)
  .join(delimiter);
}
