import { useState } from "react";
import { ChevronLeftIcon, DeleteIcon } from "lucide-react";
import { FormattedMessage } from "react-intl";

export default function Unlock() {
  const [pin, setPin] = useState<string>("");

  const addDigit = (digit: string) => {
    if (pin.length < 6) {
      setPin((prevPin) => prevPin + digit);
    }
  };

  const deleteDigit = () => {
    setPin((prevPin) => prevPin.slice(0, -1));
  };

  return (
    <div className="flex flex-col justify-between min-h-fit h-screen py-12 px-6">
      <div className="flex flex-col items-center gap-20 text-center">
        <div className="flex w-full">
          <button className="flex items-center justify-center w-8 h-8 bg-[#1B0F00]/20 rounded-full border-[1px] border-[#1B0F00]/6">
            <ChevronLeftIcon width={16} strokeWidth={1} color="#1B0F00" />
          </button>
        </div>
        <h1 className="font-sans font-medium text-[24px] mx-3">
          <FormattedMessage
            id="pages.unlock.title"
            defaultMessage="Unlock with PIN code"
          />
        </h1>
        <div className="flex gap-8">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full ${
                pin.length > idx ? "bg-[#F7931A]" : "bg-[#1B0F00]/20"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-11 justify-center items-center">
        <div className="grid grid-cols-3 gap-x-[60px] gap-y-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "delete"].map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (item === "delete") {
                  deleteDigit();
                } else if (item !== "") {
                  addDigit(item.toString());
                }
              }}
              className="w-12 h-12 p-0 bg-transparent flex items-center justify-center text-lg font-normal"
              disabled={item === ""}
            >
              {item === "delete" ? (
                <DeleteIcon width={24} strokeWidth={1} color="#1B0F00" />
              ) : (
                item
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2 text-center">
          <span className="font-medium text-[#1B0F0080]">
            <FormattedMessage
              id="pages.unlock.forgotPin"
              defaultMessage="Forgot your PIN?"
            />
          </span>
          <span className="font-medium text-[#F7931A] cursor-pointer">
            <FormattedMessage
              id="pages.unlock.seedPhraseRecovery"
              defaultMessage="Recover with seed phrase"
            />
          </span>
        </div>
      </div>
    </div>
  );
}
