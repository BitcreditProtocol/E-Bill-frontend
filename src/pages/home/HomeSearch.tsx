import { FormattedMessage, } from "react-intl";

import Icon from "../contacts/components/Icon";
import { type Contact, ContactTypes } from "@/types/contact";
import { randomAvatar } from "@/utils/dev";
import { SearchIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchResponse } from "@/services/search";
import { useMemo } from "react";


type RecentContactItemProps = Pick<Contact, "name" | "type" | "avatar_file">;

function RecentContactItem({ name, type, avatar_file }: RecentContactItemProps) {
  return (
    <div className="flex flex-col items-center gap-1 w-14">
        <Icon name={name} type={type} src={avatar_file || undefined} className="w-8 h-8" />
        <div className="text-text-300 text-[11px] font-medium text-center">{name}</div>
    </div>
  );
}

function RecentContacts({ values }: { values: RecentContactItemProps[] }) {
  return (
  <div className="flex flex-col gap-2 w-full">
    <div className="text-text-200 text-xs font-medium">
      <FormattedMessage
        id="Recent"
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
          id="Try searching for"
          defaultMessage="Try searching for"
          description="Title for search suggestions on home page"
        />
      </div>
      <div className="flex flex-col gap-6 text-text-300 text-sm font-medium">
        <div className="flex items-center gap-2">
          <SearchIcon className="w-5 h-5" strokeWidth={1} />
          <FormattedMessage
            id="Recent bills"
            defaultMessage="Recent bills"
            description="Search suggestion for recent bills on home page"
          />
        </div>
        <div className="flex items-center gap-2">
          <SearchIcon className="w-5 h-5" strokeWidth={1} />
          <FormattedMessage
            id="All contacts"
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

function CompanyPreview({ value }: { value: SearchResponse['companies'][0]}) {
  return (<div className="flex items-center gap-3">
    <Icon type={ContactTypes.Company} name={value.name} />

    <div className="flex flex-col">
      <span className="text-text-300 text-base font-medium">
        {value.name}
      </span>
      <span className="text-text-200 text-xs">
        {value.address}
      </span>
    </div>
  </div>);
}

function ContactPreview({ value }: { value: SearchResponse['contacts'][0]}) {
  return (<div className="flex items-center gap-3">
    <Icon type={value.type} name={value.name} />

    <div className="flex flex-col">
      <div className="text-text-300 text-base font-medium">
        {value.name}
      </div>
      <div className="flex items-center gap-1 text-text-200 text-xs">
        <span>
          {value.type === ContactTypes.Company ? "Company" : "Contact"}
        </span>
        <span>
          ·
        </span>
        <span>
          In contacts
        </span>
      </div>
    </div>
  </div>);
}

function BillPreview({ value }: { value: SearchResponse['bills'][0]}) {
  return (<div className="flex items-center gap-3">
    <Icon type={ContactTypes.Company} name={value.bill_name} />

    <div className="flex flex-col">
      <div className="text-text-300 text-base font-medium">
        {value.bill_name}
      </div>
      <div className="flex items-center gap-1 text-text-200 text-xs">
        <span>
          Bill
        </span>
        <span>
          ·
        </span>
        <span>
          Accepted
        </span>
      </div>
    </div>
  </div>);
}

function SearchResults({ data } : { data: SearchResponse }) {
  const isEmpty = useMemo(() => data.bills.length === 0 && data.companies.length === 0 && data.contacts.length === 0, [data]);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-text-200 text-xs font-medium">
        <FormattedMessage
          id="Search results"
          defaultMessage="Search results"
          description="Title for search results on home page"
        />
      </div>
      {isEmpty ? (<div className="text-text-300 text-sm font-medium">
        <FormattedMessage
          id="No results"
          defaultMessage="No results"
          description="Title for no search results on Home page"
        />
      </div>) : (<div className="flex flex-col gap-4">
        {data.companies.map((it) => {
          return <CompanyPreview value={it} />
        })}
        {data.contacts.map((it) => {
          return <ContactPreview value={it} />
        })}
        {data.bills.map((it) => {
          return <BillPreview value={it} />
        })}
      </div>)}
    </div>
  );
}

function Loader() {
  return (
    <div className="flex flex-col gap-3 w-full">
      {Array.from({ length: 3 }, (_, index) => (
        <Skeleton key={index} className="w-full h-14 bg-elevation-200 rounded-sm" />
      ))}
    </div>
  );
}

const __dev__RECENT_CONTACTS: Pick<Contact, "name" | "type" | "avatar_file">[] = [
  { name: "Matt Preziegka", type: ContactTypes.Person, avatar_file: randomAvatar("men") },
  { name: "Jurica Kolectic", type: ContactTypes.Person, avatar_file: randomAvatar("men") },
  { name: "Testla Inc", type: ContactTypes.Company, avatar_file: null },
  { name: "Mia Flores", type: ContactTypes.Person, avatar_file: randomAvatar("women") },
];

interface HomeSearchProps {
  searchTerm: string
  isPending: boolean
  data: SearchResponse | undefined
}

export default function HomeSearch({ searchTerm, isPending, data }: HomeSearchProps) {

  return (
    <div className="flex flex-col gap-6 mt-2 w-full">
      <RecentContacts values={__dev__RECENT_CONTACTS} />
      { (!searchTerm || !data) && (<SearchSuggestions />) }
      {isPending && <Loader />}
      { searchTerm && data && <SearchResults data={data} /> }
    </div>
  );
}