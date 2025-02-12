export const matchesSearchTerm = (it: Record<string, unknown>, search_term: string | undefined) => {
  return !search_term ? true : Object.entries(it).some(([, value]) => {
    if (value !== null && typeof value === "object") {
      return Object.values(value).some(
        (innerValue) =>
          typeof innerValue === "string" &&
          innerValue.toLowerCase().includes(search_term.toLowerCase())
      );
    }
    return (
      typeof value === "string" &&
      value.toLowerCase().includes(search_term.toLowerCase())
    );
  });
};
