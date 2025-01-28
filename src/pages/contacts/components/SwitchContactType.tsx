import { forwardRef } from "react";
import { FormattedMessage } from "react-intl";
import { cn } from "@/lib/utils";

const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }
>((props, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "flex items-center justify-center py-1 px-3 text-text-300 text-xs font-normal leading-[18px] border border-divider-100 rounded-lg",
        { "font-semibold border-text-300": props.active }
      )}
      {...props}
    />
  );
});

export default function SwitchContactType({
  contactType,
  onChange,
}: {
  contactType: "person" | "company" | "mint";
  onChange: (type: "person" | "company" | "mint") => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Button
        active={contactType === "person"}
        onClick={() => {
          onChange("person");
        }}
      >
        <FormattedMessage
          id="contacts.create.switchToPerson"
          defaultMessage="Person"
          description="Switch to person contact type"
        />
      </Button>

      <Button
        active={contactType === "company"}
        onClick={() => {
          onChange("company");
        }}
      >
        <FormattedMessage
          id="contacts.create.switchToCompany"
          defaultMessage="Company"
          description="Switch to company contact type"
        />
      </Button>

      <Button
        active={contactType === "mint"}
        onClick={() => {
          onChange("mint");
        }}
      >
        <FormattedMessage
          id="contacts.create.switchToMint"
          defaultMessage="Mint"
          description="Switch to mint contact type"
        />
      </Button>
    </div>
  );
}
