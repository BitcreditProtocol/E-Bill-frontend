import { FormattedMessage } from "react-intl";
import { Button } from "@/components/ui/button";
import successIllustration from "@/assets/success-illustration.svg";

export default function Success() {
  return (
    <div className="flex flex-col justify-between min-h-fit h-screen py-5 px-10">
      <div className="flex flex-col gap-12 justify-center h-full">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="font-sans font-medium text-2xl tracking-tight mb-0 text-center mx-6">
            <FormattedMessage
              id="Success"
              defaultMessage="Success"
              description="Header copy for Success page"
            />
          </h1>

          <span className="font-normal text-text-200 text-base text-center">
            <FormattedMessage
              id="You can now view the bill in your overview of bills"
              defaultMessage="You can now view the bill in your overview of bills"
              description="Subheader copy for Success page"
            />
          </span>
        </div>

        <img
          src={successIllustration}
          alt="Success"
          className="aspect-square max-w-[220px] mx-auto"
        />
      </div>

      <Button>
        <FormattedMessage
          id="Go to overview"
          defaultMessage="Go to overview"
          description="Action to view the created bill"
        />
      </Button>
    </div>
  );
}
