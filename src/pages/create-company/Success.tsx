import { FormattedMessage } from "react-intl";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import successIllustration from "@/assets/success-illustration.svg";

export default function Success() {
  return (
    <motion.div
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col justify-between min-h-fit h-screen py-5 px-10 bg-background-ellipse bg-no-repeat select-none"
    >
      <div className="flex flex-col gap-12 justify-center h-full">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="font-sans font-medium text-2xl tracking-tight mb-0 text-center mx-6">
            <FormattedMessage
              id="Successfully created your identity"
              defaultMessage="Successfully created your identity"
              description="Header copy for Success page"
            />
          </h1>

          <span className="font-normal text-text-200 text-base text-center">
            <FormattedMessage
              id="We have successfully created your identity and you can now use the app"
              defaultMessage="We have successfully created your identity and you can now use the app"
              description="Subheader copy for Success page"
            />
          </span>
        </div>

        <img
          src={successIllustration}
          alt="Success"
          className="aspect-square max-w-[220px] mx-auto pointer-events-none"
        />
      </div>

      <Button className="w-full">
        <FormattedMessage
          id="Enter app"
          defaultMessage="Enter app"
          description="Action to enter the app after finishing the onboarding"
        />
      </Button>
    </motion.div>
  );
}
