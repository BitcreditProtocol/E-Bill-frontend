import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { ChevronRightIcon, UserIcon } from "lucide-react";

import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import { FormattedCurrency } from "@/components/FormattedCurrency";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function ConfirmSign({ hasAgreedToTerms }: { hasAgreedToTerms: boolean }) {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button className="w-full" size="md" disabled={!hasAgreedToTerms}>
          <FormattedMessage
            id="endorse.sign"
            defaultMessage="Sign"
            description="Sign button"
          />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-elevation-50">
        <div className="flex flex-col gap-6 py-8 px-5">
          <div className="flex flex-col gap-1.5">
            <span className="text-text-300 text-lg font-medium">
              Are you sure?
            </span>
            <span className="text-text-200 text-xs">
              The signing of the endorsement is legally binding
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <Link to="/bill">
              <Button className="w-full" size="md">
                <FormattedMessage
                  id="endorse.confirm"
                  defaultMessage="Confirm"
                  description="Confirm button"
                />
              </Button>
            </Link>

            <DrawerClose>
              <Button className="w-full" variant="outline" size="md">
                <FormattedMessage
                  id="endorse.cancel"
                  defaultMessage="Cancel"
                  description="Cancel button"
                />
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default function Endorse() {
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);

  return (
    <div className="flex flex-col gap-6 max-w-[375px] bg-elevation-50 w-full min-h-fit h-screen py-4 px-5 absolute z-10">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <h1 className="text-text-300 text-base font-medium">
            <FormattedMessage
              id="endorse.title"
              defaultMessage="Endorse bill"
              description="Endorse title"
            />
          </h1>
        }
        trail={<></>}
      />

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between p-4 bg-elevation-200 border border-divider-50 rounded-lg">
          <div className="flex flex-col gap-0.5">
            <span className="text-text-300 text-base font-medium leading-6">
              Google Inc
            </span>
            <span className="text-text-200 text-xs font-normal leading-[18px]">
              03-Nov-24
            </span>
          </div>

          <div className="flex items-center gap-1 self-end">
            <FormattedCurrency
              className="text-sm"
              value={12.94101}
              type="credit"
            />
            <span className="text-text-200 text-[10px]">BTC</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-text-300 text-sm font-normal">
            <FormattedMessage
              id="endorse.orderOf"
              defaultMessage="to the order of"
              description="Order of endorsement"
            />
          </span>
          <button className="flex items-center justify-between gap-2 py-5 px-4 bg-elevation-200 border border-divider-50 rounded-lg">
            <UserIcon className="text-text-300 h-5 w-5" />
            <span className="w-full text-text-300 text-left text-sm font-medium">
              <FormattedMessage
                id="endorse.endorsee"
                defaultMessage="Endorsee"
                description="Endorsee"
              />
            </span>
            <ChevronRightIcon className="text-text-300 h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-3 justify-end">
        <div
          className="flex items-center gap-2"
          onClick={() => {
            setHasAgreedToTerms((current) => !current);
          }}
        >
          <Checkbox checked={hasAgreedToTerms} />

          <span className="text-text-300 text-base font-medium">
            <FormattedMessage
              id="endorse.termsAndConditions"
              defaultMessage="I agree to the Terms and conditions"
              description="Terms and conditions"
            />
          </span>
        </div>
        <ConfirmSign hasAgreedToTerms={hasAgreedToTerms} />
      </div>
    </div>
  );
}
