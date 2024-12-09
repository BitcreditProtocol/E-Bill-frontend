import { FormattedMessage } from "react-intl";
import firstIllustration from "@/assets/images/onboarding/first-illustration.svg";
import secondIllustration from "@/assets/images/onboarding/second-illustration.svg";
import thirdIllustration from "@/assets/images/onboarding/third-illustration.svg";
import fourthIllustration from "@/assets/images/onboarding/fourth-illustration.svg";

export function First() {
  return (
    <div className="h-full flex flex-col justify-between">
      <h1 className="text-text-300 text-[40px] font-normal leading-[50px] tracking-[-0.8px]">
        <FormattedMessage
          id="A strong trade credit solution. Directly between businesses"
          defaultMessage="A strong trade credit solution. Directly between businesses"
          description="First onboarding screen title"
        />
      </h1>

      <div className="flex-1 flex flex-col justify-center pointer-events-none">
        <img src={firstIllustration} className="w-full" />
      </div>
    </div>
  );
}

export function Second() {
  return (
    <div className="h-full flex flex-col justify-between">
      <h1 className="text-text-300 text-[40px] font-normal leading-[50px] tracking-[-0.8px]">
        <FormattedMessage
          id="No banks involved. Works even in a banking crisis"
          defaultMessage="No banks involved. Works even in a banking crisis"
          description="Second onboarding screen title"
        />
      </h1>

      <div className="flex-1 flex flex-col justify-center pointer-events-none">
        <img src={secondIllustration} className="w-full" />
      </div>
    </div>
  );
}

export function Third() {
  return (
    <div className="h-full flex flex-col justify-between">
      <h1 className="text-text-300 text-[40px] font-normal leading-[50px] tracking-[-0.8px]">
        <FormattedMessage
          id="Reduces the risk of default and the loss in case of default."
          defaultMessage="Reduces the risk of default and the loss in case of default."
          description="Third onboarding screen title"
        />
      </h1>

      <div className="flex-1 flex flex-col justify-center pointer-events-none">
        <img src={thirdIllustration} className="w-full" />
      </div>
    </div>
  );
}

export function Fourth() {
  return (
    <div className="h-full flex flex-col justify-between">
      <h1 className="text-text-300 text-[40px] font-normal leading-[50px] tracking-[-0.8px]">
        <FormattedMessage
          id="Based on proven Bitcoin tech, free to download and use for everyone."
          defaultMessage="Based on proven Bitcoin tech, free to download and use for everyone."
          description="Fourth onboarding screen title"
        />
      </h1>

      <div className="flex-1 flex flex-col justify-center pointer-events-none">
        <img src={fourthIllustration} className="w-full" />
      </div>
    </div>
  );
}
