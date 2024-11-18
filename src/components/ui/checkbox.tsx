import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check, Minus } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const checkboxVariants = cva(
  "peer shrink-0 rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      size: {
        sm: "h-4 w-4 [&_svg]:h-3 [&_svg]:w-3",
        md: "h-5 w-5 [&_svg]:h-3.5 [&_svg]:w-3.5",
      }
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'checked'>,
  VariantProps<typeof checkboxVariants> {
  checked?: boolean;
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, size, checked, indeterminate, disabled, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    checked={checked}
    disabled={disabled}
    className={cn(
      checkboxVariants({ size, className }),
      "bg-elevation-200 border-divider-75",
      "enabled:hover:bg-elevation-250 enabled:hover:border-divider-75",
      "data-[state=checked]:bg-brand-50 data-[state=checked]:border-brand-200",
      "data-[state=indeterminate]:bg-brand-50 data-[state=indeterminate]:border-brand-200",
      "enabled:data-[state=checked]:hover:bg-brand-100 enabled:data-[state=checked]:hover:border-brand-200",
      "enabled:data-[state=indeterminate]:hover:bg-brand-100 enabled:data-[state=indeterminate]:hover:border-brand-200",
      "disabled:!bg-elevation-300 disabled:!border-0 disabled:cursor-not-allowed"
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        "flex items-center justify-center",
        disabled ? "text-white" : "text-brand-200"
      )}
    >
      {indeterminate ? <Minus /> : <Check />}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
