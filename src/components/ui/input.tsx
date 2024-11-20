import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, required = false, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
    };

    return (
      <div className="relative">
        <input
          type={type}
          id={id}
          className={cn(
            "peer flex h-[58px] w-full rounded-[8px] border bg-elevation-200 px-4 text-sm transition-all duration-200 ease-in-out outline-none focus:outline-none",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-0",
            isFocused ? "border-[#1B0F004D]" : "border-[#1B0F0014]",
            isFocused || hasValue ? "pt-6 pb-2" : "pt-5 pb-3",
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            "absolute left-4 transition-all duration-200 ease-out flex items-center",
            "text-text-300 font-medium text-sm",
            isFocused || hasValue
              ? "top-2 text-[12px] text-[#1B0F0080]"
              : "top-1/2 -translate-y-1/2"
          )}
        >
          {label}
          {required && (
            <span
              className={cn(
                "text-[12px]",
                isFocused || hasValue ? "text-[#1B0F0080]" : "text-[#8D0002]"
              )}
            >
              *
            </span>
          )}
        </label>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
