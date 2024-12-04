import { useFormContext } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type GetStartedProps = {
  canContinue: boolean;
  continueToNextStep: () => void;
};

export default function RequiredInformation({
  canContinue,
  continueToNextStep,
}: GetStartedProps) {
  const { register } = useFormContext();

  return (
    <motion.div
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex-1 flex flex-col justify-between"
    >
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="font-sans font-medium text-[24px] tracking-tight mb-0">
            <FormattedMessage
              id="pages.onboarding.requiredInformation.title"
              defaultMessage="Required information"
              description="Header copy for Required information page"
            />
          </h1>

          <span className="font-normal text-text-200 text-base text-center">
            <FormattedMessage
              id="pages.onboarding.requiredInformation.subtitle"
              defaultMessage="Please fill in your personal details, all details are handled confidentially"
              description="Subheader copy for Required information page"
            />
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <Input
            {...register("name")}
            id="name"
            label="Legal full name"
            required
          />
          <Input
            {...register("email")}
            id="email"
            label="Email address"
            required
          />
          <Input
            {...register("postal_address")}
            id="postal_address"
            label="Postal address"
            required
          />
        </div>
      </div>

      <Button
        size="md"
        className="w-full"
        onClick={continueToNextStep}
        disabled={!canContinue}
      >
        <FormattedMessage
          id="pages.onboarding.requiredInformation.continue"
          defaultMessage="Continue"
          description="Continue button copy for Required information page"
        />
      </Button>
    </motion.div>
  );
}
