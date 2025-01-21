type StepIndicatorProps = {
  totalSteps: number;
  currentStep: number;
};

export default function StepIndicator({
  totalSteps,
  currentStep,
}: StepIndicatorProps) {
  return (
    <div className="flex-1 flex gap-1 justify-center">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`h-[2px] w-[22px] rounded-full ${
            index <= currentStep ? "bg-text-300" : "bg-elevation-350"
          }`}
        />
      ))}
    </div>
  );
}
