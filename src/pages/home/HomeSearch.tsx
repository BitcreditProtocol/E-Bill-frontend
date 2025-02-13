import { FormattedMessage } from "react-intl";

import Icon from "../contacts/components/Icon";
import { type Contact, ContactTypes } from "@/types/contact";
import { randomAvatar } from "@/utils/dev";
import { SearchIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchResponse } from "@/services/search";
import { findHolderLight } from "@/utils/bill";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import routes from "@/constants/routes";

type RecentContactItemProps = Pick<Contact, "name" | "type" | "avatar_file">;

function RecentContactItem({
  name,
  type,
  avatar_file,
}: RecentContactItemProps) {
  return (
    <div className="flex flex-col items-center gap-1 w-14">
      <Icon
        name={name}
        type={type}
        src={avatar_file?.name || undefined}
        className="w-8 h-8"
      />
      <div className="text-text-300 text-[11px] font-medium text-center">
        {name}
      </div>
    </div>
  );
}

function RecentContacts({ values }: { values: RecentContactItemProps[] }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="text-text-200 text-xs font-medium">
        <FormattedMessage
          id="home.search.recent.title"
          defaultMessage="Recent"
          description="Title for recent contacts on home page"
        />
      </div>
      <div className="flex gap-4">
        {values.map((value, index) => (
          <RecentContactItem key={index} {...value} />
        ))}
      </div>
    </div>
  );
}

function SearchSuggestions() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="text-text-200 text-xs font-medium">
        <FormattedMessage
          id="home.search.suggestion.title"
          defaultMessage="Try searching for"
          description="Title for search suggestions on home page"
        />
      </div>
      <div className="flex flex-col gap-6 text-text-300 text-sm font-medium">
        <div className="flex items-center gap-2">
          <SearchIcon className="w-5 h-5" strokeWidth={1} />
          <FormattedMessage
            id="home.search.suggestion.recent_bills.label"
            defaultMessage="Recent bills"
            description="Search suggestion for recent bills on home page"
          />
        </div>
        <div className="flex items-center gap-2">
          <SearchIcon className="w-5 h-5" strokeWidth={1} />
          <FormattedMessage
            id="home.search.suggestion.all_contacts.label"
            defaultMessage="All contacts"
            description="Search suggestion for all contacts on home page"
          />
        </div>
        <div className="flex items-center gap-2">
          <SearchIcon className="w-5 h-5" strokeWidth={1} />
          Something here
        </div>
      </div>
    </div>
  );
}

function CompanyPreview({ value }: { value: SearchResponse["companies"][0] }) {
  return (
    <div className="flex items-center gap-3">
      <Icon type={ContactTypes.Company} name={value.name} />

      <div className="flex flex-col">
        <span className="text-text-300 text-base font-medium">
          {value.name}
        </span>
        <span className="text-text-200 text-xs">{value.address}</span>
      </div>
    </div>
  );
}

