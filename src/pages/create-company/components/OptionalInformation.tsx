import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { MapIcon, ShieldCheckIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
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

export default function OptionalInformation() {
  const intl = useIntl();
  const { register, setValue } = useFormContext();

  const [currentDate, setCurrentDate] = useState();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-text-300 text-base font-medium leading-6">
          <FormattedMessage
            id="Optional information"
            defaultMessage="Optional information"
            description="Title for optional information"
          />
        </span>

        <span className="max-w-52 text-text-200 text-sm font-normal leading-6">
          <FormattedMessage
            id="This information is optional but helps you to build a credit score"
            defaultMessage="This information is optional but helps you to build a credit score"
            description="Subtitle for optional information"
          />
        </span>
      </div>

      <div className="flex flex-col gap-3">
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
            setValue("registration_date", format(from, "dd-MMM-yyyy"));
          }}
        />

        <Select
          onValueChange={(e) => {
            setValue("country_of_registration", e);
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
          {...register("city_of_registration")}
          id="city_of_registration"
          label={intl.formatMessage({
            id: "City of registration",
            defaultMessage: "City of registration",
            description: "Label for city of registration input",
          })}
          icon={<MapIcon className="text-text-300 w-5 h-5" strokeWidth={1} />}
        />

        <Input
          {...register("registration_number")}
          id="registration_number"
          label={intl.formatMessage({
            id: "Registration number",
            defaultMessage: "Registration number",
            description: "Label for registration number input",
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
            setValue("proof_of_registration_document_upload_id", file.name);
          }}
          onRemoveFile={() => {
            setValue("proof_of_registration_document_upload_id", "");
          }}
          label={intl.formatMessage({
            id: "Upload proof of registration",
            defaultMessage: "Upload proof of registration",
            description: "Label for proof of registration upload",
          })}
          description={intl.formatMessage({
            id: "PDF, PNG or JPG (max. 5mb)",
            defaultMessage: "PDF, PNG or JPG (max. 5mb)",
            description: "Description for proof of registration upload",
          })}
        />
      </div>
    </div>
  );
}
