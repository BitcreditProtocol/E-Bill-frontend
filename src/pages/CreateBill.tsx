import { FormattedMessage } from "react-intl";
import { ChevronLeftIcon } from "lucide-react";
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

export default function CreateBill() {
  return (
    <div className="flex flex-col gap-6 w-full min-h-fit h-screen py-4 px-5">
      <div className="w-full">
        <button className="flex items-center justify-center w-8 h-8 bg-[#1B0F00]/20 rounded-full border-[1px] border-[#1B0F00]/6">
          <ChevronLeftIcon width={16} strokeWidth={1} color="#1B0F00" />
        </button>
      </div>

      <div className="flex flex-col gap-2 items-center">
        <h1 className="font-sans font-medium text-2xl tracking-tight mb-0">
          <FormattedMessage
            id="pages.issueBill.title"
            defaultMessage="Issue a bill"
            description="Header copy for Issue bill page"
          />
        </h1>
        <span className="font-normal text-text-200 text-base text-center px-0.5 leading-6">
          <FormattedMessage
            id="pages.issueBill.subtitle"
            defaultMessage="Issue a promissory note where you, the drawer, commit to making the payment"
            description="Subheader copy for Issue bill page"
          />
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <Select>
          <SelectTrigger label="Country of issuing" id="countryOfIssuing">
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

        <Input id="cityOfIssuing" label="City of issuing" required />
      </div>

      <div className="flex flex-col gap-4 mt-2">
        <span className="text-text-300 text-base font-medium">
          <FormattedMessage
            id="pages.issueBill.billInformation"
            defaultMessage="Against this bill of exchange"
            description="Title for bill information section"
          />
        </span>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-text-300 text-sm font-medium">
              <FormattedMessage
                id="pages.issueBill.billInformation.orderOf"
                defaultMessage="To the order of"
                description="Label for payee name input"
              />
            </span>
            <Input id="payee" label="Payee" />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-text-300 text-sm font-medium">
              <FormattedMessage
                id="pages.issueBill.billInformation.payer"
                defaultMessage="Payer"
                description="Label for payer information section"
              />
            </span>
            <div className="flex flex-col gap-4">
              <Input id="payer" label="Person or company" />
              <Select>
                <SelectTrigger label="Country of payment" id="countryOfPayment">
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
              <Input id="cityOfPayment" label="City of payment" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-text-300 text-sm font-medium">
              <FormattedMessage
                id="pages.issueBill.billInformation.noProtest"
                defaultMessage="No protest"
                description="Label for invoice file upload"
              />
            </span>
            <DocumentUpload />
          </div>
        </div>

        <Button className="h-[54px] w-full bg-text-300 text-white font-medium rounded-[8px] py-[18px] px-8 mt-1">
          <FormattedMessage
            id="pages.issueBill.preview"
            defaultMessage="Preview"
            description="Button to trigger bill preview"
          />
        </Button>
      </div>
    </div>
  );
}
