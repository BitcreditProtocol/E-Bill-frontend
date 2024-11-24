import { useState } from "react";
import { First, Second, Third, Fourth } from "./Screens";
import { Button } from "@/components/ui/button";
import DotIndicator from "@/components/DotIndicator";
import layoutLogo from "@/assets/images/layout-logo.svg";

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [<First />, <Second />, <Third />, <Fourth />];

  const handleDotClick = (index: number) => {
    setCurrentStep(index);
  };

  const handleNextClick = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Get Started clicked!");
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full min-h-fit h-screen py-6 px-5 bg-background-ellipse bg-no-repeat select-none">
      <img src={layoutLogo} className="w-[30px] h-5" />

      {steps[currentStep]}

      <div className="flex flex-col gap-6">
        <DotIndicator
          steps={steps.length}
          current={currentStep}
          onClick={handleDotClick}
        />

        <Button variant="default" className="w-full" onClick={handleNextClick}>
          {currentStep === steps.length - 1 ? "Get started" : "Next"}
        </Button>
      </div>
    </div>
  );
}
