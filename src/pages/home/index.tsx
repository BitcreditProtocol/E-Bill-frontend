import { FormattedMessage, useIntl } from "react-intl";
import Topbar from "@/components/Topbar";
import Search from "@/components/ui/search";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import Balances from "./components/Balances";
import Bills from "./components/Bills";
import { useQuery } from "@tanstack/react-query";
import { search } from "@/services/search";
import { useState } from "react";
import { cn } from "@/lib/utils";

import SearchTypeFilter, { type SearchTypeFilterValue } from "./components/SearchTypeFilter";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, SearchIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Icon from "../contacts/components/Icon";
import { type Contact, ContactTypes } from "@/types/contact";
import { randomAvatar } from "@/utils/dev";


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
      {values.map((value) => (
        <RecentContactItem key={value.name} {...value} />
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

const __dev__RECENT_CONTACTS = [
  { name: "Matt Preziegka", type: ContactTypes.Person, avatar: randomAvatar("men") },
  { name: "Jurica Kolectic", type: ContactTypes.Person, avatar: randomAvatar("men") },
  { name: "Testla Inc", type: ContactTypes.Company },
  { name: "Mia Flores", type: ContactTypes.Person, avatar: randomAvatar("women") },
];

export default function Home() {
  const intl = useIntl();

  const [typeFilters, setTypeFilters] = useState<SearchTypeFilterValue[]>(["all"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchModeEnabled, setSearchModeEnabled] = useState(searchTerm.length > 0);

  const { isPending, isSuccess, data } = useQuery({
    queryKey: ["search"],
    queryFn: () => search({
      filter: {
        search_term: searchTerm,
        item_types: typeFilters.length === 0 || typeFilters.includes("all") ? undefined : typeFilters,
      }
    }),
  });

  console.log(isPending, isSuccess, data);

  return (
    <div className="flex flex-col gap-3 w-full min-h-fit h-screen py-6 px-5 bg-background-ellipse bg-no-repeat select-none">
      <Topbar
        lead={<>
          {!searchModeEnabled ? (<Avatar className="h-8 w-8">
            <AvatarFallback className="bg-brand-100 text-brand-200 text-sm font-medium">
              AM
            </AvatarFallback>
          </Avatar>) : (<>
            <Button variant="outline" size="xs"
              className="p-0 w-full h-full bg-elevation-200 border-divider-50 text-text-300"
              onClick={() => {
                setSearchTerm("");
                setSearchModeEnabled(false);
              }}
            >
              <ChevronLeftIcon className="w-5 h-5" strokeWidth={1} />
            </Button>
          </>)}
        </>
        }
        middle={
          <Search
            size="xs"
            className="w-full"
            placeholder={intl.formatMessage({
              id: "Search field for home page",
              defaultMessage: "Search...",
              description: "Search placeholder for home page",
            })}
            value={searchTerm}
            onChange={setSearchTerm}
            onFocus={() => { setSearchModeEnabled(true); }}
            onSearch={() => {
              console.log("search");
            }}
          />
        }
      />
      <div className={cn("flex flex-col gap-8", {
        "hidden": searchModeEnabled,
      })}>
        <Balances />
        <Bills />
      </div>

      <div className={cn("flex flex-col gap-2", "transition-opacity duration-200 ease-in-out", {
        "opacity-0 pointer-events-none": !searchModeEnabled,
      })}>
        <div className="flex flex-col gap-2">
          <SearchTypeFilter multiple values={typeFilters} onChange={setTypeFilters} />
          <Separator className="bg-divider-75" />

          <div className="flex flex-col gap-6 mt-2 w-full">
            <RecentContacts values={__dev__RECENT_CONTACTS} />
            <SearchSuggestions />
            <SearchResults />
          </div>
        </div>
      </div>

    </div>
  );
}
