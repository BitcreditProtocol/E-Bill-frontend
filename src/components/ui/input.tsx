import { forwardRef, useState, useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      required = false,
      id,
      icon,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!value);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (value !== undefined) {
        setHasValue(!!value);
      } else if (inputRef.current) {
        setHasValue(!!inputRef.current.value);
      }
    }, [value]);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      if (props.onBlur) props.onBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      if (onChange) onChange(e);
    };

    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center">
            {icon}
          </div>
        )}
        <input
          ref={(node) => {
            if (node) {
              (inputRef as React.MutableRefObject<HTMLInputElement>).current =
                node;
            }
            if (typeof ref === "function") ref(node);
            else if (ref && node)
              (ref as React.MutableRefObject<HTMLInputElement>).current = node;
          }}
          type={type}
          id={id}
          value={value}
          className={cn(
            "text-sm font-medium peer h-[58px] w-full rounded-lg border bg-elevation-200 transition-all duration-200 ease-in-out outline-none focus:outline-none",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-0",
            isFocused ? "border-[#1B0F004D]" : "border-divider-50",
            isFocused || hasValue ? "pt-6 pb-2" : "pt-5 pb-3",
            icon ? "pl-[42px]" : "pl-4",
            className
          )}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={handleBlur}
          onChange={handleChange}
          autoComplete="off"
          autoCorrect="off"
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            "absolute transition-all duration-200 ease-out flex items-center",
            "text-text-300 font-medium text-sm",
            isFocused || hasValue
              ? "top-2 text-xs text-text-200 font-normal leading-[18px]"
              : "top-1/2 -translate-y-1/2",
            icon ? "left-[43px]" : "left-4"
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
