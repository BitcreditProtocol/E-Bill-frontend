import { Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FormattedMessage } from "react-intl";
import { PencilIcon, TrashIcon, TriangleAlert } from "lucide-react";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { getContact } from "@/services/contact";
import Information, { Loader } from "./components/Information";

function Delete() {
  return (
    <Drawer>
      <DrawerTrigger className="flex items-center justify-center gap-1 w-full bg-transparent">
        <span className="text-brand-200 text-sm font-medium">
          <FormattedMessage
            id="contact.view.delete"
            defaultMessage="Delete contact"
            description="Delete contact button"
          />
        </span>
        <TrashIcon className="w-3 h-3 text-brand-200" />
      </DrawerTrigger>
      <DrawerContent className="max-w-[375px] mx-auto bg-elevation-50">
        <div className="flex gap-2 pt-8 px-5">
          <TriangleAlert className="text-signal-error h-5 w-5 stroke-1" />

          <div className="flex flex-col gap-1.5">
            <span className="text-text-300 text-[18px] font-medium leading-[28px]">
              <FormattedMessage
                id="contact.view.delete.title"
                defaultMessage="Are you sure?"
                description="Delete contact title"
              />
            </span>
            <span className="text-text-200 text-xs font-normal leading-[18px]">
              <FormattedMessage
                id="contact.view.delete.description"
                defaultMessage="You can always re-add a contact later"
                description="Confirm delete contact description"
              />
            </span>
          </div>
        </div>

        <DrawerFooter>
          <Button className="w-full" size="md">
            <FormattedMessage
              id="contact.view.delete.confirm"
              defaultMessage="Delete"
              description="Delete contact button"
            />
          </Button>
          <DrawerClose>
            <Button className="w-full" size="md" variant="outline">
              <FormattedMessage
                id="contact.view.delete.cancel"
                defaultMessage="Cancel"
                description="Cancel button"
              />
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function Details({ node_id }: { node_id: string }) {
  const { data } = useSuspenseQuery({
    queryKey: ["contacts", "details", node_id],
    queryFn: () => getContact(node_id),
  });

  return (
    <Information
      type={data.type === 0 ? "person" : "company"}
      node_id={data.node_id}
      name={data.name}
      email={data.email}
      country={data.country}
      city={data.city}
      zip={data.zip}
      address={data.address}
      date_of_birth_or_registration={data.date_of_birth_or_registration}
      country_of_birth_or_registration={data.country_of_birth_or_registration}
      city_of_birth_or_registration={data.city_of_birth_or_registration}
      identification_number={data.identification_number}
    />
  );
}

export default function View() {
  const { node_id } = useParams<{ node_id: string }>();
  const navigate = useNavigate();

  return (
    <Page className="gap-6">
      <Topbar
        lead={<NavigateBack route="/contacts" />}
        middle={
          <PageTitle>
            <FormattedMessage
              id="contacts.view.title"
              defaultMessage="View contact"
              description="Title for view contact page"
            />
          </PageTitle>
        }
        trail={
          <button
            className="flex flex-col items-center justify-center h-8 w-8 bg-elevation-200 border border-divider-50 rounded-md"
            onClick={() => {
              navigate(`/contacts/${node_id as string}/edit`);
            }}
          >
            <PencilIcon className="text-text-300 h-5 w-5 stroke-1" />
          </button>
        }
      />

      <div className="flex flex-col gap-6">
        <Suspense fallback={<Loader />}>
          <Details node_id={node_id as string} />
        </Suspense>

        <Delete />
      </div>
    </Page>
  );
}
