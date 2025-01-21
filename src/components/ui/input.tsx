import { useState, forwardRef } from "react";
import { cva } from "class-variance-authority";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  icon?: React.ReactNode;
  clearable?: boolean;
  hint?: string;
  inputSize?: "sm" | "md" | "lg";
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
}

const inputVariants = cva(
  "flex items-center gap-2 rounded-[8px] border transition-all duration-200 ease-in-out",
  {
    variants: {
      size: {
        sm: "h-[44px] text-xs py-3",
        md: "h-[52px] text-sm py-4",
        lg: "h-[60px] text-sm py-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      value,
      type,
      label,
      required,
      id,
      icon,
      clearable,
      hint,
      inputSize,
      disabled,
      success,
      error,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!value);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
    };

    const clearField = () => {
      if (ref && typeof ref === "object" && ref.current) {
        ref.current.value = "";
        setHasValue(false);
      }
    };

    return (
      <div>
        <div className="relative">
          <div
            className={cn(
              inputVariants({ size: inputSize }),
              "border-divider-50 bg-elevation-200 hover:border-divider-50 hover:bg-elevation-250 focus-within:border-divider-300 focus-within:bg-elevation-200",
              {
                "border-none text-[#F1EDE4] bg-divider-100 cursor-not-allowed":
                  disabled,
                "border-green-500 bg-elevation-200": success,
                "border-red-500 bg-elevation-200": error,
              },
              className
            )}
          >
            {icon && (
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center">
                {icon}
              </div>
            )}
            <input
              type={type}
              id={id}
              value={value}
              className={cn(
                "font-medium bg-transparent outline-none",
                icon ? "ps-[42px]" : "ps-4",
                {
                  "pt-3": isFocused || hasValue,
                }
              )}
              ref={ref}
              onFocus={() => {
                setIsFocused(true);
              }}
              onBlur={handleBlur}
              onChange={handleChange}
              disabled={disabled}
              {...props}
            />
            {clearable && hasValue && (
              <button
                type="button"
                onClick={clearField}
                className="absolute right-4"
              >
                <XIcon className="h-5 w-5 text-text-300" />
              </button>
            )}
          </div>
          <label
            htmlFor={id}
            className={cn(
              "absolute transition-all duration-200 ease-out flex items-center text-text-300 font-medium",
              inputSize === "sm" ? "text-xs" : "text-sm",
              isFocused || hasValue
                ? cn(
                    inputSize === "sm" ? "top-1" : "top-2",
                    "text-xs text-text-200 font-normal"
                  )
                : "top-1/2 -translate-y-1/2",
              icon ? "left-[43px]" : "left-4",
              {
                "text-signal-success": (isFocused || hasValue) && success,
                "text-signal-error": (isFocused || hasValue) && error,
                "text-[#F1EDE4]": disabled,
              }
            )}
          >
            {label}
            {required && (
              <span
                className={cn(
                  "text-[12px] ml-1",
                  !isFocused && !hasValue
                    ? "text-[#8D0002]"
                    : {
                        "text-[#1B0F0080]": !success && !error,
                        "text-signal-success": success,
                        "text-signal-error": error,
                      }
                )}
              >
                *
              </span>
            )}
          </label>
        </div>
        {hint ? (
          <div
            className={cn("text-xs text-text-200 mt-[2px]", {
              "text-signal-success": success,
              "text-signal-error": error,
            })}
          >
            {hint}
          </div>
        ) : (
          error && <p className="text-xs text-signal-error mt-[2px]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
