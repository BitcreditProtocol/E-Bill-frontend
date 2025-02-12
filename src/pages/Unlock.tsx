import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { ChevronLeftIcon, DeleteIcon, FileLock2Icon } from "lucide-react";
import routes from "@/constants/routes";
import { Button } from "@/components/ui/button";

export default function Unlock() {
  const navigate = useNavigate();

  const goBack = () => { navigate(-1); };

  const goToIdentityRestoration = () => {
    navigate(`/${routes.RESTORE_WITH_SEED_PHRASE}`);
  };

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
    <div className="flex flex-col min-h-fit h-screen gap-10 py-12 px-6 w-[375px]">
      <div className="flex flex-col items-center gap-10 text-center">
        <div className="flex w-full">
          <button
            className="flex items-center justify-center w-8 h-8 bg-[#1B0F00]/20 rounded-full border-[1px] border-[#1B0F00]/6"
            onClick={goBack}
          >
            <ChevronLeftIcon width={16} strokeWidth={1} color="#1B0F00" />
          </button>
        </div>

        <h1 className="font-sans font-medium text-[24px] mx-3">
          <FormattedMessage
            id="Unlock with PIN code"
            defaultMessage="Unlock with PIN code"
          />
        </h1>

        <div className="flex gap-8">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              aria-label={pin.length > idx ? "filled dot" : "empty dot"}
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
              aria-label={item === "delete" ? "delete" : undefined}
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
              id="Forgot your PIN?"
              defaultMessage="Forgot your PIN?"
            />
          </span>

          <Button
            variant="link"
            className="gap-2 text-brand-200 text-[14px] font-medium"
            onClick={goToIdentityRestoration}
          >
            <FormattedMessage
              id="Recover with seed phrase"
              defaultMessage="Recover with seed phrase"
              description="Go to recovery with seed phrase page"
            />
            <FileLock2Icon width={20} color="#F7931A" strokeWidth={1} />
          </Button>
        </div>
      </div>
    </div>
  );
}
