import { cn } from "@/lib/utils";
import { truncateAvatarName } from "@/utils/strings";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type PictureProps = {
  type: number;
  name: string;
  image: string;
};

// todo: add size variants
export default function Picture({ type, name, image }: PictureProps) {
  return (
    <Avatar
      className={cn("items-center justify-center h-8 w-8 rounded-full", {
        "!rounded-md": type !== 0,
      })}
    >
      <AvatarImage src={image} alt={name} />
      <AvatarFallback
        className={cn(
          "flex flex-col items-center justify-center py-1.5 px-3 h-8 w-8 bg-brand-50 text-brand-200 text-sm font-medium leading-5 rounded-full",
          {
            "!rounded-md": type !== 0,
          }
        )}
      >
        {truncateAvatarName(name)}
      </AvatarFallback>
    </Avatar>
  );
}
