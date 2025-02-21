import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { format, parseISO } from "date-fns";
import { useIntl, FormattedMessage } from "react-intl";
import { CalendarIcon, MapIcon, PencilIcon } from "lucide-react";
import { Description, Title } from "@/components/typography/Step";
import { Input } from "@/components/ui/input";
import CountrySelector from "@/components/CountrySelector";
import { Button } from "@/components/ui/button";
import Picture from "@/components/Picture";
import { DatePicker } from "@/components/DatePicker/datePicker";
import Upload from "@/components/Upload";
import { uploadFile } from "@/services/identity_v2";
import { messages } from "../components/messages";
import { CreateIdentityFormSchema } from "./index";

function ProfilePictureUpload() {
  const { watch, setValue } = useFormContext<CreateIdentityFormSchema>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate } = useMutation({
    mutationFn: (file: File) => {
      return uploadFile(file);
    },
    onSuccess: (data) => {
      setValue("profile_picture_file_upload_id", data.file_upload_id);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const logoImageObjectUrl = URL.createObjectURL(file);
      setValue("profile_picture_preview_url", logoImageObjectUrl);
      mutate(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="relative mx-auto cursor-pointer"
      onClick={triggerFileSelect}
    >
      <Picture
        size="lg"
        name={watch("name")}
        image={watch("profile_picture_preview_url") || ""}
        type={0}
      />
      <button className="relative bottom-6 left-12 flex items-center justify-center p-1.5 h-6 w-6 bg-brand-200 rounded-full">
        <PencilIcon className="text-white h-3 w-3 stroke-1" />
      </button>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}

function UploadIdentityDocumentFile() {
  const { formatMessage: f } = useIntl();
  const { setValue } = useFormContext<CreateIdentityFormSchema>();

  const { mutate } = useMutation({
    mutationFn: (file: File) => {
      return uploadFile(file);
    },
    onSuccess: (data) => {
      setValue("identity_document_file_upload_id", data.file_upload_id);
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <Upload
        label={f({
          id: "identity.create.upload.document",
          defaultMessage: "Upload identity document",
          description: "Upload identity document label",
        })}
        description={f({
          id: "identity.create.upload.acceptedFormats",
          defaultMessage: "PDF, PNG or JPG (max. 100kb)",
          description: "Accepted file formats",
        })}
        onAddFile={(file) => {
          mutate(file);
          setValue("identity_document_file_metadata", {
            name: file.name,
            size: file.size,
          });
        }}
        onRemoveFile={() => {
          setValue("identity_document_file_upload_id", "");
          setValue("identity_document_file_metadata", undefined);
        }}
      />
    </div>
  );
}

export default function OptionalInformation({
  moveToNextStep,
}: {
  moveToNextStep: () => void;
}) {
  const { formatMessage: f } = useIntl();
  const { register, watch, trigger, setValue } = useFormContext();
  const [isDataValid, setIsDataValid] = useState(false);

  const watchRequiredFields = watch([
    "country_of_birth",
    "city_of_birth",
    "identification_number",
  ]);

  useEffect(() => {
    const validateData = async () => {
      const isValid = await trigger([
        "country_of_birth",
        "city_of_birth",
        "identification_number",
      ]);

      setIsDataValid(isValid);
    };

    void validateData();
  }, [watchRequiredFields, trigger]);

  const skipInformation = () => {
    [
      "date_of_birth",
      "country_of_birth",
      "city_of_birth",
      "identification_number",
    ].forEach((field) => {
      setValue(field, "");
    });

    setValue("profile_picture_preview_url", null);
    setValue("profile_picture_file_upload_id", null);
    setValue("identity_document_file_upload_id", null);
    setValue("identity_document_file_metadata", null);

    moveToNextStep();
  };

  return (
    <div className="flex-1 flex flex-col gap-11">
      <div className="flex flex-col items-center gap-2">
        <Title>
          <FormattedMessage
            id="identity.create.optionalInformation.title"
            defaultMessage="Optional: other information"
            description="Title for the optional information step"
          />
        </Title>
        <Description className="text-center mx-10">
          <FormattedMessage
            id="identity.create.optionalInformation.description"
            defaultMessage="This information is optional, enter it to grow your credit score"
            description="Description for the optional information step"
          />
        </Description>
      </div>
      <div className="flex flex-col gap-3">
        <ProfilePictureUpload />

        <DatePicker
          mode="single"
          customComponent={
            <button className="flex items-center gap-2 py-5 px-4 bg-elevation-200 text-text-300 text-sm font-medium leading-5 border border-divider-50 rounded-lg">
              <CalendarIcon className="text-text-300 h-5 w-5 stroke-1" />
              {(watch("date_of_birth") &&
                format(
                  parseISO(watch("date_of_birth") as string),
                  "dd-MMM-yyyy"
                )) ||
                f(messages["identity.date_of_birth"])}
            </button>
          }
          onChange={(date) => {
            setValue(
              "date_of_birth",
              format(date.from as unknown as string, "yyyy-MM-dd")
            );
          }}
        />

        <CountrySelector
          label={f(messages["identity.country_of_birth"])}
          callback={(country) => {
            setValue("country_of_birth", country);
          }}
        />

        <Input
          {...register("city_of_birth")}
          label={f(messages["identity.city_of_birth"])}
          icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
          required
        />

        <Input
          {...register("identification_number")}
          label={f(messages["identity.identification_number"])}
          icon={<MapIcon className="text-text-300 h-5 w-5 stroke-1" />}
          required
        />

        <UploadIdentityDocumentFile />
      </div>

      <div className="flex flex-col gap-2 mt-auto">
        <Button size="md" onClick={moveToNextStep} disabled={!isDataValid}>
          <FormattedMessage
            id="identity.create.optionalInformation.continue"
            defaultMessage="Continue"
            description="Continue button for optional information"
          />
        </Button>

        <Button variant="outline" size="md" onClick={skipInformation}>
          <FormattedMessage
            id="identity.create.optionalInformation.skip"
            defaultMessage="Skip"
            description="Skip button for optional information"
          />
        </Button>
      </div>
    </div>
  );
}
