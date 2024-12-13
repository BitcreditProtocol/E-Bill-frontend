import { Outlet } from "react-router-dom";

export default function CreateIdentity() {
  return (
    <div className="max-w-[375px] w-screen min-h-fit h-screen flex flex-col items-center bg-elevation-50 select-none">
      <Outlet />
    </div>
  );
}
