import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Page from "@/components/wrappers/Page";
import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import StepIndicator from "@/components/StepIndicator";

import RequiredInformation from "./components/RequiredInformation";
import PostalAddress from "./components/PostalAddress";
import SwitchContactType from "./components/SwitchContactType";
import OptionalInformation from "./components/OptionalInformation";

const formSchema = z.object({
  type: z.enum(["person", "company", "mint"]),
  node_id: z.string().min(1),
  name: z.string().min(1),
  country: z.string().min(1),
  city: z.string().min(1),
  zip: z.string().min(1),
  street: z.string().min(1),
  city_of_registration: z.string().min(1),
  registration_number: z.string().min(1),
});

export default function Create() {
  const [currentStep, setCurrentStep] = useState(0);
  const [contactType, setContactType] = useState<"person" | "company" | "mint">(
    "person"
  );
  const navigate = useNavigate();

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "person",
      node_id: "",
      name: "",
      country: "AT",
      city: "",
      zip: "",
      street: "",
      city_of_registration: "",
      registration_number: "",
    },
  });

  const moveToPreviousStep = () => {
    if (currentStep === 0) {
      return;
    }

    setCurrentStep((prev) => prev - 1);
  };
  const moveToNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const changeContactType = (type: "person" | "company" | "mint") => {
    setContactType(type);
  };

  const contactTypeSwitch = (
    <SwitchContactType contactType={contactType} onChange={changeContactType} />
  );

  const steps = [
    <RequiredInformation
      contactType={contactType}
      switchContact={contactTypeSwitch}
      moveToNextStep={moveToNextStep}
    />,
    <PostalAddress
      switchContact={contactTypeSwitch}
      moveToNextStep={moveToNextStep}
    />,
    <OptionalInformation
      contactType={contactType}
      switchContact={contactTypeSwitch}
      moveToNextStep={moveToNextStep}
    />,
  ];

  return (
    <Page className="gap-5">
      <Topbar
        lead={
          <NavigateBack
            callBack={() => {
              if (currentStep !== 0) {
                moveToPreviousStep();

                return;
              }

              navigate(-1);
            }}
          />
        }
        middle={
          <StepIndicator totalSteps={steps.length} currentStep={currentStep} />
        }
      />
      <FormProvider {...methods}>{steps[currentStep]}</FormProvider>
    </Page>
  );
}
