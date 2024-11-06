import { FormattedMessage } from "react-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DocumentUpload } from "@/components/DocumentUpload";

export default function OptionalInformation() {
  return (
    <div className="flex flex-col justify-between min-h-fit h-screen py-5 px-10">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="font-sans font-medium text-[24px] tracking-tight mb-0">
            <FormattedMessage
              id="pages.onboarding.optionalInformation.title"
              defaultMessage="Optional information"
              description="Header copy for Optional information page"
            />
          </h1>

          <span className="font-normal text-text-200 text-base text-center">
            <FormattedMessage
              id="pages.onboarding.optionalInformation.subtitle"
              defaultMessage="This information will give you better credibility with your counter parties"
              description="Subheader copy for Optional information page"
            />
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <Input id="cityOfBirth" label="City of birth" />
          <Input id="socialSecurityNumber" label="Social security number" />
          <DocumentUpload />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button className="w-full bg-text-300 text-white font-medium rounded-[8px] py-[24px] px-[32px]">
          <FormattedMessage
            id="pages.onboarding.optionalInformation.continue"
            defaultMessage="Continue"
            description="Continue button copy for Optional information page"
          />
        </Button>

        <Button
          className="w-full text-text-300 bg-transparent font-medium border-text-300 rounded-[8px] py-[24px] px-[32px] hover:bg-transparent"
          variant="outline"
        >
          <FormattedMessage
            id="pages.onboarding.optionalInformation.continue"
            defaultMessage="Skip for now"
            description="Continue button copy for Optional information page"
          />
        </Button>
      </div>
    </div>
  );
}
