import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { PencilIcon } from "lucide-react";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import Summary from "@/components/Summary";
import { getIdentityDetails } from "@/services/identity_v2";
import routes from "@/constants/routes";
import { COUNTRIES } from "@/constants/countries";
import { API_URL } from "@/constants/api";
import Property from "./components/Property";
import { messages } from "./components/messages";
import { format, parseISO } from "date-fns";

function Loader() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="h-16 w-16 bg-elevation-200 rounded-full" />
        <Skeleton className="h-5 w-1/2 bg-elevation-200" />
      </div>

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
    </div>
  );
}

function Information() {
  const { formatMessage: f } = useIntl();
  const { data } = useSuspenseQuery({
    queryFn: () => getIdentityDetails(),
    queryKey: ["identity", "details"],
  });

  const {
    node_id,
    name,
    email,
    address,
    zip,
    city,
    country,
    date_of_birth,
    country_of_birth,
    city_of_birth,
    identification_number,
    profile_picture_file,
  } = data;

  const avatar =
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    profile_picture_file
      ? `${API_URL}/identity/file/${profile_picture_file.name}`
      : "";
  // todo: standardize date format; maybe use an util
  const formattedDateOfBirth =
    date_of_birth && date_of_birth !== ""
      ? format(parseISO(date_of_birth), "dd-MMM-yyyy")
      : "";
  const combinedAddress =
    [address, zip, city, COUNTRIES[country as keyof typeof COUNTRIES]]
      .filter(Boolean)
      .join(", ") || "-";

  return (
    <div className="flex flex-col gap-4">
      <Summary identityType={0} name={name} nodeId={node_id} picture={avatar} />

      <div className="flex flex-col gap-3 py-6 px-5 border border-divider-75 rounded-xl">
        <Property label={f(messages["identity.name"])} value={name} />
        <Separator className="bg-divider-75" />

        <Property label={f(messages["identity.email"])} value={email} />
        <Separator className="bg-divider-75" />

        <Property
          label={f(messages["identity.address"])}
          value={combinedAddress}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={f(messages["identity.date_of_birth"])}
          value={formattedDateOfBirth}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={f(messages["identity.country_of_birth"])}
          value={COUNTRIES[country_of_birth as keyof typeof COUNTRIES]}
        />
        <Separator className="bg-divider-75" />

        <Property
          label={f(messages["identity.city_of_birth"])}
          value={city_of_birth}
        />
        <Separator className="bg-divider-75 mt-0.5" />

        <Property
          label={f(messages["identity.identification_number"])}
          value={identification_number}
        />
      </div>
    </div>
  );
}

export default function View() {
  return (
    <Page className="gap-5">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle>
            <FormattedMessage
              id="identity.view"
              defaultMessage="Personal identity"
              description="View personal identity title"
            />
          </PageTitle>
        }
        trail={
          <Link to={routes.EDIT_IDENTITY}>
            <button className="flex flex-col items-center justify-center h-8 w-8 bg-elevation-200 border border-divider-50 rounded-md">
              <PencilIcon className="text-text-300 h-5 w-5 stroke-1" />
            </button>
          </Link>
        }
      />

      <div className="flex flex-col gap-6">
        <Suspense fallback={<Loader />}>
          <Information />
        </Suspense>
      </div>
    </Page>
  );
}
