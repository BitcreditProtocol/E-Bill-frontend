import { FormattedMessage } from "react-intl";

import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import SectionTitle from "@/components/typography/SectionTitle";
import Preview from "../components/Preview";
import Quote from "./components/Quote";
import { Button } from "@/components/ui/button";

export default function SelectQuote() {
  return (
    <div className="flex flex-col min-h-fit h-screen gap-6 py-4 px-5 w-full select-none">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle>
            <FormattedMessage
              id="bill.mint.title"
              defaultMessage="Mint quotes"
              description="Mint quotes page title"
            />
          </PageTitle>
        }
        trail={<></>}
      />

      <div className="flex-1 flex flex-col gap-6">
        <Preview
          name="Pear, Inc"
          date="31-Jan-2025"
          amount={1.2311}
          currency="BTC"
        />

        <div className="flex flex-col gap-4">
          <SectionTitle>
            <FormattedMessage
              id="bill.mint.selectQuote"
              defaultMessage="Select a quote"
              description="Select a quote section title"
            />
          </SectionTitle>

          <div className="flex flex-col gap-3">
            <Quote mintName="Wildcat One" rate={0.0001} status="pending" />
            <Quote mintName="Whalers Mint" rate={0.0001} status="accepted" />
            <Quote mintName="Fishermans Mint" rate={0.0001} status="declined" />
          </div>
        </div>

        <Button variant="outline" size="md" className="mt-auto">
          <FormattedMessage
            id="bill.mint.cancel"
            defaultMessage="Cancel mint request"
            description="Cancel mint request button"
          />
        </Button>
      </div>
    </div>
  );
}
