import { useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { motion } from "motion/react";
import { useFormContext } from "react-hook-form";
import { ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type CodeInputsProps = {
  onChange: (value: string) => void;
};

function CodeInputs({ onChange }: CodeInputsProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) {
      e.target.value = "";
      return;
    }

    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    updateState();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && e.currentTarget.value === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    updateState();
  };

  const updateState = () => {
    const code = inputRefs.current.map((ref) => ref?.value || "").join("");
    onChange(code);
  };

  return (
    <div className="flex gap-3">
      {[...Array<never>(5)].map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          inputMode="numeric"
          pattern="\d*"
          ref={(el) => (inputRefs.current[index] = el)}
          className="w-12 h-12 border border-[#1B0F0014] rounded-[8px] bg-elevation-200 text-text-300 text-3xl font-light text-center focus:outline-none"
          style={{ fontSize: "28px" }}
          onChange={(e) => {
            handleInput(e, index);
          }}
          onKeyDown={(e) => {
            handleKeyDown(e, index);
          }}
        />
      ))}
    </div>
  );
}

type EmailVerificationProps = {
  continueToNextStep: () => void;
};

export default function EmailVerification({
  continueToNextStep,
}: EmailVerificationProps) {
  const { getValues } = useFormContext();
  const [code, setCode] = useState("");

  return (
    <motion.div
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex-1 flex flex-col justify-between items-center"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="font-sans font-medium text-[24px] tracking-tight mb-0">
            <FormattedMessage
              id="pages.onboarding.emailVerification.title"
              defaultMessage="Verify your email address"
              description="Header copy for Email verification page"
            />
          </h1>

          <span className="font-normal text-text-200 text-base text-center">
            We've sent an one-time passcode to{" "}
            <span className="text-text-300">{getValues("email")}</span>
          </span>
        </div>

        <div className="flex flex-col gap-8">
          <Button
            variant="link"
            className="text-text-300 text-xs font-medium p-0 h-fit"
          >
            <FormattedMessage
              id="pages.onboarding.emailVerification.openEmailInbox"
              defaultMessage="Open email inbox"
              description="Open email inbox button copy for Email verification page"
            />
            <ChevronRightIcon width={16} strokeWidth={1} color="#1B0F00" />
          </Button>

          <CodeInputs onChange={setCode} />

          <Button
            variant="link"
            className="text-signal-alert text-xs font-medium p-0 h-fit"
          >
            <FormattedMessage
              id="pages.onboarding.emailVerification.resendCode"
              defaultMessage="Resend (30s)"
              description="Resend code button copy for Email verification page"
            />
          </Button>
        </div>
      </div>

      <Button
        onClick={continueToNextStep}
        className="w-full"
        disabled={code !== "12345"}
      >
        <FormattedMessage
          id="pages.onboarding.emailVerification.continue"
          defaultMessage="Continue"
          description="Continue button copy for Email verification page"
        />
      </Button>
    </motion.div>
  );
}
