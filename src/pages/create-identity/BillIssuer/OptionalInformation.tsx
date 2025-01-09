import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { format } from "date-fns";
import { MapIcon, ShieldCheckIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Upload from "@/components/Upload";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DatePicker } from "@/components/DatePicker/datePicker";
import UploadAvatar from "@/components/UploadAvatar";
import { getInitials } from "@/utils";

type OptionalInformationProps = {
  setProfilePicturePreview: (file: string) => void;
  continueToNextStep: () => void;
};

export default function OptionalInformation({
  setProfilePicturePreview,
  continueToNextStep,
}: OptionalInformationProps) {
  const intl = useIntl();
  const { register, setValue, getValues } = useFormContext();
  const [currentDate, setCurrentDate] = useState();

  const avatarFallback = getInitials(getValues("name") as string);

  const handleSavePreview = (previewUrl: string) => {
    setProfilePicturePreview(previewUrl); // Save the preview URL for later use
  };

  const skipInformation = () => {
    [
      "date_of_birth",
      "country_of_birth",
      "city_of_birth",
      "identification_number",
    ].forEach((field) => {
      setValue(field, "");
    });

    continueToNextStep();
  };

  return (
    <div className="flex-1 flex flex-col gap-11">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-text-300 text-2xl font-medium leading-8">
          <FormattedMessage
            id="Optional information"
            defaultMessage="Optional information"
            description="Header copy for Optional information page"
          />
        </h1>

        <span className="text-text-200 text-base font-normal text-center leading-6 mx-3">
          <FormattedMessage
            id="This information is optional but helps you to build a credit score"
            defaultMessage="This information is optional but helps you to build a credit score"
            description="Subheader copy for Optional information page"
          />
        </span>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        <div className="mb-5 mx-auto">
          <UploadAvatar
            name={avatarFallback}
            onSavePreview={handleSavePreview}
            label={intl.formatMessage({
              id: "Add photo",
              defaultMessage: "Add photo",
              description: "Label for avatar upload",
            })}
          />
        </div>

        <DatePicker
          label={intl.formatMessage({
            id: "Birth date (MM/DD/YYYY)",
            defaultMessage: "Birth date (MM/DD/YYYY)",
            description: "Label for birth date input",
          })}
          mode="single"
          value={{ from: currentDate }}
          onChange={({ from }) => {
            // @ts-expect-error - TS doesn't know about the date object
            setCurrentDate(from);

            // @ts-expect-error - TS doesn't know about the date object
            setValue("date_of_birth", format(from, "dd-MMM-yyyy"));
          }}
        />

        <Select
          onValueChange={(e) => {
            setValue("country_of_birth", e);
          }}
        >
          <SelectTrigger label="Country of birth" id="country_of_birth">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <ScrollArea className="h-[10rem]">
              <SelectGroup>
                <SelectItem value="AF">Afghanistan</SelectItem>
                <SelectItem value="AL">Albania</SelectItem>
                <SelectItem value="DZ">Algeria</SelectItem>
                <SelectItem value="AD">Andorra</SelectItem>
                <SelectItem value="AO">Angola</SelectItem>
                <SelectItem value="AG">Antigua and Barbuda</SelectItem>
                <SelectItem value="AR">Argentina</SelectItem>
                <SelectItem value="AM">Armenia</SelectItem>
                <SelectItem value="AU">Australia</SelectItem>
                <SelectItem value="AT">Austria</SelectItem>
                <SelectItem value="AZ">Azerbaijan</SelectItem>
                <SelectItem value="BS">Bahamas</SelectItem>
                <SelectItem value="BH">Bahrain</SelectItem>
                <SelectItem value="BD">Bangladesh</SelectItem>
                <SelectItem value="BB">Barbados</SelectItem>
                <SelectItem value="BY">Belarus</SelectItem>
                <SelectItem value="BE">Belgium</SelectItem>
                <SelectItem value="BZ">Belize</SelectItem>
                <SelectItem value="BJ">Benin</SelectItem>
                <SelectItem value="BT">Bhutan</SelectItem>
              </SelectGroup>
            </ScrollArea>
          </SelectContent>
        </Select>

        <Input
          {...register("city_of_birth")}
          id="city_of_birth"
          label={intl.formatMessage({
            id: "City of birth",
            defaultMessage: "City of birth",
            description: "Label for city of birth input",
          })}
          icon={<MapIcon className="text-text-300 w-5 h-5" strokeWidth={1} />}
        />

        <Input
          {...register("identification_number")}
          id="identification_number"
          label={intl.formatMessage({
            id: "Social security number",
            defaultMessage: "Social security number",
            description: "Label for social security number input",
          })}
          icon={
            <ShieldCheckIcon
              className="text-text-300 w-5 h-5"
              strokeWidth={1}
            />
          }
        />

        <Upload
          onAddFile={(file) => {
            setValue("identity_document_upload_id", file.name);
          }}
          onRemoveFile={() => {
            setValue("identity_document_upload_id", "");
          }}
          label={intl.formatMessage({
            id: "Upload document",
            defaultMessage: "Upload document",
            description: "Label for document upload",
          })}
          description={intl.formatMessage({
            id: "PDF, PNG or JPG (max. 5mb)",
            defaultMessage: "PDF, PNG or JPG (max. 5mb)",
            description: "Description for document upload",
          })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Button size="md" className="w-full" onClick={continueToNextStep}>
          <FormattedMessage
            id="Continue"
            defaultMessage="Continue"
            description="Continue button copy"
          />
        </Button>

        <Button
          size="md"
          className="w-full"
          variant="outline"
          onClick={skipInformation}
        >
          <FormattedMessage
            id="Skip for now"
            defaultMessage="Skip for now"
            description="Skip for now button copy"
          />
        </Button>
      </div>
    </div>
  );
}
