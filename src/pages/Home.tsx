import { Button } from "@/components/ui/button";
import homeLogo from "@/assets/home-logo.svg";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-[8px] w-full">
      <img className="max-w-[200px]" src={homeLogo} alt="home-logo" />
      <div className="flex flex-col items-center gap-6 w-full">
        <span className="text-sm text-[#71717A] font-normal">
          Bitcoin for the Real Economy
        </span>
        <div className="flex flex-col gap-4 w-full">
          <Button className="w-full">Sign up</Button>
          <Button className="w-full" variant="outline">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
