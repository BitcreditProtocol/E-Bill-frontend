import { forwardRef, useState } from "react";
import { UploadIcon, CheckCircle, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatFileSize, truncateFileName } from "@/utils";

export type DocumentUploadProps = React.InputHTMLAttributes<HTMLInputElement>;

const DocumentUpload = forwardRef<HTMLInputElement, DocumentUploadProps>(
  ({ className, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileSize, setFileSize] = useState<number | null>(null);
    const [progress, setProgress] = useState(0);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        setFileName(truncateFileName(file.name));
        setFileSize(file.size);
        setProgress(0);
        uploadFile(file).catch(() => {
          // TODO: handle error
        });
      }
    };

    const clearFileSelection = () => {
      setFileName(null);
      setFileSize(null);
      setProgress(0);
      if (ref && typeof ref === "object" && ref.current) {
        ref.current.value = "";
      }
    };

    const uploadFile = async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      // todo: replace the endpoint with the actual upload endpoint
      const response = await fetch("/upload-endpoint", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Upload complete");
        setProgress(100);
      } else {
        console.error("Upload failed");
      }
    };

    return (
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-full flex flex-col items-center">
          <input
            type="file"
            id={id}
            className={cn(
              "absolute inset-0 h-full w-full opacity-0 cursor-pointer",
              className
            )}
            ref={ref}
            onFocus={() => { setIsFocused(true); }}
            onBlur={() => { setIsFocused(false); }}
            onChange={handleFileChange}
            {...props}
          />

          <div
            className={cn(
              "flex flex-col items-center gap-3 w-full rounded-[12px] border bg-elevation-200 px-4 pt-4 pb-4",
              isFocused ? "border-[#1B0F004D]" : "border-[#1B0F0014]"
            )}
          >
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-divider-100">
              <UploadIcon
                className="text-[#1B0F00]"
                width={16}
                strokeWidth={1}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium text-foreground">
                Upload your identity document
              </span>
              <span className="text-[12px] text-[#1B0F0080]">
                PNG or JPG (Max. 5mb)
              </span>
            </div>
          </div>
        </div>

        {fileName && (
          <div className="w-full p-4 border border-[#1B0F0014] rounded-[12px] bg-[#EEEBE3] flex flex-col gap-2 pointer-events-auto">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-text-300">
                    {fileName}
                  </span>

                  <span className="text-xs text-[#1B0F0080]">
                    {formatFileSize(fileSize || 0)}
                  </span>
                </div>

                <CheckCircle color="#006F29" width={16} />
              </div>

              <Trash
                color="#1B0F00"
                width={16}
                strokeWidth={1}
                className="cursor-pointer"
                onClick={clearFileSelection}
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="w-full bg-[#D1CCC1] rounded-[8px] h-2 overflow-hidden">
                <div
                  className="bg-green-500 h-full"
                  style={{ width: `${String(progress)}%` }}
                ></div>
              </div>
              <span className="text-sm text-text-300">{progress}%</span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

DocumentUpload.displayName = "DocumentUpload";

export { DocumentUpload };
