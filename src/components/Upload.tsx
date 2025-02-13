import { useState } from "react";
import { CircleCheckIcon, TrashIcon, UploadIcon } from "lucide-react";

function UploadedFile({
  name,
  size,
  onRemove,
}: {
  name: string;
  size: number;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-elevation-200 border border-divider-50 rounded-lg">
      <div className="flex gap-1 items-center">
        <span className="max-w-32 text-text-300 text-sm font-medium leading-5 truncate">
          {name}
        </span>
        <span className="text-text-200 text-xs font-normal leading-[18px]">
          {size} KB
        </span>
        <CircleCheckIcon
          className="h-4 w-4 text-signal-success"
          strokeWidth={1}
        />
      </div>
      <button onClick={onRemove} aria-label="Remove file">
        <TrashIcon className="h-5 w-5 text-text-300" strokeWidth={1} />
      </button>
    </div>
  );
}

export function UploadedFilePreview({
  name,
  size,
}: {
  name: string;
  size: number;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-elevation-200 border border-divider-50 rounded-lg">
      <div className="flex gap-1 items-center">
        <span className="max-w-32 text-text-300 text-sm font-medium leading-5 truncate">
          {name}
        </span>
        <span className="text-text-200 text-xs font-normal leading-[18px]">
          {size} KB
        </span>
        <CircleCheckIcon className="text-signal-success h-4 w-4 stroke-1" />
      </div>
    </div>
  );
}

export default function Upload({
  label,
  description,
  onAddFile,
  onRemoveFile,
}: {
  label: string;
  description: string;
  onAddFile?: (file: File) => void;
  onRemoveFile?: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (onAddFile) {
        onAddFile(selectedFile);
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (onRemoveFile) {
      onRemoveFile();
    }
  };

  return file ? (
    <UploadedFile
      name={file.name}
      size={Math.round(file.size / 1024)}
      onRemove={handleRemoveFile}
    />
  ) : (
    <label className="flex items-center gap-3 bg-elevation-50 py-3 px-4 border border-dashed border-divider-75 rounded-lg cursor-pointer">
      <div className="flex items-center justify-center h-10 w-10 p-2.5 bg-brand-50 rounded-full">
        <UploadIcon className="h-5 w-5 text-brand-200" strokeWidth={1} />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-text-300 text-sm font-medium leading-5">
          {label}
        </span>
        <span className="text-text-200 text-xs font-normal leading-[18px]">
          {description}
        </span>
      </div>
      <input
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept="*/*"
      />
    </label>
  );
}
