import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
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
import IdentityAvatar from "@/components/IdentityAvatar";
import { Skeleton } from "@/components/ui/skeleton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { truncateString } from "@/utils/strings";
import routes from "@/constants/routes";
import type { IdentityType } from "@/types/identity";
import { getCompanies } from "@/services/company";

type SelectedIdentityProps = {
  type: IdentityType;
  node_id: string;
  name: string;
  avatar: string;
};

function SelectedIdentity({
  type,
  node_id,
  name,
  avatar,
}: SelectedIdentityProps) {
  const navigate = useNavigate();
  const truncatedBitcoinPublicKey = truncateString(node_id, 14);

  return (
    <div className="flex items-center gap-3">
      <IdentityAvatar
        name={name}
        picture={avatar}
        identityType={type}
        size="lg"
      />

      <div className="flex flex-col gap-1.5">
        <span className="text-text-300 text-base font-medium leading-[1.875rem]">
          {name}
        </span>

        <button className="flex items-center gap-1 text-text-200 text-xs leading-normal">
          {truncatedBitcoinPublicKey}

          <CopyIcon className="h-4 w-4 stroke-1" />
        </button>
      </div>

      <button
        className="flex items-center gap-0.5 p-0 text-text-300 text-sm font-normal ml-auto"
        onClick={() => {
          navigate(routes.VIEW_IDENTITY);
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
  type: IdentityType;
  name: string;
  address: string;
  avatar: string;
};

function Identity({ type, name, address, avatar }: IdentityProps) {
  return (
    <div className="flex items-center gap-3 py-4 px-3 border border-divider-75 rounded-lg cursor-pointer">
      <IdentityAvatar
        name={name}
        picture={avatar}
        identityType={type}
        size="md"
      />

      <div className="flex flex-col mr-auto">
        <span className="text-text-300 text-base font-medium leading-5">
          {name}
        </span>
        <span className="text-text-200 text-xs leading-normal">{address}</span>
      </div>

      <RadioGroupItem value={name} checked={false} />
    </div>
  );
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

function CompaniesLoader() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-6 w-1/2 bg-elevation-200" />
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

  return (
    <div className="flex flex-col gap-3">
      <span className="text-text-200 text-sm font-medium leading-5">
        <FormattedMessage
          id="identity.list.companies"
          defaultMessage="Company identities"
        />
      </span>

      {data.companies.map((company) => (
        <Identity
          key={company.id}
          type="company"
          name={company.name}
          address={company.address}
          avatar=""
        />
      ))}
    </div>
  );
}

export default function List() {
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
        <SelectedIdentity
          type="personal"
          name="John Doe"
          avatar=""
          node_id="bitcrnode012901290192"
        />

        <RadioGroup>
          <div className="flex flex-col gap-3">
            <span className="text-text-200 text-sm font-medium leading-5">
              <FormattedMessage
                id="identity.list.personal"
                defaultMessage="Personal identity"
              />
            </span>

            <Identity
              type="personal"
              name="John Doe"
              address="Langebroekdijk 12, 1920DP, Netherlands"
              avatar=""
            />
          </div>

          <Suspense fallback={<CompaniesLoader />}>
            <Companies />
          </Suspense>
        </RadioGroup>

        <div className="flex flex-col items-center gap-6">
          <CreateCompanyIdentity />
          <Remove />
        </div>
      </div>
    </Page>
  );
}
