import { Suspense, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useIntl } from "react-intl";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import RefreshButton from "@/components/RefreshButton";
import { useIdentity } from "@/context/identity/IdentityContext";
import { getBillDetails, getBillsAll } from "@/services/bills";
import { getQuote } from "@/services/quotes";
import Card, { Loader } from "./components/BillCard";
import Actions from "./components/Actions";
import EcashToken from "./mint/components/EcashToken";
import { API_URL } from "@/constants/api";
import { GET_BILL_ATTACHMENT } from "@/constants/endpoints";
import { MintConfig, readMintConfig } from "@/constants/mints";

const __dev_findInListAllIfMintViewIsEnabledOrThrow = (id: string, mintConfig: MintConfig, err: unknown) => {
  if (!mintConfig.__dev_mintViewEnabled) {
    throw err;
  } else {
    return getBillsAll().then((res) => {
      const filtered = res.bills.filter((it) => it.id === id);
      if (filtered.length === 1) {
        return filtered[0];
      }
      throw err;
    })
  }
}

function Details({ id }: { id: string }) {
  const { activeIdentity } = useIdentity();
  const mintConfig = useMemo(() => readMintConfig(), []);

  const { data } = useSuspenseQuery({
    queryKey: ["bills", id],
    queryFn: () => getBillDetails(id).catch((err: unknown) => {
      // try to fetch the bill from the "list all" endpoint if mint view is enabled
      return __dev_findInListAllIfMintViewIsEnabledOrThrow(id, mintConfig, err)
    }),
  });

  const { data: quote } = useQuery({
    queryKey: ["quotes", id],
    queryFn: () => getQuote(id).then((quote) => {
      return quote.quote_id === "" ? null : quote;
    }).catch(() => { return null })
  });

  // if drawee and current identity node ids are the same, then the role is payer
  // if bill is endorsed, and endorsee and current identity node ids are the same, then the role is holder
  const isPayer = data.drawee.node_id === activeIdentity.node_id;
  const isHolder =
    (data.endorsee && data.endorsee.node_id === activeIdentity.node_id) ||
    data.payee.node_id === activeIdentity.node_id;

  const role = isPayer ? "payer" : isHolder ? "holder" : null;
  const holder = data.endorsed && data.endorsee ? data.endorsee : data.payee;

  const hasAttachments = data.files.length > 0;
  const attachment = hasAttachments
    ? `${API_URL}${GET_BILL_ATTACHMENT}/${id}/${data.files[0].name}`
    : null;

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
        attachment={attachment}
      />

      {quote && quote.token && (
        <>
          <EcashToken token={quote.token} />
        </>
      )}

      {<Actions role={role} {...data} />}
    </div>
  );
}

export default function View() {
  const { formatMessage: f } = useIntl();
  const { id } = useParams<{ id: string }>();

  return (
    <Page className="gap-5">
      <Topbar
        lead={<NavigateBack />}
        trail={
          <RefreshButton
            label={f({
              id: "bill.status.refresh",
              defaultMessage: "Refresh",
              description: "Refresh button label",
            })}
            content={f({
              id: "bill.status.refresh.content",
              defaultMessage: "Refresh bill status",
              description: "Refresh bill status tooltip",
            })}
            onClick={() => {}}
          />
        }
      />

      <Suspense fallback={<Loader />}>
        <Details id={id as string} />
      </Suspense>
    </Page>
  );
}
