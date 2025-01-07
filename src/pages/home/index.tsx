import { useState } from "react";
import { useIntl } from "react-intl";
import { ChevronLeftIcon } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { search } from "@/services/search";

import { cn } from "@/lib/utils";
import Topbar from "@/components/Topbar";
import Search from "@/components/ui/search";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import Balances from "./components/Balances";
import Bills from "./components/Bills";
import SearchTypeFilter, { type SearchTypeFilterValue } from "./components/SearchTypeFilter";
import HomeSearch from "./HomeSearch";

export default function Home() {
  const intl = useIntl();

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilters, setTypeFilters] = useState<SearchTypeFilterValue[]>(["all"]);

  const [searchModeEnabled, setSearchModeEnabled] = useState(searchTerm.length > 0);

  const { isPending, isSuccess, data } = useQuery({
    queryKey: ["search", searchTerm, typeFilters],
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

        <HomeSearch isPending={isPending} />
      </div>

    </div>
    </div>
  );
}
