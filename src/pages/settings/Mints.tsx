import { FormattedMessage, useIntl } from "react-intl";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import ViewDetails from "@/components/Identity/ViewDetails";
import { FormattedCurrency } from "@/components/FormattedCurrency";
import { Label } from "./components/Typography";
import { useEffect, useState } from "react";
import { WILDCAT_ONE } from "@/constants/mints";

const formatUptime = (uptime: number) => {
  let secondsLeft = Math.floor(uptime / 1_000);
  const days = Math.floor(secondsLeft / (60 * 60 * 24));
  secondsLeft = secondsLeft - (days * 60 * 60 * 24);
  const hours = Math.floor(secondsLeft / (60 * 60));
  secondsLeft = secondsLeft - (hours * 60 * 60);
  const minutes = Math.floor(secondsLeft / (60));
  secondsLeft = secondsLeft - (minutes * 60);
  return `${days ? String(days) + 'd' : ''} ${String(hours)}h ${String(minutes)}m ${String(secondsLeft)}s`;
};

function Property({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <Label>{label}</Label>
      {value}
    </div>
  );
}

export default function Mints() {
  const intl = useIntl();

  const [uptime, setUptime] = useState(Date.now() - WILDCAT_ONE.restart_timestamp);

  useEffect(() => {
    const timerId = setInterval(() => {
      setUptime(Date.now() - WILDCAT_ONE.restart_timestamp)
    }, 1_000);
    return () => { clearInterval(timerId); };
  }, []);

  return (
    <Page className="gap-4">
      <Topbar lead={<NavigateBack />} />

      <div className="flex flex-col gap-4 mt-2">
        <ViewDetails
          type="company"
          name={WILDCAT_ONE.name}
          bitcoin_public_key={WILDCAT_ONE.node_id}
        />

        <div className="flex flex-col gap-4 py-6 px-4 border border-divider-75 rounded-xl">
          <div className="flex items-center justify-between">
            <Label>
              <FormattedMessage
                id="settings.mints.balance"
                defaultMessage="Balance"
                description="Mints balance"
              />
            </Label>
            <div className="flex items-center gap-1">
              <span className="text-text-300 font-mono font-medium leading-5">
                <FormattedCurrency
                  color="none"
                  signDisplay="never"
                  value={1.25}
                />
              </span>
              <span className="text-text-300 text-[10px] font-medium leading-[14px]">
                BTC
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between py-5 px-4 bg-elevation-200 border border-divider-50 rounded-lg">
            <span className="text-text-300 text-sm font-medium leading-5">
              <FormattedMessage
                id="settings.mint.balance.markUp"
                defaultMessage="Mark up"
                description="Mints mark up"
              />
            </span>

            <div className="flex items-center gap-1">
              <span className="text-text-300 text-sm font-mono font-medium leading-[14px]">
                2.54
              </span>
              <span className="text-text-200 text-[10px] font-normal leading-[14px]">
                ppt
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between py-5 px-4 bg-elevation-200 border border-divider-50 rounded-lg">
            <span className="text-text-300 text-sm font-medium leading-5">
              <FormattedMessage
                id="settings.mint.balance.mintLine"
                defaultMessage="Mint line"
                description="Mint line"
              />
            </span>

            <div className="flex items-center gap-1">
              <span className="text-text-300 text-sm font-mono font-medium leading-[14px]">
                25.00000000
              </span>
              <span className="text-text-200 text-[10px] font-normal leading-[14px]">
                BTC
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-6 px-4 border border-divider-75 rounded-xl">
          <span className="text-text-200 text-sm font-medium leading-5">
            <FormattedMessage
              id="settings.mint.status"
              defaultMessage="Status"
              description="Mint status section title"
            />
          </span>

          <div className="flex flex-col gap-4">
            <Property
              label={intl.formatMessage({
                id: "settings.mint.property.online",
                defaultMessage: "Online",
                description: "Online time property level",
              })}
              value={
                <span className="text-signal-success text-sm font-mono font-medium leading-5">
                  {formatUptime(uptime)}
                </span>
              }
            />
            <Property
              label={intl.formatMessage({
                id: "settings.mint.property.billCover",
                defaultMessage: "Bill cover",
                description: "Bill cover property level",
              })}
              value={
                <span className="text-signal-success text-sm font-mono font-medium leading-5">
                  100.00%
                </span>
              }
            />
            <Property
              label={intl.formatMessage({
                id: "settings.mint.property.guaranteeLevel",
                defaultMessage: "Guarantee level",
                description: "Guarantee level property level",
              })}
              value={
                <span className="text-signal-success text-sm font-mono font-medium leading-5">
                  11.31%
                </span>
              }
            />
            <Property
              label={intl.formatMessage({
                id: "settings.mint.property.bitcoinCover",
                defaultMessage: "Bitcoin cover",
                description: "Bitcoin cover property label",
              })}
              value={
                <span className="text-signal-success text-sm font-mono font-medium leading-5">
                  100.00%
                </span>
              }
            />
          </div>
        </div>
      </div>
    </Page>
  );
}
