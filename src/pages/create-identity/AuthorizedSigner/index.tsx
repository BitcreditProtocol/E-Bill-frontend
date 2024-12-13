import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import StepIndicator from "@/components/StepIndicator";
import routes from "@/constants/routes";

import RequiredInformation from "./RequiredInformation";
import EmailVerification from "./EmailVerification";
import PreviewIdentity from "./PreviewIdentity";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export default function AuthorizedSigner() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const steps = [
    <RequiredInformation
      continueToNextStep={() => {
        setCurrentStep((current) => current + 1);
      }}
    />,
    <EmailVerification
      continueToNextStep={() => {
        setCurrentStep((current) => current + 1);
      }}
    />,
    <PreviewIdentity
      continueToNextStep={() => {
        navigate(`${routes.CREATE_IDENTITY}/${routes.SUCCESS}`);
      }}
      editRequiredInformation={() => {
        setCurrentStep((current) => current - 1);
      }}
    />,
  ];

  return (
    <div className="flex flex-col gap-16 w-full min-h-fit h-screen py-6 px-5">
      <Topbar
        lead={<NavigateBack />}
        middle={
          <StepIndicator totalSteps={steps.length} currentStep={currentStep} />
        }
      />
      <FormProvider {...methods}>
        <AnimatePresence mode="wait">{steps[currentStep]}</AnimatePresence>
      </FormProvider>
    </div>
  );
}
