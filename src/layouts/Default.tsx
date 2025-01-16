import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

export default function Default() {
  return (
    <>
      <div className="max-w-[375px] w-screen min-h-fit h-screen flex flex-col items-center bg-elevation-50">
        {<Outlet />}
      </div>

      <Toaster />
    </>
  );
}
