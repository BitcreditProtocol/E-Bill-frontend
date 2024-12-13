import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { motion } from "motion/react";
import { PencilIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

type RequiredInformationProps = {
  editRequiredInformation: () => void;
};

function RequiredInformation({
  editRequiredInformation,
}: RequiredInformationProps) {
  const { getValues } = useFormContext();

  return (
    <div className="flex-1">
      <div className="flex flex-col border border-divider-100 rounded-xl gap-6 py-6 px-5">
        <div className="flex justify-between">
          <span className="text-text-300 font-medium">
            <FormattedMessage
              id="Required information"
              defaultMessage="Required information"
              description="Header for required information section"
            />
          </span>

          <button
            className="flex gap-1 items-center text-brand-200 text-xs font-medium p-0"
            onClick={editRequiredInformation}
          >
            <FormattedMessage
              id="Edit"
              defaultMessage="Edit"
              description="Edit button label"
            />
            <PencilIcon className="w-3 h-3 text-brand-200" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-[#1B0F0080]">
              <FormattedMessage
                id="Full name"
                defaultMessage="Full name"
                description="Label for full name input"
              />
            </span>
            <span className="text-sm text-text-300 font-medium">
              {getValues("name")}
            </span>
          </div>

          <Separator />

          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-[#1B0F0080]">
              <FormattedMessage
                id="Email address"
                defaultMessage="Email address"
                description="Label for email address input"
              />
            </span>
            <span className="text-sm text-text-300 font-medium">
              {getValues("email")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

type PreviewIdentityProps = {
  continueToNextStep: () => void;
  editRequiredInformation: () => void;
};

export default function PreviewIdentity({
  continueToNextStep,
  editRequiredInformation,
}: PreviewIdentityProps) {
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);

  return (
    <motion.div
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex-1 flex flex-col gap-10"
    >
      <div className="flex flex-col gap-2 items-center">
        <h1 className="font-sans font-medium text-2xl tracking-tight mb-0 text-center mx-6">
          <FormattedMessage
            id="Preview identity"
            defaultMessage="Preview identity"
            description="Header copy for confirm identity page"
          />
        </h1>

        <span className="font-normal text-text-200 text-base text-center">
          <FormattedMessage
            id="Please check if all the details are correct before proceeding"
            defaultMessage="Please check if all the details are correct before proceeding"
            description="Subheader copy for confirm identity page"
          />
        </span>
      </div>

      <RequiredInformation editRequiredInformation={editRequiredInformation} />

      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <Checkbox id="terms_and_conditions" checked={hasAgreedToTerms} onClick={() => { setHasAgreedToTerms((current) => !current); }}/>
          <span
            className="text-text-300 text-sm cursor-pointer"
            onClick={() => { setHasAgreedToTerms((current) => !current); }}>
            <FormattedMessage
              id="I agree to the Terms and conditions"
              defaultMessage="I agree to the Terms and conditions"
              description="Agree to terms and conditions checkbox label"
            />
          </span>
        </div>
        <Button
          onClick={continueToNextStep}
          className="w-full"
          disabled={!hasAgreedToTerms}
        >
          <FormattedMessage
            id="Sign"
            defaultMessage="Sign"
            description="Action to sign the information and create identity"
          />
        </Button>
      </div>
    </motion.div>
  );
}
