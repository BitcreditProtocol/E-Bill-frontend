import { useIntl, FormattedMessage } from "react-intl";
import { ChevronLeftIcon, MapIcon } from "lucide-react";
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

function TopBar() {
  return (
    <div className="flex items-center justify-between w-full">
      <button className="flex justify-center items-center h-8 w-8 bg-elevation-200 border-[1px] border-divider-50 rounded-full">
        <ChevronLeftIcon className="h-5 w-5 text-text-300" strokeWidth={1} />
      </button>

      <h1 className="flex-1 flex justify-center text-text-300 text-base font-medium leading-6 mr-8">
        <FormattedMessage
          id="Place of payment"
          defaultMessage="Place of payment"
          description="Place of payment title"
        />
      </h1>
    </div>
  );
}

export default function PlaceOfPayment() {
  const intl = useIntl();

  return (
    <div className="flex flex-col items-center gap-6 w-full min-h-fit h-screen py-4 px-5 select-none">
      <TopBar />

      <div className="flex-1 flex flex-col gap-6 w-full">
        <span className="text-text-300 text-sm font-normal leading-5">
          Stockholm, SE, 03-Nov-2024
        </span>

        <div className="flex flex-col gap-3 w-full">
          <Select>
            <SelectTrigger label="Country of payment" id="countryOfIssuing">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="option1">Afghanistan</SelectItem>
                <SelectItem value="option2">Albania</SelectItem>
                <SelectItem value="option3">Algeria</SelectItem>
                <SelectItem value="option4">Andorra</SelectItem>
                <SelectItem value="option5">Angola</SelectItem>
                <SelectItem value="option6">Antigua and Barbuda</SelectItem>
                <SelectItem value="option7">Argentina</SelectItem>
                <SelectItem value="option8">Armenia</SelectItem>
                <SelectItem value="option9">Australia</SelectItem>
                <SelectItem value="option10">Austria</SelectItem>
                <SelectItem value="option11">Azerbaijan</SelectItem>
                <SelectItem value="option12">Bahamas</SelectItem>
                <SelectItem value="option13">Bahrain</SelectItem>
                <SelectItem value="option14">Bangladesh</SelectItem>
                <SelectItem value="option15">Barbados</SelectItem>
                <SelectItem value="option16">Belarus</SelectItem>
                <SelectItem value="option17">Belgium</SelectItem>
                <SelectItem value="option18">Belize</SelectItem>
                <SelectItem value="option19">Benin</SelectItem>
                <SelectItem value="option20">Bhutan</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
            icon={<MapIcon className="w-5 h-5 text-text-300" strokeWidth={1} />}
            label={intl.formatMessage({
              id: "City of payment",
              defaultMessage: "City of payment",
              description: "City of payment input label",
            })}
            type="text"
            required
          />
        </div>
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
            id="Confirm"
            defaultMessage="Confirm"
            description="Confirm button"
          />
        </Button>
      </div>
    </div>
  );
}
