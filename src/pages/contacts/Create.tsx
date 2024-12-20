import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { ChevronLeftIcon, PencilIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import routes from "@/constants/routes";

import type { Contact } from "@/types/contact";
import { ContactTypes } from "@/types/contact";
import Form from "./components/Form";
import Icon from "./components/Icon";
import TypeSwitch from "./components/TypeSwitch";

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
          id="Create new contact"
          defaultMessage="Create new contact"
          description="Create new contact title"
        />
      </h1>
    </div>
  );
}

export default function Create() {
  const [type, setType] = useState<Contact['type']>(ContactTypes.Person);

  return (
    <div className="flex flex-col items-center gap-6 w-full min-h-fit h-screen py-4 px-5 select-none">
      <TopBar />
      <TypeSwitch value={type} onChange={setType} />

      <div className="flex flex-col gap-3 w-16">
        <div className="relative cursor-pointer">
          <Icon type={type} name="John Doe" />

          <div className="absolute -bottom-1 right-2 flex items-center justify-center w-6 h-6 bg-brand-200 rounded-full">
            <PencilIcon className="w-2.5 h-2.5 text-white" />
          </div>
        </div>

        <span className="text-brand-200 text-xs font-medium">
          {type === ContactTypes.Person ? (
            <FormattedMessage
              id="Add photo"
              defaultMessage="Add photo"
              description="Upload photo button"
            />
          ) : (
            <FormattedMessage
              id="Add logo"
              defaultMessage="Add logo"
              description="Upload logo button"
            />
          )}
        </span>
      </div>

      <Form type={type} />

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
