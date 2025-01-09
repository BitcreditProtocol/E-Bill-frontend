import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { motion } from "motion/react";
import { ChevronLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import Topbar from "@/components/Topbar";
import routes from "@/constants/routes";
import encryptedDataIllustration from "@/assets/encrypted-data-illustration.svg";

export default function Warning() {
  const navigate = useNavigate();

  const getStarted = () => {
    navigate(routes.IDENTITY_CATEGORY);
  };

  const goBack = () => {
    navigate(routes.ROOT);
  };

  return (
    <motion.div
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex-1 flex flex-col justify-between bg-background-ellipse bg-no-repeat py-4 px-5"
    >
      <div className="flex flex-col gap-12">
        <Topbar
          lead={
            <button
              className="flex justify-center items-center pl-[7px] pr-[9px] h-8 w-8 bg-elevation-200 border-[1px] border-divider-50 rounded-full"
              onClick={goBack}
            >
              <ChevronLeftIcon
                className="h-5 w-5 text-text-300"
                strokeWidth={1}
              />
            </button>
          }
        />

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
          className="aspect-square max-w-[220px] mx-auto pointer-events-none"
        />
      </div>

      <Button className="w-full" size="md" onClick={getStarted}>
        <FormattedMessage
          id="Create new identity"
          defaultMessage="Create new identity"
          description="Start Identity creation flow"
        />
      </Button>
    </motion.div>
  );
}
