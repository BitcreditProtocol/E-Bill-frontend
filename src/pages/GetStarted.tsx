import { FormattedMessage } from "react-intl";

import Page from "@/components/wrappers/Page";
import NavigateBack from "@/components/NavigateBack";
import Topbar from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import { Title, Description } from "@/components/typography/Step";
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
        <Button size="md">
          <FormattedMessage
            id="identity.create.createNew"
            defaultMessage="Create new identity"
            description="Button to start creating a new identity"
          />
        </Button>
        <Button variant="outline" size="md">
          <FormattedMessage
            id="identity.create.restore"
            defaultMessage="Restore identity"
            description="Button to restore an existing identity"
          />
        </Button>
      </div>
    </Page>
  );
}
