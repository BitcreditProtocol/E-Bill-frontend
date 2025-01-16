import { cn } from "@/lib/utils";
import BottomNavigation from "@/components/BottomNavigation";

type PageProps = {
  children?: React.ReactNode;
  displayBottomNavigation?: boolean;
  displayBackgroundEllipse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Page({
  children,
  className,
  displayBottomNavigation = false,
  displayBackgroundEllipse = false,
  ...props
}: PageProps) {
  return (
    <>
      <div
        className={cn(
          "flex flex-col w-full min-h-fit h-screen py-4 px-5 select-none",
          { "bg-background-ellipse bg-no-repeat": displayBackgroundEllipse },
          className
        )}
        {...props}
      >
        {children}
      </div>

      {displayBottomNavigation && <BottomNavigation />}
    </>
  );
}
