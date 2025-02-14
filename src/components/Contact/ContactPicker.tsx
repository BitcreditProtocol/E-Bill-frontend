import { Suspense, useState } from "react";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { FormattedMessage, useIntl } from "react-intl";
import { getContacts } from "@/services/contact_v2";
import { Contact } from "@/types/contact";

import Topbar from "../Topbar";
import NavigateBack from "../NavigateBack";
import PageTitle from "../typography/PageTitle";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Skeleton } from "../ui/skeleton";
import Search from "../ui/search";
import { Card } from "./Card";
import Information from "./Information";
import { cn } from "@/lib/utils";
import { searchContacts } from "@/services/search";
import EmptyList from "@/pages/contacts/components/EmptyList";

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
  values: Contact[], 
  onSelect: (e: string) => void
};

function List({ values, onSelect }: ListProps) {
  return (
    <div className="flex flex-col gap-2">
      {values.map((contact) => (
        <Card
          key={contact.node_id}
          {...contact}
          onClick={() => {
            onSelect(contact.node_id);
          }}
        />
      ))}
    </div>
  );
}

function ListAll({ onSelect }: Pick<ListProps, 'onSelect'>) {
  const { data } = useSuspenseQuery({
    queryKey: ["contacts"],
    queryFn: () => getContacts(),
  });

  return (
    <>
      {data.contacts.length === 0 ? (
        <EmptyList />
      ) : (
        <List values={data.contacts}  onSelect={onSelect}/>
      )}
    </>
  );
}

function EmptySearchResult() {
  return (<div className="flex flex-col gap-4">
    <div className="text-text-200 text-xs font-medium">
      <FormattedMessage
        id="contacts.picker.search.results.title"
        defaultMessage="Search results"
        description="Title for search results  in Contact Picker dialog"
      />
    </div>
    <div className="text-text-300 text-sm font-medium">
      <FormattedMessage
        id="contacts.picker.search.results.no_results.text"
        defaultMessage="No results"
        description="Title for no search results in Contact Picker dialog"
      />
    </div>
  </div>);
}

type SearchResultsProps = ListProps

function SearchResults({ values, onSelect }: SearchResultsProps) {
  return (
    <>
      {values.length === 0 ? (<>
        <EmptySearchResult />
      </>) : (<>
        <List values={values}  onSelect={onSelect}/>
      </>)}
    </>
  );
}

const STEPS = {
  LIST: "LIST",
  INFORMATION: "INFORMATION",
} as const;

type ContactPickerProps = {
  children: React.ReactNode;
  onSelect: (contact: Contact) => void;
  canEdit?: boolean;
};

export default function ContactPicker({
  children,
  onSelect,
  canEdit = true,
}: ContactPickerProps) {
  const { formatMessage: f } = useIntl();
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<keyof typeof STEPS>(
    STEPS.LIST
  );
  const [viewingContact, setViewingContact] = useState<string | null>(null);

  const navigateBack = () => {
    if (currentStep === STEPS.LIST) {
      setOpen(false);
      return;
    }

    setCurrentStep(STEPS.LIST);
    setViewingContact(null);
  };


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
    <Dialog
      open={open}
      onOpenChange={() => {
        if (!canEdit) return;

        setOpen((prev) => !prev);
        setCurrentStep(STEPS.LIST);
        setViewingContact(null);
      }}
    >
      <DialogTrigger
        className={cn({
          "cursor-pointer": canEdit,
          "cursor-default": !canEdit,
        })}
      >
        {children}
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-5 py-6 px-5 h-full max-w-[375px] bg-elevation-50">
        <Topbar
          className="mb-2.5"
          lead={<NavigateBack callBack={navigateBack} />}
          middle={
            <PageTitle>
              <FormattedMessage
                id="contacts.select.title"
                defaultMessage="Select contact"
                description="Select contact title"
              />
            </PageTitle>
          }
        />

        {currentStep !== STEPS.INFORMATION && (
          <div className="flex flex-col gap-3">
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
          </div>
        )}

        <Suspense fallback={<Loader />}>
          {currentStep === STEPS.LIST && (
            <>
              {searchModeEnabled ? (<>
                {searchIsLoading ? (<Loader />) : (<>
                  <SearchResults values={searchData || []} 
                    onSelect={(contactId) => {
                      setCurrentStep(STEPS.INFORMATION);
                      setViewingContact(contactId);
                    }}/>
                </>)}
              </>) : (
                <ListAll
                  onSelect={(contactId) => {
                    setCurrentStep(STEPS.INFORMATION);
                    setViewingContact(contactId);
                  }}
                />)}
            </>
          )}

          {currentStep === STEPS.INFORMATION && viewingContact !== null && (
            <Information
              nodeId={viewingContact}
              onSelect={(contact) => {
                onSelect(contact);
                setOpen(false);
              }}
            />
          )}
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
