import { FormattedMessage, } from "react-intl";

import Icon from "../contacts/components/Icon";
import { type Contact, ContactTypes } from "@/types/contact";
import { randomAvatar } from "@/utils/dev";
import { SearchIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";


type RecentContactItemProps = Pick<Contact, "name" | "type" | "avatar">;

function RecentContactItem({ name, type, avatar }: RecentContactItemProps) {
  return (
    <div className="flex flex-col items-center gap-1 w-14">
        <Icon name={name} type={type} avatar={avatar} className="w-8 h-8" />
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

function SearchResults() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="text-text-200 text-xs font-medium">
        <FormattedMessage
          id="Search results"
          defaultMessage="Search results"
          description="Title for search results on home page"
        />
      </div>
      <div className="flex items-center gap-2 text-text-300 text-sm font-medium">
      </div>
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

const __dev__RECENT_CONTACTS = [
  { name: "Matt Preziegka", type: ContactTypes.Person, avatar: randomAvatar("men") },
  { name: "Jurica Kolectic", type: ContactTypes.Person, avatar: randomAvatar("men") },
  { name: "Testla Inc", type: ContactTypes.Company },
  { name: "Mia Flores", type: ContactTypes.Person, avatar: randomAvatar("women") },
];

export default function HomeSearch({ isPending }: { isPending: boolean }) {

  return (
    <div className="flex flex-col gap-6 mt-2 w-full">
      <RecentContacts values={__dev__RECENT_CONTACTS} />
      <SearchSuggestions />
      <SearchResults />
      {isPending && <Loader />}
    </div>
  );
}
