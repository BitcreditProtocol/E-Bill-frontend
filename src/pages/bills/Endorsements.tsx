import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FormattedMessage } from "react-intl";
import { ChevronsUpDownIcon, CalendarIcon } from "lucide-react";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import { Separator } from "@/components/ui/separator";
import Picture from "@/components/Picture";
import { getEndorsements } from "@/services/bills";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

function Loader() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="bg-elevation-250 h-6 w-1/2" />
      <Skeleton className="bg-elevation-250 h-44 w-full rounded-xl" />
    </div>
  );
}

type EndorsementProps = {
  payee: string;
  signer: string;
  address: string;
  timestamp: number;
};

function Endorsement({ payee, signer, timestamp }: EndorsementProps) {
  const formattedDate = format(new Date(timestamp * 1000), "dd MMM yyyy");

  return (
    <div className="flex flex-col border border-divider-75 rounded-xl">
      <div className="flex flex-col gap-3 p-3 bg-elevation-200 border-b border-b-divider-75 rounded-t-xl">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Picture type={1} name={payee} image="" size="sm" />

            <div className="flex flex-col gap-1">
              <span className="text-text-200 text-xs font-normal">
                <FormattedMessage
                  id="bill.endorsement.payee"
                  defaultMessage="Pay to the order of"
                  description="Payee label"
                />
              </span>
              <span className="text-text-300 text-sm font-medium">{payee}</span>
              <span className="text-text-200 text-xs font-normal">
                Address here
              </span>
            </div>
          </div>

          <Separator className="bg-divider-75" />

          <div className="flex items-center gap-2">
            <Picture type={1} name={signer} image="" size="sm" />

            <div className="flex flex-col gap-1">
              <span className="text-text-200 text-xs font-normal">
                <FormattedMessage
                  id="bill.endorsement.signer"
                  defaultMessage="Signed"
                  description="Signer label"
                />
              </span>
              <span className="text-text-300 text-sm font-medium">
                {signer}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 py-3 px-5">
        <CalendarIcon className="text-text-300 w-4 h-4 stroke-1" />
        <span className="text-text-300 text-xs font-normal">
          {formattedDate}
        </span>
      </div>
    </div>
  );
}

function List({ id }: { id: string }) {
  const { data } = useSuspenseQuery({
    queryKey: ["bills", id, "endorsements"],
    queryFn: () => getEndorsements(id),
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-text-300 text-base font-medium">
          <FormattedMessage
            id="bill.endorsements.title"
            defaultMessage="Endorsements ({count})"
            description="Endorsements title"
            values={{ count: data.past_endorsees.length }}
          />
        </h1>

        <button className="flex items-center gap-1 p-0 text-text-300 text-xs font-medium">
          <ChevronsUpDownIcon className="text-text-300 w-4 h-4 stroke-1" />

          <FormattedMessage
            id="bill.endorsements.sort"
            defaultMessage="Newest"
            description="Sort endorsements"
          />
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {data.past_endorsees.map((endorsement, index) => (
          <Endorsement
            key={index}
            payee={endorsement.pay_to_the_order_of.name}
            signer={endorsement.signed.name}
            timestamp={endorsement.signing_timestamp}
            address=""
          />
        ))}
      </div>
    </div>
  );
}

export default function Endorsements() {
  const { id } = useParams<{ id: string }>();

  return (
    <Page className="gap-6">
      <Topbar lead={<NavigateBack />} />

      <Suspense fallback={<Loader />}>
        <List id={id as string} />
      </Suspense>
    </Page>
  );
}
