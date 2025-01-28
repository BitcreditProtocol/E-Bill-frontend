import { Separator } from "@/components/ui/separator";

import RequiredInformation from "./components/RequiredInformation";
import OptionalInformation from "./components/OptionalInformation";

export default function Information({
  validate,
}: {
  validate: (isValid: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <RequiredInformation validate={validate} />

      <Separator />

      <OptionalInformation />
    </div>
  );
}
