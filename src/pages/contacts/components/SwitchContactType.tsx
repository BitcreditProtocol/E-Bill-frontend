import { forwardRef } from "react";
import { FormattedMessage } from "react-intl";
import { cn } from "@/lib/utils";
import { ContactTypes, type ContactType } from "@/types/contact";

const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { active: boolean }
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
  contactType: ContactType;
  onChange: (type: ContactType) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Button
        active={contactType === ContactTypes.Person}
        onClick={() => {
          onChange(ContactTypes.Person);
        }}
      >
        <FormattedMessage
          id="contacts.create.type.person"
          defaultMessage="Person"
          description="Switch to person contact type"
        />
      </Button>

      <Button
        active={contactType === ContactTypes.Company}
        onClick={() => {
          onChange(ContactTypes.Company);
        }}
      >
        <FormattedMessage
          id="contacts.create.type.company"
          defaultMessage="Company"
          description="Switch to company contact type"
        />
      </Button>

      <Button
        active={contactType === ContactTypes.Mint}
        onClick={() => {
          onChange(ContactTypes.Mint);
        }}
      >
        <FormattedMessage
          id="contacts.create.type.mint"
          defaultMessage="Mint"
          description="Switch to mint contact type"
        />
      </Button>
    </div>
  );
}
