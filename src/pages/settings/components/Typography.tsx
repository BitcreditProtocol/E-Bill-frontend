export function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-text-300 text-base font-medium leading-6">
      {children}
    </span>
  );
}

export function Description({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-text-200 text-sm font-normal leading-5">
      {children}
    </span>
  );
}
