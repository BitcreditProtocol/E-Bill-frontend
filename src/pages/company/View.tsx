import { Suspense } from "react";
import { Link } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FormattedMessage, useIntl } from "react-intl";
import { PencilIcon, UserIcon } from "lucide-react";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import Summary from "@/components/Summary";
import { getCompanyDetails } from "@/services/company";
import routes from "@/constants/routes";
import type { Company } from "@/types/company";
import Property from "./components/Property";
import { messages } from "./components/messages";

function ViewAuthorizedSigners() {
  return (
    <Link className="p-0 mx-auto" to={routes.COMPANY_SIGNERS}>
      <button className="flex items-center gap-1 p-0 text-brand-200 text-xs font-medium leading-normal">
        <FormattedMessage
          id="company.view.signers"
          defaultMessage="Edit authorized signers"
          description="Edit authorized signers button label"
        />
        <UserIcon className="text-brand-200 h-3 w-3" />
      </button>
    </Link>
  );
}

function Loader() {
  return (
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
  );
}

function Information({ companyId }: { companyId: string }) {
  const { formatMessage: f } = useIntl();
  const { data } = useSuspenseQuery<Company>({
    queryKey: ["company", companyId, "details"],
    queryFn: () => getCompanyDetails(companyId),
  });

  const combinedAddress = `${data.address}, ${
    data.zip !== "" ? data.zip + ", " : ""
  }${data.city}, ${data.country}`;

  return (
    <div className="flex flex-col gap-3 py-6 px-5 border border-divider-75 rounded-xl">
      <Property label={f(messages["company.name"])} value={data.name} />
      <Separator className="bg-divider-75" />

      <Property label={f(messages["company.email"])} value={data.email} />
      <Separator className="bg-divider-75" />

      <Property
        label={f(messages["company.address"])}
        value={combinedAddress}
      />
      <Separator className="bg-divider-75" />

      <Property
        label={f(messages["company.country_of_registration"])}
        value={data.country_of_registration}
      />
      <Separator className="bg-divider-75" />

      <Property
        label={f(messages["company.city_of_registration"])}
        value={data.city_of_registration}
      />
      <Separator className="bg-divider-75" />

      <Property
        label={f(messages["company.registration_number"])}
        value={data.registration_number}
      />
    </div>
  );
}

export default function View() {
  return (
    <Page className="gap-6">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle>
            <FormattedMessage
              id="company.view.title"
              defaultMessage="Company details"
              description="Company details page title"
            />
          </PageTitle>
        }
        trail={
          <Link to={routes.EDIT_COMPANY}>
            <button className="flex flex-col items-center justify-center h-8 w-8 bg-elevation-200 border border-divider-50 rounded-md">
              <PencilIcon className="text-text-300 h-5 w-5 stroke-1" />
            </button>
          </Link>
        }
      />

      <Summary
        identityType={1}
        name="Company Name"
        nodeId="0x1234567890"
        picture=""
      />

      <Suspense fallback={<Loader />}>
        <Information companyId="1" />
      </Suspense>

      <ViewAuthorizedSigners />
    </Page>
  );
}
