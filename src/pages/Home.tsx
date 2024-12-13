import {
  BellIcon,
  ChevronDownIcon,
  DollarSignIcon,
  HomeIcon,
  ListFilterIcon,
  PlusSquareIcon,
  ReceiptTextIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";
import { FormattedMessage } from "react-intl";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import layoutLogo from "@/assets/layout-logo.svg";
import defaultAvatar from "@/assets/default-avatar.svg";

function Topbar() {
  return (
    <div className="flex justify-between px-6">
      <div>
        <img src={layoutLogo} alt="Bitcredit" className="w-[30px]" />
      </div>
      <div className="flex align-middle items-center gap-3">
        <Button
          variant="link"
          className="text-text-300 text-xs font-medium p-0 h-fit"
        >
          <PlusSquareIcon width={24} color="#1B0F00" strokeWidth={1} />
        </Button>

        <Separator className="bg-[#1B0F0033]" orientation="vertical" />

        <Button
          variant="link"
          className="text-text-300 text-xs font-medium p-0 h-fit"
        >
          <BellIcon width={24} color="#1B0F00" strokeWidth={1} />
        </Button>

        <Button
          variant="link"
          className="text-text-300 text-xs font-medium p-0 h-fit"
        >
          <img
            src={defaultAvatar}
            alt="User avatar"
            className="w-[30px] rounded-full"
          />
        </Button>
      </div>
    </div>
  );
}

function Balances() {
  return (
    <div className="px-6">
      <div className="flex flex-col bg-elevation-200 rounded-[16px]">
        <div className="flex justify-between items-center pt-4 px-4 pb-2 border-b-[1px] border-b-[#1B0F001A]">
          <h2 className="text-sm font-medium text-text-300">
            <FormattedMessage
              id="Balances"
              defaultMessage="Balances"
              description="Title for balances component on Home page"
            />
          </h2>

          <div className="flex gap-1.5">
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#118200]">
              <DollarSignIcon width={14} color="#FFFFFF" strokeWidth={1} />
            </div>

            <Button
              variant="link"
              className="text-text-300 text-xs font-medium p-0 h-fit"
            >
              USD
              <ChevronDownIcon width={16} color="#1B0F00" strokeWidth={1} />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-3 px-4 pb-2">
          <div className="flex justify-between py-2 border-b-[1px] border-b-[#0000001A]">
            <span className="text-xs text-text-200">
              <FormattedMessage
                id="Payee"
                defaultMessage="Payee"
                description="Payee label"
              />
            </span>

            <div className="flex gap-1 items-center">
              <span className="text-xl font-normal text-signal-success leading-[-0.4px]">
                + $4.298,92
              </span>
              <span className="text-[10px] text-text-200">USD</span>
            </div>
          </div>

          <div className="flex justify-between py-2 border-b-[1px] border-b-[#0000001A]">
            <span className="text-xs text-text-200">
              <FormattedMessage
                id="Payer"
                defaultMessage="Payer"
                description="Payer label"
              />
            </span>

            <div className="flex gap-1 items-center">
              <span className="text-xl font-normal text-signal-error leading-[-0.4px]">
                - 980.298,92
              </span>
              <span className="text-[10px] text-text-200">USD</span>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-xs text-text-200">
              <FormattedMessage
                id="Contingent"
                defaultMessage="Contingent"
                description="Contingent label"
              />
            </span>

            <div className="flex gap-1 items-center">
              <span className="text-xl font-normal text-text-300 leading-[-0.4px]">
                - $14.259,28
              </span>
              <span className="text-[10px] text-text-200">USD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EBillsList() {
  return (
    <div className="flex flex-col gap-4 px-6">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-medium text-text-300">
          <FormattedMessage
            id="E-bills"
            defaultMessage="E-bills"
            description="Title for e-bills list component on Home page"
          />
        </h2>

        <Button
          variant="link"
          className="gap-1 text-text-300 text-sm font-medium p-0 h-fit"
        >
          <ListFilterIcon width={16} color="#1B0F00" strokeWidth={1} />
          <FormattedMessage
            id="Filter"
            defaultMessage="Filter"
            description="Open filters modal to filter e-bills"
          />
        </Button>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center p-4 bg-elevation-200 rounded-[12px]">
          <div className="flex flex-col gap-0.5">
            <span className="text-base font-medium text-text-300">
              Hayek Ltd.
            </span>
            <span className="text-xs text-text-200">12.09.2024</span>
          </div>

          <div className="flex gap-1 items-center">
            <span className="text-sm text-signal-success">+12.49002</span>
            <span className="text-xs text-text-300">USD</span>
          </div>
        </div>

        <div className="flex justify-between items-center p-4 bg-elevation-200 rounded-[12px]">
          <div className="flex flex-col gap-0.5">
            <span className="text-base font-medium text-text-300">
              Hayek Ltd.
            </span>
            <span className="text-xs text-text-200">12.09.2024</span>
          </div>

          <div className="flex gap-1 items-center">
            <span className="text-sm text-signal-success">+12.49002</span>
            <span className="text-xs text-text-300">USD</span>
          </div>
        </div>

        <div className="flex justify-between items-center p-4 bg-elevation-200 rounded-[12px]">
          <div className="flex flex-col gap-0.5">
            <span className="text-base font-medium text-text-300">
              Hayek Ltd.
            </span>
            <span className="text-xs text-text-200">12.09.2024</span>
          </div>

          <div className="flex gap-1 items-center">
            <span className="text-sm text-signal-success">+12.49002</span>
            <span className="text-xs text-text-300">USD</span>
          </div>
        </div>
      </div>

      <Button
        variant="link"
        className="gap-1 text-text-200 text-sm font-medium p-0 h-fit"
      >
        <FormattedMessage
          id="See all"
          defaultMessage="See all"
          description="Navigates to the e-bills page"
        />
      </Button>
    </div>
  );
}

function NavigationBar() {
  return (
    <div className="flex items-center justify-between align-middle py-3 px-10 border-t-[1px] border-t-divider-200">
      <Button
        variant="link"
        className="flex-col gap-1 text-text-300 text-[10px] font-medium p-0 h-fit"
      >
        <HomeIcon width={24} color="#1B0F00" strokeWidth={1} />
        <FormattedMessage
          id="Home"
          defaultMessage="Home"
          description="Navigates to the Home page"
        />
      </Button>

      <Button
        variant="link"
        className="flex-col gap-1 text-text-200 text-[10px] font-medium p-0 h-fit"
      >
        <ReceiptTextIcon width={24} color="#8D8579" strokeWidth={1} />
        <FormattedMessage
          id="E-bills"
          defaultMessage="E-bills"
          description="Navigates to the E-bills page"
        />
      </Button>

      <Button
        variant="link"
        className="flex-col gap-1 text-text-200 text-[10px] font-medium p-0 h-fit"
      >
        <SearchIcon width={24} color="#8D8579" strokeWidth={1} />
        <FormattedMessage
          id="Search"
          defaultMessage="Search"
          description="Navigates to the Search page"
        />
      </Button>

      <Button
        variant="link"
        className="flex-col gap-1 text-text-200 text-[10px] font-medium p-0 h-fit"
      >
        <SettingsIcon width={24} color="#8D8579" strokeWidth={1} />
        <FormattedMessage
          id="Settings"
          defaultMessage="Settings"
          description="Navigates to the Settings page"
        />
      </Button>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col justify-between w-full min-h-fit h-screen pt-12">
      <Topbar />
      <div className="flex flex-col justify-between py-5 h-full">
        <Balances />
        <EBillsList />
      </div>
      <NavigationBar />
    </div>
  );
}
