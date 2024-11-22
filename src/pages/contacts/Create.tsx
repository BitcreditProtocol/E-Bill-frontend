import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { ChevronDownIcon, ChevronLeftIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import routes from "@/constants/routes";

function Header() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <button className="flex items-center justify-center w-8 h-8 bg-[#1B0F00]/20 rounded-full border-[1px] border-[#1B0F00]/6">
        <ChevronLeftIcon width={16} strokeWidth={1} color="#1B0F00" />
      </button>
      <div className="flex justify-between items-center">
        <h1 className="text-text-300 text-xl font-medium">
          <FormattedMessage
            id="pages.createContact.header.title"
            defaultMessage="New contact"
            description="Title for create contact page"
          />
        </h1>

        <Button
          className="gap-1 w-fit text-text-300 bg-transparent text-sm font-medium p-0 border-none hover:bg-transparent"
          variant="outline"
        >
          <SearchIcon className="w-4 h-4 text-text-300" />
          <FormattedMessage
            id="pages.createContact.search"
            defaultMessage="Search contacts"
            description="Search contacts button"
          />
        </Button>
      </div>
    </div>
  );
}

function Form() {
  const [isExtraFieldsVisible, setIsExtraFieldsVisible] = useState(false);

  return (
    <div className="flex-1 flex flex-col gap-3 w-full">
      <Input id="name" label="Name" required />
      <Input id="email" label="Email address" required />
      <Input id="address" label="Postal address" required />

      <Button
        className={`gap-1 w-fit text-text-200 bg-transparent text-sm font-medium p-0 border-none hover:bg-transparent mx-auto ${
          isExtraFieldsVisible ? "hidden" : "flex"
        }`}
        variant="outline"
        onClick={() => setIsExtraFieldsVisible(!isExtraFieldsVisible)}
      >
        <FormattedMessage
          id="pages.createContact.viewAllFields"
          defaultMessage="View more"
          description="View more fields button"
        />
        <ChevronDownIcon className="w-4 h-4 text-text-200" />
      </Button>

      <div
        className={`flex flex-col gap-3 ${
          isExtraFieldsVisible ? "block" : "hidden"
        }`}
      >
        <Input id="dateOfBirth" label="Date of birth (MM/DD/YYYY" />
        <Select>
          <SelectTrigger label="Country of issuing" id="countryOfIssuing">
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

        <Input id="cityOfIssuing" label="City of birth" />
      </div>
    </div>
  );
}

export default function Create() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between items-center gap-6 w-full min-h-fit h-screen py-4 px-5">
      <Header />
      <Form />

      <div className="flex justify-between w-full gap-3">
        <Button
          className="flex-1 w-full text-text-300 bg-transparent text-sm font-medium border-text-300 rounded-[8px] py-3 px-6 hover:bg-transparent"
          variant="outline"
          onClick={() => navigate(routes.CONTACTS)}
        >
          <FormattedMessage
            id="pages.createContact.cancel"
            defaultMessage="Cancel"
            description="Cancel contact creation button"
          />
        </Button>

        <Button
          className="flex-1 w-full bg-text-300 text-white font-medium rounded-[8px] py-3 px-6"
          onClick={() => navigate(routes.CONTACTS)}
        >
          <FormattedMessage
            id="pages.createContact.save"
            defaultMessage="Save"
            description="Save contact button"
          />
        </Button>
      </div>
    </div>
  );
}
