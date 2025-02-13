import { Suspense } from "react";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import {
  BuildingIcon,
  ChevronRightIcon,
  CopyIcon,
  LogOutIcon,
} from "lucide-react";
import NavigateBack from "@/components/NavigateBack";
import Topbar from "@/components/Topbar";
import PageTitle from "@/components/typography/PageTitle";
import Page from "@/components/wrappers/Page";
import { Skeleton } from "@/components/ui/skeleton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Picture from "@/components/Picture";
import RefreshButton from "@/components/RefreshButton";
import { useToast } from "@/hooks/use-toast";
import { useIdentity } from "@/context/identity/IdentityContext";
import { checkCompaniesInDHT, getCompanies } from "@/services/company";
import { getIdentityDetails } from "@/services/identity_v2";
import { copyToClipboard } from "@/utils";
import { truncateString } from "@/utils/strings";
import routes from "@/constants/routes";
import { API_URL } from "@/constants/api";

function SelectedIdentity() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { activeIdentity } = useIdentity();

  if (!activeIdentity.node_id) {
    return <Skeleton className="h-16 w-full bg-elevation-200" />;
  }

  const { node_id, type, name, avatar } = activeIdentity;

  const truncatedNodeId = truncateString(node_id, 14);
  const viewIdentityRoute =
    type === "company" ? routes.VIEW_COMPANY : routes.VIEW_IDENTITY;

  return (
    <div className="flex items-center gap-3">
      <Picture
        type={type === "company" ? 1 : 0}
        name={name}
        image={avatar || ""}
        size="lg"
      />

      <div className="flex flex-col gap-1.5">
        <span className="text-text-300 text-base font-medium leading-[1.875rem]">
          {name}
        </span>

        <button
          className="flex items-center gap-1 text-text-200 text-xs leading-normal"
          onClick={() => {
            void copyToClipboard(node_id, () => {
              toast({
                description: "Copied to clipboard",
                position: "bottom-center",
                duration: 750
              });
            });
          }}
        >
          {truncatedNodeId}

          <CopyIcon className="h-4 w-4 stroke-1" />
        </button>
      </div>

      <button
        className="flex items-center gap-0.5 p-0 text-text-300 text-sm font-normal ml-auto"
        onClick={() => {
          navigate(viewIdentityRoute);
        }}
      >
        <FormattedMessage
          id="identity.list.view"
          defaultMessage="View"
          description="Select identity button label"
        />

        <ChevronRightIcon className="text-text-300 h-6 w-6 stroke-1" />
      </button>
    </div>
  );
}

type IdentityProps = {
  node_id: string;
  type: "personal" | "company";
  name: string;
  address: string;
  avatar: string;
};

function Identity({ node_id, type, name, address, avatar }: IdentityProps) {
  const { switchActiveIdentity } = useIdentity();

  return (
    <div
      className="flex items-center gap-3 py-4 px-3 border border-divider-75 rounded-lg cursor-pointer"
      onClick={() => void switchActiveIdentity({ node_id, type })}
    >
      <Picture
        type={type === "company" ? 1 : 0}
        name={name}
        image={avatar}
        size="md"
      />
      <div className="flex flex-col mr-auto">
        <span className="text-text-300 text-base font-medium leading-5">
          {name}
        </span>
        <span className="text-text-200 text-xs leading-normal">{address}</span>
      </div>
      <RadioGroupItem value={node_id} />
    </div>
  );
}

function PersonalIdentity() {
  const { data } = useSuspenseQuery({
    queryKey: ["identity", "personal"],
    queryFn: () => getIdentityDetails(),
  });

  const avatarUrl =
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    data.profile_picture_file !== null
      ? `${API_URL}/identity/file/${data.profile_picture_file.name}`
      : "";

  return (
    <Identity
      node_id={data.node_id}
      type="personal"
      name={data.name}
      address={data.address}
      avatar={avatarUrl}
    />
  );
}

function CompaniesLoader() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-12 w-full bg-elevation-200" />
      <Skeleton className="h-12 w-full bg-elevation-200" />
      <Skeleton className="h-12 w-full bg-elevation-200" />
    </div>
  );
}

function Companies() {
  const { data } = useSuspenseQuery({
    queryKey: ["companies"],
    queryFn: () => getCompanies(),
  });

  return data.companies.map((company) => (
    <Identity
      key={company.id}
      node_id={company.id}
      type="company"
      name={company.name}
      address={company.address}
      avatar={
         
        company.logo_file !== null
          ? `${API_URL}/company/file/${company.id}/${company.logo_file.name}`
          : ""
      }
    />
  ));
}

function CreateCompanyIdentity() {
  return (
    <Link className="w-full" to={routes.CREATE_COMPANY}>
      <button className="flex items-center justify-between gap-6 w-full py-6 px-3 bg-elevation-200 border border-divider-75 rounded-xl">
        <div className="flex items-center gap-2">
          <BuildingIcon className="h-6 w-6 text-text-300 stroke-1" />

          <span className="text-text-300 text-sm font-medium leading-5">
            <FormattedMessage
              id="identity.list.createCompanyIdentity"
              defaultMessage="Create new company"
            />
          </span>
        </div>

        <ChevronRightIcon className="text-text-300 h-4 w-4 stroke-1" />
      </button>
    </Link>
  );
}

function Remove() {
  return (
    <button className="flex items-center gap-1 text-brand-200 text-xs font-medium">
      <FormattedMessage
        id="identity.list.remove"
        defaultMessage="Remove identity from device"
      />

      <LogOutIcon className="h-3 w-3 stroke-1" />
    </button>
  );
}

export default function List() {
  const { formatMessage: f } = useIntl();
  const { activeIdentity } = useIdentity();

  const { refetch, isFetching } = useQuery({
    queryFn: () => checkCompaniesInDHT(),
    queryKey: ["companies", "check"],
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return (
    <Page className="gap-7">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle>
            <FormattedMessage
              id="identity.list"
              defaultMessage="Switch identity"
              description="Switch identity page title"
            />
          </PageTitle>
        }
      />

      <div className="flex flex-col gap-6">
        <SelectedIdentity />

        <RadioGroup value={activeIdentity.node_id || ""}>
          <div className="flex flex-col gap-3">
            <span className="text-text-200 text-sm font-medium leading-5">
              <FormattedMessage
                id="identity.list.personal"
                defaultMessage="Personal identity"
              />
            </span>
            <Suspense
              fallback={<Skeleton className="h-12 w-full bg-elevation-200" />}
            >
              <PersonalIdentity />
            </Suspense>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-text-200 text-sm font-medium leading-5">
                <FormattedMessage
                  id="identity.list.companies"
                  defaultMessage="Company identities"
                />
              </span>

              <RefreshButton
                label={f({
                  id: "identity.list.refresh",
                  defaultMessage: "Refresh",
                  description: "Refresh companies list button label",
                })}
                content={f({
                  id: "identity.list.refresh.content",
                  defaultMessage: "Refresh companies list",
                  description: "Refresh companies list tooltip",
                })}
                onClick={() => {
                  void refetch();
                }}
                loading={isFetching}
              />
            </div>
            <Suspense fallback={<CompaniesLoader />}>
              <Companies />
            </Suspense>
          </div>
        </RadioGroup>

        <div className="flex flex-col items-center gap-6">
          <CreateCompanyIdentity />
          <Remove />
        </div>
      </div>
    </Page>
  );
}
