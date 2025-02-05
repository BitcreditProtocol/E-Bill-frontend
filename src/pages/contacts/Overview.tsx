import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { getContacts, searchContacts } from "@/services/contact";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import Page from "@/components/wrappers/Page";

function NoResults() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="text-text-200 text-xs font-medium">
        <FormattedMessage
          id="No results"
          defaultMessage="No results"
          description="Title for no search results on contacts page"
        />
      </div>
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
        <Skeleton
          key={index}
          className="w-full h-16 bg-elevation-200 rounded-lg"
        />
      ))}
    </div>
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
              id="contacts.create"
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

export default function Overview() {
  const intl = useIntl();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending, isSuccess, data } = useQuery(
    {
      queryKey: ["contacts"],
      queryFn: getContacts,
    },
    queryClient
  );

  const {
    data: searchData,
    isPending: isSearchPending,
    isSuccess: isSearchSuccess,
    mutate,
  } = useMutation(
    {
      mutationFn: () =>
        searchContacts({
          filter: {
            search_term: searchTerm,
            types: typeFilters.length === 0 ? undefined : typeFilters,
          },
        }),
    },
    queryClient
  );

  const [values, setValues] = useState<Contact[]>(data?.contacts || []);
  const [typeFilters, setTypeFilters] = useState<Contact["type"][]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const __dev_toggleEmptyScenario = () => {
    navigate({
      pathname: ".",
      search: window.location.search.includes("scenario=empty")
        ? ""
        : "scenario=empty",
    });
    navigate(0); // triggers reload
  };

  useEffect(() => {
    if (isSuccess) {
      setValues(data.contacts);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isSearchSuccess) {
      setValues(searchData.contacts);
    }
  }, [isSearchSuccess, searchData]);

  return (
    <Page className="gap-6" displayBottomNavigation>
      {import.meta.env.DEV && (
        <>
          <Button
            size="xxs"
            variant="destructive"
            className="absolute top-1 right-1"
            onClick={__dev_toggleEmptyScenario}
          >
            [dev] Toggle empty scenario
          </Button>
        </>
      )}

      <div className="flex flex-col gap-3 w-full">
        <h1 className="text-text-300 text-xl font-medium leading-normal">
          <FormattedMessage
            id="Contacts"
            defaultMessage="Contacts"
            description="Title for contacts page"
          />
        </h1>

        <Search
          placeholder={intl.formatMessage({
            id: "Name, address, email",
            defaultMessage: "Name, address, email...",
            description: "Placeholder text for contacts search input",
          })}
          onChange={setSearchTerm}
          onSearch={() => {
            mutate();
          }}
        />
        <TypeFilter
          multiple
          values={typeFilters}
          onChange={(types) => {
            setTypeFilters(types);
            mutate();
          }}
        />
      </div>

      <div className="flex flex-col gap-4 w-full">
        <Create />

        <Separator className="bg-divider-75" />
      </div>

      {isPending || isSearchPending ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {values.length === 0 && data?.contacts.length === 0 ? (
            <>
              <EmptyList />
            </>
          ) : (
            <>
              {values.length === 0 ? (
                <>
                  <NoResults />
                </>
              ) : (
                <>
                  <List values={values} />
                </>
              )}
            </>
          )}
        </>
      )}
    </Page>
  );
}
