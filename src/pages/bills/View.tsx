import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import { getBillDetails } from "@/services/bills";
import Card, { Loader } from "./components/BillCard";
import Actions from "./components/Actions";

function Details({ id }: { id: string }) {
  const { data } = useSuspenseQuery({
    queryKey: ["bills", id],
    queryFn: () => getBillDetails(id),
  });

  return (
    <div className="flex-1 flex flex-col justify-between">
      <Card
        id={data.id}
        sum={data.sum}
        city_of_issuing={data.city_of_issuing}
        country_of_issuing={data.country_of_issuing}
        issue_date={data.issue_date}
        maturity_date={data.maturity_date}
        payee={{ name: data.payee.name, address: data.payee.address }}
        drawee={{ name: data.drawee.address, address: data.drawee.address }}
        drawer={{ name: data.drawer.name, address: data.drawer.address }}
        city_of_payment={data.city_of_payment}
        country_of_payment={data.country_of_payment}
        endorsed={data.endorsed}
      />
      <Actions role="holder" {...data} />
    </div>
  );
}

export default function View() {
  const { id } = useParams<{ id: string }>();

  return (
    <Page className="gap-5">
      <Topbar lead={<NavigateBack />} />

      <Suspense fallback={<Loader />}>
        <Details id={id as string} />
      </Suspense>

      <div className="flex flex-col gap-3 mt-auto"></div>
    </Page>
  );
}
