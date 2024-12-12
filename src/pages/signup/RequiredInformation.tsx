import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RequiredInformation() {
  const navigate = useNavigate();

  const verifyEmail = () => { navigate("/email-verification"); };

  return (
    <div className="flex flex-col justify-between min-h-fit h-screen py-5 px-10">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="font-sans font-medium text-[24px] tracking-tight mb-0">
            <FormattedMessage
              id="Required information"
              defaultMessage="Required information"
              description="Header copy for Required information page"
            />
          </h1>

          <span className="font-normal text-text-200 text-base text-center">
            <FormattedMessage
              id="Please fill in your personal details, all details are handled confidentially"
              defaultMessage="Please fill in your personal details, all details are handled confidentially"
              description="Subheader copy for Required information page"
            />
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <Input id="fullName" label="Legal full name" required />
          <Input id="emailAddress" label="Email address" required />
          <Input id="postalAddress" label="Postal address" required />
        </div>
      </div>

      <Button
        onClick={verifyEmail}
        className="w-full bg-text-300 text-white font-medium rounded-[8px] py-[24px] px-[32px]"
      >
        <FormattedMessage
          id="Continue"
          defaultMessage="Continue"
          description="Continue button copy for Required information page"
        />
      </Button>
    </div>
  );
}