function ContactPreview({ value }: { value: SearchResponse["contacts"][0] }) {
  return (
    <Link
      to={`${routes.CONTACTS}/${routes.VIEW_CONTACT.replace(
        ":nodeId",
        value.node_id
      )}`}
    >
      <div className="flex items-center gap-3">
        <Icon type={value.type} name={value.name} />

        <div className="flex flex-col">
          <div className="text-text-300 text-base font-medium">
            {value.name}
          </div>
          <div className="flex items-center gap-1 text-text-200 text-xs">
            <span>
              {value.type === ContactTypes.Company ? (
                <FormattedMessage
                  id="home.search.preview.contact.type.company.label"
                  defaultMessage="Company"
                  description="Type label for company contacts on home page"
                />
              ) : (
                <FormattedMessage
                  id="home.search.preview.contact.type.person.label"
                  defaultMessage="Contact"
                  description="Type label for person contacts on home page"
                />
              )}
            </span>
            <span>·</span>
            <span>
              <FormattedMessage
                id="home.search.preview.contact.in_contacts.label"
                defaultMessage="In contacts"
                description="In contact label for contacts on home page"
              />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function BillPreview({ value }: { value: SearchResponse["bills"][0] }) {
  const holder = findHolderLight(value);

  return (
    <Link to={routes.VIEW_BILL.replace(":id", value.id)}>
      <div className="flex items-center gap-3">
        <Icon type={ContactTypes.Company} name={value.id} />

        <div className="flex flex-col">
          <div className="text-text-300 text-base font-medium">
            {holder.name}
          </div>
          <div className="flex items-center gap-1 text-text-200 text-xs">
            <span>
              <FormattedMessage
                id="home.search.preview.bill.label"
                defaultMessage="Bill"
                description="Label for bills on home page"
              />
            </span>
            <span>·</span>
            <span>Accepted</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function SearchResults({ data }: { data: SearchResponse }) {
  const isEmpty = useMemo(
    () =>
      data.bills.length === 0 &&
      data.companies.length === 0 &&
      data.contacts.length === 0,
    [data]
  );

  return (
    <div className="flex flex-col gap-4">
      {isEmpty ? (
        <div className="text-text-300 text-sm font-medium">
          <FormattedMessage
            id="home.search.results.no_results.text"
            defaultMessage="No results"
            description="Title for no search results on Home page"
          />
        </div>
      ) : (
        <>
          {data.companies.map((it, index) => {
            return <CompanyPreview value={it} key={index} />;
          })}
          {data.contacts.map((it, index) => {
            return <ContactPreview value={it} key={index} />;
          })}
          {data.bills.map((it, index) => {
            return <BillPreview value={it} key={index} />;
          })}
        </>
      )}
    </div>
  );
}

function Loader() {
  return (
    <div className="flex flex-col gap-2 w-full">
      {Array.from({ length: 3 }, (_, index) => (
        <Skeleton
          key={index}
          className="w-full h-12 bg-elevation-200 rounded-sm"
        />
      ))}
    </div>
  );
}

const __dev__RECENT_CONTACTS: Pick<Contact, "name" | "type" | "avatar_file">[] =
  [
    {
      name: "Matt Preziegka",
      type: ContactTypes.Person,
      avatar_file: {
        name: randomAvatar("men"),
        hash: 'deadbeef'
      }
    },
    {
      name: "Jurica Kolectic",
      type: ContactTypes.Person,
      avatar_file: {
        name: randomAvatar("men"),
        hash: 'deadbeef'
      }
    },
    { name: "Testla Inc", type: ContactTypes.Company, avatar_file: null },
    {
      name: "Mia Flores",
      type: ContactTypes.Person,
      avatar_file: {
        name: randomAvatar("women"),
        hash: 'deadbeef'
      }
    },
  ];

interface HomeSearchProps {
  searchTerm: string;
  isLoading: boolean;
  data: SearchResponse | undefined;
}

export default function HomeSearch({
  searchTerm,
  isLoading,
  data,
}: HomeSearchProps) {
  return (
    <div className="flex flex-col gap-6 mt-2 w-full">
      <div className="hidden">
        {/* NOTE: Hidden for now, till actual data can be used. */}
        <RecentContacts values={__dev__RECENT_CONTACTS} />
      </div>
      <div className="hidden">
        {/* NOTE: Hidden for now, till actual data can be used. */}
        {(!searchTerm || !data) && !isLoading && <SearchSuggestions />}
      </div>
      {((searchTerm && data) || isLoading) && (
        <div className="flex flex-col gap-4">
          <div className="text-text-200 text-xs font-medium">
            <FormattedMessage
              id="home.search.results.title"
              defaultMessage="Search results"
              description="Title for search results on home page"
            />
          </div>
          {isLoading && <Loader />}
          {!isLoading && searchTerm && data && <SearchResults data={data} />}
        </div>
      )}
    </div>
  );
}
