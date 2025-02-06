import { Suspense, useState } from "react";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { FormattedMessage } from "react-intl";
import {
  ChevronRightIcon,
  TrashIcon,
  TriangleAlertIcon,
  UserIcon,
} from "lucide-react";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import Summary from "@/components/Summary";
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
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  addSignatory,
  getCompanySigners,
  removeSignatory,
} from "@/services/company";
import { useIdentity } from "@/context/identity/IdentityContext";
import ContactPicker from "@/components/Contact/ContactPicker";
import { useToast } from "@/hooks/use-toast";

type RemoveSignerProps = {
  id: string;
  name: string;
  companyId: string;
};

function RemoveSigner({ id, name, companyId }: RemoveSignerProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return removeSignatory({
        id: companyId,
        signatory_node_id: id,
      });
    },
    onSuccess: async () => {
      setIsDrawerOpen(false);

      await queryClient.invalidateQueries({
        queryKey: ["company", "signers", companyId],
      });

      toast({
        description: (
          <FormattedMessage
            id="company.signer.remove.success"
            defaultMessage="Authorized signer removed successfully"
            description="Delete company authorized signer success message"
          />
        ),
        position: "bottom-center",
      });
    },
  });

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <button className="p-0">
          <TrashIcon className="text-text-300 h-5 w-5 stroke-1" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col items-center gap-6 pb-5 px-5 max-w-[375px] bg-elevation-50 mx-auto">
        <DrawerHeader className="flex gap-2 w-full p-0">
          <TriangleAlertIcon className="text-signal-error h-5 w-5 stroke-1" />
          <div className="flex flex-col gap-1.5">
            <DrawerTitle className="text-text-300 text-lg font-medium leading-normal">
              <FormattedMessage
                id="company.signer.remove"
                defaultMessage="Do you want to delete {name}?"
                description="Delete company authorized signer confirmation message"
                values={{ name }}
              />
            </DrawerTitle>
            <DrawerDescription className="text-text-200 text-xs font-normal leading-normal">
              <FormattedMessage
                id="company.signer.remove.warning"
                defaultMessage="You can always re-add a signer later"
                description="Delete company authorized signer warning message"
              />
            </DrawerDescription>
          </div>
        </DrawerHeader>
        <DrawerFooter className="flex flex-col gap-3 w-full p-0">
          <Button
            size="md"
            onClick={() => {
              mutate();
            }}
            disabled={isPending}
          >
            <FormattedMessage
              id="company.signer.remove.confirm"
              defaultMessage="Confirm"
              description="Delete company authorized signer confirmation button"
            />
          </Button>
          <DrawerClose asChild>
            <Button
              className="w-full"
              variant="outline"
              size="md"
              disabled={isPending}
            >
              <FormattedMessage
                id="company.signer.remove.cancel"
                defaultMessage="Cancel"
                description="Delete company authorized signer cancel button"
              />
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

type SignerProps = {
  companyId: string;
  id: string;
  name: string;
  address: string;
  avatar: string;
};

function Signer({ companyId, id, name, address, avatar }: SignerProps) {
  return (
    <div className="flex items-center gap-3 py-4 px-3 border border-dashed border-divider-75 rounded-lg">
      {avatar}
      <div className="flex flex-col mr-auto">
        <span className="text-text-300 text-base font-medium leading-6">
          {name}
        </span>
        <span className="text-text-200 text-xs font-normal leading-normal">
          {address}
        </span>
      </div>
      <RemoveSigner id={id} name={name} companyId={companyId} />
    </div>
  );
}

function AddSigner({ company_id }: { company_id: string }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: ({ node_id }: { node_id: string }) => {
      return addSignatory({
        id: company_id,
        signatory_node_id: node_id,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["company", "signers", company_id],
      });

      toast({
        description: (
          <FormattedMessage
            id="company.signer.add.success"
            defaultMessage="Authorized signer added successfully"
            description="Add company authorized signer success message"
          />
        ),
        position: "bottom-center",
      });
    },
  });

  return (
    <ContactPicker
      onSelect={(contact) => {
        mutate({ node_id: contact.node_id });
      }}
    >
      <button className="flex items-center gap-2 py-6 px-3 w-full border border-divider-75 bg-elevation-200 rounded-xl">
        <UserIcon className="text-text-300 h-6 w-6 stroke-1" />
        <span className="text-text-300 text-sm font-medium leading-5 mr-auto">
          <FormattedMessage
            id="company.signer.add"
            defaultMessage="Add authorized signer"
            description="Add company authorized signer button"
          />
        </span>
        <ChevronRightIcon className="text-text-300 h-4 w-4 stroke-1" />
      </button>
    </ContactPicker>
  );
}

function Loader() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-12 w-full bg-elevation-200" />
      <Skeleton className="h-12 w-full bg-elevation-200" />
      <Skeleton className="h-12 w-full bg-elevation-200" />
    </div>
  );
}

function List({ companyId }: { companyId: string }) {
  const { data } = useSuspenseQuery({
    queryKey: ["company", "signers", companyId],
    queryFn: () => getCompanySigners(companyId),
  });

  return (
    <div className="flex flex-col gap-2 mb-1">
      {data.signatories.map((signer) => (
        <Signer
          key={signer.node_id}
          companyId={companyId}
          id={signer.node_id}
          name={signer.name}
          address={signer.address}
          avatar=""
        />
      ))}
    </div>
  );
}

export default function Signers() {
  const { activeIdentity } = useIdentity();

  return (
    <Page className="gap-5">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle>
            <FormattedMessage
              id="company.signers"
              defaultMessage="Authorized signers"
              description="Company authorized signers page"
            />
          </PageTitle>
        }
      />

      <Summary
        identityType={1}
        name={activeIdentity.name}
        nodeId={activeIdentity.node_id as string}
        picture={activeIdentity.avatar}
      />

      <Suspense fallback={<Loader />}>
        <List companyId={activeIdentity.node_id as string} />
      </Suspense>
      <AddSigner company_id={activeIdentity.node_id as string} />
    </Page>
  );
}
