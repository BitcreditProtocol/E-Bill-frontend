import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FormattedMessage } from "react-intl";
import { PencilIcon } from "lucide-react";

import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import Page from "@/components/wrappers/Page";
import { getContact } from "@/services/contact";
import Information, { Loader } from "./components/Information";
import Delete from "./components/Delete";

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

  return (
    <Page className="gap-6">
      <Topbar
        lead={<NavigateBack />}
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
          <button className="flex flex-col items-center justify-center h-8 w-8 bg-elevation-200 border border-divider-50 rounded-md">
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
