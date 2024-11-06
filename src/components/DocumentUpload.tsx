import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { UploadIcon } from "lucide-react";

export interface DocumentUploadProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const DocumentUpload = forwardRef<HTMLInputElement, DocumentUploadProps>(
  ({ className, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="relative flex flex-col items-center gap-3">
        <input
          type="file"
          id={id}
          className={cn(
            "absolute inset-0 h-full w-full opacity-0 cursor-pointer",
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        <div
          className={cn(
            "flex flex-col items-center gap-3 h-[150px] w-full rounded-[12px] border bg-elevation-200 px-4 pt-4 pb-4",
            isFocused ? "border-[#1B0F004D]" : "border-[#1B0F0014]"
          )}
        >
          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-divider-100">
            <UploadIcon className="text-muted-foreground w-5 h-5" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[14px] font-medium text-foreground">
              Upload your identity document
            </span>
            <span className="text-[12px] text-[#1B0F0080]">
              PNG or JPG (Max. 5mb)
            </span>
          </div>
        </div>
      </div>
    );
  }
);
DocumentUpload.displayName = "DocumentUpload";

export { DocumentUpload };
