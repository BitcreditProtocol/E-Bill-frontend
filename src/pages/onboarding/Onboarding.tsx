import { Fourth } from "./Screens";
import { Button } from "@/components/ui/button";
import layoutLogo from "@/assets/images/layout-logo.svg";

export default function Onboarding() {
  return (
    <div className="flex flex-col gap-6 w-full min-h-fit h-screen py-6 px-5 bg-background-ellipse bg-no-repeat select-none">
      <img src={layoutLogo} className="w-[30px] h-5" />

      <Fourth />

      <div className="flex flex-col gap-6">
        <Button variant="default" className="w-full">
          Get started
        </Button>
      </div>
    </div>
  );
}
