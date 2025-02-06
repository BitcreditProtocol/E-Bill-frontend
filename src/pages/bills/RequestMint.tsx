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
import { acceptMint, getBillDetails, requestToMint } from "@/services/bills";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import routes from "@/constants/routes";

function Mint({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center h-10 w-10 bg-elevation-200 p-2.5 border border-divider-50 rounded-full">
          <LandmarkIcon className="text-text-300 h-5 w-5 stroke-1" />
        </div>
        <span className="text-text-300 text-base font-medium">{name}</span>
      </div>

      <Checkbox />
    </div>
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


export default function RequestMint() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await requestToMint({
        bill_id: id as string,
        mint_node: "039180c169e5f6d7c579cf1cefa37bffd47a2b389c8125601f4068c87bea795943",
        sum: "1000",
        currency: "BTC",
      });
      await acceptMint({
        bill_id: id as string,
        sum: "1000",
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

      navigate(routes.SELECT_QUOTE.replace(":id", id as string))
    },
  });

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
        trail={<></>}
      />

      <div className="flex flex-col gap-6">
        <Suspense fallback={<Loader />}>
          <Information id={id as string} />
        </Suspense>
      </div>

      <div className="flex-1 flex flex-col gap-6">

        <div className="flex flex-col gap-4">
          <SectionTitle>
            <FormattedMessage
              id="bill.mint.request.selectMint"
              defaultMessage="Select a mint"
              description="Select a mint section title"
            />
          </SectionTitle>

          <div className="flex flex-col gap-3 p-4 border border-divider-75 rounded-xl">
            <Mint name="Wildcat One" />
            <Separator className="bg-divider-75" />
            <Mint name="Fishermans Mint" />
            <Separator className="bg-divider-75" />
            <Mint name="Whalers Mint" />
          </div>
        </div>

        <Button className="mt-auto" disabled={isPending} onClick={() => { mutate(); }}>
          <FormattedMessage
            id="bill.mint.request.action"
            defaultMessage="Request mint quote"
            description="Request mint quote button"
          />
        </Button>
      </div>
    </div>
  );
}
