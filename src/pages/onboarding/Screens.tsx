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
          id="onboarding.screens.first"
          defaultMessage="The simple trade finance solution. Capital to grow your business."
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
          id="onboarding.screens.second"
          defaultMessage="B2B direct credit. no middlemen. Easier financing, better terms."
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
          id="onboarding.screens.third"
          defaultMessage="Practical, clear,  and organised. Your finances at your fingertips."
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
          id="onboarding.screens.fourth"
          defaultMessage="Open software, always on, 24x7. Free to download and use for all."
          description="Fourth onboarding screen title"
        />
      </h1>

      <div className="flex-1 flex flex-col justify-center pointer-events-none">
        <img src={fourthIllustration} className="w-full" />
      </div>
    </div>
  );
}
