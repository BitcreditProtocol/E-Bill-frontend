import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import Information from "./Information";
import Preview from "./Preview";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  address: z.string().min(1),

  registration_date: z.string().optional(),
  country_of_registration: z.string().optional(),
  city_of_registration: z.string().optional(),
  registration_number: z.string().optional(),

  logo_upload_id: z.string().optional(),
  proof_of_registration_upload_id: z.string().optional(),
});

export default function CreateCompany() {
  const [isDataValid, setIsDataValid] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const mainBtnLabel = isPreview ? "Sign" : "Preview";

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      registration_date: "",
      country_of_registration: "",
      city_of_registration: "",
      registration_number: "",
      logo_upload_id: "",
      proof_of_registration_upload_id: "",
    },
  });

  return (
    <div className="flex flex-col gap-6 w-full min-h-fit h-screen py-6 px-5">
      <Topbar lead={<NavigateBack />} />

      {isPreview ? (
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-text-300 font-medium text-2xl leading-8">
            <FormattedMessage
              id="Preview company"
              defaultMessage="Preview company"
              description="Header title for preview company page"
            />
          </h1>

          <span className="text-text-200 text-base text-center leading-6 mx-3">
            <FormattedMessage
              id="Make it easier to create bills with colleagues from your company"
              defaultMessage="Make it easier to create bills with colleagues from your company"
              description="Header subtitle for create company page"
            />
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-text-300 font-medium text-2xl leading-8">
            <FormattedMessage
              id="Create company"
              defaultMessage="Create company"
              description="Header title for create company page"
            />
          </h1>

          <span className="text-text-200 text-base text-center leading-6 mx-3">
            <FormattedMessage
              id="Make it easier to create bills with colleagues from your company"
              defaultMessage="Make it easier to create bills with colleagues from your company"
              description="Header subtitle for create company page"
            />
          </span>
        </div>
      )}

      <div className="flex flex-col gap-9">
        <FormProvider {...methods}>
          {isPreview ? <Preview /> : <Information validate={setIsDataValid} />}
        </FormProvider>

        <Button
          size="md"
          className="w-full"
          disabled={!isDataValid}
          onClick={() => {
            if (isDataValid) {
              setIsPreview(true);
            }
          }}
        >
          <FormattedMessage
            id={mainBtnLabel}
            defaultMessage={mainBtnLabel}
            description="Preview"
          />
        </Button>
      </div>
    </div>
  );
}
