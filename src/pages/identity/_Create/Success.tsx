import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Button } from "@/components/ui/button";
import routes from "@/constants/routes";
import SuccessIllustration from "@/assets/success-illustration.svg";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex flex-col gap-12 justify-center mb-auto">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-text-300 text-2xl font-medium text-center leading-8 mb-0 mx-6">
            <FormattedMessage
              id="Successfully created your identity"
              defaultMessage="Successfully created your identity"
              description="Header copy for Success page"
            />
          </h1>

          <span className="text-text-200 text-base font-normal text-center leading-normal">
            <FormattedMessage
              id="identity.create.success.description"
              defaultMessage="You have successfully created your identity and can now use the app"
              description="Subheader copy for success page"
            />
          </span>
        </div>

        <img
          src={SuccessIllustration}
          alt="Success"
          className="aspect-square max-w-[220px] mx-auto pointer-events-none"
        />
      </div>

      <Button
        className="w-full"
        size="md"
        onClick={() => {
          setTimeout(() => {
            navigate(routes.HOME);
          }, 4000);
        }}
      >
        <FormattedMessage
          id="identity.create.finish"
          defaultMessage="Finish"
          description="Action to enter the app after finishing the onboarding"
        />
      </Button>
    </div>
  );
}
