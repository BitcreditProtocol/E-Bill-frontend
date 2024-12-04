import { ChevronLeftIcon } from "lucide-react";

type StepIndicatorProps = {
  totalSteps: number;
  currentStep: number;
};

function StepIndicator({ totalSteps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex-1 flex gap-1 justify-center">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`h-[2px] w-[22px] rounded-[1px] ${
            index <= currentStep ? "bg-text-300" : "bg-[#1B0F0033]"
          }`}
        />
      ))}
    </div>
  );
}

type HeaderProps = {
  totalSteps: number;
  currentStep: number;
  goToPreviousStep: () => void;
};

export default function Header({
  totalSteps,
  currentStep,
  goToPreviousStep,
}: HeaderProps) {
  return (
    <div className="flex items-center justify-between mr-8">
      <button
        className="flex justify-center items-center pl-[7px] pr-[9px] h-8 w-8 bg-[#1B0F0033] border-[1px] border-[#1B0F000F] rounded-full"
        onClick={goToPreviousStep}
      >
        <ChevronLeftIcon className="h-4 w-4 text-text-300" />
      </button>

      <StepIndicator totalSteps={totalSteps} currentStep={currentStep} />
    </div>
  );
}
