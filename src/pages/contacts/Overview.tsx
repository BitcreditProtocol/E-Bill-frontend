import { LoaderFunction, useLoaderData, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { ChevronRightIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import Search from "@/components/ui/search";
import { Separator } from "@/components/ui/separator";
import routes from "@/constants/routes";
import contactsIllustration from "@/assets/contacts-illustration.svg";

import List from "./components/List";
import type { Contact } from "@/types/contact";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function EmptyList() {
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

export default function Overview() {
  const navigate = useNavigate();
  const values = useLoaderData() as Contact[];

  const goToCreate = () => {
    navigate(routes.CREATE_CONTACT);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full min-h-fit h-screen py-4 px-5">
      <div className="flex flex-col gap-3 w-full">
        <h1 className="text-text-300 text-xl font-medium">
          <FormattedMessage
            id="Contacts"
            defaultMessage="Contacts"
            description="Title for contacts page"
          />
        </h1>

        <Search
          placeholder="Name, address, email..."
          onSearch={() => {}}
        />
      </div>

      <div className="flex flex-col gap-4 w-full">
        <button
          className="flex items-center justify-between w-full"
          onClick={goToCreate}
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-brand-200 p-2 rounded-full">
              <PlusIcon className="w-4 h-4 text-brand-50" />
            </div>

            <span className="text-text-300 text-base font-medium">
              <FormattedMessage
                id="New Contact"
                defaultMessage="New contact"
                description="New contact button"
              />
            </span>
          </div>
          <ChevronRightIcon className="w-6 h-6 text-text-300" />
        </button>

        <Separator className="bg-divider-75" />
      </div>

      <List values={values} />
    </div>
  );
}

const loader: LoaderFunction = async (): Promise<Contact[]> =>{
  return await Promise.resolve([{
    name: "Terry White #1",
    type: 0,
    email: "terry@white.com",
    postal_address: "1650 Rinehart Road, Miami, FL 33179",
    public_key: "0x1234567890abcdef",
    date_of_birth_or_registration: "1990-01-01",
    country: "United States",
    city: "Miami",
    identification_number: "1234567890",
  }, {
    name: "Terry White #2",
    type: 0,
    email: "terry@white.com",
    postal_address: "1650 Rinehart Road, Miami, FL 33179",
    public_key: "0x1234567890abcdef",
    date_of_birth_or_registration: "1990-01-01",
    country: "United States",
    city: "Miami",
    identification_number: "1234567890",
  }, {
    name: "Terry White #3",
    type: 0,
    email: "terry@white.com",
    postal_address: "1650 Rinehart Road, Miami, FL 33179",
    public_key: "0x1234567890abcdef",
    date_of_birth_or_registration: "1990-01-01",
    country: "United States",
    city: "Miami",
    identification_number: "1234567890",
  }]);
}

Overview.loader = loader;