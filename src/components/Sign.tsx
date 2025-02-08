import { TriangleAlert } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type SignProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  confirm: React.ReactNode;
  cancel: React.ReactNode;
  open: boolean;
  onOpenChange: () => void;
};

export default function Sign({
  children,
  title,
  description,
  confirm,
  cancel,
  open,
  onOpenChange,
}: SignProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger className="flex items-center justify-center gap-1 w-full bg-transparent">
        {children}
      </DrawerTrigger>
      <DrawerContent className="flex flex-col items-center gap-6 pb-5 px-5 max-w-[375px] bg-elevation-50 mx-auto">
        <DrawerHeader className="flex gap-2 w-full p-0">
          <TriangleAlert className="text-signal-error h-5 w-5 stroke-1" />

          <div className="flex flex-col gap-1.5">
            <DrawerTitle className="text-text-300 text-lg font-medium leading-normal">
              {title}
            </DrawerTitle>
            <DrawerDescription className="text-text-200 text-xs font-normal leading-normal">
              {description}
            </DrawerDescription>
          </div>
        </DrawerHeader>

        <DrawerFooter className="flex flex-col gap-3 w-full p-0">
          {confirm}
          <DrawerClose>{cancel}</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
