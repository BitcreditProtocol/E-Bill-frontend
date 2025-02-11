import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import { Title, Description } from "@/components/typography/Step";
import { Button } from "@/components/ui/button";
import routes from "@/constants/routes";
import LockIllustration from "@/assets/encrypted-data-illustration.svg";

export default function GetStarted() {
  return (
    <Page className="gap-10" displayBackgroundEllipse>
      <Topbar lead={<NavigateBack />} />

      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-2">
          <Title>
            <FormattedMessage
              id="identity.create.title"
              defaultMessage="Encrypted data"
              description="Header copy for Create new identity page"
            />
          </Title>

          <Description className="text-center">
            <FormattedMessage
              id="identity.create.subtitle"
              defaultMessage="Your personal data is stored securely and encrypted in the network, nobody can decrypt it without your permission"
              description="Subheader copy for Create new identity page"
            />
          </Description>
        </div>

        <img src={LockIllustration} className="h-48 w-48 self-center" />
      </div>

      <div className="flex flex-col gap-2 mt-auto">
        <Link to={routes.CREATE_IDENTITY}>
          <Button className="w-full" size="md">
            <FormattedMessage
              id="identity.create.new"
              defaultMessage="Create new identity"
              description="Button to start creating a new identity"
            />
          </Button>
        </Link>

        <Link to={"/" + routes.RESTORE_WITH_SEED_PHRASE}>
          <Button className="w-full" variant="outline" size="md">
            <FormattedMessage
              id="identity.create.restore"
              defaultMessage="Restore identity"
              description="Button to restore an existing identity"
            />
          </Button>
        </Link>
      </div>
    </Page>
  );
}
