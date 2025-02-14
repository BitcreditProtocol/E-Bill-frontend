import { FormattedMessage } from "react-intl";
import Page from "@/components/wrappers/Page";

export default function ShutdownInfo() {
  return (
    <Page className="gap-6" displayBackgroundEllipse>
      <div className="flex-1 flex flex-col gap-2 justify-center">
        <div className="flex items-center justify-between">
          <h1 className="text-text-300 text-3xl font-medium leading-[38px]">
            <FormattedMessage
              id="settings.shutdown.complete.title"
              defaultMessage="Shutdown complete."
              description="Shutdown complete page title"
            />
          </h1>
        </div>

        <div className="flex flex-col gap-2 justify-center">
          <div className="text-text-200 text-sm">
            <FormattedMessage
              id="settings.shutdown.complete.description"
              defaultMessage="The application has been shut down."
              description="Shutdown complete page description"
            />
          </div>
          <div className="text-text-200 text-sm">
            <FormattedMessage
              id="settings.shutdown.complete.instruction.text"
              defaultMessage="You can now close the browser window."
              description="Shutdown complete page instruction text"
            />
          </div>
        </div>
      </div>
    </Page>
  );
}
