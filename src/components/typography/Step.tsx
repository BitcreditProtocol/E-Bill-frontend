import { cn } from "@/lib/utils";

export function Title({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn("text-text-300 text-2xl font-medium leading-8", className)}
      {...props}
    >
      {children}
    </h1>
  );
}

export function Description({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("text-text-200 text-base font-normal leading-6", className)}
      {...props}
    >
      {children}
    </span>
  );
}
