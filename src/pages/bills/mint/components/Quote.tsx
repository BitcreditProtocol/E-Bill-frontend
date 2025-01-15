import { LandmarkIcon } from "lucide-react";

enum QuoteStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DECLINED = "declined",
}

type QuoteProps = {
  mintName: string;
  rate: number;
  status: QuoteStatus;
};

export default function Quote({ mintName, rate }: QuoteProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-elevation-50 border border-divider-50 rounded-xl cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center h-10 w-10 bg-elevation-200 p-2.5 border border-divider-50 rounded-full">
          <LandmarkIcon className="text-text-300 h-5 w-5 stroke-1" />
        </div>
        <div className="flex flex-col">
          <span className="text-text-300 text-base font-medium">
            {mintName}
          </span>
          {rate}
        </div>
      </div>

      {">"}
    </div>
  );
}
