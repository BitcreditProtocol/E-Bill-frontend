import { FormattedMessage } from "react-intl";
import { BellDotIcon } from "lucide-react";

import Page from "@/components/wrappers/Page";
import NavigateBack from "@/components/NavigateBack";
import Topbar from "@/components/Topbar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

import { Label } from "./components/Typography";

export default function Notifications() {
  return (
    <Page className="gap-6" displayBottomNavigation>
      <Topbar
        lead={<NavigateBack />}
        middle={
          <h1 className="text-text-300 text-base font-medium">
            <FormattedMessage
              id="settings.notifications.title"
              defaultMessage="Notifications"
              description="Notifications settings title"
            />
          </h1>
        }
        trail={<></>}
      />

      <div className="flex flex-col gap-4">
        <span className="text-text-200 text-baser font-normal leading-6">
          <FormattedMessage
            id="settings.notifications.description"
            defaultMessage="In app notifications will always be on"
            description="Notifications settings description"
          />
        </span>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 py-6 px-4 border border-divider-75 rounded-xl">
            <div className="flex flex-col gap-2">
              <span className="text-text-300 text-sm font-medium leading-5">
                <FormattedMessage
                  id="settings.notifications.app"
                  defaultMessage="App notifications"
                  description="App notifications label"
                />
              </span>
              <span className="text-text-200 text-base font-normal leading-6">
                <FormattedMessage
                  id="settings.notifications.app.description"
                  defaultMessage="Receive notifications when your app is open"
                  description="App notifications description"
                />
              </span>
            </div>

            <Separator className="bg-divider-75" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BellDotIcon className="text-text-300 h-6 w-6 stroke-1" />
                <Label>On</Label>
              </div>

              <Switch />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
