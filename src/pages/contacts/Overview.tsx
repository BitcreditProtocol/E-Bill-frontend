import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { ChevronRightIcon, PlusIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import Search from "@/components/ui/search";
import { Separator } from "@/components/ui/separator";
import routes from "@/constants/routes";

import List from "./components/List";
import EmptyList from "./components/EmptyList";
import type { Contact } from "@/types/contact";
import TypeFilter from "./components/TypeFilter";
import { getContacts } from "@/services/contact";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

function NoResults() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="text-text-200 text-xs font-medium">No results</div>
      <div className="flex items-center gap-2 text-text-300 text-sm font-medium">
        <SearchIcon className="h-4 w-4" strokeWidth={1} />
        <FormattedMessage
          id="Try searching another contact"
          defaultMessage="Try searching another contact"
          description="Text for no search results on contacts page"
        />
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Skeleton className="w-full h-4 bg-elevation-200 rounded-lg" />
      {Array.from({ length: 3 }, (_, index) => (
        <Skeleton key={index} className="w-full h-16 bg-elevation-200 rounded-lg" />
      ))}
    </div>
  );
}

export default function Overview() {
  const intl = useIntl();
  const navigate = useNavigate();

  const { isPending, isSuccess, data } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });

  const [values, setValues] = useState<Contact[]>(data?.contacts || []);
  const [filteredResults, setFilteredResults] = useState<Contact[]>(values);
  const [typeFilters, setTypeFilters] = useState<Contact['type'][]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [search, setSearch] = useState<string>();

  const goToCreate = () => {
    navigate(routes.CREATE_CONTACT);
  };

  const __dev_clearData = () => {
    setValues([])
  };

  useEffect(() => {
    if (isSuccess) {
      setValues(data.contacts);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    setFilteredResults(typeFilters.length === 0 ? values : values.filter(value => typeFilters.includes(value.type)));
  }, [values, typeFilters]);

  return (
    <div className="flex flex-col items-center gap-6 w-full min-h-fit h-screen py-4 px-5">
      {import.meta.env.DEV && (<>
        <Button size="xxs" variant="destructive" className="absolute top-1 right-1" onClick={__dev_clearData} >
          [dev] Clear contacts
        </Button>
      </>)}

      <div className="flex flex-col gap-3 w-full">
        <h1 className="text-text-300 text-xl font-medium">
          <FormattedMessage
            id="Contacts"
            defaultMessage="Contacts"
            description="Title for contacts page"
          />
        </h1>

        <Search placeholder={intl.formatMessage({
            id: "Name, address, email",
            defaultMessage: "Name, address, email...",
            description: "Placeholder text for contacts search input",
          })}
          onChange={setSearch}
          onSearch={() => {}}
        />
        <TypeFilter values={typeFilters} onChange={setTypeFilters} multiple />
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

      {isPending ? (<>
        <Loader />
      </>) : (<>
        {values.length === 0 ? (<>
          <EmptyList />
        </>) : (<>
        {filteredResults.length === 0 ? (<>
          <NoResults />
        </>) : (<>
            <List values={filteredResults} />
          </>)}
        </>)}
      </>)}
    </div>
  );
}
