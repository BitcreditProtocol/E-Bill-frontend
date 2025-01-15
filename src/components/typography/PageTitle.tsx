import { cn } from "@/lib/utils";

type PageTitleProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>;

export default function PageTitle({
  children,
  className,
  ...props
}: PageTitleProps) {
  return (
    <h1
      className={cn("text-text-300 text-base font-medium", className)}
      {...props}
    >
      {children}
    </h1>
  );
}
