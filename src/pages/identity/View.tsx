import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { PencilIcon } from "lucide-react";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import Information from "./components/Information";

export default function View() {
  const navigate = useNavigate();

  return (
    <Page className="gap-5">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle>
            <FormattedMessage
              id="identity.view"
              defaultMessage="Personal identity"
              description="View personal identity title"
            />
          </PageTitle>
        }
        trail={
          <button
            className="flex flex-col items-center justify-center h-8 w-8 bg-elevation-200 border border-divider-50 rounded-md"
            onClick={() => {
              navigate(`/identity/edit`);
            }}
          >
            <PencilIcon className="text-text-300 h-5 w-5 stroke-1" />
          </button>
        }
      />

      <div className="flex flex-col gap-6">
        <Information
          node_id="11111111111111111aaaaaaaaa000"
          name="John Doe"
          email=""
          country="United States"
          city="New York"
          zip="10001"
          address="123 Main St"
          date_of_birth="1990-01-01"
          country_of_birth="United States"
          city_of_birth="New York"
          identification_number=""
        />
      </div>
    </Page>
  );
}
