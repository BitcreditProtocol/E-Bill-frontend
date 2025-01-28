import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { GitForkIcon, UserPenIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Description, Title } from "@/components/typography/Step";
import { Button } from "@/components/ui/button";

export default function RequiredInformation({
  contactType,
  switchContact,
  moveToNextStep,
}: {
  contactType: "person" | "company" | "mint";
  switchContact: React.ReactNode;
  moveToNextStep: () => void;
}) {
  const intl = useIntl();
  const [isDataValid, setIsDataValid] = useState(false);

  const { register, watch, trigger } = useFormContext();
  const watchRequiredValues = watch(["node_id", "name"]);

  useEffect(() => {
    const validateData = async () => {
      const isValid = await trigger(["node_id", "name"]);

      setIsDataValid(isValid);
    };

    void validateData();
  }, [watchRequiredValues, trigger]);

  const companyNameLabel = intl.formatMessage({
    id: "contacts.create.requiredInformation.companyName",
    defaultMessage: "Legal company name",
    description: "Label for company name input",
  });
  const personNameLabel = intl.formatMessage({
    id: "contacts.create.requiredInformation.personalName",
    defaultMessage: "Legal full name",
    description: "Label for personal name input",
  });

  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 mb-2">
        <Title>
          <FormattedMessage
            id="contacts.create.requiredInformation.title"
            defaultMessage="Required"
            description="Title for create contact page"
          />
        </Title>
        <Description className="text-center mx-16">
          <FormattedMessage
            id="contacts.create.requiredInformation.description"
            defaultMessage="This information is required for bill counterparties"
            description="Description for create contact page"
          />
        </Description>
      </div>

      <div className="mx-auto">{switchContact}</div>

      <div className="flex flex-col gap-3">
        <Input
          {...register("node_id")}
          icon={<GitForkIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={intl.formatMessage({
            id: "contacts.create.requiredInformation.nodeId",
            defaultMessage: "Node ID",
            description: "Label for node ID input",
          })}
          required
        />
        <Input
          {...register("name")}
          icon={<UserPenIcon className="text-text-300 h-5 w-5 stroke-1" />}
          label={contactType === "person" ? personNameLabel : companyNameLabel}
          required
        />
      </div>

      <Button
        className="mt-auto"
        onClick={moveToNextStep}
        disabled={!isDataValid}
      >
        <FormattedMessage
          id="contacts.create.requiredInformation.continue"
          defaultMessage="Continue"
          description="Continue button for create contact page"
        />
      </Button>
    </div>
  );
}
