import { Suspense, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { ChevronRightIcon, PlusIcon } from "lucide-react";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import PageTitle from "@/components/typography/PageTitle";
import Picture from "@/components/Picture";
import { Skeleton } from "@/components/ui/skeleton";
import Search from "@/components/ui/search";
import type { Contact } from "@/types/contact";
import { getContacts } from "@/services/contact_v2";
import routes from "@/constants/routes";
import TypeFilter from "./components/TypeFilter";

type ContactProps = Pick<Contact, "type" | "node_id" | "name" | "address">;

function Contact({ type, node_id, name, address }: ContactProps) {
  return (
    // todo: fix endpoint
    <Link to={`/contacts/${node_id}`}>
      <div className="flex items-center gap-3 py-4 px-3 w-full border-[1px] border-divider-75 rounded-xl cursor-pointer select-none">
        <Picture type={type} name={name} image="" />

        <div className="flex items-center gap-3 mr-auto">
          <div className="flex flex-col">
            <span className="text-text-300 text-base font-medium">{name}</span>
            <span className="text-text-200 text-xs">{address}</span>
          </div>
        </div>
        <ChevronRightIcon className="w-6 h-6 text-brand-200" strokeWidth={1} />
      </div>
    </Link>
  );
}

function Create() {
  return (
    <Link to={routes.CREATE_CONTACT}>
      <div className="flex items-center justify-between py-6 px-3 bg-elevation-200 border border-divider-75 rounded-xl">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center h-6 w-6 bg-brand-200 rounded-full">
            <PlusIcon className="text-brand-50 h-4 w-4 stroke-1" />
          </div>

          <span className="text-text-300 text-sm font-medium leading-5">
            <FormattedMessage
              id="contacts.list.create"
              defaultMessage="New contact"
              description="Create new contact"
            />
          </span>
        </div>

        <ChevronRightIcon className="text-text-300 h-4 w-4 stroke-1" />
      </div>
    </Link>
  );
}

function Loader() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-1/4 bg-elevation-200 mb-1" />

        <Skeleton className="h-10 w-full bg-elevation-200" />
        <Skeleton className="h-10 w-full bg-elevation-200" />
        <Skeleton className="h-10 w-full bg-elevation-200" />
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-1/4 bg-elevation-200 mb-1" />

        <Skeleton className="h-10 w-full bg-elevation-200" />
        <Skeleton className="h-10 w-full bg-elevation-200" />
        <Skeleton className="h-10 w-full bg-elevation-200" />
      </div>
    </div>
  );
}

function List() {
  const { data } = useSuspenseQuery({
    queryKey: ["contacts"],
    queryFn: () => getContacts(),
  });

  return (
    <div className="flex flex-col gap-2">
      {data.contacts.map((contact) => (
        <Contact key={contact.node_id} {...contact} />
      ))}
    </div>
  );
}

export default function Contacts() {
  const [searchTerm, setSearchTerm] = useState("");
  const { formatMessage: f } = useIntl();

  return (
    <Page className="gap-6" displayBottomNavigation>
      <Topbar
        lead={
          <PageTitle className="text-xl font-medium">
            <FormattedMessage
              id="contacts.list.title"
              defaultMessage="Contacts"
              description="Title for contacts page"
            />
          </PageTitle>
        }
      />

      <div className="flex flex-col gap-2.5 mt-1">
        <Search
          placeholder={f({
            id: "contacts.search.placeholder",
            defaultMessage: "Name, address, email...",
            description: "Placeholder text for contacts search input",
          })}
          onChange={setSearchTerm}
          onSearch={() => {
            console.log(searchTerm);
          }}
        />
        <TypeFilter
          multiple
          values={[]}
          onChange={(types) => {
            console.log(types);
          }}
        />
      </div>

      <div className="flex flex-col gap-4">
        <Create />
        <Suspense fallback={<Loader />}>
          <List />
        </Suspense>
      </div>
    </Page>
  );
}
