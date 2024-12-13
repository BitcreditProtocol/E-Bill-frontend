import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { First, Second, Third, Fourth } from "./Screens";
import { Button } from "@/components/ui/button";
import DotIndicator from "@/components/DotIndicator";
import layoutLogo from "@/assets/images/layout-logo.svg";

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
      navigate("/signup");
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full min-h-fit h-screen py-6 px-5 bg-background-ellipse bg-no-repeat select-none">
      <img src={layoutLogo} className="w-[30px] h-5" />

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
    </div>
  );
}
