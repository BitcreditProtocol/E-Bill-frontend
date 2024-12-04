import { useState, useEffect } from "react";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "motion/react";

import Header from "./components/Header";
import GetStarted from "./screens/GetStarted";
import RequiredInformation from "./screens/RequiredInformation";
import OptionalInformation from "./screens/OptionalInformation";
import PreviewIdentity from "./screens/PreviewIdentity";
import EmailVerification from "./screens/EmailVerification";
import { useNavigate } from "react-router-dom";

/*
  first step: encrypted data - Start.tsx
  second step: required information - RequiredInformation.tsx
  third step: email verification - EmailVerification.tsx
  fourth step: optional information - OptionalInformation.tsx
  fifth step: confirm identity - ConfirmIdentity.tsx
  final step: success
*/

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  postal_address: z.string().min(1),
  date_of_birth: z.string().optional(),
  country_of_birth: z.string().optional(),
  city_of_birth: z.string().optional(),
  identification_number: z.string().optional(),
});

export default function Signup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isRequiredInformationValid, setIsRequiredInformationValid] =
    useState(false);

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      postal_address: "",
      date_of_birth: "",
      country_of_birth: "",
      city_of_birth: "",
      identification_number: "",
    },
  });

  const { watch, trigger } = methods;

  const watchRequiredValues = watch(["name", "email", "postal_address"]);

  useEffect(() => {
    const validateStep = async () => {
      if (currentStep === 1) {
        const isValid = await trigger(["name", "email", "postal_address"]);

        setIsRequiredInformationValid(isValid);
      }
    };

    void validateStep();
  }, [watchRequiredValues, currentStep, trigger]);

  const goToPreviousStep = () => {
    if (currentStep === 0) return; // Prevent going below 0; go to initial page instead

    setCurrentStep(currentStep - 1);
  };

  const steps = [
    <GetStarted
      startCreatingIdentity={() => {
        setCurrentStep(1);
      }}
    />,
    <RequiredInformation
      canContinue={isRequiredInformationValid}
      continueToNextStep={() => {
        setCurrentStep(2);
      }}
    />,
    <EmailVerification
      continueToNextStep={() => {
        setCurrentStep(3);
      }}
    />,
    <OptionalInformation
      continueToNextStep={() => {
        setCurrentStep(4);
      }}
    />,
    <PreviewIdentity
      continueToNextStep={() => {
        navigate("/success");
      }}
      editRequiredInformation={() => {
        setCurrentStep(1);
      }}
      editOptionalInformation={() => {
        setCurrentStep(3);
      }}
    />,
  ];

  return (
    <div
      className={`flex flex-col gap-6 w-full min-h-fit h-screen py-6 px-5 ${
        currentStep === 0 || currentStep === 4 ? "bg-background-ellipse" : ""
      } bg-no-repeat select-none`}
    >
      <Header
        totalSteps={5}
        currentStep={currentStep}
        goToPreviousStep={goToPreviousStep}
      />

      <FormProvider {...methods}>
        <AnimatePresence mode="wait">{steps[currentStep]}</AnimatePresence>
      </FormProvider>
    </div>
  );
}
