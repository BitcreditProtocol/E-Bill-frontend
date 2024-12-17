import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { ChevronLeftIcon, CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/utils";
import routes from "@/constants/routes";
import type { Contact } from "@/types/contact";

import Form from "./components/Form";
import Icon from "./components/Icon";

function TopBar() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(routes.CONTACTS);
  };

  return (
    <div className="flex items-center justify-between w-full">
      <button
        className="flex justify-center items-center h-8 w-8 bg-elevation-200 border-[1px] border-divider-50 rounded-full"
        onClick={goBack}
      >
        <ChevronLeftIcon className="h-5 w-5 text-text-300" strokeWidth={1} />
      </button>

      <h1 className="flex-1 flex justify-center text-text-300 text-base font-medium leading-6 mr-8">
        <FormattedMessage
          id="Edit contact"
          defaultMessage="Edit contact"
          description="Edit contact title"
        />
      </h1>
    </div>
  );
}

type BasicDetailsProps = {
  type: Contact["type"];
  name: Contact["name"];
  public_key: Contact["public_key"];
};

function BasicDetails({ type, name, public_key }: BasicDetailsProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Icon type={type} name={name} />

      <div className="flex flex-col items-center gap-3">
        <span className="text-text-300 text-base font-medium leading-6">
          {name}
        </span>

        <button className="flex items-center justify-center gap-1 w-full bg-transparent">
          <span className="text-text-200 text-xs leading-[18px]">
            {public_key}
          </span>
          <CopyIcon
            className="w-4 h-4 text-text-200"
            onClick={() => {
              void copyToClipboard(public_key);
            }}
          />
        </button>
      </div>
    </div>
  );
}

export default function Edit() {
  return (
    <div className="flex flex-col items-center gap-6 w-full min-h-fit h-screen py-4 px-5">
      <TopBar />

      <div className="flex flex-col w-full gap-6">
        <BasicDetails type={0} name="John Doe" public_key="0x1234567890abcdef" />
        <Form type={0} />
      </div>

      <div className="flex gap-3 w-full">
        <Button className="w-full" size="sm" variant="outline">
          <FormattedMessage
            id="Cancel"
            defaultMessage="Cancel"
            description="Cancel button"
          />
        </Button>

        <Button className="w-full" size="sm">
          <FormattedMessage
            id="Save"
            defaultMessage="Save"
            description="Save button"
          />
        </Button>
      </div>
    </div>
  );
}
