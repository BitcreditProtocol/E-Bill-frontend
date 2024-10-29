import { useState } from "react";
import { useForm } from "react-hook-form";
import deleteIcon from "@/assets/delete-icon.svg";

export default function Unlock() {
  const { reset } = useForm();
  const [pin, setPin] = useState<string>("");

  const addDigit = (digit: string) => {
    if (pin.length < 5) {
      setPin((prevPin) => prevPin + digit);
    }
  };

  const deleteDigit = () => {
    setPin((prevPin) => prevPin.slice(0, -1));
  };

  const resetPin = () => {
    setPin("");
    reset();
  };

  return (
    <div className="flex flex-col justify-between min-h-fit h-screen py-12 px-[30px]">
      {/* Header and PIN display */}
      <div className="flex flex-col items-center gap-20 text-center">
        <h1 className="font-sans font-medium text-[24px]">
          Unlock with your PIN code
        </h1>
        <div className="flex gap-8">
          {Array.from({ length: 5 }).map((_, idx) => (
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
              className="w-12 h-12 bg-transparent flex items-center justify-center text-lg font-normal"
              disabled={item === ""}
            >
              {item === "delete" ? <img src={deleteIcon} /> : item}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2 text-center">
          <span className="font-medium text-[#1B0F0080] cursor-pointer">
            Forgot your PIN?
          </span>
          <span className="font-medium text-[#F7931A] cursor-pointer">
            Recover with seed phrase
          </span>
        </div>
      </div>
    </div>
  );
}
