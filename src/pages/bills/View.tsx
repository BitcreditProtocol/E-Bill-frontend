import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import { useIdentity } from "@/context/identity/IdentityContext";
import { getBillDetails } from "@/services/bills";
import Card, { Loader } from "./components/BillCard";
import Actions from "./components/Actions";

function Details({ id }: { id: string }) {
  const { activeIdentity } = useIdentity();

  const { data } = useSuspenseQuery({
    queryKey: ["bills", id],
    queryFn: () => getBillDetails(id),
  });

  // if drawee and current identity node ids are the same, then the role is payer
  // if bill is endorsed, and endorsee and current identity node ids are the same, then the role is holder
  const isPayer = data.drawee.node_id === activeIdentity.node_id;
  const isHolder =
    (data.endorsee && data.endorsee.node_id === activeIdentity.node_id) ||
    data.payee.node_id === activeIdentity.node_id;

  const role = isPayer ? "payer" : isHolder ? "holder" : null;
  const holder = data.endorsed && data.endorsee ? data.endorsee : data.payee;

  return (
    <div className="flex-1 flex flex-col gap-5 justify-between">
      <Card
        id={data.id}
        sum={data.sum}
        city_of_issuing={data.city_of_issuing}
        country_of_issuing={data.country_of_issuing}
        issue_date={data.issue_date}
        maturity_date={data.maturity_date}
        holder={{ name: holder.name, address: holder.address }}
        payer={{ name: data.drawee.name, address: data.drawee.address }}
        drawer={{ name: data.drawer.name, address: data.drawer.address }}
        city_of_payment={data.city_of_payment}
        country_of_payment={data.country_of_payment}
        endorsed={data.endorsed}
        requested_to_accept={data.requested_to_accept}
        requested_to_pay={data.requested_to_pay}
        accepted={data.accepted}
        paid={data.paid}
        waiting_for_payment={data.waiting_for_payment}
      />

      {role === null ? <></> : <Actions role={role} {...data} />}
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
    </Page>
  );
}
