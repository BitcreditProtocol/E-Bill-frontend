import { FormattedMessage } from "react-intl";
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
            defaultMessage="Create your first contact to start a relation"
            description="Description for empty contacts list"
          />
        </span>
      </div>

      <Button
        className="w-fit text-text-300 bg-transparent text-sm font-medium border-text-300 rounded-[8px] py-3 px-6 hover:bg-transparent"
        variant="outline"
      >
        <FormattedMessage
          id="New Contact"
          defaultMessage="New contact"
          description="New contact button"
        />
      </Button>
    </div>
  );
}
