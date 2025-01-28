import { cn } from "@/lib/utils";

export function Label({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "text-text-200 text-xs font-normal leading-[18px]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function Value({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("text-text-300 text-sm font-medium leading-5", className)}
      {...props}
    >
      {children}
    </span>
  );
}
