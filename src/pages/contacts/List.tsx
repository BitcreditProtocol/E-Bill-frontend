import { Suspense, useMemo, useState } from "react";
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
import { getContacts } from "@/services/contact_v2";
import routes from "@/constants/routes";
import { API_URL } from "@/constants/api";
import { GET_CONTACT_FILE } from "@/constants/endpoints";
import { type Contact } from "@/types/contact";
import TypeFilter from "./components/TypeFilter";
import EmptyList from "./components/EmptyList";

type ContactProps = Pick<
  Contact,
  "type" | "node_id" | "name" | "address" | "avatar_file"
>;

function Contact({ type, node_id, name, address, avatar_file }: ContactProps) {
  const avatarImageUrl = avatar_file?.name
    ? `${API_URL}/${GET_CONTACT_FILE.replace(
        ":node_id/:name",
        `${node_id}/${avatar_file.name}`
      )}`
    : "";

  return (
    <Link to={routes.VIEW_CONTACT.replace(":nodeId", node_id)}>
      <div className="flex items-center gap-3 py-4 px-3 w-full border-[1px] border-divider-75 rounded-xl cursor-pointer select-none">
        <Picture type={type} name={name} image={avatarImageUrl} />

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

type ListProps = {
  typeFilters: Contact["type"][]
}

function List({ typeFilters }: ListProps) {
  const { data } = useSuspenseQuery({
    queryKey: ["contacts"],
    queryFn: () => getContacts(),
  });

  const values = useMemo(() => {
    return data.contacts.filter((it) => typeFilters.length === 0 || typeFilters.includes(it.type))
  }, [data, typeFilters]);

  return (
    <div className="flex flex-col gap-2 mb-16">
      {data.contacts.length === 0 && <EmptyList />}
      {values.map((it) => (
        <Contact key={it.node_id} {...it} />
      ))}
    </div>
  );
}

export default function Contacts() {
  const { formatMessage: f } = useIntl();
  const [typeFilters, setTypeFilters] = useState<Contact["type"][]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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
          values={typeFilters}
          onChange={(types) => {
            setTypeFilters(types);
          }}
        />
      </div>

      <div className="flex flex-col gap-4">
        <Create />
        <Suspense fallback={<Loader />}>
          <List typeFilters={typeFilters}/>
        </Suspense>
      </div>
    </Page>
  );
}
