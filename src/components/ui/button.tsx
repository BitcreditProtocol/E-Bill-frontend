import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all ease-in-out focus-visible:outline-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-base text-white hover:bg-base-hover focus:border-[6px] focus:border-divider-75 active:bg-base-active disabled:bg-base-inactive",
        outlined: "border border-base text-base hover:border-divider-100 hover:text-divider-100 focus:border-[6px] focus:border-divider-75 active:border-base-active disabled:border-base-inactive disabled:text-base-inactive bg-transparent",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent", 
          hover:"text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        filter: "bg-transparent max-h-7 !py-1 !px-3 border-[1px] border-divider-100 rounded-[8px] text-text-300 text-xs font-medium hover:bg-transparent",
      },
      size: {
        xs: "text-xs px-4 py-[10px]",
        sm: "text-sm px-5 py-3",
        md: "text-sm px-6 py-4",
        lg: "text-base px-8 py-5",
      },
      icon: {
        none: "",
        left: "flex-row gap-[2px]",
        right: "flex-row-reverse gap-[2px]",
        "icon-only": ""
      },
      rounded: {
        default: "rounded-md",
        xl: "rounded-xl",
        full: "rounded-full"
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto"
      }
    },
    compoundVariants: [
      {
        icon: "icon-only",
        size: "xs",
        class: "p-[10px]"
      },
      {
        icon: "icon-only",
        size: "sm",
        class: "p-3"
      },
      {
        icon: "icon-only",
        size: "md",
        class: "p-4"
      },
      {
        icon: "icon-only",
        size: "lg",
        class: "p-5"
      }
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      icon: "none",
      rounded: "xl",
      fullWidth: false
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, icon, rounded, fullWidth, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    const childrenArray = React.Children.toArray(children);
    const [_icon, text] = childrenArray;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, icon, rounded, fullWidth, className }))}
        ref={ref}
        {...props}
      >
        {_icon}
        {icon !== "icon-only" && text}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
