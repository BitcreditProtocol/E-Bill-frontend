import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all ease-in-out focus-visible:outline-none focus-visible:box-content disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-text-300 text-white hover:bg-base-hover focus:border-[6px] focus:border-divider-75 active:bg-base-active disabled:bg-elevation-300",
        outline: "border border-base text-base hover:border-divider-100 hover:text-divider-100 focus:border-[6px] focus:border-divider-75 active:border-base-active disabled:border-base-inactive disabled:text-base-inactive bg-transparent",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        filter: "bg-transparent max-h-7 !py-1 !px-3 border-[1px] border-divider-100 rounded-[8px] text-text-300 text-xs font-medium hover:bg-transparent",
      },
      size: {
        xs: "text-xs px-4 py-2.5",
        sm: "text-sm px-5 py-3",
        md: "text-sm px-6 py-4",
        lg: "text-base px-8 py-[18px]",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
