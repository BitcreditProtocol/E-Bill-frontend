import { Button } from "./components/ui/button";
import DefaultLayout from "./layouts/Default";
import HomeLogo from "./assets/home-logo.svg";

function App() {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-[8px]">
        <div className="flex flex-col">
          <img src={HomeLogo} alt="home-logo" />
        </div>
        <div className="flex flex-col items-center gap-[24px]">
          <span className="text-sm text-[#71717A] font-normal">
            Bitcoin for the Real Economy
          </span>
          <Button className="bg-[#F7931A] hover:bg-[#F2930a] w-full hover:border-transparent rounded-none">
            Get started
          </Button>
          <div className="flex flex-col items-center gap-[24px]">
            <p className="font-normal">
              Don't have an account?{" "}
              <span className="font-medium">Sign up</span>
            </p>
            <span className="font-medium">Recover account</span>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default App;
