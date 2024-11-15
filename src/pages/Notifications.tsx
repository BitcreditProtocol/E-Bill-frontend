import { FormattedMessage } from "react-intl";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import createBillIllustration from "@/assets/create-bill-illustration.svg";

export function Notifications() {
  return (
    <div className="flex flex-col min-h-fit h-screen gap-6 py-12 px-6 w-full">
      <div className="flex w-full">
        <button className="flex items-center justify-center w-8 h-8 bg-[#1B0F00]/20 rounded-full border-[1px] border-[#1B0F00]/6">
          <XIcon width={16} strokeWidth={1} color="#1B0F00" />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex gap-1 items-center">
          <h2 className="text-xl font-medium text-text-300">
            <FormattedMessage
              id="pages.notifications.title"
              defaultMessage="Notifications"
              description="Title for Notifications page"
            />
          </h2>
          <span className="text-xs font-medium text-text-200">(3)</span>
        </div>

        <div className="flex gap-2">
          <Button variant="filter">
            <FormattedMessage
              id="pages.notifications.all"
              defaultMessage="All"
              description="Filter to view All notifications"
            />
          </Button>
          <Button variant="filter">
            <FormattedMessage
              id="pages.notifications.pay"
              defaultMessage="Pay"
              description="Filter to view pending Pay notifications"
            />
          </Button>
          <Button variant="filter">
            <FormattedMessage
              id="pages.notifications.accept"
              defaultMessage="Accept"
              description="Filter to view pending Accept notifications"
            />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-base font-medium text-text-300">Today</h3>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 bg-elevation-200 p-3 border-[1px] border-divider-75 rounded-[12px]">
            <div className="px-3">
              <span className="text-xs font-semibold text-[#816E57]">
                Gooogle inc. has requested you to pay
              </span>
            </div>
            <div className="flex flex-col p-4 gap-0.5 bg-elevation-50 border-[1px] border-divider-75 rounded-[12px]">
              <span className="text-base font-medium text-text-300">
                Hayek Ltd.
              </span>

              <div className="flex justify-between">
                <span className="text-sm text-text-200">12-Nov-24</span>
                <div className="flex gap-1 items-baseline">
                  <span className="text-sm text-signal-success">+12.49002</span>
                  <span className="text-xs text-text-300">USD</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 bg-elevation-200 p-3 border-[1px] border-divider-75 rounded-[12px]">
            <div className="px-3">
              <span className="text-xs font-semibold text-[#816E57]">
                Gooogle inc. has requested you to pay
              </span>
            </div>
            <div className="flex flex-col p-4 gap-0.5 bg-elevation-50 border-[1px] border-divider-75 rounded-[12px]">
              <span className="text-base font-medium text-text-300">
                Hayek Ltd.
              </span>

              <div className="flex justify-between">
                <span className="text-sm text-text-200">12-Nov-24</span>
                <div className="flex gap-1 items-baseline">
                  <span className="text-sm text-signal-success">+12.49002</span>
                  <span className="text-xs text-text-300">USD</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 bg-elevation-200 p-3 border-[1px] border-divider-75 rounded-[12px]">
            <div className="px-3">
              <span className="text-xs font-semibold text-[#816E57]">
                Gooogle inc. has requested you to pay
              </span>
            </div>
            <div className="flex flex-col p-4 gap-0.5 bg-elevation-50 border-[1px] border-divider-75 rounded-[12px]">
              <span className="text-base font-medium text-text-300">
                Hayek Ltd.
              </span>

              <div className="flex justify-between">
                <span className="text-sm text-text-200">12-Nov-24</span>
                <div className="flex gap-1 items-baseline">
                  <span className="text-sm text-signal-success">+12.49002</span>
                  <span className="text-xs text-text-300">USD</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button variant="link" className="text-text-200 font-medium text-sm">
          <FormattedMessage
            id="pages.notifications.history"
            defaultMessage="See history"
            description="Link to view notification history"
          />
        </Button>
      </div>
    </div>
  );
}

export function NotificationsEmpty() {
  return (
    <div className="flex flex-col min-h-fit h-screen gap-6 py-12 px-6 w-full">
      <div className="flex w-full">
        <button className="flex items-center justify-center w-8 h-8 bg-[#1B0F00]/20 rounded-full border-[1px] border-[#1B0F00]/6">
          <XIcon width={16} strokeWidth={1} color="#1B0F00" />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex gap-1 items-center">
          <h2 className="text-xl font-medium text-text-300">
            <FormattedMessage
              id="pages.notifications.title"
              defaultMessage="Notifications"
              description="Title for Notifications page"
            />
          </h2>
          <span className="text-xs font-medium text-text-200">(0)</span>
        </div>

        <div className="flex gap-2">
          <Button variant="filter">
            <FormattedMessage
              id="pages.notifications.all"
              defaultMessage="All"
              description="Filter to view All notifications"
            />
          </Button>
          <Button variant="filter">
            <FormattedMessage
              id="pages.notifications.pay"
              defaultMessage="Pay"
              description="Filter to view pending Pay notifications"
            />
          </Button>
          <Button variant="filter">
            <FormattedMessage
              id="pages.notifications.accept"
              defaultMessage="Accept"
              description="Filter to view pending Accept notifications"
            />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-4 px-12">
          <img src={createBillIllustration} className="mb-1" />

          <div className="flex flex-col items-center gap-2">
            <h3 className="text-xl font-medium text-text-300">
              <FormattedMessage
                id="pages.notifications.empty"
                defaultMessage="No notifications"
                description="Empty notifications message"
              />
            </h3>

            <span className="text-base text-text-200 text-center">
              <FormattedMessage
                id="pages.notifications.startCreating"
                defaultMessage="Start creating a bill and distribute it to your contacts"
                description="Description to start creating a bill"
              />
            </span>
          </div>

          <Button
            className="text-text-300 bg-transparent font-medium border-text-300 rounded-[8px] py-3 px-6 hover:bg-transparent"
            variant="outline"
          >
            <FormattedMessage
              id="pages.notifications.issueBill"
              defaultMessage="Issue a bill"
              description="Action to start creating a bill"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
