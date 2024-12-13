import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { motion } from "motion/react";
import { PencilIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils";

type RequiredInformationProps = {
  editRequiredInformation: () => void;
};

function RequiredInformation({
  editRequiredInformation,
}: RequiredInformationProps) {
  const { getValues } = useFormContext();

  return (
    <div className="flex flex-col border border-divider-100 rounded-[16px] gap-6 py-6 px-5">
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

        <Separator />

        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#1B0F0080]">
            <FormattedMessage
              id="Postal address"
              defaultMessage="Postal address"
              description="Label for postal address input"
            />
          </span>
          <span className="text-sm text-text-300 font-medium">
            {getValues("address")}
          </span>
        </div>
      </div>
    </div>
  );
}

type OptionalInformationProps = {
  profilePicturePreview: string;
  editOptionalInformation: () => void;
};

function OptionalInformation({
  profilePicturePreview,
  editOptionalInformation,
}: OptionalInformationProps) {
  const { getValues } = useFormContext();

  return (
    <div className="flex flex-col font-medium border-[1px] border-divider-100 rounded-[16px] gap-6 py-6 px-5">
      <div className="flex justify-between">
        <span className="text-text-300 font-medium">
          <FormattedMessage
            id="Optional information"
            defaultMessage="Optional information"
            description="Header for optional information section"
          />
        </span>

        <button
          className="flex gap-1 items-center text-brand-200 text-xs font-medium p-0"
          onClick={editOptionalInformation}
        >
          Edit
          <PencilIcon className="w-3 h-3 text-brand-200" />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <Avatar className="bg-brand-50">
          <AvatarImage src={profilePicturePreview} />
          <AvatarFallback className="bg-brand-100 text-brand-200 text-[20px] font-medium">
            {getInitials(getValues("name") as string)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#1B0F0080]">
            <FormattedMessage
              id="Birth date"
              defaultMessage="Birth date"
              description="Label for birth date input"
            />
          </span>
          <span className="text-sm text-text-300 font-medium">
            {getValues("date_of_birth") || "-"}
          </span>
        </div>

        <Separator />

        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#1B0F0080]">
            <FormattedMessage
              id="Country of birth"
              defaultMessage="Country of birth"
              description="Label for country of birth input"
            />
          </span>
          <span className="text-sm text-text-300 font-medium">
            {getValues("country_of_birth") || "-"}
          </span>
        </div>

        <Separator />

        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#1B0F0080]">
            <FormattedMessage
              id="City of birth"
              defaultMessage="City of birth"
              description="Label for city of birth input"
            />
          </span>
          <span className="text-sm text-text-300 font-medium">
            {getValues("city_of_birth") || "-"}
          </span>
        </div>

        <Separator />

        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#1B0F0080]">
            <FormattedMessage
              id="Social security number"
              defaultMessage="Social security number"
              description="Label for social security number input"
            />
          </span>
          <span className="text-sm text-text-300 font-medium">
            {getValues("identification_number") || "-"}
          </span>
        </div>

        <Separator />

        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#1B0F0080]">
            <FormattedMessage
              id="Identity document"
              defaultMessage="Identity document"
              description="Label for identity document input"
            />
          </span>
          <span className="text-sm text-text-300 font-medium">-</span>
        </div>
      </div>
    </div>
  );
}

type PreviewIdentityProps = {
  profilePicturePreview: string;
  continueToNextStep: () => void;
  editRequiredInformation: () => void;
  editOptionalInformation: () => void;
};

export default function PreviewIdentity({
  profilePicturePreview,
  continueToNextStep,
  editRequiredInformation,
  editOptionalInformation,
}: PreviewIdentityProps) {
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);

  return (
    <motion.div
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex-1 flex flex-col justify-between gap-10"
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

      <div className="flex flex-col gap-6">
        <RequiredInformation
          editRequiredInformation={editRequiredInformation}
        />
        <OptionalInformation
          profilePicturePreview={profilePicturePreview}
          editOptionalInformation={editOptionalInformation}
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <Checkbox id="terms_and_conditions" checked={hasAgreedToTerms} />
          <span
            className="text-text-300 text-sm"
            onClick={() => {
              setHasAgreedToTerms(!hasAgreedToTerms);
            }}
          >
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
