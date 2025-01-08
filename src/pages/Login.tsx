import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { FileLock2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import routes from "@/constants/routes";

import loginIllustration from "@/assets/login-illustration.svg";
import logo from "@/assets/logo.svg";

export default function Login() {
  const navigate = useNavigate();

  const goToUnlockWithPin = () => { navigate(`/${routes.UNLOCK}`); };

  const goToIdentityRestoration = () => {
    navigate(`/${routes.RESTORE_WITH_SEED_PHRASE}`);
  };
  const goToIdentityCreation = () => {
    navigate(`/${routes.CREATE_IDENTITY}`);
  };

  return (
    <div className="flex flex-col justify-between min-h-fit h-screen py-12 px-[30px]">
      <div className="flex flex-col gap-8 items-center">
        <img src={logo} alt="Bitcredit" className="w-[120px]" />
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="font-sans font-medium text-[24px] tracking-tight mb-0">
            <FormattedMessage
              id="Bitcoin for the real economy"
              defaultMessage="Bitcoin for the real economy"
              description="Heading copy for Login page"
            />
          </h1>
          <span className="font-normal text-text-200 text-[16px]">
            <FormattedMessage
              id="A strong trade credit solution, directly between businesses"
              defaultMessage="A strong trade credit solution, directly between businesses"
              description="Subheading copy for Login page"
            />
          </span>
        </div>
      </div>

      <img
        src={loginIllustration}
        alt="Bitcoin Credit Layer"
        className="aspect-square max-w-[220px] mx-auto"
      />

      <div className="flex flex-col content-between gap-4 text-center">
        <div className="flex flex-col gap-2">
          <Button
            className="w-full bg-brand-200 text-white font-medium rounded-[8px] py-[24px] px-[32px]"
            onClick={goToUnlockWithPin}
          >
            <FormattedMessage
              id="Unlock with PIN"
              defaultMessage="Unlock with PIN"
              description="Go to Unlock page"
            />
          </Button>

          <Button className="w-full bg-text-300 text-white font-medium rounded-[8px] py-[24px] px-[32px]"
            onClick={goToIdentityCreation}>
            <FormattedMessage
              id="New identity"
              defaultMessage="New identity"
              description="Start Identity creation flow"
            />
          </Button>
        </div>

        <Button
          variant="link"
          className="gap-2 text-[#1B0F0080] text-[14px] font-medium"
          onClick={goToIdentityRestoration}
        >
          <FormattedMessage
            id="Restore with seed phrase"
            defaultMessage="Restore with seed phrase"
            description="Start restoration process with seed phrase"
          />
          <FileLock2Icon width={20} color="#1B0F0080" strokeWidth={1} />
        </Button>
      </div>
    </div>
  );
}
