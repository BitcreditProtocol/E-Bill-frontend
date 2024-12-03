import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Button } from "@/components/ui/button";
import encryptedDataIllustration from "@/assets/encrypted-data-illustration.svg";

export default function CreateNewIdentity() {
  const navigate = useNavigate();

  const startCreatingIdentity = () => { navigate("/required-information"); };

  return (
    <div className="flex flex-col justify-between min-h-fit h-screen py-5 px-10">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="font-sans font-medium text-[24px] tracking-tight mb-0">
            <FormattedMessage
              id="Encrypted data"
              defaultMessage="Encrypted data"
              description="Header copy for Create new identity page"
            />
          </h1>

          <span className="font-normal text-text-200 text-base text-center">
            <FormattedMessage
              id="Personal data is stored encrypted and cannot be accessed without your signing an explicit approval"
              defaultMessage="Personal data is stored encrypted and cannot be accessed without your signing an explicit approval"
              description="Subheader copy for Create new identity page"
            />
          </span>
        </div>

        <img
          src={encryptedDataIllustration}
          alt="Encrypted data"
          className="aspect-square max-w-[220px] mx-auto"
        />
      </div>

      <Button
        onClick={startCreatingIdentity}
        className="w-full bg-text-300 text-white font-medium rounded-[8px] py-[24px] px-[32px]"
      >
        <FormattedMessage
          id="Create new identity"
          defaultMessage="Create new identity"
          description="Start Identity creation flow"
        />
      </Button>
    </div>
  );
}
