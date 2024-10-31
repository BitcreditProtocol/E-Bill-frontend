import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { ChevronLeftIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RecoverWithPrivateKey() {
  const [privateKey, setPrivateKey] = useState("");
  const [isPrivateKeyVisible, setIsPrivateKeyVisible] = useState(false);

  const togglePrivateKeyVisibility = () =>
    setIsPrivateKeyVisible((prev) => !prev);

  const privateKeyFieldValue = isPrivateKeyVisible
    ? privateKey
    : "*".repeat(privateKey.length);

  return (
    <div className="flex flex-col min-h-fit h-screen gap-20 py-12 px-6">
      <div className="flex flex-col items-center gap-20 text-center">
        <div className="flex w-full">
          <button className="flex items-center justify-center w-8 h-8 bg-[#1B0F00]/20 rounded-full border-[1px] border-[#1B0F00]/6">
            <ChevronLeftIcon width={16} strokeWidth={1} color="#1B0F00" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-sans font-medium text-[24px] mx-3">
            Restore your identity
          </h1>
          <span className="font-normal text-text-200 text-[16px]">
            A strong credit solution directly between businesses
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <h2 className="font-sans font-medium text-[16px]">
              Paste your private key
            </h2>

            {isPrivateKeyVisible ? (
              <EyeIcon
                width={20}
                color="#1B0F00"
                strokeWidth={1}
                className="cursor-pointer"
                onClick={togglePrivateKeyVisibility}
              />
            ) : (
              <EyeOffIcon
                width={20}
                color="#1B0F00"
                strokeWidth={1}
                className="cursor-pointer"
                onClick={togglePrivateKeyVisibility}
              />
            )}
          </div>
          <textarea
            className="w-full h-[120px] p-3 bg-[#EEEBE3] rounded-[8px] resize-none"
            placeholder="Enter your private key"
            value={privateKeyFieldValue}
            onChange={(e) => setPrivateKey(e.target.value)}
          />
        </div>
        <Button className="w-full bg-text-300 text-white font-medium rounded-[8px] py-[24px] px-[32px]">
          Restore identity
        </Button>
      </div>
    </div>
  );
}
