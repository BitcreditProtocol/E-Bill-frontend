import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { useIntl, FormattedMessage } from "react-intl";
import { CircleCheckIcon } from "lucide-react";
import { Description, Title } from "@/components/typography/Step";
import SectionTitle from "@/components/typography/SectionTitle";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Picture from "@/components/Picture";
import { useToast } from "@/hooks/use-toast";
import { createIdentity } from "@/services/identity_v2";
import Property from "../components/Property";
import { messages } from "../components/messages";
import { CreateIdentityFormSchema } from "./index";

export function Preview({ moveToNextStep }: { moveToNextStep: () => void }) {
  const { formatMessage: f } = useIntl();
  const { getValues } = useFormContext<CreateIdentityFormSchema>();
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  const { toast } = useToast();

  const values = getValues();
  const address = `${values.address}, ${values.zip as string}, ${
    values.city
  }, ${values.country}`;

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      createIdentity({
        name: values.name,
        email: values.email,
        country: values.country,
        city: values.city,
        zip: values.zip || "",
        address: values.address,
        date_of_birth: values.date_of_birth || "",
        country_of_birth: values.country_of_birth || "",
        city_of_birth: values.city_of_birth || "",
        identification_number: values.identification_number || "",
        profile_picture_file_upload_id:
          values.profile_picture_file_upload_id || null,
        identity_document_file_upload_id:
          values.identity_document_file_upload_id || null,
      }),
    onSuccess: () => {
      toast({
        title: f({
          id: "identity.create.preview.success",
          defaultMessage: "Success!",
          description: "Success toast title",
        }),
        description: f({
          id: "identity.create.preview.success",
          defaultMessage: "Identity created successfully",
          description: "Success toast description",
        }),
        position: "bottom-center",
      });

      setTimeout(() => {
        moveToNextStep();
      }, 2000);
    },
    onError: () => {
      toast({
        title: f({
          id: "identity.create.preview.error",
          defaultMessage: "Error",
          description: "Error toast title",
        }),
        description: f({
          id: "identity.create.preview.error.description",
          defaultMessage:
            "Error while creating identity. Please review the information and try again.",
          description: "Error toast description",
        }),
        variant: "error",
        position: "bottom-center",
      });
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <Title>
          <FormattedMessage
            id="identity.create.preview.title"
            defaultMessage="Preview identity"
            description="Title for the identity preview step"
          />
        </Title>
        <Description className="text-center mx-10">
          <FormattedMessage
            id="identity.create.preview.description"
            defaultMessage="Please check your personal data before signing"
            description="Description for the identity preview step"
          />
        </Description>
      </div>

      <div className="flex flex-col gap-6 py-6 px-5 border border-divider-75 rounded-xl">
        <SectionTitle>
          <FormattedMessage
            id="identity.create.preview.mainInformation"
            defaultMessage="Main information"
            description="Title for the main information section"
          />
        </SectionTitle>
        <div className="flex flex-col gap-3">
          <Property label={f(messages["identity.name"])} value={values.name} />
          <Separator className="bg-divider-75" />

          <Property
            label={f(messages["identity.email"])}
            value={values.email}
          />
          <Separator className="bg-divider-75" />

          <Property label={f(messages["identity.address"])} value={address} />
        </div>
      </div>

      <div className="flex flex-col gap-6 py-6 px-5 border border-divider-75 rounded-xl">
        <SectionTitle>
          <FormattedMessage
            id="identity.create.preview.optionalInformation"
            defaultMessage="Optional information"
            description="Title for the optional information section"
          />
        </SectionTitle>
        <div className="flex flex-col gap-3">
          <Picture
            size="lg"
            name={values.name}
            image={values.profile_picture_preview_url as string}
            type={0}
          />

          <Property
            label={f(messages["identity.date_of_birth"])}
            value={values.date_of_birth as string}
          />
          <Separator className="bg-divider-75" />

          <Property
            label={f(messages["identity.country_of_birth"])}
            value={values.country_of_birth as string}
          />
          <Separator className="bg-divider-75" />

          <Property
            label={f(messages["identity.city_of_birth"])}
            value={values.city_of_birth as string}
          />
          <Separator className="bg-divider-75" />

          <Property
            label={f(messages["identity.identification_number"])}
            value={values.identification_number as string}
          />
          <Separator className="bg-divider-75" />

          <Property
            label={f(messages["identity.personal.identity_file"])}
            value={
              values.identity_document_file_metadata ? (
                <div className="flex items-center justify-between p-4 bg-elevation-200 border border-divider-50 rounded-lg">
                  <div className="flex gap-1 items-center">
                    <span className="max-w-32 text-text-300 text-sm font-medium leading-5 truncate">
                      {values.identity_document_file_metadata.name}
                    </span>
                    <span className="text-text-200 text-xs font-normal leading-[18px]">
                      {Math.round(
                        values.identity_document_file_metadata.size / 1024
                      )}{" "}
                      KB
                    </span>
                    <CircleCheckIcon
                      className="h-4 w-4 text-signal-success"
                      strokeWidth={1}
                    />
                  </div>
                </div>
              ) : (
                "-"
              )
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div
          className="flex items-center gap-2 text-text-300 text-base font-medium -tracking-[0.32px]"
          onClick={() => {
            setHasAgreedToTerms(!hasAgreedToTerms);
          }}
        >
          <Checkbox size="md" checked={hasAgreedToTerms} />

          <span>
            <FormattedMessage
              id="identity.create.termsAndConditions"
              defaultMessage="I agree to the <span>Terms and conditions</span>"
              description="Terms and conditions agreement"
              values={{
                span: (text) => <span className="text-brand-200">{text}</span>,
              }}
            />
          </span>
        </div>

        <Button
          size="md"
          disabled={!hasAgreedToTerms || isPending}
          onClick={() => {
            mutate();
          }}
        >
          <FormattedMessage
            id="identity.create.sign"
            defaultMessage="Sign"
            description="Label for the sign button"
          />
        </Button>
      </div>
    </div>
  );
}
