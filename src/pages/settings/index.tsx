import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import {
  AlignVerticalJustifyCenterIcon,
  BellDotIcon,
  InfoIcon,
  LandmarkIcon,
  LockIcon,
  PowerIcon,
} from "lucide-react";

import Page from "@/components/wrappers/Page";
import { Separator } from "@/components/ui/separator";
import ViewDetails from "@/components/Identity/ViewDetails";
import { useIdentity } from "@/context/identity/IdentityContext";
import routes from "@/constants/routes";

import DisplayCurrency from "./components/DisplayCurrency";
import LanguagePreference from "./components/LanguagePreference";
import Agreements from "./components/Agreements";
import Theme from "./components/Theme";
import MenuOption from "./components/MenuOption";
import { WILDCAT_ONE } from "@/constants/mints";

export default function Settings() {
  const intl = useIntl();
  const { activeIdentity } = useIdentity();

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

      <ViewDetails
        type={activeIdentity.type}
        name={activeIdentity.name}
        // todo: replace by node id
        bitcoin_public_key={"1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"}
      />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 py-6 px-4 border border-divider-75 rounded-xl">
          <span className="text-text-200 text-sm font-medium leading-5">
            <FormattedMessage
              id="settings.menu.title"
              defaultMessage="General"
              description="Settings menu title"
            />
          </span>

          <MenuOption
            icon={<InfoIcon className="text-text-300 h-6 w-6 stroke-1" />}
            label={intl.formatMessage({
              id: "settings.menu.about",
              defaultMessage: "About",
              description: "About menu item",
            })}
          />
          <Separator className="bg-divider-75" />

          <DisplayCurrency />
          <Separator className="bg-divider-75" />

          <LanguagePreference />
          <Separator className="bg-divider-75" />

          <MenuOption
            icon={
              <AlignVerticalJustifyCenterIcon className="text-text-300 h-6 w-6 stroke-1" />
            }
            label={intl.formatMessage({
              id: "settings.menu.decimals",
              defaultMessage: "Decimals",
              description: "Decimals menu item",
            })}
            defaultValue="Point"
          />
          <Separator className="bg-divider-75" />

          <Theme />
          <Separator className="bg-divider-75" />

          <Link to={routes.NOTIFICATIONS_SETTINGS}>
            <MenuOption
              icon={<BellDotIcon className="text-text-300 h-6 w-6 stroke-1" />}
              label={intl.formatMessage({
                id: "settings.menu.notifications",
                defaultMessage: "Notifications",
                description: "Notifications menu item",
              })}
              defaultValue="Push & email"
            />
          </Link>
          <Separator className="bg-divider-75" />

          <Link to={routes.MINT_SETTINGS}>
            <MenuOption
              icon={<LandmarkIcon className="text-text-300 h-6 w-6 stroke-1" />}
              label={intl.formatMessage({
                id: "settings.menu.mints",
                defaultMessage: "Mints",
                description: "Mints menu item",
              })}
              defaultValue={WILDCAT_ONE.name}
            />
          </Link>
          <Separator className="bg-divider-75" />

          <Link to={routes.SECURITY_SETTINGS}>
            <MenuOption
              icon={<LockIcon className="text-text-300 h-6 w-6 stroke-1" />}
              label={intl.formatMessage({
                id: "settings.menu.security",
                defaultMessage: "Security",
                description: "Security menu item",
              })}
              defaultValue="PIN & reset"
            />
          </Link>
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
