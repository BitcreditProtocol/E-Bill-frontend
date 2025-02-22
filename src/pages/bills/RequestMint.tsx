import { FormattedMessage } from "react-intl";
import { LandmarkIcon } from "lucide-react";

import NavigateBack from "@/components/NavigateBack";
import Topbar from "@/components/Topbar";
import PageTitle from "@/components/typography/PageTitle";
import SectionTitle from "@/components/typography/SectionTitle";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Preview from "./components/Preview";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getBillDetails, requestToMint } from "@/services/bills";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import routes from "@/constants/routes";
import { getQuote } from "@/services/quotes";
import { cn } from "@/lib/utils";
import { CheckedState } from "@radix-ui/react-checkbox";
import { readMintList } from "@/constants/mints";
import { BillFull } from "@/types/bill";

type MintProps = {
  name: string;
  checked: boolean;
  onChange?: (c: CheckedState) => void;
  disabled?: boolean;
};

function Mint({ name, checked, onChange, disabled = false }: MintProps) {
  const checkboxRef = useRef<HTMLButtonElement>(null);
  return (
    <div className={cn("flex items-center justify-between", {
      "cursor-pointer": !disabled,
      "text-text-300": !disabled,
      "text-text-200": disabled
    })} onClick={() => { checkboxRef.current?.click(); }}>
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center h-10 w-10 bg-elevation-200 p-2.5 border border-divider-50 rounded-full">
          <LandmarkIcon className="h-5 w-5 stroke-1" />
        </div>
        <span className="text-base font-medium">{name}</span>
      </div>

      <Checkbox ref={checkboxRef} checked={checked} disabled={disabled} onCheckedChange={onChange}/>
    </div>
  );
}

function Loader() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-20 w-full bg-elevation-200" />
    </div>
  );
}

function RequestMintInner({ bill_id: id } : { bill_id: BillFull["id"] }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mintList = useMemo(() => readMintList(), []);

  const { data: bill } = useSuspenseQuery({
    queryKey: ["bills", id],
    queryFn: () => getBillDetails(id),
  });

  const { data: quote, isFetching } = useSuspenseQuery({
    queryKey: ["quotes", id],
    queryFn: () => getQuote(id).catch(() => { return null }),
    staleTime: 5_000,
    refetchOnMount: 'always',
    refetchOnReconnect: 'always',
    refetchOnWindowFocus: 'always',
  });

  useEffect(() => {
    if (quote) {
      if (quote.quote_id === '' || quote.token === '') {
        navigate(routes.SELECT_QUOTE.replace(":id", quote.bill_id), { replace: true })
      } else {
        navigate(routes.MINT_RECEIVED.replace(":id", quote.bill_id), { replace: true })
      }
    }
  }, [quote, navigate]);

  const { mutate: doRequestToMint, isPending } = useMutation({
    mutationFn: async (mint_node: string) => {
      await requestToMint({
        bill_id: bill.id,
        mint_node: mint_node,
        sum: bill.sum,
        currency: bill.currency,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["bills", id],
      });

      toast({
        description: (
          <FormattedMessage
            id="bill.mint.request.action.success"
            defaultMessage="Request sent successfully"
            description="Request mint success toast message"
          />
        ),
        position: "bottom-center",
      });

      navigate(routes.SELECT_QUOTE.replace(":id", id))
    },
  });

  const [selectedMints, setSelectedMints] = useState<typeof mintList>([]);

  return (
    <>
      <div className="flex flex-col gap-6">
        <Preview
          name={bill.drawee.name}
          date={bill.issue_date}
          amount={Number(bill.sum)}
          currency={bill.currency}
        />
      </div>

      {(isFetching || quote !== null) ? (
        <Loader />
      ) : (<div className="flex-1 flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <SectionTitle>
            <FormattedMessage
              id="bill.mint.request.selectMint"
              defaultMessage="Select a mint"
              description="Select a mint section title"
            />
          </SectionTitle>

          <div className="flex flex-col gap-3 p-4 border border-divider-75 rounded-xl">
            {mintList.map((it, index) => (
              <div key={index} className="flex flex-col gap-3">
                <Mint name={it.name}
                  disabled={!it.enabled}
                  checked={selectedMints.includes(it)}
                  onChange={(checked) => {
                    setSelectedMints((current) => checked ? [...current, it] : current.filter((v) => v !== it));
                  }} />
                {index < mintList.length - 1 && (
                  <Separator className="bg-divider-75" />
                )}
              </div>
            ))}
          </div>
        </div>

        <Button className="mt-auto" onClick={() => {
            doRequestToMint(selectedMints[0].node_id);
          }}
          disabled={selectedMints.length === 0 || isPending}>
          <FormattedMessage
            id="bill.mint.request.action"
            defaultMessage="Request mint quote"
            description="Request mint quote button"
          />
        </Button>
      </div>)}
    </>
  );
}

export default function RequestMint() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex flex-col min-h-fit h-screen gap-6 py-4 px-5 w-full select-none">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle>
            <FormattedMessage
              id="bill.mint.request.title"
              defaultMessage="Request to mint"
              description="Request to mint page title"
            />
          </PageTitle>
        }
      />

      <Suspense fallback={<Loader />}>
        <RequestMintInner bill_id={id as string} />
      </Suspense>
    </div>
  );
}
