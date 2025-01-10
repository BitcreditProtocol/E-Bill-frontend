import Topbar from "@/components/Topbar";
import NavigateBack from "@/components/NavigateBack";
import Endorsement from "./components/Endorsement";

export default function Endorsements() {
  return (
    <div className="flex flex-col gap-6 w-full min-h-fit h-screen py-4 px-5">
      <Topbar lead={<NavigateBack />} />

      <div className="flex flex-col gap-3">
        <Endorsement
          payee="Nvidia Inc"
          payeeAddress="One Apple Park Way, Cupertino, California"
          signer="Apple Inc."
          localAndDate="San Francisco, 5 Nov 2024"
        />
      </div>
    </div>
  );
}
