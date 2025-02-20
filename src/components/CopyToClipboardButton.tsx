import { useIntl } from "react-intl";
import { CopyIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { copyToClipboard } from "@/utils";

type CopyToClipboardButtonProps = {
  value: string;
  onCopy?: () => void;
} & React.HTMLAttributes<HTMLButtonElement>;

export default function CopyToClipboardButton({
  value,
  onCopy,
  className,
  ...props
}: CopyToClipboardButtonProps) {
  const { formatMessage: f } = useIntl();

  return (
    <button
      className={cn("flex items-center justify-center p-0", className)}
      onClick={() => {
        void copyToClipboard(value, () => {
          onCopy?.();

          toast({
            title: f({
              id: "action.copyToClipboard.title",
              defaultMessage: "Success!",
            }),
            description: f({
              id: "action.copyToClipboard.description",
              defaultMessage: "Copied to clipboard!",
            }),
            position: "bottom-center",
            duration: 750,
          });
        });
      }}
      {...props}
    >
      <CopyIcon className="text-text-200 h-4 w-4 stroke-1" />
    </button>
  );
}
