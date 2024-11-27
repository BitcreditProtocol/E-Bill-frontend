import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { ChevronLeftIcon, CircleXIcon, CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import routes from "@/constants/routes";

type WordFieldProps = {
  id: number;
  value: string;
  onChange: (value: string) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
};

function WordField({ id, value, onChange, onPaste }: WordFieldProps) {
  return (
    <div className="flex justify-center items-center gap-2 h-[46px] bg-elevation-200 py-1 pl-2 pr-4 rounded-[8px] border-[1px] border-[#1B0F0014]">
      <div className="flex justify-center items-center p-3 w-[30px] h-[30px] bg-divider-100 rounded-[4px] font-medium text-[14px]">
        {id}
      </div>
      <input
        className="w-full bg-transparent outline-none text-text-300 text-[14px] font-medium leading-[14px]"
        value={value}
        onChange={(e) => { onChange(e.target.value); }}
        onPaste={onPaste}
      />
    </div>
  );
}

export default function RecoverWithSeedPhrase() {
  const navigate = useNavigate();

  const goBack = () => { navigate(routes.LOGIN); };

  const [seedWords, setSeedWords] = useState(Array(12).fill(""));

  const handleInputChange = (index: number, newValue: string) => {
    const updatedWords = [...seedWords];
    updatedWords[index] = newValue;
    setSeedWords(updatedWords);
  };

  const handlePaste = async (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("Text");
    const words = text.split(" ").slice(0, 12);

    const paddedWords = words.concat(Array(12 - words.length).fill(""));
    setSeedWords(paddedWords);
  };

  const pasteFromClipboard = async () => {
    const text = await navigator.clipboard.readText();
    const words = text.split(" ").slice(0, 12);

    const paddedWords = words.concat(Array(12 - words.length).fill(""));
    setSeedWords(paddedWords);
  };

  const clearAllFields = () => {
    setSeedWords(Array(12).fill(""));
  };

  const hasAnyFieldFilled = seedWords.some((word) => word !== "");

  return (
    <div className="flex flex-col min-h-fit h-screen gap-10 py-12 px-6">
      <div className="flex flex-col items-center gap-10 text-center">
        <div className="flex w-full">
          <button
            className="flex items-center justify-center w-8 h-8 bg-[#1B0F00]/20 rounded-full border-[1px] border-[#1B0F00]/6"
            onClick={goBack}
          >
            <ChevronLeftIcon width={16} strokeWidth={1} color="#1B0F00" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-sans font-medium text-[24px] mx-3">
            <FormattedMessage
              id="pages.recoverWithSeedPhrase.title"
              defaultMessage="Recover with seed phrase"
              description="Heading copy for the recover with seed phrase page"
            />
          </h1>
          <span className="font-normal text-text-200 text-[16px]">
            <FormattedMessage
              id="pages.recoverWithSeedPhrase.description"
              defaultMessage="Please paste in your seed phrase to recover your identity"
              description="Description copy for the recover with seed phrase page"
            />
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-11">
        <div className="grid grid-cols-2 gap-4">
          {seedWords.map((word, i) => (
            <WordField
              key={i}
              id={i + 1}
              value={word}
              onChange={(newValue) => { handleInputChange(i, newValue); }}
              onPaste={handlePaste}
            />
          ))}
        </div>

        {hasAnyFieldFilled ? (
          <Button
            variant="link"
            className="gap-2 text-[#1B0F0080] text-[14px] font-medium"
            onClick={clearAllFields}
          >
            <CircleXIcon width={20} color="#1B0F0080" strokeWidth={1} />
            <FormattedMessage
              id="pages.recoverWithSeedPhrase.clear"
              defaultMessage="Clear all"
              description="Button to clear all fields in the recover with seed phrase page"
            />
          </Button>
        ) : (
          <Button
            variant="link"
            className="gap-2 text-[#1B0F0080] text-[14px] font-medium"
            onClick={pasteFromClipboard}
          >
            <CopyIcon width={20} color="#1B0F0080" strokeWidth={1} />
            <FormattedMessage
              id="pages.recoverWithSeedPhrase.paste"
              defaultMessage="Paste from clipboard"
              description="Button to paste seed phrase from clipboard in the recover with seed phrase page"
            />
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <Button className="w-full bg-text-300 text-white font-medium rounded-[8px] py-[24px] px-[32px]">
          <FormattedMessage
            id="pages.recoverWithSeedPhrase.restoreIdentity"
            defaultMessage="Restore identity"
            description="Button to restore identity in the recover with seed phrase page"
          />
        </Button>
      </div>
    </div>
  );
}
