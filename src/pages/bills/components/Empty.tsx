import { FormattedMessage } from "react-intl";
import { Button } from "@/components/ui/button";
import createBillIllustration from "@/assets/create-bill-illustration.svg";
import { Link } from "react-router-dom";
import routes from "@/constants/routes";

export default function Empty() {
  return (
    <div className="flex-1 flex flex-col gap-3 items-center justify-center">
      <div className="flex flex-col items-center gap-4 px-12">
        <img src={createBillIllustration} className="mb-1" />

        <div className="flex flex-col items-center gap-2">
          <h3 className="text-xl font-medium text-text-300">
            <FormattedMessage
              id="No bills issued yet"
              defaultMessage="No bills issued yet"
              description="Empty bills list message"
            />
          </h3>

          <span className="text-base text-text-200 text-center">
            <FormattedMessage
              id="Start creating a bill and distribute it to your contacts"
              defaultMessage="Start creating a bill and distribute it to your contacts"
              description="Description to start creating a bill"
            />
          </span>
        </div>

        <Link to={`/${routes.CREATE_BILL}`}>
          <Button
            className="text-text-300 bg-transparent font-medium border-text-300 rounded-[8px] py-3 px-6 hover:bg-transparent"
            variant="outline"
          >
            <FormattedMessage
              id="Issue bill"
              defaultMessage="Issue bill"
              description="Action to start creating a bill"
            />
          </Button>
        </Link>
      </div>
    </div>
  );
}
