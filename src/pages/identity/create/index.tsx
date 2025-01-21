import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import StepIndicator from "@/components/StepIndicator";

import RequiredInformation from "./components/RequiredInformation";
import PostalAddress from "./components/PostalAddress";
import OptionalInformation from "./components/OptionalInformation";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),

  postal_address: z.object({
    country: z.string(),
    street: z.string(),
    city: z.string(),
    zip: z.string(),
  }),

  date_of_birth: z.string().optional(),
  country_of_birth: z.string().optional(),
  city_of_birth: z.string().optional(),
  identification_number: z.string().optional(),

  profile_picture_upload_id: z.string().optional(),
  identity_document_upload_id: z.string().optional(),
});

export default function Create() {
  const [currentStep, setCurrentStep] = useState(0);
  const setNextStep = () => {
    setCurrentStep((current) => current + 1);
  };

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      postal_address: {
        country: "",
        street: "",
        city: "",
        zip: "",
      },
      date_of_birth: "",
      country_of_birth: "",
      city_of_birth: "",
      identification_number: "",
      profile_picture_upload_id: "",
      identity_document_upload_id: "",
    },
  });

  const steps = [
    <RequiredInformation continueToNextStep={setNextStep} />,
    <PostalAddress continueToNextStep={setNextStep} />,
    <OptionalInformation continueToNextStep={setNextStep} />,
  ];

  return (
    <Page>
      <Topbar
        lead={<NavigateBack />}
        middle={
          <StepIndicator totalSteps={steps.length} currentStep={currentStep} />
        }
      />

      <FormProvider {...methods}>{steps[currentStep]}</FormProvider>
    </Page>
  );
}
