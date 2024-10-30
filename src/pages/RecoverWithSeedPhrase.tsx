import { FormattedMessage } from "react-intl";
import { ChevronLeftIcon, CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

function WordField({ id }: { id: number }) {
  return (
    <div className="flex justify-center items-center bg-[#EEEBE3] p-2 rounded-[8px]">
      <div className="flex justify-center items-center w-[50px] h-[30px] bg-[#D1CCC1] rounded-[4px] font-medium text-[14px]">
        {id}
      </div>
      <input className="w-full py-2 px-4 bg-transparent outline-none" />
    </div>
  );
}

export default function RecoverWithSeedPhrase() {
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
            Recover with seed phrase
          </h1>
          <span className="font-normal text-text-200 text-[16px]">
            Please paste in your seed phrase to recover your identity
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 12 }, (_, i) => (
          <WordField key={i + 1} id={i + 1} />
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex gap-1 items-center justify-center">
          <CopyIcon width={20} color="#1B0F00" strokeWidth={1} />
          Paste from clipboard
        </div>
        <Button className="w-full bg-text-300 text-white font-medium rounded-[8px] py-[24px] px-[32px]">
          Restore identity
        </Button>
      </div>
    </div>
  );
}
