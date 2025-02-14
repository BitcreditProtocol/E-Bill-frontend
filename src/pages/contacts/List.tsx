import { Suspense, useMemo, useState } from "react";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
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
import { searchContacts } from "@/services/search";
import { useLanguage } from "@/context/language/LanguageContext";

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

type Category = string;

const sortContacts = (
  values: Contact[],
  locale: string
): Record<Category, Contact[]> => {
  return [...values]
    .sort((a, b) => a.name.localeCompare(b.name, locale))
    .map((it) => {
      const firstChar: Category = it.name.length === 0 ? '#' : it.name.charAt(0).toLocaleUpperCase(locale);
      return { category: firstChar, value: it };
    })
    .reduce<Record<Category, Contact[]>>((acc, item) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item.value);
      return acc;
    }, {});
};

function EmptySearchResult() {
  return (<div className="flex flex-col gap-4">
    <div className="text-text-200 text-xs font-medium">
      <FormattedMessage
        id="contacts.search.results.title"
        defaultMessage="Search results"
        description="Title for search results on Contacts page"
      />
    </div>
    <div className="text-text-300 text-sm font-medium">
      <FormattedMessage
        id="contacts.search.results.no_results.text"
        defaultMessage="No results"
        description="Title for no search results on Contacts page"
      />
    </div>
  </div>);
}

type CatogorizedListProps = {
  values: Contact[]
}

function CatogorizedList({ values }: CatogorizedListProps) {
  const lang = useLanguage();

  const valuesMap = useMemo(
    () => sortContacts(values, lang.locale),
    [values, lang.locale]
  );

  const categories = useMemo<Category[]>(() => {
    return Object.keys(valuesMap).sort((a, b) =>
      a.localeCompare(b, lang.locale)
    );
  }, [valuesMap, lang.locale]);

  return (<>
    {categories.map((category) => (
      <div
        key={category}
        data-testid={`contact-category-container-${category}`}
      >
        <div
          className="text-text-300 text-xs ps-5 mb-3 font-medium"
          data-testid={`contact-category-title-${category}`}
        >
          {category}
        </div>
        <div
          className="flex flex-col gap-2"
          data-testid={`contact-category-items-${category}`}
        >
          {valuesMap[category].map((value, valueIndex) => (
            <Contact key={valueIndex} {...value} />
          ))}
        </div>
      </div>
    ))}
  </>);
}


type ListProps = {
  typeFilters: Contact["type"][]
}

function List({ typeFilters }: ListProps) {
  const { data } = useSuspenseQuery({
    queryKey: ["contacts"],
    queryFn: () => getContacts(),
  });

  const filtered = useMemo(() => {
    return data.contacts.filter((it) => typeFilters.length === 0 || typeFilters.includes(it.type))
  }, [data, typeFilters]);

  return (
    <div className="flex flex-col gap-2 mb-16">
      {data.contacts.length === 0 ? (
        <EmptyList />
      ) : (<>
        {filtered.length === 0 ? (<>
          <EmptySearchResult />
        </>) : (<>
          <CatogorizedList values={filtered} />
        </>)}
      </>)}
    </div>
  );
}

type SearchResultsProps = {
  typeFilters: Contact["type"][]
  values: Contact[]
}

function SearchResults({ typeFilters, values }: SearchResultsProps) {
  const filtered = useMemo(() => {
    return values.filter((it) => typeFilters.length === 0 || typeFilters.includes(it.type))
  }, [values, typeFilters]);

  return (
    <div className="flex flex-col gap-2 mb-16">
      {filtered.length === 0 ? (<>
        <EmptySearchResult />
      </>) : (<>
        <CatogorizedList values={filtered} />
      </>)}
    </div>
  );
}

export default function Contacts() {
  const { formatMessage: f } = useIntl();
  const [typeFilters, setTypeFilters] = useState<Contact["type"][]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchModeEnabled, setSearchModeEnabled] = useState(false);

  const {
    isFetching: searchIsLoading,
    data: searchData,
    refetch: doSearch,
  } = useQuery({
    queryKey: ["search", "contacts", searchTerm],
    queryFn: () => searchContacts({ search_term: searchTerm }),
    staleTime: 1,
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

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
          onChange={(value) => {
            setSearchTerm(value);
            if (value === "") {
              setSearchModeEnabled(false);
            }
          }}
          onSearch={() => {
            setSearchModeEnabled(searchTerm !== "");
            if (searchTerm) {
              void doSearch();
            }
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
          {searchModeEnabled ? (<>
            {searchIsLoading ? (<Loader />) : (<>
              <SearchResults typeFilters={typeFilters} values={searchData || []} />
            </>)}
          </>) : (<>
            <List typeFilters={typeFilters} />
          </>)}
        </Suspense>
      </div>
    </Page>
  );
}
