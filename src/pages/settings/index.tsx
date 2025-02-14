import { FormattedMessage, useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import {
  AlignVerticalJustifyCenterIcon,
  BellDotIcon,
  CloudDownloadIcon,
  EarthIcon,
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
import { MintConfig, readMintConfig } from "@/constants/mints";
import { API_URL } from "@/constants/api";
import { DOWNLOAD_BACKUP } from "@/constants/endpoints";
import DisplayCurrency from "./components/DisplayCurrency";
import Agreements from "./components/Agreements";
import Theme from "./components/Theme";
import MenuOption from "./components/MenuOption";
import LanguagePreference from "./components/LanguagePreference";
import { PropsWithChildren, useState } from "react";
import { exit } from "@/services/general";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language/LanguageContext";
import { toast } from "@/hooks/use-toast";

function ExitConfirmDialog({
  children,
  onConfirm,
  disabled = false,
}: PropsWithChildren<{
  onConfirm: () => void;
  disabled?: boolean;
}>) {
  const [open, setOpen] = useState(false);
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className="max-w-[375px] bg-elevation-50 mx-auto">
        <div className="flex flex-col gap-6 py-8 px-5">
          <div className="flex flex-col gap-1.5">
            <span className="text-text-300 text-lg font-medium">
              <FormattedMessage
                id="settings.exit.title"
                defaultMessage="Are you sure?"
                description="Title for exit confirm dialog"
              />
            </span>

            <span className="text-text-200 text-xs">
              <FormattedMessage
                id="settings.exit.description"
                defaultMessage="This will exit the application."
                description="Description for exit confirm dialog"
              />
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              className="w-full"
              size="md"
              onClick={() => {
                onConfirm();
                setOpen(false);
              }}
              disabled={disabled}
            >
              <FormattedMessage
                id="settings.exit.confirm"
                defaultMessage="Confirm"
                description="Confirm button text for exit confirm dialog"
              />
            </Button>

            <DrawerClose>
              <Button className="w-full" variant="outline" size="md">
                <FormattedMessage
                  id="settings.exit.cancel"
                  defaultMessage="Cancel"
                  description="Cancel button text for exit confirm dialog"
                />
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default function Settings() {
  const intl = useIntl();
  const { activeIdentity } = useIdentity();
  const lang = useLanguage();
  const navigate = useNavigate();

  const backupFileUrl = `${API_URL}${DOWNLOAD_BACKUP}`;

  const [mintConfig] = useState<MintConfig>(readMintConfig());

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

        <ExitConfirmDialog
          onConfirm={() => {
            exit()
              .then(() => {
                navigate(routes.SHUTDOWN_INFO);
              })
              .catch(() => {
                toast({
                  title: intl.formatMessage({
                    id: "settings.shutdown.error.title",
                    defaultMessage: "Error!",
                    description:
                      "Toast message title when application shutdown fails",
                  }),
                  description: intl.formatMessage({
                    id: "settings.shutdown.error.description",
                    defaultMessage:
                      "Failed to shutdown the application. Please try again.",
                    description:
                      "Toast message description when application shutdown fails",
                  }),
                  variant: "error",
                  position: "bottom-center",
                });
              });
          }}
        >
          <PowerIcon className="text-text-300 h-6 w-6 stroke-1 cursor-pointer" />
        </ExitConfirmDialog>
      </div>
      <ViewDetails
        type={activeIdentity.type}
        name={activeIdentity.name}
        avatar={activeIdentity.avatar}
        // todo: replace by node id
        bitcoin_public_key={activeIdentity.node_id}
      />

      <div className="flex flex-col gap-4 mb-16">
        <div className="flex flex-col gap-2.5 py-6 px-4 border border-divider-75 rounded-xl">
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

          <LanguagePreference
            value={lang.locale}
            onChange={(value: string) => {
              lang.setLocale(value);
            }}
            values={lang.availableLocales()}
          >
            <MenuOption
              icon={<EarthIcon className="text-text-300 h-6 w-6 stroke-1" />}
              label={intl.formatMessage({
                id: "settings.languagePreference",
                defaultMessage: "Locale",
              })}
              defaultValue={lang.locale}
            />
          </LanguagePreference>
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
              defaultValue={mintConfig.wildcatOne.name}
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

        <div className="flex items-center justify-between pr-2">
          <span className="text-text-300 text-sm font-medium leading-5">
            <FormattedMessage
              id="settings.versionNumber"
              defaultMessage="Version: {version}"
              description="Application version number"
              values={{ version: "0.0.1" }}
            />
          </span>

          <Link to={backupFileUrl}>
            <button className="flex gap-1 text-brand-200 text-sm font-normal leading-normal">
              <CloudDownloadIcon className="h-4 w-4 stroke-1" />
              <FormattedMessage
                id="settings.backup.download"
                defaultMessage="Backup data"
                description="Backup button"
              />
            </button>
          </Link>
        </div>
      </div>
    </Page>
  );
}
