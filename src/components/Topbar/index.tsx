import { cn } from "@/lib/utils";

type TopbarProps = {
  lead?: React.ReactNode;
  middle?: React.ReactNode;
  trail?: React.ReactNode;
  className?: string;
};

export default function Topbar({
  lead,
  middle,
  trail,
  className,
}: TopbarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 w-full",
        className
      )}
    >
      <div className="w-8 h-8">{lead}</div>

      <div className="flex-1 flex items-center justify-center">{middle}</div>

      {trail ? <div className="w-8 h-8">{trail}</div> : <></>}
    </div>
  );
}
