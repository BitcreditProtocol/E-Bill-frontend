import { Toaster } from "@/components/ui/toaster";

export default function Default({ children }: { children: React.ReactNode }) {
  return (
    <>
    <div className="max-w-[375px] w-screen min-h-fit h-screen flex flex-col items-center bg-elevation-50">
      {children}
    </div>
    <Toaster/>
    </>
  );
}
