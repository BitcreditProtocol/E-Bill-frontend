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
import OptionalInformation from "./OptionalInformation";
import PreviewIdentity from "./PreviewIdentity";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  address: z.string().min(1),

  date_of_birth: z.string().optional(),
  country_of_birth: z.string().optional(),
  city_of_birth: z.string().optional(),
  identification_number: z.string().optional(),

  profile_picture_upload_id: z.string().optional(),
  identity_document_upload_id: z.string().optional(),
});

export default function BillIssuer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [profilePicturePreview, setProfilePicturePreview] = useState("");
  const navigate = useNavigate();

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      date_of_birth: "",
      country_of_birth: "",
      city_of_birth: "",
      identification_number: "",
      profile_picture_upload_id: "",
      identity_document_upload_id: "",
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
    <OptionalInformation
      setProfilePicturePreview={(e) => {
        setProfilePicturePreview(e);
      }}
      continueToNextStep={() => {
        setCurrentStep((current) => current + 1);
      }}
    />,
    <PreviewIdentity
      profilePicturePreview={profilePicturePreview}
      continueToNextStep={() => {
        navigate(`${routes.CREATE_IDENTITY}/${routes.SUCCESS}`);
      }}
      editRequiredInformation={() => {
        setCurrentStep(0);
      }}
      editOptionalInformation={() => {
        setCurrentStep(2);
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
