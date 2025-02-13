import { FormattedMessage, useIntl } from "react-intl";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import ViewDetails from "@/components/Identity/ViewDetails";
import { FormattedCurrency } from "@/components/FormattedCurrency";
import { Label } from "./components/Typography";
import { useCallback, useEffect, useState } from "react";
import { MintConfig, readMintConfig, resetMintConfig, writeMintConfig } from "@/constants/mints";
import { Switch } from "@/components/ui/switch";
import { Form, FormProvider, FormSubmitHandler, useForm } from "react-hook-form";
import { IdCardIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

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

const formSchema = z.object({
  mint_node_id: z.string().optional(),
});

type FormValues = {
  mint_node_id: string
};

export default function Mints() {
  const intl = useIntl();


  const [mintConfig, setMintConfig] = useState<MintConfig>(readMintConfig());
  const [uptime, setUptime] = useState(Date.now() - mintConfig.wildcatOne.restart_timestamp);

  useEffect(() => {
    const timerId = setInterval(() => {
      setUptime(Date.now() - mintConfig.wildcatOne.restart_timestamp)
    }, 1_000);
    return () => { clearInterval(timerId); };
  }, [mintConfig.wildcatOne.restart_timestamp]);

  const toggleMintView = useCallback(() => {
    writeMintConfig({ __dev_mintViewEnabled: !mintConfig.__dev_mintViewEnabled });
    setMintConfig(readMintConfig());
  }, [setMintConfig, mintConfig.__dev_mintViewEnabled]);

  const resetToDefault = useCallback(() => {
    resetMintConfig();
    setMintConfig(readMintConfig());
  }, [setMintConfig]);

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mint_node_id: mintConfig.wildcatOne.node_id,
    },
  });

  const [mintNodeId] = methods.watch(["mint_node_id"]);

  const onSubmit: FormSubmitHandler<FormValues> = ({ data }) => {
    if (data.mint_node_id.length !== 66) {
      toast({
        title: "Error!",
        description: "Could not save mint config.",
        variant: "error",
        position: "bottom-center",
      });
    } else {
      writeMintConfig({
        ...mintConfig,
        wildcatOne: {
          ...mintConfig.wildcatOne,
          node_id: data.mint_node_id
        }
      });
      setMintConfig(readMintConfig());

      toast({
        title: "Success!",
        description: "Successfully saved mint config.",
        variant: "success",
        position: "bottom-center",
      });
    }
  };

  return (
    <Page className="gap-4">
      <Topbar lead={<NavigateBack />} />

      <div className="flex flex-col gap-4 mt-2">
        <ViewDetails
          type="company"
          name={mintConfig.wildcatOne.name}
          bitcoin_public_key={mintConfig.wildcatOne.node_id}
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

        <div className="flex items-center justify-between px-2 py-2">
          <Label>
              <div className="flex flex-col">
                <span>Mint view (dev)</span>
                <span className="text-text-200 text-xs font-normal">
                  Display all local bills in bill overview
                </span>
              </div>
          </Label>
          <Switch checked={mintConfig.__dev_mintViewEnabled === true} onCheckedChange={() => { toggleMintView(); }}/>
        </div>

        {mintConfig.__dev_mintViewEnabled && (<div className="flex items-center justify-between px-2 py-2">
          <div className="flex-1">
            <FormProvider {...methods}>
              <Form onSubmit={onSubmit} className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <Input
                    {...methods.register("mint_node_id")}
                    label={"Mint Node Id"}
                    icon={<IdCardIcon className="text-text-300 h-5 w-5 stroke-1" />}
                    minLength={66}
                    maxLength={66}
                    required
                  />
                  <Button type="submit" disabled={mintNodeId.length !== 66}>Save</Button>
                </div>
                <div className="flex gap-1 justify-end">
                  <Button onClick={() => { resetToDefault(); }} size="xs" variant="ghost" type="button">Reset to default</Button>
                </div>
              </Form>
            </FormProvider>
          </div>
        </div>)}
      </div>
    </Page>
  );
}
