export const parseFloatSafe = (str: string | undefined) => {
  if (str === undefined) return undefined;
  const parsed = parseFloat(str);
  return isNaN(parsed) || !isFinite(parsed) ? undefined : parsed;
};

export const parseIntSafe = (str: string | undefined) => {
  if (str === undefined) return undefined;
  const parsed = parseInt(str, 10);
  return isNaN(parsed) || !isFinite(parsed) ? undefined : parsed;
};
