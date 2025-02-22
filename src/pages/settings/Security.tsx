import { FormattedMessage, useIntl } from "react-intl";
import {
  ChevronRightIcon,
  KeyRoundIcon,
  LockIcon,
  OctagonAlertIcon,
  RefreshCwIcon,
} from "lucide-react";

import NavigateBack from "@/components/NavigateBack";
import Topbar from "@/components/Topbar";
import Page from "@/components/wrappers/Page";
import PageTitle from "@/components/typography/PageTitle";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

import { Label } from "./components/Typography";
import ResetConfirmation from "./components/ResetConfirmation";
import { Link } from "react-router-dom";
import routes from "@/constants/routes";

function Option({
  icon,
  label,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between py-6 px-4 text-text-300 border border-divider-75 rounded-xl cursor-pointer">
      <div className="flex items-center gap-3">
        {icon}
        <Label>{label}</Label>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-text-300 text-sm font-normal leading-5">
          {description}
        </span>
        <ChevronRightIcon className="h-6 w-6 stroke-1" />
      </div>
    </div>
  );
}

export default function Security() {
  const intl = useIntl();

  return (
    <Page className="gap-4" displayBottomNavigation>
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle>
            <FormattedMessage
              id="settings.security.title"
              defaultMessage="Security"
              description="Security settings title"
            />
          </PageTitle>
        }
      />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 py-6 px-4 border border-divider-75 rounded-xl">
          <div className="flex flex-col gap-2">
            <span className="text-text-300 text-sm font-medium leading-5">
              <FormattedMessage
                id="settings.security.loginWithPin"
                defaultMessage="Login with PIN code"
                description="Login with PIN code option"
              />
            </span>
            <span className="text-text-200 text-base font-normal leading-6">
              <FormattedMessage
                id="settings.security.loginWithPin.description"
                defaultMessage="Use your PIN code to unlock the app"
                description="Login with PIN code option description"
              />
            </span>
          </div>

          <Separator className="bg-divider-75" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LockIcon className="text-text-300 h-6 w-6 stroke-1" />
              <Label>On</Label>
            </div>

            <Switch />
          </div>
        </div>

        <Option
          icon={<RefreshCwIcon className="text-text-300 h-6 w-6 stroke-1" />}
          label={intl.formatMessage({
            id: "settings.security.changePin",
            defaultMessage: "Change PIN",
          })}
          description={intl.formatMessage({
            id: "settings.security.changePinDescription",
            defaultMessage: "4 digits",
          })}
        />

        <Link to={routes.RECOVERY_SEED_PHRASE}>
          <Option
            icon={<KeyRoundIcon className="text-text-300 h-6 w-6 stroke-1" />}
            label={intl.formatMessage({
              id: "settings.security.recoveryPhrase",
              defaultMessage: "Recovery phrase",
            })}
            description={intl.formatMessage({
              id: "settings.security.recoveryPhraseDescription",
              defaultMessage: "12 words",
            })}
          />
        </Link>

        <ResetConfirmation>
          <Option
            icon={
              <OctagonAlertIcon className="text-text-300 h-6 w-6 stroke-1" />
            }
            label={intl.formatMessage({
              id: "settings.security.resetApp",
              defaultMessage: "Reset app",
            })}
            description={intl.formatMessage({
              id: "settings.security.resetAppDescription",
              defaultMessage: "Remove identity",
            })}
          />
        </ResetConfirmation>
      </div>
    </Page>
  );
}
