import { FormattedMessage } from "react-intl";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import encryptedDataIllustration from "@/assets/encrypted-data-illustration.svg";

type GetStartedProps = {
  startCreatingIdentity: () => void;
};

export default function GetStarted({ startCreatingIdentity }: GetStartedProps) {
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
              id="pages.identityCreation.createNewIdentity.title"
              defaultMessage="Encrypted data"
              description="Header copy for Create new identity page"
            />
          </h1>

          <span className="font-normal text-text-200 text-base text-center">
            <FormattedMessage
              id="pages.identityCreation.createNewIdentity.subtitle"
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

      <Button className="w-full" size="md" onClick={startCreatingIdentity}>
        <FormattedMessage
          id="pages.identityCreation.createNewIdentity.newIdentity"
          defaultMessage="Create new identity"
          description="Start Identity creation flow"
        />
      </Button>
    </motion.div>
  );
}
