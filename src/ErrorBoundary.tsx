import { Link, useRouteError } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Page from "@/components/wrappers/Page";
import { Button } from "@/components/ui/button";
import routes from "@/constants/routes";

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
  <Page className="gap-6" displayBackgroundEllipse>
    <div className="flex-1 flex flex-col gap-2 justify-center">
      <div className="flex items-center justify-between">
        <h1 className="text-text-300 text-3xl font-medium leading-[38px]">
          <FormattedMessage
            id="page.error.title"
            defaultMessage="Error : ("
            description="Error page title"
          />
        </h1>
      </div>

      <div className="flex flex-col gap-6 justify-center">
        <div className="flex flex-col gap-2 justify-center">
          <div className="text-text-300 text-sm">
            <FormattedMessage
              id="page.error.description.text"
              defaultMessage="There has been an application error."
              description="Error page description text"
            />
          </div>
        </div>

        <div className="flex flex-col gap-0.5">
          <div className="text-text-300 font-medium">
            <FormattedMessage
              id="page.error.reason.title"
              defaultMessage="Reason"
              description="Description text for unknown reason"
            />
          </div>
          <div className="text-text-200 text-sm">
            {error instanceof Error ? (<>{error.message}</>) : (
              <FormattedMessage
                id="page.error.reason.unknown.text"
                defaultMessage="Unknown error."
                description="Description text for unknown reason"
              />
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-12">
          <Link to={routes.ROOT}>
            <Button variant="default">
              <FormattedMessage
                  id="page.error.button.text"
                  defaultMessage="Take me back to safety!"
                  description="Primary call-to-action button text on error page"
                />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </Page>
  );
};

export default ErrorBoundary;
