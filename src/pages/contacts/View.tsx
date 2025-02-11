import { Suspense, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useSuspenseQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { FormattedMessage, useIntl } from "react-intl";
import { PencilIcon, TrashIcon, TriangleAlert } from "lucide-react";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Summary from "@/components/Summary";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getContactDetails, removeContact } from "@/services/contact_v2";
import routes from "@/constants/routes";
import { COUNTRIES } from "@/constants/countries";
import { messages } from "./components/messages";
import Property from "./components/Property";

type DeleteContactProps = {
  contactId: string;
};

function Delete({ contactId }: DeleteContactProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { formatMessage: f } = useIntl();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return removeContact(contactId);
    },
    onSuccess: async () => {
      setIsDrawerOpen(false);

      await queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });

      toast({
        description: f({
          id: "contact.delete.success",
          defaultMessage: "Contact deleted successfully",
          description: "Contact deleted successfully toast message",
        }),
        position: "bottom-center",
      });

      navigate(routes.CONTACTS);
    },
  });

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
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
      <DrawerContent className="flex flex-col items-center gap-6 pb-5 px-5 max-w-[375px] bg-elevation-50 mx-auto">
        <DrawerHeader className="flex gap-2 w-full p-0">
          <TriangleAlert className="text-signal-error h-5 w-5 stroke-1" />

          <div className="flex flex-col gap-1.5">
            <DrawerTitle className="text-text-300 text-lg font-medium leading-normal">
              <FormattedMessage
                id="contact.view.delete.title"
                defaultMessage="Are you sure?"
                description="Delete contact title"
              />
            </DrawerTitle>
            <DrawerDescription className="text-text-200 text-xs font-normal leading-normal">
              <FormattedMessage
                id="contact.view.delete.description"
                defaultMessage="You can always re-add a contact later"
                description="Confirm delete contact description"
              />
            </DrawerDescription>
          </div>
        </DrawerHeader>

        <DrawerFooter className="flex flex-col gap-3 w-full p-0">
          <Button
            className="w-full"
            size="md"
            onClick={() => {
              mutate();
            }}
            disabled={isPending}
          >
            <FormattedMessage
              id="contact.view.delete.confirm"
              defaultMessage="Delete"
              description="Delete contact button"
            />
          </Button>
          <DrawerClose>
            <Button
              className="w-full"
              size="md"
              variant="outline"
              disabled={isPending}
            >
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

function Loader() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="h-16 w-16 bg-elevation-200 rounded-full" />
        <Skeleton className="h-5 w-1/2 bg-elevation-200" />
      </div>

      <div className="flex flex-col gap-6 py-6 px-5 border border-divider-75 rounded-xl">
        <Skeleton className="w-full h-10 bg-elevation-200" />
        <Separator className="bg-divider-75" />
        <Skeleton className="w-full h-10 bg-elevation-200" />
        <Separator className="bg-divider-75" />
        <Skeleton className="w-full h-10 bg-elevation-200" />
        <Separator className="bg-divider-75" />
        <Skeleton className="w-full h-10 bg-elevation-200" />
        <Separator className="bg-divider-75" />
        <Skeleton className="w-full h-10 bg-elevation-200" />
        <Separator className="bg-divider-75" />
        <Skeleton className="w-full h-10 bg-elevation-200" />
        <Separator className="bg-divider-75" />
        <Skeleton className="w-full h-10 bg-elevation-200" />
      </div>
    </div>
  );
}

function Information({ contactId }: { contactId: string }) {
  const { formatMessage: f } = useIntl();
  const { data } = useSuspenseQuery({
    queryKey: ["contacts", "details", contactId],
    queryFn: () => getContactDetails(contactId),
  });

  const {
    type,
    node_id,
    name,
    email,
    address,
    zip,
    city,
    country,
    date_of_birth_or_registration,
    country_of_birth_or_registration,
    city_of_birth_or_registration,
    identification_number,
  } = data;

  return (
    <div className="flex flex-col gap-4">
      <Summary identityType={type} name={name} nodeId={node_id} picture="" />

      <div className="flex flex-col gap-3 py-6 px-5 border border-divider-75 rounded-xl">
        <Property
          label={
            type === 0
              ? f(messages["contacts.person.name"])
              : f(messages["contacts.company.name"])
          }
          value={name}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={
            type === 0
              ? f(messages["contacts.person.email"])
              : f(messages["contacts.company.email"])
          }
          value={email}
        />
        <Separator className="bg-divider-75" />

        <Property label={f(messages["contacts.address"])} value={address} />
        <Separator className="bg-divider-75" />

        <Property
          label={f(messages["contacts.country"])}
          value={COUNTRIES[country as keyof typeof COUNTRIES]}
        />
        <Separator className="bg-divider-75" />

        <Property label={f(messages["contacts.city"])} value={city} />
        <Separator className="bg-divider-75" />

        <Property label={f(messages["contacts.zipCode"])} value={zip} />
        <Separator className="bg-divider-75" />

        <Property
          label={
            type === 0
              ? f(messages["contacts.person.dateOfBirth"])
              : f(messages["contacts.company.dateOfRegistration"])
          }
          value={date_of_birth_or_registration}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={
            type === 0
              ? f(messages["contacts.person.countryOfBirth"])
              : f(messages["contacts.company.countryOfRegistration"])
          }
          value={
            COUNTRIES[
              country_of_birth_or_registration as keyof typeof COUNTRIES
            ]
          }
        />
        <Separator className="bg-divider-75" />

        <Property
          label={
            type === 0
              ? f(messages["contacts.person.cityOfBirth"])
              : f(messages["contacts.company.cityOfRegistration"])
          }
          value={city_of_birth_or_registration}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={
            type === 0
              ? f(messages["contacts.person.identityNumber"])
              : f(messages["contacts.company.registrationNumber"])
          }
          value={identification_number}
        />
        <Separator className="bg-divider-75" />
      </div>
    </div>
  );
}

export default function View() {
  const { nodeId } = useParams<{ nodeId: string }>();

  return (
    <Page className="gap-6">
      <Topbar
        // todo: fix this route too lol
        lead={<NavigateBack route={routes.CONTACTS} />}
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
          // todo: fix route build
          <Link to={`/${routes.CONTACTS}/${nodeId as string}/edit`}>
            <button className="flex flex-col items-center justify-center h-8 w-8 bg-elevation-200 border border-divider-50 rounded-md">
              <PencilIcon className="text-text-300 h-5 w-5 stroke-1" />
            </button>
          </Link>
        }
      />

      <div className="flex flex-col gap-6">
        <Suspense fallback={<Loader />}>
          <Information contactId={nodeId as string} />
        </Suspense>

        <Delete contactId={nodeId as string} />
      </div>
    </Page>
  );
}
