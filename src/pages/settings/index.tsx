import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import {
  AlignVerticalJustifyCenterIcon,
  BellDotIcon,
  ChevronRightIcon,
  InfoIcon,
  LandmarkIcon,
  LockIcon,
  PowerIcon,
} from "lucide-react";

import Page from "@/components/wrappers/Page";
import { Separator } from "@/components/ui/separator";
import routes from "@/constants/routes";

import DisplayCurrency from "./components/DisplayCurrency";
import LanguagePreference from "./components/LanguagePreference";
import Agreements from "./components/Agreements";
import Theme from "./components/Theme";

type MenuLinkProps = {
  icon: React.ReactNode;
  label: string;
  link: string;
};

function MenuLink({ icon, label, link }: MenuLinkProps) {
  return (
    <Link className="flex items-center justify-between" to={link}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-text-300 text-base font-medium leading-6">
          {label}
        </span>
      </div>

      <ChevronRightIcon className="text-text-300 h-6 w-6 stroke-1" />
    </Link>
  );
}

export default function Settings() {
  return (
    <Page className="gap-6" displayBottomNavigation>
      <div className="flex items-center justify-between">
        <h1 className="text-text-300 text-3xl font-medium leading-[38px]">
          <FormattedMessage
            id="settings.title"
            defaultMessage="Settings"
            description="Settings page title"
          />
        </h1>

        <PowerIcon className="text-text-300 h-6 w-6 stroke-1" />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 py-6 px-4 border border-divider-75 rounded-xl">
          <span className="text-text-200 text-sm font-medium leading-5">
            <FormattedMessage
              id="settings.menu.title"
              defaultMessage="General"
              description="Settings menu title"
            />
          </span>

          <MenuLink
            icon={<InfoIcon className="text-text-300 h-6 w-6 stroke-1" />}
            label="About"
            link={routes.ABOUT}
          />
          <Separator className="bg-divider-75" />

          <DisplayCurrency />
          <Separator className="bg-divider-75" />

          <LanguagePreference />
          <Separator className="bg-divider-75" />

          <MenuLink
            icon={
              <AlignVerticalJustifyCenterIcon className="text-text-300 h-6 w-6 stroke-1" />
            }
            label="Decimals"
            link={routes.ABOUT}
          />
          <Separator className="bg-divider-75" />

          <Theme />
          <Separator className="bg-divider-75" />

          <MenuLink
            icon={<BellDotIcon className="text-text-300 h-6 w-6 stroke-1" />}
            label="Notifications"
            link={routes.NOTIFICATIONS_SETTINGS}
          />
          <Separator className="bg-divider-75" />

          <MenuLink
            icon={<LandmarkIcon className="text-text-300 h-6 w-6 stroke-1" />}
            label="Mints"
            link={routes.ABOUT}
          />
          <Separator className="bg-divider-75" />

          <MenuLink
            icon={<LockIcon className="text-text-300 h-6 w-6 stroke-1" />}
            label="Security"
            link={routes.ABOUT}
          />
          <Separator className="bg-divider-75" />

          <Agreements />
        </div>

        <span className="text-text-300 text-sm font-medium leading-5">
          <FormattedMessage
            id="settings.versionNumber"
            defaultMessage="Version: {version}"
            description="Application version number"
            values={{ version: "0.0.1" }}
          />
        </span>
      </div>
    </Page>
  );
}
