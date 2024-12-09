import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function RequiredInformation() {
  return (
    <div className="flex flex-col bg-elevation-200 rounded-[16px] gap-6 py-6 px-5">
      <div className="flex justify-between">
        <span className="text-text-300 font-medium">
          <FormattedMessage
            id="Required information"
            defaultMessage="Required information"
            description="Header for required information section"
          />
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#1B0F0080]">
            <FormattedMessage
              id="Legal full name"
              defaultMessage="Legal full name"
              description="Label for legal full name input"
            />
          </span>
          <span className="text-sm text-text-300 font-medium">John Doe</span>
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
            example@bit.cr
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
            The One Street 86, 11490, Nowhere
          </span>
        </div>
      </div>
    </div>
  );
}

function OptionalInformation() {
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
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#1B0F0080]">
            <FormattedMessage
              id="Birth date"
              defaultMessage="Birth date"
              description="Label for birth date input"
            />
          </span>
          <span className="text-sm text-text-300 font-medium">-</span>
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
          <span className="text-sm text-text-300 font-medium">-</span>
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
          <span className="text-sm text-text-300 font-medium">-</span>
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
          <span className="text-sm text-text-300 font-medium">-</span>
        </div>

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

export default function ConfirmIdentity() {
  const navigate = useNavigate();

  const signToConfirm = () => { navigate("/success"); };

  return (
    <div className="flex flex-col justify-between gap-10 min-h-fit h-screen py-5 px-10">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="font-sans font-medium text-2xl tracking-tight mb-0 text-center mx-6">
          <FormattedMessage
            id="Confirm identity"
            defaultMessage="Confirm identity"
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
        <RequiredInformation />
        <OptionalInformation />
      </div>

      <Button
        onClick={signToConfirm}
        className="w-full bg-text-300 text-white font-medium rounded-[8px] py-[24px] px-[32px]"
      >
        <FormattedMessage
          id="Sign to confirm"
          defaultMessage="Sign to confirm"
          description="Action to sign the information and create identity"
        />
      </Button>
    </div>
  );
}
