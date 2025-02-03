import { Suspense, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FormattedMessage, useIntl } from "react-intl";
import Topbar from "../Topbar";
import NavigateBack from "../NavigateBack";
import PageTitle from "../typography/PageTitle";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Skeleton } from "../ui/skeleton";
import Search from "../ui/search";
import { getContacts } from "@/services/contact_v2";
import { Card } from "./Card";
import Information from "./Information";

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

function List({ onSelect }: { onSelect: (e: string) => void }) {
  const { data } = useSuspenseQuery({
    queryKey: ["contacts"],
    queryFn: () => getContacts(),
  });

  return (
    <div className="flex flex-col gap-2">
      {data.contacts.map((contact) => (
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

type ContactPickerProps = {
  children: React.ReactNode;
  onSelect: () => void;
};

export default function ContactPicker({ children }: ContactPickerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentStep, setCurrentStep] = useState<"LIST" | "VIEW">("LIST");
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const { formatMessage: f } = useIntl();

  const navigateBack = () => {
    if (currentStep === "VIEW") {
      setSelectedContact(null);
      setCurrentStep("LIST");
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
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

        <div className="flex flex-col gap-3">
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
        </div>

        {currentStep === "LIST" && (
          <Suspense fallback={<Loader />}>
            <List
              onSelect={(e) => {
                setSelectedContact(e);
                setCurrentStep("VIEW");
              }}
            />
          </Suspense>
        )}

        {currentStep === "VIEW" && selectedContact !== null && (
          <Information
            nodeId={selectedContact}
            selectContact={() => {
              console.log("selection works");
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
