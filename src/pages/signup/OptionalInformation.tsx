import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DocumentUpload } from "@/components/DocumentUpload";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function OptionalInformation() {
  const navigate = useNavigate();

  const confirmIdentity = () => { navigate("/confirm-identity"); };

  return (
    <div className="flex flex-col justify-between min-h-fit h-screen py-5 px-10">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="font-sans font-medium text-[24px] tracking-tight mb-0">
            <FormattedMessage
              id="pages.onboarding.optionalInformation.title"
              defaultMessage="Optional information"
              description="Header copy for Optional information page"
            />
          </h1>

          <span className="font-normal text-text-200 text-base text-center">
            <FormattedMessage
              id="pages.onboarding.optionalInformation.subtitle"
              defaultMessage="This information will give you better credibility with your counter parties"
              description="Subheader copy for Optional information page"
            />
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <Input id="cityOfBirth" label="City of birth" />
          <Input id="socialSecurityNumber" label="Social security number" />
          <Select>
            <SelectTrigger label="Country of birth" id="example-select">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="overflow-y-auto max-h-[30rem]">
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
          <DocumentUpload />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          onClick={confirmIdentity}
          className="w-full bg-text-300 text-white font-medium rounded-[8px] py-[24px] px-[32px]"
        >
          <FormattedMessage
            id="pages.onboarding.optionalInformation.continue"
            defaultMessage="Continue"
            description="Continue button copy for Optional information page"
          />
        </Button>

        <Button
          onClick={confirmIdentity}
          className="w-full text-text-300 bg-transparent font-medium border-text-300 rounded-[8px] py-[24px] px-[32px] hover:bg-transparent"
          variant="outline"
        >
          <FormattedMessage
            id="pages.onboarding.optionalInformation.skip"
            defaultMessage="Skip for now"
            description="Skip button copy for Optional information page"
          />
        </Button>
      </div>
    </div>
  );
}
