import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <div className="flex flex-col bg-elevation-50 p-[20px]">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-sans font-medium text-[24px] mb-0">
          Bitcoin for the real economy
        </h1>
        <span className="font-normal text-text-200 text-[16px]">
          A strong trade credit solution, directly between businesses
        </span>
      </div>

      <div className="flex flex-col gap-4 text-center">
        <div className="flex flex-col gap-2">
          <Button className="w-full bg-brand-200 text-white font-medium rounded-[8px] py-[18px] px-[32px]">
            Unlock with PIN
          </Button>

          <Button className="w-full bg-text-300 text-white font-medium rounded-[8px] py-[18px] px-[32px]">
            New identity
          </Button>
        </div>

        <span className="font-medium text-[#1B0F0080]">
          Restore with seed phrase
        </span>
      </div>
    </div>
  );
}
