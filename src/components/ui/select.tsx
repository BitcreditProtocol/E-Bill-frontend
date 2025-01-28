import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectProps {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
}

const Select: React.FC<SelectProps> = ({
  children,
  value,
  onValueChange,
  required,
}) => {
  const hasValue = React.useMemo(() => !!value, [value]);
  const [triggerWidth, setTriggerWidth] = React.useState<number | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleValueChange = (value: string) => {
    if (onValueChange) onValueChange(value);
  };

  return (
    <SelectPrimitive.Root
      onValueChange={handleValueChange}
      onOpenChange={setIsOpen}
      value={value}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === SelectTrigger) {
          return React.cloneElement(child as React.ReactElement, {
            hasValue,
            setTriggerWidth,
            isOpen,
            required,
          });
        }
        if (React.isValidElement(child) && child.type === SelectContent) {
          return React.cloneElement(child as React.ReactElement, {
            triggerWidth,
          });
        }
        return child;
      })}
    </SelectPrimitive.Root>
  );
};

interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  label: string;
  hasValue?: boolean;
  setTriggerWidth?: (width: number) => void;
  isOpen?: boolean;
  icon?: React.ReactNode;
  required?: boolean;
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(
  (
    {
      id,
      className,
      label,
      hasValue,
      setTriggerWidth,
      isOpen,
      icon,
      required,
      ...props
    },
    ref
  ) => {
    const triggerRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
      if (triggerRef.current && setTriggerWidth) {
        setTriggerWidth(triggerRef.current.offsetWidth);
      }
    }, [setTriggerWidth]);

    return (
      <div className="relative">
        <SelectPrimitive.Trigger
          id={id}
          ref={(node) => {
            // @ts-expect-error This is a valid mutable property
            triggerRef.current = node;

            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          className={cn(
            "flex h-[58px] w-full items-center justify-between rounded-lg border border-divider-50 bg-elevation-200 px-4 text-sm transition-all duration-200 ease-in-out outline-none",
            className
          )}
          {...props}
        >
          <SelectPrimitive.Icon asChild>
            {icon && <div className="mr-2">{icon}</div>}
          </SelectPrimitive.Icon>

          <div className="flex-1 h-full flex flex-col justify-center text-left transition-all duration-200 ease-out">
            <label
              htmlFor={id}
              className={cn(
                "transition-all duration-200 ease-in-out",
                hasValue
                  ? "text-text-200 text-xs font-normal"
                  : "text-text-300 text-sm font-medium"
              )}
            >
              {label}
              {required && (
                <span
                  className={cn(
                    "ml-1",
                    hasValue ? "text-text-200" : "text-signal-error"
                  )}
                  aria-hidden="true"
                >
                  *
                </span>
              )}
            </label>
            <div className="text-text-300 font-sm font-medium">
              <SelectPrimitive.Value />
            </div>
          </div>
          <div className="flex items-center justify-center h-full">
            <SelectPrimitive.Icon asChild>
              {isOpen ? (
                <ChevronUp className="text-text-300 w-6 stroke-1" />
              ) : (
                <ChevronDown className="text-text-300 w-6 stroke-1" />
              )}
            </SelectPrimitive.Icon>
          </div>
        </SelectPrimitive.Trigger>
      </div>
    );
  }
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
  triggerWidth?: number | null;
}

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(
  (
    { className, children, triggerWidth, position = "popper", ...props },
    ref
  ) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        style={{ width: triggerWidth ?? "100%" }}
        className={cn(
          "relative z-50 max-h-96 w-full min-w-[8rem] overflow-hidden bg-elevation-50 border border-[#1B0F004D] rounded-[8px] shadow-md",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[side=bottom]:slide-in-from-top-2",
          className
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1 space-y-1">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

type SelectLabelProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Label
>;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  SelectLabelProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

type SelectItemProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Item
>;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full mb-1 cursor-default select-none items-center rounded-[6px] py-2.5 px-2 text-base font-medium text-text-300 outline-none",
      "data-[highlighted]:bg-[#EEEBE3] data-[highlighted]:text-inherit",
      "data-[state=checked]:bg-[#EEEBE3]",
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <span className="absolute right-2 flex items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-[#006F29]" />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

type SelectSeparatorProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Separator
>;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  SelectSeparatorProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};
