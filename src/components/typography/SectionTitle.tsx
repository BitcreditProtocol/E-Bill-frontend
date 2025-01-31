import { cn } from "@/lib/utils";

type SectionTitleProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>;

export default function SectionTitle({
  children,
  className,
  ...props
}: SectionTitleProps) {
  return (
    <span
      className={cn(
        "text-text-300 text-base font-medium leading-normal",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
