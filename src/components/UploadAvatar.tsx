import { useState, ChangeEvent } from "react";
import { PencilIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UploadAvatarProps = {
  name: string;
  label: string;
  onAddFile?: (file: File) => void;
  onSavePreview?: (previewUrl: string) => void;
};

export default function UploadAvatar({
  name,
  label,
  onAddFile,
  onSavePreview,
}: UploadAvatarProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      if (onAddFile) {
        onAddFile(file);
      }

      if (onSavePreview) {
        onSavePreview(previewUrl);
      }
    }
  };

  return (
    <div className="flex flex-col gap-3 w-16">
      <div className="relative">
        <label htmlFor="avatar-upload" className="cursor-pointer">
          <Avatar className="bg-brand-50 relative left-2">
            {preview ? (
              <AvatarImage src={preview} alt="Uploaded avatar" />
            ) : (
              <AvatarFallback className="bg-brand-50 text-brand-200 text-[20px] font-medium">
                {name}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="absolute -bottom-1 right-0 flex items-center justify-center w-6 h-6 bg-brand-200 rounded-full">
            <PencilIcon className="w-2.5 h-2.5 text-white" />
          </div>
        </label>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <span className="text-brand-200 text-xs font-medium">{label}</span>
    </div>
  );
}
