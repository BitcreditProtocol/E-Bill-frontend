export const copyToClipboard = (value: string) =>
  navigator.clipboard.writeText(value);

export const isPWA = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  "standalone" in window.navigator ||
  document.referrer.includes("android-app://");
