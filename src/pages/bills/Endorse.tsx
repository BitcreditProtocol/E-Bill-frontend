import { Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { FormattedMessage } from "react-intl";
import { ChevronRightIcon, UserIcon } from "lucide-react";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ContactPicker from "@/components/Contact/ContactPicker";
import Picture from "@/components/Picture";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { endorse, getBillDetails } from "@/services/bills";
import Preview from "./components/Preview";

function Endorsee({
  endorsee,
  setEndorsee,
}: {
  endorsee: {
    type: number;
    node_id: string;
    name: string;
    address: string;
  } | null;
  setEndorsee: ({
    type,
    node_id,
    name,
    address,
  }: {
    type: number;
    node_id: string;
    name: string;
    address: string;
  }) => void;
}) {
  return (
    <ContactPicker
      onSelect={(contact) => {
        setEndorsee(contact);
      }}
    >
      {endorsee ? (
        <div className="flex items-center gap-3 py-4 px-3 border border-divider-75 border-dashed rounded-lg select-none">
          <Picture
            type={endorsee.type}
            name={endorsee.name}
            image=""
            size="sm"
          />
          <div className="flex flex-col items-start">
            <span className="text-text-300 text-base font-medium leading-6">
              {endorsee.name}
            </span>
            <span className="text-text-200 text-xs font-normal leading-5">
              {endorsee.address}
            </span>
          </div>
        </div>
      ) : (
        <button className="flex items-center justify-between gap-2 py-5 px-4 w-full bg-elevation-200 border border-divider-50 rounded-lg">
          <UserIcon className="text-text-300 h-5 w-5" />
          <span className="w-full text-text-300 text-left text-sm font-medium">
            <FormattedMessage
              id="bill.endorse.endorsee"
              defaultMessage="Endorsee"
              description="Endorsee"
            />
          </span>
          <ChevronRightIcon className="text-text-300 h-5 w-5" />
        </button>
      )}
    </ContactPicker>
  );
}

function ConfirmSign({
  canSubmit,
  id,
  endorsee,
}: {
  canSubmit: boolean;
  id: string;
  endorsee: string;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return endorse({
        bill_id: id,
        endorsee,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["bills", id],
      });

      toast({
        description: (
          <FormattedMessage
            id="bill.actions.requestAcceptance.success"
            defaultMessage="Request sent successfully"
            description="Request acceptance success toast message"
          />
        ),
        position: "bottom-center",
      });
    },
  });

  return (
    <Drawer>
      <DrawerTrigger>
        <Button className="w-full" size="md" disabled={!canSubmit}>
          <FormattedMessage
            id="bill.endorse.sign"
            defaultMessage="Sign"
            description="Sign button"
          />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-[375px] bg-elevation-50 mx-auto">
        <div className="flex flex-col gap-6 py-8 px-5">
          <div className="flex flex-col gap-1.5">
            <span className="text-text-300 text-lg font-medium">
              <FormattedMessage
                id="bill.endorse.sign"
                defaultMessage="Are you sure?"
                description="Endorsement signing"
              />
            </span>

            <span className="text-text-200 text-xs">
              <FormattedMessage
                id="bill.endorse.sign.description"
                defaultMessage="The signing of the endorsement is legally binding"
                description="Endorsement signing description"
              />
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              className="w-full"
              size="md"
              onClick={() => {
                mutate();
              }}
              disabled={!canSubmit || isPending}
            >
              <FormattedMessage
                id="bill.endorse.sign.confirm"
                defaultMessage="Confirm"
                description="Confirm button"
              />
            </Button>

            <DrawerClose>
              <Button className="w-full" variant="outline" size="md">
                <FormattedMessage
                  id="bill.endorse.sign.cancel"
                  defaultMessage="Cancel"
                  description="Cancel button"
                />
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function Loader() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-20 w-full bg-elevation-200" />
      <Skeleton className="h-16 w-full bg-elevation-200" />
    </div>
  );
}

function Information({ id }: { id: string }) {
  const { data } = useSuspenseQuery({
    queryKey: ["bills", id],
    queryFn: () => getBillDetails(id),
  });

  return (
    <Preview
      name={data.drawee.name}
      date={data.issue_date}
      amount={Number(data.sum)}
      currency="BTC"
    />
  );
}

export default function Endorse() {
  const { id } = useParams<{ id: string }>();
  const [endorsee, setEndorsee] = useState<{
    type: number;
    node_id: string;
    name: string;
    address: string;
  } | null>(null);
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);

  return (
    <div className="flex flex-col gap-6 max-w-[375px] bg-elevation-50 w-full min-h-fit h-screen py-4 px-5 absolute z-10">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle>
            <FormattedMessage
              id="endorse.title"
              defaultMessage="Endorse bill"
              description="Endorse title"
            />
          </PageTitle>
        }
      />

      <div className="flex flex-col gap-6">
        <Suspense fallback={<Loader />}>
          <Information id={id as string} />

          <div className="flex flex-col gap-1">
            <span className="text-text-300 text-sm font-normal leading-5">
              <FormattedMessage
                id="endorse.orderOf"
                defaultMessage="to the order of"
                description="Order of endorsement"
              />
            </span>

            <Endorsee endorsee={endorsee} setEndorsee={setEndorsee} />
          </div>
        </Suspense>
      </div>

      <div className="flex-1 flex flex-col justify-end gap-3">
        <div
          className="flex items-center gap-2"
          onClick={() => {
            setHasAgreedToTerms((current) => !current);
          }}
        >
          <Checkbox checked={hasAgreedToTerms} />

          <span className="text-text-300 text-base font-medium">
            <FormattedMessage
              id="bill.endorse.termsAndConditions"
              defaultMessage="I agree to the Terms and conditions"
              description="Terms and conditions"
            />
          </span>
        </div>

        <ConfirmSign
          canSubmit={hasAgreedToTerms && endorsee !== null}
          id={id as string}
          endorsee={endorsee?.node_id as string}
        />
      </div>
    </div>
  );
}
