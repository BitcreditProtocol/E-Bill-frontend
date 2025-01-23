import { FormattedMessage } from "react-intl";
import { PencilIcon } from "lucide-react";
import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import PageTitle from "@/components/typography/PageTitle";
import Company from "./components/Company";
import Details from "./components/Details";
import Delete from "../components/Delete";

export default function View() {
  return (
    <Page className="gap-6">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <PageTitle>
            <FormattedMessage
              id="contacts.view.title"
              defaultMessage="View contact"
              description="Title for view contact page"
            />
          </PageTitle>
        }
        trail={
          <button className="flex items-center justify-center p-1.5 h-8 w-8 bg-elevation-200 border border-divider-50 rounded-md">
            <PencilIcon className="text-text-300 h-5 w-5 stroke-1" />
          </button>
        }
      />

      <Details type="company" name="Company Name" nodeId="0x123abcdef4567890" />
      <Company />
      <Delete />
    </Page>
  );
}
