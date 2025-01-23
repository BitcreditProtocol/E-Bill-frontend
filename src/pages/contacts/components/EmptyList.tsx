import { FormattedMessage } from "react-intl";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import contactsIllustration from "@/assets/contacts-illustration.svg";

export default function EmptyList() {
  return (
    <div className="flex-1 flex flex-col items-center pt-10 w-52">
      <img src={contactsIllustration} className="w-18 h-18 mx-auto mb-5" />

      <div className="flex flex-col items-center gap-2 text-center mb-4">
        <h2 className="text-text-300 text-xl font-medium leading-[30px]">
          <FormattedMessage
            id="contacts.empty.title"
            defaultMessage="No contacts yet"
            description="Title for empty contacts list"
          />
        </h2>

        <span className="text-text-200 text-md leading-6">
          <FormattedMessage
            id="contacts.empty.description"
            defaultMessage="Create your first contact to start issuing bills"
            description="Description for empty contacts list"
          />
        </span>
      </div>

      <Button className="gap-2" variant="outline" size="xs">
        <PlusIcon className="text-text-300 h-4 w-4 stroke-1" />
        <FormattedMessage
          id="contacts.empty.create"
          defaultMessage="New contact"
          description="New contact button"
        />
      </Button>
    </div>
  );
}
