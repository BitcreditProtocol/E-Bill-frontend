import { useState } from "react";
import { CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { copyToClipboard } from "@/utils";

export default function ProfileInfo() {
  const [isPrivateKeyVisible, setIsPrivateKeyVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const togglePrivateKeyVisibility = () =>
    setIsPrivateKeyVisible((prev) => !prev);

  const publicKey =
    "bitcrqqqqqqp350slvdds7028l4yre5cuh8v38zseert25mxf7lkr2trsy0j2m8";

  const privateKey =
    "bitcr1qqq9r4v7k8m5j2d6s3f0h1g9l2z4x7c8v5b3n6m2k1j0h9g8f7d6s5a4";

  return (
    <div className="flex flex-col gap-6 max-w-[320px] w-full">
      <h1 className="text-center">Profile info</h1>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <h2 className="font-medium">Node ID</h2>
          <div className="flex flex-row justify-between items-center gap-2 p-2 border-[1px] border-[#E4E4E7] rounded-sm">
            <div className="text-wrap break-all leading-5 text-sm">
              {publicKey}
            </div>
            <Button
              className="border-transparent p-0 hover:bg-transparent hover:border-transparent"
              variant="outline"
              onClick={() => copyToClipboard(publicKey)}
            >
              <CopyIcon size={16} />
            </Button>
          </div>
          <p className="text-[#71717A] text-sm leading-5">
            Anyone can find you on Bitcredit using your Node ID. Feel free to
            share it openly.
          </p>
        </div>

        <Separator />

        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between items-baseline">
            <h2 className="font-medium">Private key</h2>
            <Button
              className="font-semibold bg-transparent border-transparent p-0 hover:bg-transparent hover:border-transparent"
              variant="link"
              onClick={togglePrivateKeyVisibility}
            >
              {isPrivateKeyVisible ? "Hide key" : "Reveal key"}
            </Button>
          </div>
          <div className="flex flex-row justify-between items-center gap-2 p-2 border-[1px] border-[#E4E4E7] rounded-sm">
            <div className="text-wrap break-all leading-5 text-sm">
              {isPrivateKeyVisible ? privateKey : "*".repeat(privateKey.length)}
            </div>
            <Button
              className="border-transparent p-0 hover:bg-transparent hover:border-transparent"
              variant="outline"
              onClick={() => copyToClipboard(privateKey)}
            >
              <CopyIcon size={16} />
            </Button>
          </div>
          <p className="text-[#71717A] text-sm leading-5">
            This key grants full control over your Bitcredit account. Do not
            share it with anyone. Copy it only for secure storage or logging
            into another Bitcredit application.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="backup"
            checked={isChecked}
            // indeterminate={true}
            onCheckedChange={(checked) => setIsChecked(checked as boolean)}
            // disabled={true}
            size="sm"
          />
          <label
            htmlFor="backup"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I have backed up my private key
          </label>
        </div>
      </div>

      <Button>Next</Button>
    </div>
  );
}
