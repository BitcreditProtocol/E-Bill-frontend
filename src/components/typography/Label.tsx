import { cn } from "@/lib/utils";

type LabelProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLLabelElement>;

export default function Label({ children, className, ...props }: LabelProps) {
  return (
    <label
      className={cn("text-text-300 text-sm font-medium leading-5", className)}
      {...props}
    >
      {children}
    </label>
  );
}
