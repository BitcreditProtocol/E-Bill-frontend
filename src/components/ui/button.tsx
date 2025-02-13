import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all ease-in-out focus-visible:outline-none focus-visible:box-content disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "bg-text-300 text-white hover:bg-base-hover focus:ring-[6px] focus:ring-divider-75 active:bg-base-active disabled:bg-elevation-300",
        outline:
          "border border-text-300 text-base hover:border-divider-100 hover:text-divider-100 focus:ring-[6px] focus:ring-divider-75 active:border-base-active disabled:border-base-inactive disabled:text-base-inactive bg-transparent",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:bg-destructive/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:bg-secondary/50 disabled:text-base-inactive",
        ghost: "hover:bg-accent hover:text-accent-foreground disabled:text-base-inactive",
        link: "text-primary underline-offset-4 hover:underline",
        filter:
          "bg-transparent max-h-7 !py-1 !px-3 border border-divider-100 rounded-lg text-text-300 !text-xs !font-normal hover:bg-transparent",
      },
      size: {
        xxs: "text-xs px-2 py-1 rounded-[6px]",
        xs: "text-xs px-4 py-2.5 rounded-lg",
        sm: "text-sm px-5 py-3 rounded-lg",
        md: "text-sm px-6 py-4 rounded-lg",
        lg: "text-base px-8 py-[18px] rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
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

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
