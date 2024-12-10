import { useFormContext } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DocumentUpload } from "@/components/DocumentUpload";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { getInitials } from "@/utils";

/* function AddPhoto() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex rounded-full"></div>
    </div>
  )
} */

type OptionalInformationProps = {
  continueToNextStep: () => void;
};

export default function OptionalInformation({
  continueToNextStep,
}: OptionalInformationProps) {
  const { register, getValues } = useFormContext();

  return (
    <motion.div
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex-1 flex flex-col justify-between"
    >
      <div className="flex flex-col mx-auto">
        <Avatar className="bg-brand-50">
          <AvatarImage src="https://randomuser.me/api/portraits" />
          <AvatarFallback className="bg-brand-50 text-brand-200 text-[20px] font-medium">
            {getInitials(getValues("name") as string)}
          </AvatarFallback>
        </Avatar>
      </div>

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
          <Input
            {...register("date_of_birth")}
            id="date_of_birth"
            label="Date of birth (MM/DD/YYYY)"
          />
          <Input
            {...register("city_of_birth")}
            id="city_of_birth"
            label="City of birth"
          />
          <Input
            {...register("identification_number")}
            id="identification_number"
            label="Social security number"
          />
          <Select {...register("country_of_birth")}>
            <SelectTrigger label="Country of birth" id="country_of_birth">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Afghanistan">Afghanistan</SelectItem>
                <SelectItem value="Albania">Albania</SelectItem>
                <SelectItem value="Algeria">Algeria</SelectItem>
                <SelectItem value="Andorra">Andorra</SelectItem>
                <SelectItem value="Angoça">Angola</SelectItem>
                <SelectItem value="Antigua and Barbuda">
                  Antigua and Barbuda
                </SelectItem>
                <SelectItem value="Argentina">Argentina</SelectItem>
                <SelectItem value="Armenia">Armenia</SelectItem>
                <SelectItem value="Australia">Australia</SelectItem>
                <SelectItem value="Austria">Austria</SelectItem>
                <SelectItem value="Azerbaijan">Azerbaijan</SelectItem>
                <SelectItem value="Bahamas">Bahamas</SelectItem>
                <SelectItem value="Bahrain">Bahrain</SelectItem>
                <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                <SelectItem value="Barbados">Barbados</SelectItem>
                <SelectItem value="Belarus">Belarus</SelectItem>
                <SelectItem value="Belgium">Belgium</SelectItem>
                <SelectItem value="Belize">Belize</SelectItem>
                <SelectItem value="Benin">Benin</SelectItem>
                <SelectItem value="Bhutan">Bhutan</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <DocumentUpload />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button className="w-full" size="md" onClick={continueToNextStep}>
          <FormattedMessage
            id="pages.onboarding.optionalInformation.continue"
            defaultMessage="Continue"
            description="Continue button copy for Optional information page"
          />
        </Button>

        <Button
          className="w-full"
          size="md"
          variant="outline"
          onClick={continueToNextStep}
        >
          <FormattedMessage
            id="pages.onboarding.optionalInformation.continue"
            defaultMessage="Skip for now"
            description="Continue button copy for Optional information page"
          />
        </Button>
      </div>
    </motion.div>
  );
}
