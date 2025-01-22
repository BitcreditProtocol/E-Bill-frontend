import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";

import Page from "@/components/wrappers/Page";
import { Button } from "@/components/ui/button";
import DotIndicator from "@/components/DotIndicator";
import OnboardingLogo from "@/assets/images/onboarding-logo.svg";
import routes from "@/constants/routes";

import { First, Second, Third, Fourth } from "./Screens";

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [<First />, <Second />, <Third />, <Fourth />];

  const handleDotClick = (index: number) => {
    setCurrentStep(index);
  };

  const handleNextClick = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate(routes.CREATE_IDENTITY);
    }
  };

  return (
    <Page displayBackgroundEllipse>
      <img src={OnboardingLogo} className="h-3 mt-10 mb-3 self-start" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1"
        >
          {steps[currentStep]}
        </motion.div>
      </AnimatePresence>

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
    </Page>
  );
}
